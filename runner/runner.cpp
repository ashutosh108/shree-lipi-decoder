#include "runner.h"

#include <iostream>
#include <string>
#include <thread>

#include <Windows.h>

void write_to_process(HANDLE &h, const std::string &s) {
	DWORD bytes_written = 0;
	DWORD bytes_to_write = static_cast<DWORD>(s.length());
	while (bytes_written < bytes_to_write) {
		DWORD bytes_to_write_now = bytes_to_write - bytes_written;
		DWORD bytes_written_now;
		bool ok = WriteFile(h, &s[bytes_written], bytes_to_write_now, &bytes_written_now, NULL);
		if (!ok || bytes_written_now == 0) {
			break;
		}
		bytes_written += bytes_written_now;
	}
	CloseHandle(h);
	h = INVALID_HANDLE_VALUE;
}

std::string read_from_process(HANDLE &h) {
	const int BUFSIZE = 4096;

	char buf[BUFSIZE];

	std::string result;

	for (;;) {
		DWORD read_bytes;
		bool ok = ReadFile(h, buf, BUFSIZE, &read_bytes, NULL);
		if (!ok || read_bytes == 0) {
			break;
		}
		result += std::string(buf, read_bytes);
	}
	CloseHandle(h);
	h = INVALID_HANDLE_VALUE;
	return result;
}

void prepare_pipe_pair(Pipe *in, Pipe *out) {
	if (!SetHandleInformation(in->wr, HANDLE_FLAG_INHERIT, 0))
		throw std::runtime_error("Stdin SetHandleInformation");

	if (!SetHandleInformation(out->rd, HANDLE_FLAG_INHERIT, 0))
		throw std::runtime_error("Stdout SetHandleInformation");
}

void start_process(Pipe &stdin_pipe, Pipe &stdout_pipe, const std::string & cmdline)
{
	STARTUPINFO si;
	memset(&si, 0, sizeof(si));
	si.cb = sizeof(si);
	si.hStdInput = stdin_pipe.rd;
	si.hStdOutput = stdout_pipe.wr;
	si.hStdError = GetStdHandle(STD_OUTPUT_HANDLE);
	si.dwFlags |= STARTF_USESTDHANDLES;

	PROCESS_INFORMATION pi;

	std::string l_cmdline = cmdline;

	if (!CreateProcess(NULL,
		&l_cmdline[0],
		NULL, // process security attributes
		NULL, // thread security attributes
		TRUE, // handles are inherited
		0,	  // flags
		NULL, // environment
		NULL, // working dir
		&si,
		&pi)) {
		throw std::runtime_error("Cannot start the process");
	}
	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);

	CloseHandle(stdout_pipe.wr);
	stdout_pipe.wr = INVALID_HANDLE_VALUE;
}

std::string run(const std::string &cmdline, const std::string &in)
{
	Pipe stdin_pipe, stdout_pipe;
	prepare_pipe_pair(&stdin_pipe, &stdout_pipe);

	start_process(stdin_pipe, stdout_pipe, cmdline);

	std::thread writer([&] {
		write_to_process(stdin_pipe.wr, in);
	});

	std::string result = read_from_process(stdout_pipe.rd);

	writer.join();

	return result;
}

Pipe::Pipe() : rd(INVALID_HANDLE_VALUE), wr(INVALID_HANDLE_VALUE)
{
	SECURITY_ATTRIBUTES sa;
	sa.nLength = sizeof(sa);
	sa.bInheritHandle = true;
	sa.lpSecurityDescriptor = NULL;
	
	if (!CreatePipe(&rd, &wr, &sa, 0)) {
		throw std::runtime_error("CreatePipe");
	}

}

Pipe::~Pipe()
{
	CloseHandle(rd);
	CloseHandle(wr);
}
