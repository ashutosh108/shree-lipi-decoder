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
			[' ', ' ', 'space'], // Mac: 32, ' '
			['!', '!', 'exclamation'], // Mac: 33, !
			['"', '!"!'], // Mac: 34, "
			['#', '!#!', 'visarga is valid only after syllables'], // Mac: 35, #
			['X"#', 'मः'], // Mac: 35, #
			['$', '।', 'separator: single vertical bar'], // Mac: 36, $
			['O"%', 'तॄ', 'RR: tRR'], // Mac: 37, %
			['&', 'ऽ', 'avagraha'], // Mac: 38, &
			['(', '(', 'parentheses'], // Mac: 40, (
			[')', ')', 'parentheses'], // Mac: 41, )
			['*', '*', 'asterisk'], // Mac: 42, *
			['+', '+', 'plus'], // Mac: 43, +
			[',', ',', 'comma'], // Mac: 44, ,
			['-', '-', 'hyphen'], // Mac: 45, -
			['.', '.', 'dot (full stop)'], // Mac: 46, .
			['/', '/', 'forward slash'], // Mac: 47, /
			['0123456789', '०१२३४५६७८९', 'all digits'], // Mac: 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0123456789
			[':', ':', 'colon'], // Mac: 58, :
			[';', ';', 'semicolon'], // Mac: 59, ;
			['<', '!<!', 'combining i at the start'], // Mac: 60, <
			['<O"', 'ति', '-i: ti'], // Mac: 60, <
			['=', '=', 'equal'], // Mac: 61, =
			['>', '', 'small space (used after dda)'], // Mac: 62, >
			['<NL>', 'ण्डि', 'NDi (as in pandita)'], // Mac: 62, >
			['?', '?', 'question mark'], // Mac: 63, ?
			['@\u00b0', 'क', 'ka'], // Mac: 64, @
			['@}\u00b0', 'क्र', 'kra'], // Mac: 64, @
			['A"', 'ख', 'kha'], // Mac: 65, A
			['B"', 'ग', 'ga'], // Mac: 66, B
			['C"', 'घ', 'gha'], // Mac: 67, C
			['D', 'ङ', 'NGA'], // Mac: 68, D
			['E"', 'च', 'ca'], // Mac: 69, E
			['F', 'छ', 'cha'], // Mac: 70, F
			['G"', 'ज', 'ja'], // Mac: 71, G
			['H"', 'झ', 'jha'], // Mac: 72, H
			['I"', 'ञ', 'NYA'], // Mac: 73, I
			['J', 'ट', 'TTA'], // Mac: 74, J
			['K', 'ठ', 'TTHA'], // Mac: 75, K
			['L', 'ड', 'DDA'], // Mac: 76, L
			['M', 'ढ', 'DDHA'], // Mac: 77, M
			['N"', 'ण', 'NNA'], // Mac: 78, N
			['O"', 'त', 'ta'], // Mac: 79, O
			['P"', 'थ', 'tha'], // Mac: 80, P
			['Q', 'द', 'da'], // Mac: 81, Q
			['R"', 'ध', 'dha'], // Mac: 82, R
			['S"', 'न', 'na'], // Mac: 83, S
			['T"', 'प', 'pa'], // Mac: 84, T
			['U°', 'फ', 'pha'], // Mac: 85, U
			['V"', 'ब', 'ba'], // Mac: 86, V
			['W"', 'भ', 'bha'], // Mac: 87, W
			['X"', 'म', 'ma'], // Mac: 88, X
			['Y"', 'य', 'ya'], // Mac: 89, Y
			['Z', 'र', 'ra'], // Mac: 90, Z
			['[', 'ल', 'la'], // Mac: 91, [
			['\\"', 'व', 'va'], // Mac: 92, \
			[']"', 'श', 'za'], // Mac: 93, ]
			['^"', 'ष', 'sha'], // Mac: 94, ^
			['_"', 'स', 'sa'], // Mac: 95, _
			['`', 'ह', 'ha'], // Mac: 96, `
			['a', 'ळ', 'LLA'], // Mac: 97, a
			['b"', 'क्ष', 'kSa'], // Mac: 98, b
			['c"', 'ज्ञ', 'jna'], // Mac: 99, c
			['d', 'श्र', 'zra'], // Mac: 100, d
			['e"', 'त्र', 'tra'], // Mac: 101, e
			['f"', 'त्त', 'tta'], // Mac: 102, f
			['g', 'ॐ', 'om'], // Mac: 103, g
			['h', 'ऋ', 'R'], // Mac: 104, h
			['i', 'ॠ', 'RR'], // Mac: 105, i
			['j', 'ऌ', 'LL'], // Mac: 106, j
			['k', '\uA8F3', 'CANDRABINDU VIRAMA'], // Mac: 107, k
			['l', '!l!', 'unexpected combining u'], // Mac: 108, l
			['`l', 'हु', 'hu'], // Mac: 108, l
			['m', '!m!', 'unexpected combining uu'], // Mac: 109, m
			['`m', 'हू', 'huu'], // Mac: 109, m
			['n', '!n!', 'unexpected comining -n'], // Mac: 110, n
			['T"n', 'प्न', 'pna'], // Mac: 110, n
			['\\"p', 'वा'],
			['Y"s', 'यु'],
			['Y"t', 'यू'],
			['_O"s', 'स्तु'],
			['Y"ss', 'यु!s!', 'Second combining vowel is invalid'],
			['X"##', 'मः!#!'],
			// ['\u00ad', '\u00ad', 'Soft hyphen'],
			['\u0009', '\u0009', 'tab'],
			[' \u0009', ' \u0009', 'space+tab'],
			['1', '१', 'digit "one"'],
			['dr', 'श्री', 'zrI'],
			['YY"{', 'र्य्य', 'ryya (as in acaryya)'],
			['<Z', 'रि', 'ri'],
			['qZ', 'रि', 'ri'],
			// ['\u00df', 'न्न', 'nna'],
			// ['\u20ac"', 'ञ्ज', 'Nja'],
			// ['\u20ac"u', 'ञ्जे', 'Nje'],
			['Qpu', 'दो', 'do'],
			['Qv', 'दै', 'dai'],
			['Qpv', 'दौ', 'dau'],
			// Array('<O"#', 'तिः'),
			// Array('dr', 'श्री'),
			// Array('<e"', 'त्रि')
			['X"w', 'मृ', 'mR'],
			['\u00cf', 'अ', 'a'],
			['\u00cfp', 'आ', 'aa'],
			['\u00c1', 'द्र', 'dra'],
			['\u00e4', 'ङ्क', 'ngka'],
			['fl"', 'न्न', 'nna'],
			['\u00c4', 'ञ्ज', 'Nja'],
			['\u00e0', 'ह्व', 'hva'],
			['\u00f9', 'द्य', 'dya'],
			['\u2014"', 'त्न', 'tna'],
			['\u2260', 'द्म', 'dma'],
			['@\u00b0o\u00b0', 'क्', 'k+virama'],
			['X"z', 'मं', 'maM'],
			['\u201a', 'हृ', 'hR'],
			['\u00cc', 'उ', 'u'],
			['\u00fb', 'द्ग', 'dga'],
			['\u00fbl', 'द्गु', 'dgu'],
			['\u2021', 'रु', 'ru'],
			['P"|', 'र्थं', 'rthaM'],
			['V"wz', 'बृं', 'bRM'],
			['\u00ec_O"', 'स्ति', 'sti'],
			['\u00fc', 'द्व', 'dva'],
			['\u2206', 'श्च', 'zca'],
			['\u00f5', 'ड्ड', 'DDa'],
			['\u00d4', 'ए', 'e'],
			['\u00eb', '\u2018', 'LEFT SINGLE QUOTATION MARK'],
			['\u00ed', '\u2019', 'RIGHT SINGLE QUOTATION MARK'],
			['@}\u00b0\u00ee', 'क्री', 'krI'],
			['\u00da', 'इ', 'i'],
			['\u2122', 'दृ', 'dR'],
			['\u2044"', 'ल', 'la'],
			['\u00c8', 'ठ्य', 'THya'],
			['\u00d5', 'ष्ट', 'STa'],
			['\u00b4', 'द्ध', 'ddha'],
			['\u00e5', 'ङ्ग', 'Gga (NGga)'],
			['<@}', 'क्रि', 'kri'],
			['E"O"sQ{', 'चतुर्द', 'caturda'],
			['\u0152', 'ष्ठ', 'STHa'],
			['\u00fc\u02dc', 'द्व्य', 'dvya'],
			['\u00fc\u02dcp', 'द्व्या', 'dvyA'],
			['\u00d8', 'द्ध', 'ddha'],
			['\u00b1', 'क्ल', 'kla'],
			['\u00a0"', 'प्त', 'pta'],
			[' "', 'प्त', 'pta (recovered)'],
			['\n', '\n', 'newline'],
			['\u00f1', '\u2013', 'en-dash'], // Mac: 0x96
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