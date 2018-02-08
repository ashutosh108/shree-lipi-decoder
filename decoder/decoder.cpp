#include <iostream>
#include <string>
#include <regex>
#include <direct.h>

#include "../runner/runner.h"

using namespace std::string_literals;

void decompress_pdf(const std::string filename)
{
	auto decompressed_filename = std::regex_replace(
		filename,
		std::regex(R"RE(^(.*)(\.pdf)$)RE", std::regex::icase),
		"$1-decompressed$2");
	std::cout << decompressed_filename << std::endl;
	//"qpdf --stream-data=uncompress J:\\YandexDisk\\Reference\\B\\Books\\Madhva\\source\\vayustuti_pagemaker_files\\VayuStuti.pdf -");
	std::string cmdline = "../Dependencies/qpdf/bin/qpdf.exe --stream-data=uncompress "s + filename + " " + decompressed_filename;
	std::cout << Runner::run(cmdline);
	//std::cout << Runner::run("cmd /c dir");
}

int main(int argc, char *argv[]) {
	if (argc != 2) {
		std::cout << "Usage: decoder filename.pdf" << std::endl;
		exit(1);
	}

	decompress_pdf(argv[1]);
}
