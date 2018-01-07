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
	_E: 'े',
	_AI: 'ै',
	_O: 'ो',
	_AU: 'ौ',
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
	'\u00df': C.NA + C.VIRAMA + C.NA,
	'\u00c4': C.NYA + C.VIRAMA + C.JA,
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
	'\u00e4': C.NGA + C.VIRAMA + C.KA,
	'\u00e0': C.HA + C.VIRAMA + C.VA,
	'\u00f5': C.DDA + C.VIRAMA + C.DDA,
	'\u00f9': C.DA + C.VIRAMA + C.YA,
	'\u00fc': C.DA + C.VIRAMA + C.VA,
	'\u2260': C.DA + C.VIRAMA + C.MA,
	'\u201a': C.HA + C._RI,
	'\u00fb': C.DA + C.VIRAMA + C.GA,
	'\u2021': C.RA + C._U,
	'\u2122': C.DA + C._RI,
	'\u00c8': C.TTHA + C.VIRAMA + C.YA,
	'\u00d5': C.SHA + C.VIRAMA + C.TTA,
	'\u00b4': C.DA + C.VIRAMA + C.DHA,
	'\u00e5': C.NGA + C.VIRAMA + C.GA,
	'\u0152': C.SHA + C.VIRAMA + C.TTHA,
	'\u00d8': C.DA + C.VIRAMA + C.DHA,
	'\u00b1': C.KA + C.VIRAMA + C.LA,
};

var COMBINING_SVARA = {
	'p': C._A_DIRGHA,
	'r': C._I_DIRGHA,
	'\u00ee': C._I_DIRGHA, // longer version, used in 'krI'
	'l': C._U,
	'm': C._U_DIRGHA,
	's': C._U,
	't': C._U_DIRGHA,
	'w': C._RI,
	'%': C._RRI,
	'u': C._E,
	'v': C._AI,
};

var COMPLETE_SVARA = {
	'g': C.OM,
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
}

return {
	'stringToUnicode2': function (text) {
		function convertSyllable(text) {
			function peek(text, i, str) {
				return (text.substring(i, i+str.length) === str);
			}


			var got_tail_i = false;
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
					case '\u00ec': // tail i hrasva (even longer version, used in sti)
						if (state === STATE.INIT && !got_tail_i) {
							got_tail_i = true;
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
					case '\u00b0': // small space (used after ka)
						consumed += text[i];
						break;
					case '>': // small space (used after dda)
						consumed += text[i];
						break;
					case '}': // combining ra (used after ka)
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.RA;
							break;
						} else {
							break stringloop
						}
					case 'n': // combining -na (used e.g. after pa)
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.NA;
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
					case ',': // comma
					case '(':
					case ')':
					case '-': // hyphen
					case '?': // question mark
					case '!': // exclamation
					case '*': // asterisk
					case '+': // plus
					case '.': // dot (full stop)
					case '/': // forward slash
					case ':': // colon
					case ';': // semicolon
					case '=': // equal
						if (state === STATE.INIT) {
							consumed += text[i];
							out += text[i];
						}
						break stringloop;
					case '$': // separator: single vertical bar
						if (state === STATE.INIT) {
							consumed += text[i];
							out += '।';
						}
						break stringloop;
					case '&': // avagraha
						if (state === STATE.INIT) {
							consumed += text[i];
							out += C.AVAGRAHA;
						}
						break stringloop;
					case 'o': // virama
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA;
						}
						break stringloop;
					case '\u00eb': // LEFT SINGLE QUOTATION MARK
						if (state === STATE.INIT) {
							consumed += text[i];
							out += '\u2018';
						}
						break stringloop;
					case '\u00ed': // RIGHT SINGLE QUOTATION MARK
						if (state === STATE.INIT) {
							consumed += text[i];
							out += '\u2019';
						}
						break stringloop;
					case '\u02dc': // combining '-ya', can go after either incomplete or complete consonant
						if (state === STATE.CONSONANT_WITHOUT_BAR || state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.YA;
							state = STATE.COMPLETE_SYLLABLE;
							break;
						} else {
							break stringloop;
						}
					case '\u00f1': // Mac: 0x96, en-dash
						if (state === STATE.INIT) {
							consumed += text[i];
							out += '–';
						}
						break stringloop;
					case 'k': // CANDRABINU VIRAMA
						if (state === STATE.INIT) {
							consumed += text[i];
							out += C.CANDRABINDU_VIRAMA;
						}
						break stringloop;
					default:
						break stringloop;
				}
			}
			// string finished and we never got a chance to append svara "i": mark an error
			if (got_tail_i) {
				out += '!<!';
			}
			return {'consumed': consumed, 'out': out};
		}

		// fix wrongly disassembled ligature
		text = text.replace('fl', '\u00df');

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