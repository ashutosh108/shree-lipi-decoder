$slc = (function() {

var C = {
	KA: 'क',
	KHA: 'ख',
	CA: 'च',
	NYA: 'ञ',
	JA: 'ज',
	TTA: 'ट',
	TTHA: 'ठ',
	DDA: 'ड',
	NNA: 'ण',
	TA: 'त',
	THA: 'थ',
	DA: 'द',
	NA: 'न',
	PA: 'प',
	BA: 'ब',
	MA: 'म',
	YA: 'य',
	RA: 'र',
	LA: 'ल',
	VA: 'व',
	ZA: 'श',
	SA: 'स',
	HA: 'ह',
	A: 'अ',
	_A_DIRGHA: 'ा',
	_I: 'ि',
	_I_DIRGHA: 'ी',
	_U: 'ु',
	_U_DIRGHA: 'ू',
	_RI: 'ृ',
	_E: 'े',
	_O: 'ो',
	VIRAMA: '्',
	VISARGA: 'ः',
};

var INCOMPLETE_CONSONANT = {
	'A': C.KHA,
	'\\': C.VA,
	'Y': C.YA,
	'E': C.CA,
	'N': C.NNA,
	'T': C.PA,
	'_': C.SA,
	'e': C.TA + C.VIRAMA + C.RA,
	'O': C.TA,
	'X': C.MA,
	'S': C.NA,
	'V': C.BA,
	// '\u00df': C.NA + C.VIRAMA + C.NA,
	// '\u20ac': C.NYA + C.VIRAMA + C.JA,
	'P': C.THA,
};

var COMPLETE_CONSONANT = {
	'd': C.ZA + C.VIRAMA + C.RA,
	'@': C.KA,
	'J': C.TTA,
	'K': C.TTHA,
	'L': C.DDA,
	'Z': C.RA,
	'[': C.LA,
	'`': C.HA,
	'Q': C.DA,
	'.': '.',
};

var COMBINING_SVARA = {
	'p': C._A_DIRGHA,
	'r': C._I_DIRGHA,
	's': C._U,
	't': C._U_DIRGHA,
	'w': C._RI,
	'u': C._E,
};

var COMPLETE_SVARA = {
	'\u00cf': C.A,
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
	'stringToUnicode': function (text) {
		var FLAG = {
			NEED_VERT_BAR: 1,
			ADD_SHORT_I: 2,
		};
		var flags = 0;
		var matches = Array(
			// Array('\\"p', 'वा'),
			// Array('Y"s', 'यु'),
			// Array('_O"s', 'स्तु'),
			// Array('<O"#', 'तिः'),
			// Array('dr', 'श्री'),
			// Array('<e"', 'त्रि')
		);
		var newText = "";
		for (var i=0; i<text.length; i++) {
			switch (text[i]) {
				case '\\': // va (without vertical bar)
					newText += C.VA + C.VIRAMA;
					break;
				case '"': // verical bar
					if (newText.endsWith(C.VIRAMA))
						newText = newText.substring(0, newText.length-1);
					else
						newText += '"';
					if (flags & FLAG.ADD_SHORT_I) {
						flags &= ~FLAG.ADD_SHORT_I;
						newText += C._I;
					}
					break;
				case 'p': // verical bar with space (for long 'a' after consonants)
					newText += C._A_DIRGHA;
					break;
				case 'Y': // ya (no bar)
					newText += C.YA + C.VIRAMA;
					break;
				case 's': // u (after consonant)
					newText += C._U;
					break;
				case '_': // sa (no bar)
					newText += C.SA + C.VIRAMA;
					break;
				case 'O': // ta (no bar)
					newText += C.TA + C.VIRAMA;
					break;
				case '<': // long i (combined with consonant; present before consonant)
					flags |= FLAG.ADD_SHORT_I;
					break;
				case '#': // visarga
					newText += C.VISARGA;
					break;
				case 'd': // zra
					newText += C.ZA + C.VIRAMA + C.RA;
					break;
				case 'r': // I dirgha (combined)
					newText += C._I_DIRGHA;
					break;
				case 'e': // tra (no bar)
					newText += C.TA + C.VIRAMA + C.RA + C.VIRAMA;
					break;
				case '@': // ka
					newText += C.KA;
					break;
				case '}': // -ra combined (short diagonal dash to the left-down)
					newText += C.VIRAMA + C.RA;
					break;
				case 'ˇ': // ???
					break;
				case 'X': // ma (no bar)
					newText += C.MA + C.VIRAMA;
					break;
				case 'T': // pa (no bar)
					newText += C.PA + C.VIRAMA;
					break;
				case 'N': // NNA (no bar)
					newText += C.NNA + C.VIRAMA;
					break;
				case 'L': // DDA
					newText += C.DDA;
					if (flags & FLAG.ADD_SHORT_I) {
						flags &= ~FLAG.ADD_SHORT_I;
						newText += C._I;
					}
					break;
				case '>': // small space
					break;
				case 'E': // ca (no bar)
					newText += C.CA + C.VIRAMA;
					break;
				default:
					newText += text[i];
			}
		}
		return newText;
	},

	'stringToUnicode2': function (text) {
		function convertSyllable(text) {
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
				if (/\s/.test(text[i])) {
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
					var char = COMBINING_SVARA[text[i]];
					if (state === STATE.COMPLETE_SYLLABLE) {
						// special case: p+u means "-o", not "-a"+"-e"
						consumed += text[i];
						if (char === C._A_DIRGHA && i+1 < text.length && text[i+1] === 'u') {
							char = C._O;
							consumed += text[i+1]
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
					consumed += text[i];
					if (state === STATE.CONSONANT_WITHOUT_BAR) {
						out += C.VIRAMA;
					}
					out += COMPLETE_CONSONANT[text[i]];
					state = STATE.COMPLETE_SYLLABLE;
					if (got_tail_i) {
						out += C._I;
						got_tail_i = false;
						state = STATE.COMPLETE_SYLLABLE_WITH_SVARA;
					}
				} else if (COMPLETE_SVARA.hasOwnProperty(text[i])) {
					if (state === STATE.INIT) {
						consumed += text[i];
						out += COMPLETE_SVARA[text[i]];
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
					case '<': // tail i hrasva (longer version)
					case 'q': // tail i hrasva (shorter version)
						if (state === STATE.INIT && !got_tail_i) {
							got_tail_i = true;
							consumed += text[i];
						} else {
							break stringloop;
						}
						break;
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
					case '{': // combining start ra (hook above the line)
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.COMPLETE_SYLLABLE_WITH_SVARA) {
							consumed += text[i];
							out = C.RA + C.VIRAMA + out;
							break;
						}
						break stringloop;
					case ',': // comma
						if (state === STATE.INIT) {
							consumed += text[i];
							out += text[i];
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
			var roman_classes = ['s9', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19'];
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