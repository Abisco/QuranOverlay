import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import QuranView from "../components/QuranView";
import Navbar from "../components/Navbar";

import { grabVerse, currentSearch, grabDua } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";
import UpperSixth from '../components/UpperSixth';

var Mousetrap = window.Mousetrap

class App extends Component {
  constructor(props) {
    super(props);

    this.checkKeyStrokes = this.checkKeyStrokes.bind(this);
    this.setDefaultSettings = this.setDefaultSettings.bind(this);

    //Keybinding helpers
    this._toggleNavbar = this._toggleNavbar.bind(this);
    this._toggleArabic = this._toggleArabic.bind(this);
    this._toggleEnglish = this._toggleEnglish.bind(this);
    this._toggleSurahName = this._toggleSurahName.bind(this);
    this._focusSearch = this._focusSearch.bind(this);
    this._increaseArabicFont = this._increaseArabicFont.bind(this);
    this._decreaseArabicFont = this._decreaseArabicFont.bind(this);
    this._increaseEnglishFont = this._increaseEnglishFont.bind(this);
    this._decreaseEnglishFont = this._decreaseEnglishFont.bind(this);

    this.state = {
    };
  }

  componentDidMount() {
    //Setup hotkeys for quick nav and settings
    Mousetrap.bind('?', this._toggleNavbar);
    Mousetrap.bind('shift+q', this._toggleArabic);
    Mousetrap.bind('shift+e', this._toggleEnglish);
    Mousetrap.bind('shift+i', this._toggleSurahName);
    Mousetrap.bind('shift+s', this._focusSearch)
    Mousetrap.bind('alt+q', this._increaseArabicFont);
    Mousetrap.bind('alt+w', this._decreaseArabicFont);
    Mousetrap.bind('alt+e', this._increaseEnglishFont);
    Mousetrap.bind('alt+r', this._decreaseEnglishFont);

    this.checkKeyStrokes()
    this.setDefaultSettings();
  }

  _toggleNavbar() {
    if (this.props.settings.show_navbar) {
      document.getElementById("navbar").style.display = "none";
    } else {
      document.getElementById("navbar").style.display = "flex";
    }

    this.props.dispatch({type: "SWITCH_NAVBAR", payload: !this.props.settings.show_navbar})
  }

  _toggleArabic() {
    if (this.props.settings.show_arabic_font) {
      document.getElementById("verse_arabic_ayah").style.display = "none"
    } else {
      document.getElementById("verse_arabic_ayah").style.display = "block"
    }

    this.props.dispatch({type: "TOGGLE_ARABIC", payload: !this.props.settings.show_arabic_font})
  }

  _toggleEnglish() {
    if (this.props.settings.show_english_font) {
      document.getElementById("verse_english_ayah").style.display = "none"
    } else {
      document.getElementById("verse_english_ayah").style.display = "block"
    }

    this.props.dispatch({type: "TOGGLE_ENGLISH", payload: !this.props.settings.show_english_font})
  }

  _toggleSurahName() {
    if (this.props.settings.show_arabic_name || this.props.settings.show_english_name) {
      
    } else {

    }
  } 

  _focusSearch() {
    console.log('FOCUS SEARCH')
  }

