#include "runner.h"

#include <string>

#include <Windows.h>

std::string run(const std::string &cmdline, const std::string &in)
{
	//SECURITY_ATTRIBUTES sa;
	//sa.nLength = sizeof(sa);
	//sa.bInheritHandle = true;
	//sa.lpSecurityDescriptor = NULL;
	//
	//if (!CreatePipe(&h_out_rd, &h_out_wr, &sa, 0)) {
	//	throw std::runtime_error("CreatePipe");
	//}

	STARTUPINFO si;
	memset(&si, 0, sizeof(si));
	si.cb = sizeof(si);
	PROCESS_INFORMATION pi;

	std::string l_cmdline = cmdline;

	if (!CreateProcess(NULL,
		&l_cmdline[0],
		NULL,
		NULL,
		FALSE,
		0,
		NULL,
		NULL,
		&si,
		&pi)) {
		throw std::runtime_error("Cannot start the process");
	}
	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);
	return "";
}
