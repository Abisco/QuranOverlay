import axios from 'axios';

export function grabVerse(surah_number, verse_number) {
    return function(dispatch) {
        axios.get('/api/quran_verses?surah_number=' + surah_number + '&verse_number=' + verse_number)
        .then(function(response) {
            dispatch({type: "SET_VERSES", payload: response.data.verse})
        })
    }
}

export function searchForVerse(text) {
    return function(dispatch) {

    }
}