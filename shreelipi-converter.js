$slc = (function() {

var C = {
	OM: 'ॐ',
	KA: 'क',
	KHA: 'ख',
	GA: 'ग',
	GHA: 'घ',
	NGA: 'ङ',
	CA: 'च',
	CHA: 'छ',
	JA: 'ज',
	JHA: 'झ',
	NYA: 'ञ',
	TTA: 'ट',
	TTHA: 'ठ',
	DDA: 'ड',
	DDHA: 'ढ',
	NNA: 'ण',
	TA: 'त',
	THA: 'थ',
	DA: 'द',
	DHA: 'ध',
	NA: 'न',
	PA: 'प',
	PHA: 'फ',
	BA: 'ब',
	BHA: 'भ',
	MA: 'म',
	YA: 'य',
	RA: 'र',
	LA: 'ल',
	LLA: 'ळ',
	VA: 'व',
	ZA: 'श',
	SHA: 'ष',
	SA: 'स',
	HA: 'ह',
	A: 'अ',
	AA: 'आ',
	I: 'इ',
	U: 'उ',
	E: 'ए',
	RI: 'ऋ',
	RRI: 'ॠ',
	LI: 'ऌ',
	_A_DIRGHA: 'ा',
	_I: 'ि',
	_I_DIRGHA: 'ी',
	_U: 'ु',
	_U_DIRGHA: 'ू',
	_RI: 'ृ',
	_RRI: 'ॄ',
	_LI: 'ॢ',
	_E: 'े',
	_AI: 'ै',
	_O: 'ो',
	_AU: 'ौ',
	_CANDRA_E: 'ॅ',
	_CANDRABINDU: 'ँ',
	VIRAMA: '्',
	ANUSVARA: 'ं',
	VISARGA: 'ः',
	AVAGRAHA: 'ऽ',
	CANDRABINDU_VIRAMA: '\uA8F3',
};

var INCOMPLETE_CONSONANT = {
	'A': C.KHA,
	'B': C.GA,
	'C': C.GHA,
	'H': C.JHA,
	'I': C.NYA,
	'\u2044': C.LA,
	'\\': C.VA,
	'Y': C.YA,
	'E': C.CA,
	'G': C.JA,
	'N': C.NNA,
	'T': C.PA,
	'V': C.BA,
	'W': C.BHA,
	'_': C.SA,
	'b': C.KA + C.VIRAMA + C.SHA,
	'e': C.TA + C.VIRAMA + C.RA,
	'f': C.TA + C.VIRAMA + C.TA,
	'O': C.TA,
	'R': C.DHA,
	'X': C.MA,
	'S': C.NA,
	'\uFB02': C.NA + C.VIRAMA + C.NA,
	'\u00c4': C.NYA + C.VIRAMA + C.JA, // Mac: 128, Ä, U+00C4
	'\u00c5': C.NYA + C.VIRAMA + C.CA, // Mac: 129, Å, U+00C5
	'\u00c7': C.CA + C.VIRAMA + C.CA, // Mac: 130, Ç, U+00C7
	'\u00c9': C.JA + C.VIRAMA + C.JA, // Mac: 131, É, U+00C9
	'P': C.THA,
	'\u2014': C.TA + C.VIRAMA + C.NA,
	']': C.ZA,
	'^': C.SHA,
	'c': C.JA + C.VIRAMA + C.NYA,
	'\u2206': C.ZA + C.VIRAMA + C.CA,
	'\u00a0': C.PA + C.VIRAMA + C.TA,
};

var COMPLETE_CONSONANT = {
	'D': C.NGA,
	'F': C.CHA,
	'd': C.ZA + C.VIRAMA + C.RA,
	'@': C.KA,
	'J': C.TTA,
	'K': C.TTHA,
	'L': C.DDA,
	'M': C.DDHA,
	'Z': C.RA,
	'[': C.LA,
	'a': C.LLA,
	'`': C.HA,
	'Q': C.DA,
	'U': C.PHA,
	'\u00c1': C.DA + C.VIRAMA + C.RA,
	'\u201a': C.HA + C._RI,
	'\u2021': C.RA + C._U,
	'\u00c8': C.TTHA + C.VIRAMA + C.YA,
	'\u00d5': C.SHA + C.VIRAMA + C.TTA,
	'\u0152': C.SHA + C.VIRAMA + C.TTHA,
	'\u00D1': C.LA + C.VIRAMA + C.LA, // Mac: 132, Ñ, U+00D1
	'\u00D6': C.HA + C.VIRAMA + C.NA, // Mac: 133, Ö, U+00D6
	'\u00DC': C.HA + C.VIRAMA + C.NNA, // Mac: 134, Ü, U+00DC
	'\u00E1': C.HA + C.VIRAMA + C.LA, // Mac: 135, á, U+00E1
	'\u00e0': C.HA + C.VIRAMA + C.VA, // Mac: 136, à, U+00E0
	'\u00E2': C.DDA + C.VIRAMA + C.DDHA, // Mac: 137, â, U+00E2
	'\u00E4': C.NGA + C.VIRAMA + C.KA, // Mac: 138, ä, U+00E4
	'\u00E3': C.NGA + C.VIRAMA + C.KHA, // Mac: 139, ã, U+00E3
	'\u00E5': C.NGA + C.VIRAMA + C.GA, // Mac: 140, å, U+00E5
	'\u00E7': C.NGA + C.VIRAMA + C.GHA, // Mac: 141, ç, U+00E7
	'\u00E9': C.NGA + C.VIRAMA + C.MA, // Mac: 142, é, U+00E9
	'\u00E8': C.NGA + C.VIRAMA + C.KA + C.VIRAMA + C.SHA, // Mac: 143, è, U+00E8
	'\u00EA': C.CHA + C.VIRAMA + C.VA, // Mac: 144, ê, U+00EA
	'\u00F2': C.KA + C.VIRAMA + C.TA, // Mac: 152, ò, U+00F2
	'\u00F4': C.TTA + C.VIRAMA + C.TTA, // Mac: 153, ô, U+00F4
	'\u00F6': C.TTHA + C.VIRAMA + C.TTHA, // Mac: 154, ö, U+00F6
	'\u00F5': C.DDA + C.VIRAMA + C.DDA, // Mac: 155, õ, U+00F5
	'\u00FA': C.DDHA + C.VIRAMA + C.DDHA, // Mac: 156, ú, U+00FA
	'\u00F9': C.DA + C.VIRAMA + C.YA, // Mac: 157, ù, U+00F9
	'\u00FB': C.DA + C.VIRAMA + C.GA, // Mac: 158, û, U+00FB
	'\u00FC': C.DA + C.VIRAMA + C.VA, // Mac: 159, ü, U+00FC
	'\u00AE': C.DA + C.VIRAMA + C.BA, // Mac: 168, ®, U+u00AE
	'\u00A9': C.DA + C.VIRAMA + C.DA, // Mac: 169, ©, U+00A9
	'\u2122': C.DA + C._RI, // Mac: 170, ™, U+2122
	'\u00B4': C.DA + C.VIRAMA + C.DHA, // Mac: 171, ´, U+00B4
	'\u00A8': C.DA + C.VIRAMA + C.BHA, // Mac: 172, ¨, U+00A8
	'\u2260': C.DA + C.VIRAMA + C.MA, // Mac: 173, ≠, U+2260
	'\u00C6': C.SA + C.VIRAMA + C.TA + C.VIRAMA + C.RA, // Mac: 174, Æ, U+00C6
	'\u00d8': C.DA + C.VIRAMA + C.GHA, // Mac: 175, Ø, U+00D8
	'\u221E': C.DA + C.VIRAMA + C.BA + C.VIRAMA + C.RA, // Mac: 176, ∞, U+221E
	'\u00B1': C.KA + C.VIRAMA + C.LA, // Mac: 177, ±, U+00B1
	'\u2264': C.NGA + C.VIRAMA + C.KA + C.VIRAMA + C.RA, // Mac: 178, ≤, U+2264
	'\u2265': C.NGA + C.VIRAMA + C.GA + C.VIRAMA + C.RA, // Mac: 179, ≥, U+2265
	'\u00A5': C.NGA + C.VIRAMA + C.GHA + C.VIRAMA + C.RA, // Mac: 180, ¥, U+00A5
	'\u00B5': C.NGA + C.VIRAMA + C.KA + C.VIRAMA + C.TA, // Mac: 181, µ, U+00B5
};

var COMBINING_SVARA = {
	'p': C._A_DIRGHA,
	'r': C._I_DIRGHA,
	'\u00ee': C._I_DIRGHA, // Mac: 148, î, U+00EE longer version, used in 'krI'
	'l': C._U,
	'm': C._U_DIRGHA,
	's': C._U,
	't': C._U_DIRGHA,
	'w': C._RI,
	'%': C._RRI,
	'\u00DF': C._LI, // Mac: 167, ß, U+00DF
	'u': C._E,
	'v': C._AI,
	'x': C._CANDRA_E,
};

var COMPLETE_SVARA = {
	'h': C.RI,
	'i': C.RRI,
	'j': C.LI,
	'\u00cf': C.A,
	'\u00da': C.I,
	'\u00cc': C.U,
	'\u00d4': C.E,
};

var DIGITS = {
	'0': '०',
	'1': '१',
	'2': '२',
	'3': '३',
	'4': '४',
	'5': '५',
	'6': '६',
	'7': '७',
	'8': '८',
	'9': '९',
};

var COMPLETE_CHARS = {
	',': ',', // comma
	'(': '(',
	')': ')',
	'-': '-', // hyphen
	'?': '?', // question mark
	'!': '!', // exclamation
	'*': '*', // asterisk
	'+': '+', // plus
	'.': '.', // dot (full stop)
	'/': '/', // forward slash
	':': ':', // colon
	';': ';', // semicolon
	'=': '=', // equal
	'$': '।', // separator: single vertical bar
	'&': C.AVAGRAHA, // avagraha
	'g': C.OM,
	'k': C.CANDRABINDU_VIRAMA, // CANDRABINDU VIRAMA
	'\u00eb': '\u2018', // Mac: 145, ë, U+00EB, LEFT SINGLE QUOTATION MARK
	'\u00ed': '\u2019', // Mac: 146, í, U+00ED, RIGHT SINGLE QUOTATION MARK
	'\u2020': '\u00A0', // Mac: 160, †, U+2020 NBSP
	'\u00F1': '–', // Mac: 150, ñ, U+00F1 en-dash
	'\u00F3': '—', // Mac: 151, ó, U+00F3 em-dash
};

return {
	'stringToUnicode2': function (text) {
		function convertSyllable(text) {
			function peek(text, i, str) {
				return (text.substring(i, i+str.length) === str);
			}


			var got_tail_i = false;
			var tail_i_char = null;
			var STATE = {
				INIT: 1,
				CONSONANT_WITHOUT_BAR: 2,
				COMPLETE_SYLLABLE: 3,
				COMPLETE_SYLLABLE_WITH_SVARA: 4,
				COMPLETE_SVARA: 5,
			};
			var state = STATE.INIT;
			var consumed = '';
			var out = '';
			stringloop:
			for (var i = 0; i<text.length; i++) {
				if (/[ \t\n]/.test(text[i])) {
					consumed += text[i];
					out += text[i];
					break stringloop;
				} else if (INCOMPLETE_CONSONANT.hasOwnProperty(text[i])) {
					var char = INCOMPLETE_CONSONANT[text[i]];
					if (state === STATE.INIT) {
						out += char;
						consumed += text[i];
						state = STATE.CONSONANT_WITHOUT_BAR;
					} else if (state === STATE.CONSONANT_WITHOUT_BAR) {
						out += C.VIRAMA + char;
						consumed += text[i];
					} else {
						break stringloop;
					}
				} else if (COMBINING_SVARA.hasOwnProperty(text[i])) {
					if (state === STATE.COMPLETE_SYLLABLE) {
						var char = COMBINING_SVARA[text[i]];
						// special case: p+u means "-o", not "-a"+"-e"
						consumed += text[i];
						if (char === C._A_DIRGHA && peek(text, i+1, 'u')) {
							char = C._O;
							consumed += text[i+1]
							i++;
						} else if (char === C._A_DIRGHA && peek(text, i+1, 'v')) {
							char = C._AU,
							consumed += text[i+1];
							i++;
						}
						out += char;
						state = STATE.COMPLETE_SYLLABLE_WITH_SVARA;
					} else {
						break stringloop;
					}
				} else if (DIGITS.hasOwnProperty(text[i])) {
					consumed += text[i];
					out += DIGITS[text[i]];
					break stringloop;
				} else if (COMPLETE_CONSONANT.hasOwnProperty(text[i])) {
					if (state === STATE.INIT || state === STATE.CONSONANT_WITHOUT_BAR) {
						var char = COMPLETE_CONSONANT[text[i]]
						consumed += text[i];
						if (state === STATE.CONSONANT_WITHOUT_BAR) {
							out += C.VIRAMA;
						}
						if (char === C.KA && peek(text, i+1, '}')) {
							consumed += text[i+1];
							i++;
							char += C.VIRAMA + C.RA;
						}
						out += char;
						state = STATE.COMPLETE_SYLLABLE;
						if (got_tail_i) {
							out += C._I;
							got_tail_i = false;
							state = STATE.COMPLETE_SYLLABLE_WITH_SVARA;
						}
					} else {
						break stringloop;
					}
				} else if (COMPLETE_SVARA.hasOwnProperty(text[i])) {
					if (state === STATE.INIT) {
						var char = COMPLETE_SVARA[text[i]];
						consumed += text[i];
						if (char === C.A && peek(text, i+1, 'p')) {
							char = C.AA;
							consumed += text[i+1];
							i++;
						}
						out += char;
						state = STATE.COMPLETE_SVARA;
					}
				} else if (COMPLETE_CHARS.hasOwnProperty(text[i])) {
					if (state === STATE.INIT) {
						consumed += text[i];
						out += COMPLETE_CHARS[text[i]];
					}
					break stringloop;
				} else switch (text[i]) {
					case '"': // bar
						if (state === STATE.INIT) {
							break stringloop;
						} else if (state === STATE.CONSONANT_WITHOUT_BAR) {
							consumed += text[i];
							if (got_tail_i) {
								out += C._I;
								got_tail_i = false;
							}
							state = STATE.COMPLETE_SYLLABLE;
						}
						break;
					case 'q': // tail i hrasva (shorter version)
					case '<': // tail i hrasva (longer version)
					case '\u00ec': // Mac: 147, ì, U+00EC tail i hrasva (even longer version, used in sti)
						if (state === STATE.INIT && !got_tail_i) {
							got_tail_i = true;
							tail_i_char = text[i];
							consumed += text[i];
						} else {
							break stringloop;
						}
						break;
					case 'z': // anusvara
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.COMPLETE_SYLLABLE_WITH_SVARA) {
							consumed += text[i];
							out += C.ANUSVARA;
						}
						break stringloop;
					case '#': // visarga
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.COMPLETE_SYLLABLE_WITH_SVARA) {
							consumed += text[i];
							out += C.VISARGA;
						}
						break stringloop;
					case '\u00b0': // Mac: 161, °, U+00B0 small space (used after ka)
					case '>': // small space (used after dda)
						consumed += text[i];
						break;
					case '}': // combining ra (used after ka)
					case '~': // combining -ra (rakara, like a caret under the char)
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.RA;
							break;
						}
						break stringloop
					case 'n': // combining -na (used e.g. after pa)
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.NA;
							break;
						}
						break stringloop
					case 'y': // combining candrabindu
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C._CANDRABINDU;
							break;
						}
						break stringloop
					case '{': // combining start ra (hook above the line)
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.COMPLETE_SYLLABLE_WITH_SVARA) {
							consumed += text[i];
							out = C.RA + C.VIRAMA + out;
							break;
						}
						break stringloop;
					case '|': // combining start ra + anusvara
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.COMPLETE_SYLLABLE_WITH_SVARA) {
							consumed += text[i];
							out = C.RA + C.VIRAMA + out + C.ANUSVARA;
						}
						break; stringloop;
					case 'o': // virama
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA;
						}
						break stringloop;
					case '\u02dc': // combining '-ya', can go after either incomplete or complete consonant
						if (state === STATE.CONSONANT_WITHOUT_BAR || state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.YA;
							state = STATE.COMPLETE_SYLLABLE;
							break;
						}
						break stringloop;
					default:
						break stringloop;
				}
			}
			// string finished and we never got a chance to append svara "i": mark an error
			if (got_tail_i) {
				out += '!' + tail_i_char + '!';
			}
			return {'consumed': consumed, 'out': out};
		}

		// fix wrongly disassembled ligature
		text = text.replace('fl', '\uFB02');

		// fix some of the lost 0xCA/NBSP chars which was errorneously replaced by space
		text = text.replace(' "', '\u00a0"');

		newText = '';
		while (text !== '') {
			res = convertSyllable(text);
			// if consumed part doesn't match actual start of string,
			// something wasn't consumed properly,
			// so mark the rest of the text with warning and bail out
			if (!text.startsWith(res.consumed)) {
				for (var i=0; i<text.length; i++) {
					newText += '!' + text[i] + '!';
				}
				break;
			}
			// remove consumed part from text
			text = text.substring(res.consumed.length);
			newText += res.out;
			// didn't consume anything: emit all chars as they are with warning signs
			if (res.consumed === '') {
				for (var i=0; i<text.length; i++) {
					newText += '!' + text[i] + '!';
				}
				break;
			}
		}
		return newText;
	},

	'elementToUnicode': function (element) {
		function needsRecoding(element) {
			var class_list = element.parentElement.classList;
			var roman_classes = ['s9', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19', 's22', 's23'];
			for (i=0; i<roman_classes.length; i++) {
				if (class_list.contains(roman_classes[i]))
					return false;
			}
			// '[' and ']' chars in title are not in SHREExxx font
			if (class_list.contains('s4') && !class_list.contains('s2')) {
				return false;
			}
			return true;
		}

		// skip and don't recurse into our floating <div> with buttons
		if (element.nodeType === 1 && element.classList.contains('slc-float')) { return; }

		if (element.nodeType == 3 && needsRecoding(element)) {
			element.textContent = $slc.stringToUnicode2(element.textContent);
		}
		for (var i=0; i<element.childNodes.length; i++) {
			$slc.elementToUnicode(element.childNodes[i]);
		}
	},
};

})();