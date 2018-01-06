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
			// ['\u00ad', '\u00ad', 'Soft hyphen'],
			[' ', ' ', 'space'],
			['\u0009', '\u0009', 'tab'],
			[' \u0009', ' \u0009', 'space+tab'],
			['1', '१', 'digit "one"'],
			['0123456789', '०१२३४५६७८९', 'all digits'],
			['d', 'श्र', 'zra'],
			['dr', 'श्री', 'zrI'],
			['@\u00b0', 'क', 'ka'],
			['@}\u00b0', 'क्र', 'kra'],
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
			// ['\u00df', 'न्न', 'nna'],
			// ['\u20ac"', 'ञ्ज', 'Nja'],
			// ['\u20ac"u', 'ञ्जे', 'Nje'],
			['Qpu', 'दो', 'do'],
			['Qv', 'दै', 'dai'],
			['Qpv', 'दौ', 'dau'],
			// Array('<O"#', 'तिः'),
			// Array('dr', 'श्री'),
			// Array('<e"', 'त्रि')
			['P"', 'थ', 'tha'],
			['X"w', 'मृ', 'mR'],
			['A"', 'ख', 'kha'],
			['J', 'ट', 'TTA'],
			['K', 'ठ', 'TTHA'],
			[',', ',', 'comma'],
			['\u00cf', 'अ', 'a'],
			['\u00cfp', 'आ', 'aa'],
			['B"', 'ग', 'ga'],
			['\u00c1', 'द्र', 'dra'],
			['\u00e4', 'ङ्क', 'ngka'],
			['$', '।', 'separator: single vertical bar'],
			['fl"', 'न्न', 'nna'],
			['\u00c4', 'ञ्ज', 'Nja'],
			['\u00e0', 'ह्व', 'hva'],
			['\u00f9', 'द्य', 'dya'],
			['\u2014"', 'त्न', 'tna'],
			['\u2260', 'द्म', 'dma'],
			['W"', 'भ', 'bha'],
			['@\u00b0o\u00b0', 'क्', 'k+virama'],
			[']"', 'श', 'za'],
			['X"z', 'मं', 'maM'],
			['R"', 'ध', 'dha'],
			['\u201a', 'हृ', 'hR'],
			['^"', 'ष', 'sha'],
			['G"', 'ज', 'ja'],
			['()', '()', 'parentheses'],
			['\u00cc', 'उ', 'u'],
			['\u00fb', 'द्ग', 'dga'],
			['\u00fbl', 'द्गु', 'dgu'],
			['\u2021', 'रु', 'ru'],
			['-', '-', 'hyphen'],
			['c"', 'ज्ञ', 'jna'],
			['P"|', 'र्थं', 'rthaM'],
			['V"wz', 'बृं', 'bRM'],
			['\u00ec_O"', 'स्ति', 'sti'],
			['\u00fc', 'द्व', 'dva'],
			['\u2206', 'श्च', 'zca'],
			['\u00f5', 'ड्ड', 'DDa'],
			['b"', 'क्ष', 'kSa'],
			['\u00d4', 'ए', 'e'],
			['\u00eb', '\u2018', 'LEFT SINGLE QUOTATION MARK'],
			['\u00ed', '\u2019', 'RIGHT SINGLE QUOTATION MARK'],
			['@}\u00b0\u00ee', 'क्री', 'krI'],
			['\u00da', 'इ', 'i'],
			['\u2122', 'दृ', 'dR'],
			['\u2044"', 'ल', 'la'],
			['\u00c8', 'ठ्य', 'THya'],
			['f"', 'त्त', 'tta'],
			['\u00d5', 'ष्ट', 'STa'],
			['\u00b4', 'द्ध', 'ddha'],
			['\u00e5', 'ङ्ग', 'Gga (NGga)'],
			['<@}', 'क्रि', 'kri'],
			['E"O"sQ{', 'चतुर्द', 'caturda'],
			['\u0152', 'ष्ठ', 'STHa'],
			['&', 'ऽ', 'avagraha'],
			['U°', 'फ', 'pha'],
			['\u00fc\u02dc', 'द्व्य', 'dvya'],
			['\u00fc\u02dcp', 'द्व्या', 'dvyA'],
			['\u00d8', 'द्ध', 'ddha'],
			['?', '?', 'question mark'],
			['\u00b1', 'क्ल', 'kla'],
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