#include "pch.h"
#include "../runner/runner.h"
#include <exception>
#include <sstream>

TEST(RunnerTest, CannotCreateEmpty) {
	try {
		run("");
		FAIL() << "Should have caught the exception";
	}
	catch (std::runtime_error e) {
	}
	catch (...) {
		FAIL() << "Wrong exception";
	};
}

TEST(RunnerTest, ThrowOnNonexistingExecutable) {
	try {
		run("non-existing-executable.exe");
		FAIL() << "Should have caught the exception";
	}
	catch (std::runtime_error e) {
	}
	catch (...) {
		FAIL() << "Wrong exception";
	}

}

void rtrim(std::string &s) {
	auto last_nonspace = std::find_if_not(s.rbegin(), s.rend(), ::isspace);
	auto last_space = last_nonspace.base();
	s.erase(last_space, s.end());
}

TEST(RunnerTest, EchoTwoStrings) {
	std::string s = run("cmd /c echo str1 str2", "");
	rtrim(s);
	ASSERT_EQ("str1 str2", s);
}

TEST(RunnerTest, FindStrWorksStdinInput) {
	std::string s = run("findstr \"qwe\"", "a\r\nqwe\r\nqwe\r\n");
	rtrim(s);
	ASSERT_EQ("qwe\r\nqwe", s);
}

std::string repeat(const std::string &s, int times) {
	std::ostringstream os;
	for (int i = 0; i < times; ++i) {
		os << s;
	}
	return os.str();
}

TEST(RunnerTest, Cat64KB) {
	const int total_size = 64 * 1024;
	std::string in = repeat("\r", total_size/4);
	in += repeat("\n", total_size/4);
	in += repeat("\r\n", total_size/8);
	in += repeat("\n\r", total_size/8);
	std::string res = run("cat.exe", in);
	ASSERT_EQ(res, in);
}

TEST(PipeTest, CanCreate) {
	Pipe pipe;
	HANDLE rd = pipe.rd;
	HANDLE wr = pipe.wr;
	SUCCEED();
}