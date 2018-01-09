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
	II: 'ई',
	U: 'उ',
	UU: 'ऊ',
	O: 'ओ',
	AU: 'औ',
	E: 'ए',
	AI: 'ऐ',
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
	'E': C.CA,
	'H': C.JHA,
	'I': C.NYA,
	'G': C.JA,
	'N': C.NNA,
	'V': C.BA,
	'W': C.BHA,
	'O': C.TA,
	'P': C.THA,
	'R': C.DHA,
	'S': C.NA,
	'T': C.PA,
	'X': C.MA,
	'Y': C.YA,
	'\\': C.VA,
	']': C.ZA,
	'^': C.SHA,
	'_': C.SA,
	'b': C.KA + C.VIRAMA + C.SHA,
	'c': C.JA + C.VIRAMA + C.NYA,
	'e': C.TA + C.VIRAMA + C.RA,
	'f': C.TA + C.VIRAMA + C.TA,
	'\uFB02': C.NA  + C.VIRAMA + C.NA,
	'\u00c4': C.NYA + C.VIRAMA + C.JA, // Mac: 128, Ä, U+00C4
	'\u00c5': C.NYA + C.VIRAMA + C.CA, // Mac: 129, Å, U+00C5
	'\u00c7': C.CA  + C.VIRAMA + C.CA, // Mac: 130, Ç, U+00C7
	'\u00c9': C.JA  + C.VIRAMA + C.JA, // Mac: 131, É, U+00C9
	'\u03C0': C.NGA + C.VIRAMA + C.KA + C.VIRAMA + C.SHA, // Mac: 185, π, U+03C0
	'\u0192': C.ZA  + C.VIRAMA + C.VA, // Mac: 196, ƒ, U+0192
	'\u2248': C.ZA  + C.VIRAMA + C.NA, // Mac: 197, ≈, U+2248
	'\u2206': C.ZA  + C.VIRAMA + C.CA, // Mac: 198, ∆, U+2206
	'\u00A0': C.PA  + C.VIRAMA + C.TA, // Mac: 202, NBSP, U+00A0
	'\u0153': C.HA  + C.VIRAMA + C.MA, // Mac: 207, œ, U+0153
	'\u2013': C.GA  + C.VIRAMA + C.NA, // Mac: 208, –, U+2013
	'\u2014': C.TA  + C.VIRAMA + C.NA, // Mac: 209, —, U+2014
	'\u201C': C.KA  + C.VIRAMA + C.TA, // Mac: 210, “, U+201C
	'\u201D': C.KA  + C.VIRAMA + C.NA, // Mac: 211, ”, U+201D
	'\u2018': C.KA  + C.VIRAMA + C.KA, // Mac: 212, ‘, U+2018
	'\u2019': C.KA  + C.VIRAMA + C.VA, // Mac: 213, ’, U+2019
	'\u00F7': C.SA  + C.VIRAMA + C.TA + C.VIRAMA + C.RA, // Mac: 214, ÷, U+00F7
	'\u25CA': C.KA,  // Mac: 215, ◊, U+25CA
	'\u00FF': C.CHA, // Mac: 216, ÿ, U+00FF
	'\u0178': C.PHA, // Mac: 217, Ÿ, U+0178
	'\u2044': C.LA,  // Mac: 218, ⁄, U+2044
	'\u00A4': C.LLA, // Mac: 219, €/¤, U+20AC/U+00A4
	'\u2039': C.ZA,  // Mac: 220, ‹, U+2039
	'\u203A': C.JA,  // Mac: 221, ›, U+203A
	'\uFB01': C.HA,  // Mac: 222, ﬁ, U+FB01
	'\uFB02': C.NA  + C.VIRAMA + C.NA, // Mac: 223, ﬂ, U+FB02
};

