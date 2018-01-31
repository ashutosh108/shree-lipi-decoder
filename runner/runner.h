#pragma once
#include <string>
#include <Windows.h>

struct Pipe {
	HANDLE rd, wr;
	Pipe();
	~Pipe();
};

std::string run(const std::string &cmdline, const std::string &in = "");
