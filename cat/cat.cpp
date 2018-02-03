#include <cstdio>
#include <array>
#include <iostream>
#include <string>

#include <Windows.h>
#include <io.h> // _setmode
#include <fcntl.h> // O_BINARY

void copy(FILE *in, FILE *out) {
	const int BUFSIZE = 4096;
	std::array<char, BUFSIZE> buf;
	for (;;) {
		size_t read = std::fread(&buf[0], sizeof(buf[0]), buf.size(), in);
		if (read <= 0) {
			break;
		}
		size_t written = std::fwrite(&buf[0], sizeof(buf[0]), read, out);
		if (written < read) {
			throw std::runtime_error("Can't write to stdout");
		}
	}
}

int main(int argc, char **argv) {
#ifdef _WIN32
	_setmode(_fileno(stdin), O_BINARY);
	_setmode(_fileno(stdout), O_BINARY);
#endif
	copy(stdin, stdout);
}