var COMPLETE_CONSONANT = {
	'@': C.KA,
	'D': C.NGA,
	'F': C.CHA,
	'J': C.TTA,
	'K': C.TTHA,
	'L': C.DDA,
	'M': C.DDHA,
	'Q': C.DA,
	'U': C.PHA,
	'Z': C.RA,
	'[': C.LA,
	'`': C.HA,
	'a': C.LLA,
	'd': C.ZA + C.VIRAMA + C.RA,
	'\u00D1': C.LA   + C.VIRAMA + C.LA,   // Mac: 132, Ñ, U+00D1
	'\u00D6': C.HA   + C.VIRAMA + C.NA,   // Mac: 133, Ö, U+00D6
	'\u00DC': C.HA   + C.VIRAMA + C.NNA,  // Mac: 134, Ü, U+00DC
	'\u00E1': C.HA   + C.VIRAMA + C.LA,   // Mac: 135, á, U+00E1
	'\u00e0': C.HA   + C.VIRAMA + C.VA,   // Mac: 136, à, U+00E0
	'\u00E2': C.DDA  + C.VIRAMA + C.DDHA, // Mac: 137, â, U+00E2
	'\u00E4': C.NGA  + C.VIRAMA + C.KA,   // Mac: 138, ä, U+00E4
	'\u00E3': C.NGA  + C.VIRAMA + C.KHA,  // Mac: 139, ã, U+00E3
	'\u00E5': C.NGA  + C.VIRAMA + C.GA,   // Mac: 140, å, U+00E5
	'\u00E7': C.NGA  + C.VIRAMA + C.GHA,  // Mac: 141, ç, U+00E7
	'\u00E9': C.NGA  + C.VIRAMA + C.MA,   // Mac: 142, é, U+00E9
	'\u00E8': C.NGA  + C.VIRAMA + C.KA  + C.VIRAMA + C.SHA, // Mac: 143, è, U+00E8
	'\u00EA': C.CHA  + C.VIRAMA + C.VA,   // Mac: 144, ê, U+00EA
	'\u00F2': C.KA   + C.VIRAMA + C.TA,   // Mac: 152, ò, U+00F2
	'\u00F4': C.TTA  + C.VIRAMA + C.TTA,  // Mac: 153, ô, U+00F4
	'\u00F6': C.TTHA + C.VIRAMA + C.TTHA, // Mac: 154, ö, U+00F6
	'\u00F5': C.DDA  + C.VIRAMA + C.DDA,  // Mac: 155, õ, U+00F5
	'\u00FA': C.DDHA + C.VIRAMA + C.DDHA, // Mac: 156, ú, U+00FA
	'\u00F9': C.DA   + C.VIRAMA + C.YA,   // Mac: 157, ù, U+00F9
	'\u00FB': C.DA   + C.VIRAMA + C.GA,   // Mac: 158, û, U+00FB
	'\u00FC': C.DA   + C.VIRAMA + C.VA,   // Mac: 159, ü, U+00FC
	'\u00AE': C.DA   + C.VIRAMA + C.BA,   // Mac: 168, ®, U+u00AE
	'\u00A9': C.DA   + C.VIRAMA + C.DA,   // Mac: 169, ©, U+00A9
	'\u2122': C.DA   + C._RI, // Mac: 170, ™, U+2122
	'\u00B4': C.DA   + C.VIRAMA + C.DHA,  // Mac: 171, ´, U+00B4
	'\u00A8': C.DA   + C.VIRAMA + C.BHA,  // Mac: 172, ¨, U+00A8
	'\u2260': C.DA   + C.VIRAMA + C.MA,   // Mac: 173, ≠, U+2260
	'\u00C6': C.SA   + C.VIRAMA + C.TA  + C.VIRAMA + C.RA,  // Mac: 174, Æ, U+00C6
	'\u00d8': C.DA   + C.VIRAMA + C.GHA,  // Mac: 175, Ø, U+00D8
	'\u221E': C.DA   + C.VIRAMA + C.BA  + C.VIRAMA + C.RA,  // Mac: 176, ∞, U+221E
	'\u00B1': C.KA   + C.VIRAMA + C.LA,   // Mac: 177, ±, U+00B1
	'\u2264': C.NGA  + C.VIRAMA + C.KA  + C.VIRAMA + C.RA,  // Mac: 178, ≤, U+2264
	'\u2265': C.NGA  + C.VIRAMA + C.GA  + C.VIRAMA + C.RA,  // Mac: 179, ≥, U+2265
	'\u00A5': C.NGA  + C.VIRAMA + C.GHA + C.VIRAMA + C.RA,  // Mac: 180, ¥, U+00A5
	'\u00B5': C.NGA  + C.VIRAMA + C.KA  + C.VIRAMA + C.TA,  // Mac: 181, µ, U+00B5
	'\u2202': C.DA   + C.VIRAMA + C.GA  + C.VIRAMA + C.RA,  // Mac: 182, ∂, U+2202
	'\u2211': C.DA   + C.VIRAMA + C.GHA + C.VIRAMA + C.RA,  // Mac: 183, ∑, U+2211
	'\u220F': C.NGA  + C.VIRAMA + C.KHA + C.VIRAMA + C.RA,  // Mac: 184, ∏, U+220F
	'\u222B': C.NGA  + C.VIRAMA + C.KA  + C.VIRAMA + C.SHA + C.VIRAMA + C.VA, // Mac: 186, ∫, U+222B
	'\u00AA': C.DA   + C.VIRAMA + C.RA  + C.VIRAMA + C.YA,  // Mac: 187, ª, U+00AA
	'\u00BA': C.DA   + C.VIRAMA + C.VA  + C.VIRAMA + C.YA,  // Mac: 188, º, U+00BA
	'\u03A9': C.HA   + C.VIRAMA + C.LLA,  // Mac: 189, Ω, U+03A9
	'\u00E6': C.SA   + C.VIRAMA + C.RA,   // Mac: 190, æ, U+00E6
	'\u00F8': C.DA   + C.VIRAMA + C.DA  + C.VIRAMA + C.VA,  // Mac: 191, ø, U+00F8
	'\u00BF': C.DA   + C.VIRAMA + C.DA  + C.VIRAMA + C.RA,  // Mac: 192, ¿, U+00BF
	'\u00A1': C.DA   + C.VIRAMA + C.DA  + C.VIRAMA + C.DHA, // Mac: 193, ¡, U+00A1
	'\u00AC': C.DA   + C.VIRAMA + C.BHA + C.VIRAMA + C.YA,  // Mac: 194, ¬, U+00AC
	'\u221A': C.SA   + C.VIRAMA + C.NA,   // Mac: 195, √, U+221A
	'\u00AB': C.ZA   + C.VIRAMA + C.LA,   // Mac: 199, «, U+00AB
	'\u00BB': C.KA   + C.VIRAMA + C.KA,   // Mac: 200, », U+00BB
	'\u2026': C.KA   + C.VIRAMA + C.VA,   // Mac: 201, …, U+2026
	'\u00C0': C.TTA  + C.VIRAMA + C.TTHA, // Mac: 203, À, U+00C0
	'\u00C3': C.TTA  + C.VIRAMA + C.VA,   // Mac: 204, Ã, U+00C3
	'\u00d5': C.SHA  + C.VIRAMA + C.TTA,  // Mac: 205, Õ, U+00D5
	'\u0152': C.SHA  + C.VIRAMA + C.TTHA, // Mac: 206, Œ, U+0152
	'\u2021': C.RA   + C._U,  // Mac: 224, ‡, U+2021
	'\u00B7': C.RA   + C._U_DIRGHA, // Mac: 225, ·, U+00B7
	'\u201A': C.HA   + C._RI, // Mac: 226, ‚, U+201A
	'\u201E': C.HA   + C.VIRAMA + C.RA,   // Mac: 227, „, U+201E
	'\u2030': C.PA   + C.VIRAMA + C.LA,   // Mac: 228, ‰, U+2030
	'\u00C2': C.HA   + C.VIRAMA + C.YA,   // Mac: 229, Â, U+00C2
	'\u00CA': C.DA   + C.VIRAMA + C.NA,   // Mac: 230, Ê, U+00CA
	'\u00C1': C.DA   + C.VIRAMA + C.RA,   // Mac: 231, Á, U+00C1
	'\u00CB': C.TTA  + C.VIRAMA + C.YA,   // Mac: 232, Ë, U+00CB
	'\u00C8': C.TTHA + C.VIRAMA + C.YA,   // Mac: 233, È, U+00C8
	'\u00CD': C.DDA  + C.VIRAMA + C.YA,   // Mac: 234, Í, U+00CD
	'\u00CE': C.DDHA + C.VIRAMA + C.YA,   // Mac: 235, Î, U+00CE
	'\u00DB': C.ZA,    // Mac: 243, Û, U+00DB
	'\u00D9': C.DA   + C.VIRAMA + C.BHA + C.VIRAMA + C.RA,  // Mac: 244, Ù, U+00D9
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
	'\u00CF': C.A,  // Mac: 236, Ï, U+00CF
	'\u00CC': C.U,  // Mac: 237, Ì, U+00CC
	'\u00D3': C.UU, // Mac: 238, Ó, U+00D3
	'\u00D4': C.E,  // Mac: 239, Ô, U+00D4
	'\u00DA': C.I,  // Mac: 242, Ú, U+00DA
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
	'#': C.VISARGA,
	' ': ' ',
	'\t': '\t',
	'\n': '\n',
	'z': C.ANUSVARA,
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
				if (INCOMPLETE_CONSONANT.hasOwnProperty(text[i])) {
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
					} else {
						break stringloop;
					}
				} else if (COMPLETE_SVARA.hasOwnProperty(text[i])) {
					if (state === STATE.INIT) {
						var char = COMPLETE_SVARA[text[i]];
						consumed += text[i];
						if (char === C.A && peek(text, i+1, 'pu')) {
							char = C.O;
							consumed += text.substring(i+1, i+3);
							i+=2;
						} else if (char === C.A && peek(text, i+1, 'pv')) {
							char = C.AU;
							consumed += text.substring(i+1, i+3);
							i+=2;
						} else if (char === C.A && peek(text, i+1, 'p')) {
							char = C.AA;
							consumed += text[i+1];
							i++;
						} else if (char === C.E && peek(text, i+1, 'u')) {
							char = C.AI;
							consumed += text[i+1];
							i++;
						} else if (char === C.I && peek(text, i+1, '{')) {
							char = C.II;
							consumed += text[i+1];
							i++;
						} else if (char === C.I && peek(text, i+1, '|')) {
							char = C.II + C.ANUSVARA;
							consumed += text[i+1];
							i++;
						}
						out += char;
						state = STATE.COMPLETE_SVARA;
					} else {
						break stringloop;
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
					case '\u00b0': // Mac: 161, °, U+00B0 small space (used after ka)
					case '>': // small space (used after dda)
						consumed += text[i];
						break;
					case '}': // combining ra (used after ka)
						if (state === STATE.COMPLETE_SYLLABLE || state === STATE.CONSONANT_WITHOUT_BAR) {
							consumed += text[i];
							// out = out.substring(0, out.length-1) + C.RA + C.VIRAMA + out.substring(out.length-1);
							out += C.VIRAMA + C.RA;
							break;
						}
						break stringloop
					case '~': // combining -ra (rakara, like a caret under the char)
						if (state === STATE.COMPLETE_SYLLABLE) {
							consumed += text[i];
							out += C.VIRAMA + C.RA;
							break;
						}
						break stringloop
					case '\u0131': // Mac: 245, ı, U+0131 combining -ra (unclear when it is actually used, but looks OK when inserted before the bar)
						if (state === STATE.CONSONANT_WITHOUT_BAR) {
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
					case '\u02C6': // Mac: 246, ˆ, U+02C6 second combining -na (used before bars?)
						if (state === STATE.CONSONANT_WITHOUT_BAR) {
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
							out = C.RA + C.VIRAMA + out;
							if (got_tail_i) {
								out += C._I;
								got_tail_i = false;
							}
							out += C.ANUSVARA;
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

			if (got_tail_i) {
				out += C._I;
			}
			// Mark an error if:
			// 1) the consonant was never finished with vertical bar
			if (state === STATE.CONSONANT_WITHOUT_BAR) {
				out += C.VIRAMA;
			}


			return {'consumed': consumed, 'out': out};
		}

		// fix wrongly disassembled ligature
		text = text.replace(/fl/g, '\uFB02');

		// fix some of the lost 0xCA/NBSP chars which was errorneously replaced by space
		text = text.replace(/ {1,3}"/g, '\u00a0"');

		// fix double '-a'-s
		text = text.replace(/pp/g, 'p');

		// allow 'ga' with p instead of " to complete the consonant
		text = text.replace(/Bp/g, 'B"');

		// allow duplicated '-u'
		text = text.replace(/[sl]{2,}/g, 's');

		// allow duplicated 'e' (dash above the line)
		text = text.replace(/u{2,}/g, 'u');

		// allow duplicated '-o' before '-au' (dash above the line before two dashes)
		text = text.replace(/u+v/g, 'v');

		// move anusvara after combining svaras
		text = text.replace(/z([stlmr])/g, '$1z');

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

	'elementToUnicode': function (element, duplicate=false) {
		function needsRecoding(element) {
			var class_list = element.parentElement.classList;
			var roman_classes = ['s9', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19', 's22', 's23', 's25', 's26', 's32'];
			var kannada_classes = ['s28', 's33'];
			for (var i=0; i<roman_classes.length; i++) {
				if (class_list.contains(roman_classes[i]))
					return false;
			}
			for (var i=0; i<kannada_classes.length; i++) {
				if (class_list.contains(kannada_classes[i]))
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
			var newContent = $slc.stringToUnicode2(element.textContent);
			if (duplicate) {
				element.textContent += newContent;
			} else {
				element.textContent = newContent;
			}
		}
		for (var i=0; i<element.childNodes.length; i++) {
			$slc.elementToUnicode(element.childNodes[i], duplicate);
		}
	},
};

})();