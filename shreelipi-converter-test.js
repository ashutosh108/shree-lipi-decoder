(function() {
	function logmsg(msg) {
		var div = document.createElement('div');
		div.textContent = msg;
		log = document.getElementById('log')
		log.appendChild(div)
	};

	function runTests() {
		if (typeof($slc) !== 'object') {
			logmsg("$slc not found");
		}
		var tests = [
			['"', '!"!'],
			['\\"', 'व'],
			['\\"p', 'वा'],
			['Y"', 'य'],
			['E"', 'च'],
			['N"', 'ण'],
			['T"', 'प'],
			['_"', 'स'],
			['e"', 'त्र'],
			['Y"s', 'यु'],
			['Y"t', 'यू'],
			['O"', 'त'],
			['_O"s', 'स्तु'],
			['<', '!<!', 'combining i at the start'],
			['<O"', 'ति'],
			['#', '!#!', 'visarga is valid only after syllables'],
			['X"', 'म'],
			['Y"ss', 'यु!s!', 'Second combining vowel is invalid'],
			['X"#', 'मः'],
			['X"##', 'मः!#!'],
			['\u00ad', '\u00ad', 'Soft hyphen'],
			[' ', ' ', 'space'],
			['\u0009', '\u0009', 'tab'],
			[' \u0009', ' \u0009', 'space+tab'],
			['1', '१', 'digit "one"'],
			['0123456789', '०१२३४५६७८९', 'all digits'],
			['d', 'श्र', 'zra'],
			['dr', 'श्री', 'zrI'],
			['@\u02c7', 'क', 'ka'],
			['@}\u02c7', 'क्र', 'kra'],
			['<NL>', 'ण्डि', 'NDi (as in pandita)'],
			['YY"{', 'र्य्य', 'ryya (as in acaryya)'],
			['Z', 'र', 'ra'],
			['<Z', 'रि', 'ri'],
			['[', 'ल', 'la'],
			['S"', 'न', 'na'],
			['`', 'ह', 'ha'],
			['qZ', 'रि', 'ri'],
			['Q', 'द', 'da'],
			['.', '.', 'dot'],
			['V"', 'ब', 'ba'],
			['\u00df', 'न्न', 'nna'],
			['\u20ac"', 'ञ्ज', 'Nja'],
			['\u20ac"u', 'ञ्जे', 'Nje'],
			['Qpu', 'दो', 'do'],
			// Array('<O"#', 'तिः'),
			// Array('dr', 'श्री'),
			// Array('<e"', 'त्रि')
		];
		for (var i=0; i < tests.length; i++) {
			runTest(tests[i][0], tests[i][1]);
		}
	}

	function runTest(lipi, expected_unicode) {
		unicode = $slc.stringToUnicode2(lipi);
		if (unicode != expected_unicode) {
			logmsg('mismatch for ' + lipi + ': got «' + unicode + '» expected «' + expected_unicode + '»');
		}
	}

	logmsg("start");
	runTests();
	logmsg("finish");
})();