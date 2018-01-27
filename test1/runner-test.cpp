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

/*TEST(RunnerText, EmptyEcho) {
Runner r{ "echo.exe" };
std::string s;
r >> s;
}*/