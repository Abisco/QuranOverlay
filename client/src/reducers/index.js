import { combineReducers } from "redux"

import quranVerses from "./quranVersesReducer";
import settings from "./settingsReducer";
import playlist from "./playlistReducer";

export default combineReducers({
    quranVerses,
    settings,
    playlist
})