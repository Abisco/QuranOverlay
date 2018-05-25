import { combineReducers } from "redux"

import quranVerses from "./quranVersesReducer";
import settings from "./settingsReducer";

export default combineReducers({
    quranVerses,
    settings
})