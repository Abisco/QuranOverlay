export default function quranVersesReducer(state = {
    verses: [{"id":50113,"created_at":"2018-05-26T19:34:27.254Z","updated_at":"2018-05-26T19:34:27.254Z","surah_id":1,"verse_id":1,"arabic_ayah":"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","shakir_ayah":"In the name of Allah, the Beneficent, the Merciful.","surah_name_arabic":"سورة الفاتحة","surah_name_latin":"Al-Fatiha","surah_name_english":"The Opening"},{"id":50114,"created_at":"2018-05-26T19:34:27.260Z","updated_at":"2018-05-26T19:34:27.260Z","surah_id":1,"verse_id":2,"arabic_ayah":"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","shakir_ayah":"All praise is due to Allah, the Lord of the Worlds.","surah_name_arabic":"سورة الفاتحة","surah_name_latin":"Al-Fatiha","surah_name_english":"The Opening"}],
    quran_dictionary: {1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109, 11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11, 101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3, 111: 5, 112: 4, 113: 5, 114: 6},
    hadith: {"book": "Mizan Al-Hikmah", "number":"804", "part":"<span class=\"highlight\">COURAGE</span> الشَّجاعَة", "section":"<span class=\"highlight\">Courage</span>", "tags":[], "arabic" :"الإمامُ الحسنُ (عَلَيهِ الّسَلامُ) ـ وقد سُئلَ عنِ‏الشَّجاعةِ ـ: مُواقَفَةُ الأقرانِ ، والصَّبرُ عِندَ الطِّعانِ.", "english": "Imam al-Hasan (AS) was once asked about <span class=\"highlight\">courage</span>, to which he replied, 'It is to know when to stand up to one's opponents, and when to be patient in the face of criticism.", "source":"Tuhaf al-Uqoul, number:226","gradings":[],"related":[],"publisher":"ICAS Press","history":["This hadith was first loaded on Fri Jun 01 04:58:14 UTC 2018"],"_id":"AV8-AkBqiLJ1Hru3mlNf"},
    dua_line: {},
    num_lines_dua: 0,
    surah_options: [],
    verse_search: null,
    surah_search: null,
    type: "Quran"
}, action) {
  switch(action.type) {
    case "SET_VERSES" :{
        document.getElementById("verse_arabic_ayah").style.fontFamily = null;
        return state = {
            ...state,
            verses: action.payload,
            type: "Quran",
            verse_search: null,
            surah_search: null
        };
    }

    case "SET_HADITH" :{
        return state = {
            ...state,
            type: "Hadith",
            hadith: action.payload
        }
    }

    case "SET_DUA" :{
        return state = {
            ...state,
            type: "Dua",
            dua_line: action.payload.dua_line,
            num_lines_dua: action.payload.num_lines_dua
        }
    }

    case "CURRENT_SEARCH" :{
        return state = {
            ...state,
            verse_search: action.payload.verse,
            surah_search: action.payload.surah
        }
    }

    case "CHANGE_TYPE" :{
        if (action.payload === "Quran") {
            document.getElementById("verse_arabic_ayah").style.fontFamily = null;
        } else if (action.payload === "Hadith") {
            document.getElementById("verse_arabic_ayah").style.fontFamily = "Scheherazade, serif";
        }
        return state = {
            ...state,
            type: action.payload
        }
    }

    case "SET_SURAH_OPTIONS" :{
        return state = {
            ...state,
            surah_options: action.payload
        }
    }

    default: {

    }
  }
  return state;
}