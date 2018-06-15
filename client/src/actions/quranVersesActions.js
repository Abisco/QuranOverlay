import axios from 'axios';

export function grabVerse(surah_number, verse_number) {
    return function(dispatch) {
        axios.get('/api/quran_verses?surah_number=' + surah_number + '&verse_number=' + verse_number)
        .then(function(response) {
            dispatch({type: "SET_VERSES", payload: response.data.verse})
        })
    }
}

export function grabDua(dua_name, line_number) {
    return function(dispatch) {
        axios.get('/api/duas?dua_name=' + dua_name + '&dua_line=' + line_number)
        .then(function(response) {
            dispatch({type: "SET_DUA", payload: response.data.line})
        })
    }
}

export function currentSearch(surah, verse) {
    return function(dispatch) {
        dispatch({type: "CURRENT_SEARCH", payload: {
            surah: surah,
            verse: verse
        }})
    }
}

export function searchForVerse(text) {
    return function(dispatch) {

    }
}