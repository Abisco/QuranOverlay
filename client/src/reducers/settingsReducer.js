export default function settingsReducer(state = {
    search_input_focused: false,
    show_navbar: true,
    show_settings: false,
    height: "33vh",
    background: "#000",
    background_image: "",
    show_arabic_font: true,
    arabic_font_size: 50,
    arabic_colour: "#fff",
    show_english_font: true,
    english_font_size: 34,
    english_colour: "#fff",
    show_english_name: true,
    english_name_colour: "#fff",
    english_name_size: 14,
    show_arabic_name: true,
    arabic_name_colour: "#fff",
    arabic_name_size: 14
      
}, action) {
  switch(action.type) {
    //Toggles
    case "SEARCH_INPUT_FOCUSED" :{
        return state = {
            ...state,
            search_input_focused: action.payload
        }
    }

    case "SWITCH_NAVBAR" :{
        return state = {
            ...state,
            show_navbar: action.payload
        }
    }

    case "TOGGLE_SETTINGS" :{
        return state = {
            ...state,
            show_settings: action.payload
        }
    }

    //Layout
    case "CHANGE_HEIGHT" :{
        return state = {
            ...state,
            height: action.payload
        }
    }

    case "CHANGE_BACKGROUND" :{
        return state = {
            ...state,
            background: action.payload
        }
    }

    case "CHANGE_BACKGROUND_IMAGE":{
        return state = {
            ...state,
            background_image: action.payload
        }
    }

    //Arabic
    case "TOGGLE_ARABIC" :{
        return state = {
            ...state,
            show_arabic_font: action.payload
        }
    }

    case "CHANGE_ARABIC_SIZE" :{
        return state = {
            ...state,
            arabic_font_size: action.payload
        }
    }

    case "CHANGE_ARABIC_colour" :{
        return state = {
            ...state,
        }
        arabic_colour: action.payload
    }

    //English
    case "TOGGLE_ENGLISH" :{
        return state = {
            ...state,
            show_english_font: action.payload
        }
    }

    case "CHANGE_ENGLISH_SIZE" :{
        return state = {
            ...state,
            english_font_size: action.payload
        }
    }

    case "CHANGE_ENGLISH_NAME_COLOUR" :{
        return state = {
            ...state,
            english_name_colour: action.payload
        }
    }

    //Arabic Surah Name
    case "TOGGLE_ARABIC_NAME" :{
        return state = {
            ...state,
            show_arabic_name: action.payload
        }
    }

    case "CHANGE_ARABIC_NAME_COLOUR" :{
        return state = {
            ...state,
            arabic_name_colour: action.payload
        }
    }

    //English Surah Name
    case "TOGGLE_ENGLISH_NAME" :{
        return state = {
            ...state,
            show_english_name: action.payload
        }
    }

    case "CHANGE_ENGLISH_NAME_COLOUR" :{
        return state = {
            ...state,
            english_name_colour: action.payload
        }
    }


    default: {

    }
  }
  return state;
}