export function toggleNavbar() {
    if (this.props.settings.show_navbar) {
      document.getElementById("navbar").style.display = "none";
    } else {
      document.getElementById("navbar").style.display = "flex";
    }

    this.props.dispatch({type: "SWITCH_NAVBAR", payload: !this.props.settings.show_navbar})
  }

  export function toggleArabic() {
    if (this.props.settings.show_arabic_font) {
      document.getElementById("verse_arabic_ayah").style.display = "none"
    } else {
      document.getElementById("verse_arabic_ayah").style.display = "block"
    }

    this.props.dispatch({type: "TOGGLE_ARABIC", payload: !this.props.settings.show_arabic_font})
  }

  export function toggleEnglish() {
    if (this.props.settings.show_english_font) {
      document.getElementById("verse_english_ayah").style.display = "none"
    } else {
      document.getElementById("verse_english_ayah").style.display = "block"
    }

    this.props.dispatch({type: "TOGGLE_ENGLISH", payload: !this.props.settings.show_english_font})
  }

  export function focusSearch() {
    console.log('FOCUS SEARCH')
  }

  export function increaseArabicFont() {
    document.getElementById("verse_arabic_ayah").style.fontSize = (this.props.settings.arabic_font_size + 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ARABIC_SIZE", payload: this.props.settings.arabic_font_size + 2})
  }

  export function decreaseArabicFont() {
    document.getElementById("verse_arabic_ayah").style.fontSize = (this.props.settings.arabic_font_size - 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ARABIC_SIZE", payload: this.props.settings.arabic_font_size - 2})
  }

  export function increaseEnglishFont() {
    document.getElementById("verse_english_ayah").style.fontSize = (this.props.settings.english_font_size + 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ENGLISH_SIZE", payload: this.props.settings.english_font_size + 2})
  }

  export function decreaseEnglishFont() {
    document.getElementById("verse_english_ayah").style.fontSize = (this.props.settings.english_font_size - 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ENGLISH_SIZE", payload: this.props.settings.english_font_size - 2})
  }