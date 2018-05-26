export default function settingsReducer(state = {
    show_navbar: true,
    show_settings: false,
    height: "30vh",
    background: "#000",
    arabic_font: "40px",
    show_arabic_font: true,
    arabic_color: "#fff",
    english_font: "34px",
    show_english_font: true,
    english_color: "#fff",
    show_english_name: true,
    english_name_colour: "#fff",
    show_arabic_name: true,
    arabic_name_colour: "#fff",
    background_image: "",
    search_input_focused: false    
}, action) {
  switch(action.type) {
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

    case "CHANGE_ARABIC_SIZE" :{
        return state = {
            ...state,
            arabic_font: action.payload
        }
    }

    case "CHANGE_ENGLISH_SIZE" :{
        english_font: action.payload
    }

    case "CHANGE_ARABIC_COLOR" :{
        arabic_color: action.payload
    }

    case "CHANGE_ARABIC_NAME_COLOUR" :{
        english_color: action.payload
    }

    case "CHANGE_ENGLISH_NAME_COLOUR" :{
        return state 
    }

    case "CHANGE_BACKGROUND_IMAGE":{
        background_image: action.payload
    }

    default: {

    }
  }
  return state;
}