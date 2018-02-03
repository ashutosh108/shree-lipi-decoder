#include "runner.h"

#include <iostream>
#include <string>
#include <thread>

#include <Windows.h>

namespace Runner {

	struct Pipe {
		HANDLE rd, wr;
		Pipe();
		~Pipe();
	};

	void write_to_process(HANDLE &h, std::function<std::string()> writer) {
		for (;;) {
			std::string chunk = writer();
			if (chunk.empty()) {
				break;
			}
			DWORD written;
			bool ok = WriteFile(h, &chunk[0], (DWORD)chunk.size(), &written, nullptr);
			if (!ok || written == 0) {
				break;
			}
		}
		CloseHandle(h);
		h = INVALID_HANDLE_VALUE;
	}

	void read_from_process(HANDLE &h, std::function<void(std::string)> reader) {
		const int BUFSIZE = 4096;

		char buf[BUFSIZE];

		std::string result;

		for (;;) {
			DWORD read_bytes;
			bool ok = ReadFile(h, buf, BUFSIZE, &read_bytes, NULL);
			if (!ok || read_bytes == 0) {
				break;
			}
			reader(std::string(buf, read_bytes));
		}
		CloseHandle(h);
		h = INVALID_HANDLE_VALUE;
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
		std::string result;
		bool still_need_to_return = true;

		run(
			cmdline,
			[&in, &still_need_to_return]() {
				if (still_need_to_return) {
					still_need_to_return = false;
					return in;
				} else {
					return std::string("");
				}
			},
			[&](std::string s) {
				result += s;
			}
		);

		return result;
	}

	void run(
		const std::string &cmdline,
		std::function<std::string()> writer,
		std::function<void(std::string)> reader)
	{
		Pipe stdin_pipe, stdout_pipe;
		prepare_pipe_pair(&stdin_pipe, &stdout_pipe);

		start_process(stdin_pipe, stdout_pipe, cmdline);

		std::thread writer_thread([&stdin_pipe, &writer] {
			write_to_process(stdin_pipe.wr, writer);
		});

		read_from_process(stdout_pipe.rd, reader);

		writer_thread.join();
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

}
