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
			['o', '!o!', 'unexpected virama'], // Mac: 111, o
			['O"o', 'त्', 't+virama'], // Mac: 111, o
			['p', '!p!', 'unexpected vertical bar'], // Mac: 112, p
			['\\"p', 'वा', 'vaa'], // Mac: 112, p
			['q', '!q!', 'unexpected combining i'], // Mac: 113, q
			['qZ', 'रि', 'ri'], // Mac: 113, q
			['r', '!r!', 'unexpected combining ii'], // Mac: 114, r
			['dr', 'श्री', 'zrI'], // Mac: 114, r
			['s', '!s!', 'unexpected combining u'], // Mac: 115, s
			['Y"s', 'यु', 'yu'], // Mac: 115, s
			['t', '!t!', 'unexpected combining uu'], // Mac: 116, t
			['Y"t', 'यू', 'yuu'],  // Mac: 116, t
			['u', '!u!', 'unexpected combining hook for e and o'], // Mac: 117, u
			['\\"u', 'वे', 've'], // Mac: 117, u
			['Qpu', 'दो', 'do'], // Mac: 117, u
			['v', '!v!', 'unexpected combining hook for ai and au'], // Mac: 118, v
			['Qv', 'दै', 'dai'], // Mac: 118, v
			['Qpv', 'दौ', 'dau'], // Mac: 118, v
			['w', '!w!', 'unexpected combining ri'], // Mac: 119, w
			['X"w', 'मृ', 'mR'], // Mac: 119, w
			['x', '!x!', 'unexpected combining candra e'], // Mac: 120, x
			['X"x', 'मॅ', 'm+candra e'], // Mac: 120, x
			['y', '!y!', 'unexpected combining candrabindu'], // Mac: 121, y
			['X"y', 'मँ', 'm+candrabindu'], // Mac: 121, y
			['z', '!z!', 'unexpected combining anusvara'], // Mac: 122, z
			['X"z', 'मं', 'maM'], // Mac: 122, z
			['V"wz', 'बृं', 'bRM'], // Mac: 122, z
			['{', '!{!', 'unexpected combining r-'], // Mac: 123, {
			['YY"{', 'र्य्य', 'ryya (as in acaryya)'], // Mac: 123, {
			['|', '!|!', 'unexpected combining r+anusvara'], // Mac: 124, |
			['P"|', 'र्थं', 'rthaM'], // Mac: 124, |
			['}', '!}!', 'unexpected combining -r'], // Mac: 125, }
			['@}', 'क्र', 'kra'], // Mac: 125, }
			['<@}', 'क्रि', 'kri'], // Mac: 125, }
			['~', '!~!', 'unexpected combining rakara'], // Mac: 126, ~
			['EF~>', 'च्छ्र', 'cchra'], // Mac: 126, ~

			['\u00c4"', 'ञ्ज', 'Nja'], // Mac: 128, Ä, U+00C4
			['\u00c5"', 'ञ्च', 'Nca'], // Mac: 129, Å, U+00C5‚
			['\u00c7"', 'च्च', 'cca'], // Mac: 130, Ç, U+00C7
			['\u00c9"', 'ज्ज', 'jja'], // Mac: 131, É, U+00C9
			['\u00D1', 'ल्ल', 'lla'], // Mac: 132, Ñ, U+00D1
			['\u00D6', 'ह्न', 'hna'], // Mac: 133, Ö, U+00D6
			['\u00DC', 'ह्ण', 'hNa'], // Mac: 134, Ü, U+00DC
			['\u00E1', 'ह्ल', 'hla'], // Mac: 135, á, U+00E1
			['\u00E0', 'ह्व', 'hva'], // Mac: 136, à, U+00E0
			['\u00E2', 'ड्ढ', 'DDHA'], // Mac: 137, â, U+00E2
			['\u00E4', 'ङ्क', 'ngka'], // Mac: 138, ä, U+00E4
			['\u00E3', 'ङ्ख', 'ngkha'], // Mac: 139, ã, U+00E3
			['\u00E5', 'ङ्ग', 'ngga'], // Mac: 140, å, U+00E5
			['\u00E7', 'ङ्घ', 'nggha'], // Mac: 141, ç, U+00E7
			['\u00E9', 'ङ्म', 'ngma'], // Mac: 142, é, U+00E9
			['\u00E8', 'ङ्क्ष', 'ngksha'], // Mac: 143, è, U+00E8
			['\u00EA', 'छ्व', 'chva'], // Mac: 144, ê, U+00EA
			['\u00eb', '\u2018', 'LEFT SINGLE QUOTATION MARK'], // Mac: 145, ë, U+00EB
			['\u00ed', '\u2019', 'RIGHT SINGLE QUOTATION MARK'], // Mac: 146, í, U+00ED
			['\u00EC', '!\u00EC!', 'unexpected combining -i'], // Mac: 147, ì, U+00EC
			['\u00EC_O"', 'स्ति', 'sti'], // Mac: 147, ì, U+00EC
			['\u00EE', '!\u00EE!', 'unexpected combining -ii'], // Mac: 148, î, U+00EE
			['@}\u00b0\u00EE', 'क्री', 'krI'], // Mac: 148, î, U+00EE
			// Mac 149 is not implemented in SHREE960
			['\u00F1', '\u2013', 'en-dash'], // Mac: 150, ñ, U+00F1
			['\u00F3', '\u2014', 'em-dash'], // Mac: 151, ó, U+00F3
			['\u00F2', 'क्त', 'kta'], // Mac: 152, ò, U+00F2
			['\u00F4', 'ट्ट', 'TTa'], // Mac: 153, ô, U+00F4
			['\u00F6', 'ठ्ठ', 'ThTha'], // Mac: 154, ö, U+00F6
			['\u00F5', 'ड्ड', 'DDa'], // Mac: 155, õ, U+00F5
			['\u00FA', 'ढ्ढ', 'DhDha'], // Mac: 156, ú, U+00FA
			['\u00F9', 'द्य', 'dya'], // Mac: 157, ù, U+00F9
			['\u00FB', 'द्ग', 'dga'], // Mac: 158, û, U+00FB
			['\u00FBl', 'द्गु', 'dgu'], // Mac: 158, û, U+00FB
			['\u00FC', 'द्व', 'dva'], // Mac: 159, ü, U+00FC

			['_O"s', 'स्तु'],
			['Y"ss', 'यु!s!', 'Second combining vowel is invalid'],
			['X"##', 'मः!#!'],
			// ['\u00ad', '\u00ad', 'Soft hyphen'],
			['\u0009', '\u0009', 'tab'],
			[' \u0009', ' \u0009', 'space+tab'],
			['1', '१', 'digit "one"'],
			// ['\u00df', 'न्न', 'nna'],
			// ['\u20ac"', 'ञ्ज', 'Nja'],
			// ['\u20ac"u', 'ञ्जे', 'Nje'],
			// Array('<O"#', 'तिः'),
			// Array('dr', 'श्री'),
			// Array('<e"', 'त्रि')
			['\u00cf', 'अ', 'a'],
			['\u00cfp', 'आ', 'aa'],
			['\u00c1', 'द्र', 'dra'],
			['fl"', 'न्न', 'nna'],
			['\u2014"', 'त्न', 'tna'],
			['\u2260', 'द्म', 'dma'],
			['\u201a', 'हृ', 'hR'],
			['\u00cc', 'उ', 'u'],
			['\u2021', 'रु', 'ru'],
			['\u2206', 'श्च', 'zca'],
			['\u00d4', 'ए', 'e'],
			['\u00da', 'इ', 'i'],
			['\u2122', 'दृ', 'dR'],
			['\u2044"', 'ल', 'la'],
			['\u00c8', 'ठ्य', 'THya'],
			['\u00d5', 'ष्ट', 'STa'],
			['\u00b4', 'द्ध', 'ddha'],
			['E"O"sQ{', 'चतुर्द', 'caturda'],
			['\u0152', 'ष्ठ', 'STHa'],
			['\u00fc\u02dc', 'द्व्य', 'dvya'],
			['\u00fc\u02dcp', 'द्व्या', 'dvyA'],
			['\u00d8', 'द्ध', 'ddha'],
			['\u00b1', 'क्ल', 'kla'],
			['\u00a0"', 'प्त', 'pta'],
			[' "', 'प्त', 'pta (recovered)'],
			['\n', '\n', 'newline'],
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