#include "pch.h"
#include "../runner/runner.h"
#include <exception>

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

TEST(PipeTest, CanCreate) {
	Pipe pipe;
	HANDLE rd = pipe.rd;
	HANDLE wr = pipe.wr;
	SUCCEED();
}