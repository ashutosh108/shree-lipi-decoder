#pragma once
#include <string>
#include <functional>

#include <Windows.h>

namespace Runner {
	std::string run(const std::string &cmdline, const std::string &in = "");
	void run(
		const std::string &cmdline,
		std::function<std::string()>,
		std::function<void(std::string)>
	);
}