  _increaseArabicFont() {
    document.getElementById("verse_arabic_ayah").style.fontSize = (this.props.settings.arabic_font_size + 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ARABIC_SIZE", payload: this.props.settings.arabic_font_size + 2})
  }

  _decreaseArabicFont() {
    document.getElementById("verse_arabic_ayah").style.fontSize = (this.props.settings.arabic_font_size - 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ARABIC_SIZE", payload: this.props.settings.arabic_font_size - 2})
  }

  _increaseEnglishFont() {
    document.getElementById("verse_english_ayah").style.fontSize = (this.props.settings.english_font_size + 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ENGLISH_SIZE", payload: this.props.settings.english_font_size + 2})
  }

  _decreaseEnglishFont() {
    document.getElementById("verse_english_ayah").style.fontSize = (this.props.settings.english_font_size - 2).toString() + "px";
    this.props.dispatch({type: "CHANGE_ENGLISH_SIZE", payload: this.props.settings.english_font_size - 2})
  }

  checkKeyStrokes() {
    var type = "SURAH"
    var current_verse = ""
    var current_surah = ""
    var self = this;

    document.addEventListener("keydown", function(event) {
      if (! self.props.settings.search_input_focused) {
        if (event.keyCode === 13) {
          //Enter
          if (current_surah in self.props.quran_verses.quran_dictionary && current_verse <= self.props.quran_verses.quran_dictionary[current_surah]) {
            self.props.dispatch(grabVerse(current_surah, current_verse));
            type = "SURAH"
            current_verse = ""
            current_surah = ""
          } else {
            type = "SURAH"
            current_verse = ""
            current_surah = ""
          }
          self.props.dispatch(currentSearch(current_surah, current_verse))
        } else if (event.keyCode === 58 || event.keyCode === 186 || event.keyCode === 16 || event.keyCode === 188 || event.keyCode === 190) {
          //Colon, switch from surah to verse
          type = "VERSE"
        } else if ((event.keyCode === 32 || event.keyCode == 34 || event.keyCode === 39)) {
          //Space bar or Right arrow
          if (self.props.quran_verses.type === "Quran") {
            var index;

            if (self.props.quran_verses.verses.length === 3 || self.props.quran_verses.verses[0].verse_id > 1) {
              index = 1;
            } else if (self.props.quran_verses.verses[0].verse_id === 0 || self.props.quran_verses.verses[0].verse_id === 1) {
              index = 0
            }

            current_verse = self.props.quran_verses.verses[index].verse_id
            current_surah = self.props.quran_verses.verses[index].surah_id
    
            if (parseInt(current_verse) !== self.props.quran_verses.quran_dictionary[114] || parseInt(current_surah) !== 114) {
              if (parseInt(current_verse) + 1 > self.props.quran_verses.quran_dictionary[current_surah]) {
                current_surah = (parseInt(current_surah) + 1).toString();
                if (current_surah !== 9 || current_surah !== 1) {
                  current_verse = 0
                } else {
                  current_verse = 1
                }
              } else {
                current_verse = (parseInt(current_verse) + 1).toString();
              }
              
              self.props.dispatch(grabVerse(current_surah, current_verse));
            }
          } else if (self.props.quran_verses.type === "Dua" && self.props.quran_verses.dua_line.line_id + 1 !== self.props.quran_verses.num_lines_dua) {
            self.props.dispatch(grabDua(self.props.quran_verses.dua_line.dua_name_arabic,  self.props.quran_verses.dua_line.line_id + 1))
          }

        } else if (event.keyCode === 37  || event.keyCode == 33) {
          // Left arrow
          if (self.props.quran_verses.type === "Quran") {
            var index;

            if (self.props.quran_verses.verses.length === 3 || self.props.quran_verses.verses[0].verse_id > 1) {
              index = 1;
            } else if (self.props.quran_verses.verses[0].verse_id === 0 || self.props.quran_verses.verses[0].verse_id === 1) {
              index = 0
            }

            current_verse = self.props.quran_verses.verses[index].verse_id
            current_surah = self.props.quran_verses.verses[index].surah_id
    
            if (parseInt(current_verse) !== 1 || parseInt(current_surah) !== 1) {
              if ((parseInt(current_verse) === 0 && parseInt(current_surah) !== 1) || (parseInt(current_verse) === 1 && parseInt(current_surah) === 9)) {
                current_surah = (parseInt(current_surah) - 1).toString();
                current_verse = self.props.quran_verses.quran_dictionary[current_surah]
              } else if (parseInt(current_verse) !== 0) {
                current_verse = (parseInt(current_verse) - 1).toString();
              }
    
              self.props.dispatch(grabVerse(current_surah, current_verse));
            }
          } else if (self.props.quran_verses.type === "Dua" && self.props.quran_verses.dua_line.line_id !== 0) {
            self.props.dispatch(grabDua(self.props.quran_verses.dua_line.dua_name_arabic,  self.props.quran_verses.dua_line.line_id - 1))
          }

        } else if (event.keyCode === 8 ) {
          // Backspace
          type = "SURAH"
          current_verse = ""
          current_surah = ""
          self.props.dispatch(currentSearch(current_surah, current_verse))
        } else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
          if (self.props.quran_verses.verses[0].verse_id.toString() === current_verse && self.props.quran_verses.verses[0].surah_id.toString() === current_surah) {
            current_verse = ""
            current_surah = ""
          }

          if (type === "VERSE") {
            current_verse += String.fromCharCode(event.keyCode)
            self.props.dispatch(currentSearch(current_surah, current_verse))
          } else if (type === "SURAH") {
            current_surah += String.fromCharCode(event.keyCode)
            self.props.dispatch(currentSearch(current_surah, current_verse))
          }
        } 
      }
    })
  }

  setDefaultSettings() {
    document.getElementById("verse_container").style.backgroundColor = this.props.settings.background;
    document.getElementById("verse_container").style.height = this.props.settings.height;
    document.getElementById("verse_arabic_ayah").style.fontSize = this.props.settings.arabic_font_size.toString() + "px";
    document.getElementById("verse_arabic_ayah").style.color = this.props.settings.arabic_colour;
    document.getElementById("verse_english_ayah").style.fontSize = this.props.settings.english_font_size.toString() + "px";
    document.getElementById("verse_english_ayah").style.color = this.props.settings.english_colour;
    document.getElementById("verse_info").style.color = this.props.settings.quran_info_colour;
    document.getElementById("verse_info").style.fontSize = this.props.settings.quran_info_size.toString() + "px";
    //document.getElementById("verse_arabic_name").style.color = this.props.settings.english_name_colour
    //document.getElementById("verse_english_name").style.color = this.props.settings.arabic_name_colour
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <UpperSixth />
        <div id="quran_view_container" className="quran_view_container">
          <QuranView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  quran_verses: store.quranVerses,
  settings: store.settings
});

export default connect(mapStateToProps)(App);