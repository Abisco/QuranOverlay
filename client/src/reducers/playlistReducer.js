export default function playlistReducer(state = {
    playlist: []
}, action) {
  switch(action.type) {
    //Toggles
    case "CHANGE_PLAYLIST" :{
        return state = {
            ...state,
            playlist: action.payload
        }
    }

    default: {

    }
  }
  return state;
}