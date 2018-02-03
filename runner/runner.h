#pragma once
#include <string>
#include <Windows.h>

namespace Runner {
	std::string run(const std::string &cmdline, const std::string &in = "");
}
