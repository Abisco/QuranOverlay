export function addToPlaylist(verse, previous_playlist) {
    return function(dispatch) {
        previous_playlist.push(verse)
        dispatch({type: "CHANGE_PLAYLIST", payload: previous_playlist});
    }
}

export function clearPlaylist() {
    return function(dispatch) {
        dispatch({type: "CHANGE_PLAYLIST", payload: []});
    }
}

export function removeFromPlaylist(index, previous_playlist) {
    return function(dispatch) {
        //Pop from index
        previous_playlist.splice(index, 1); 
        dispatch({type: "CHANGE_PLAYLIST", payload: previous_playlist});
    }
}