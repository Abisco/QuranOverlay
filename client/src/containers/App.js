import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import QuranView from "../components/QuranView";
import Navbar from "../components/Navbar";

import { grabVerse, currentSearch } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";

class App extends Component {
  constructor(props) {
    super(props);

    this.checkKeyStrokes = this.checkKeyStrokes.bind(this);
    this.setDefaultSettings = this.setDefaultSettings.bind(this);
    this.hideSettings = this.hideSettings.bind(this);

    this.state = {
      hide_menu: false
    };
  }

  componentDidMount() {
    this.checkKeyStrokes()
    this.setDefaultSettings();
  }

  checkKeyStrokes() {
    var type = "SURAH"
    var current_verse = ""
    var current_surah = ""
    var self = this;
    var search_verse_input = document.getElementById('search_verse_input').activeElement

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
        } else if (event.keyCode === 58 || event.keyCode === 186 || event.keyCode === 16) {
          //Colon, switch from surah to verse
          type = "VERSE"
        } else if (event.keyCode === 191) {
          //Pressed ? key, hide or show the navbar
          if (self.props.settings.show_navbar) {
            document.getElementById("navbar").style.display = "none";
          } else {
            document.getElementById("navbar").style.display = "flex";
          }
          
          self.props.dispatch({type: "SWITCH_NAVBAR", payload: !self.props.settings.show_navbar})
        } else if (event.keyCode === 32 || event.keyCode === 39) {
          //Space bar or Right arrow
          if (current_verse === "" || current_surah === "") {
            current_verse = self.props.quran_verses.verses[0].verse_id
            current_surah = self.props.quran_verses.verses[0].surah_id
          }
  
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
        } else if (event.keyCode === 37) {
          // Left arrow
          if (current_verse === "" || current_surah === "") {
            current_verse = self.props.quran_verses.verses[0].verse_id
            current_surah = self.props.quran_verses.verses[0].surah_id
          }
  
          if (parseInt(current_verse) !== 1 || parseInt(current_surah) !== 1) {
            if ((parseInt(current_verse) === 0 && parseInt(current_surah) !== 1) || (parseInt(current_verse) === 1 && parseInt(current_surah) === 9)) {
              current_surah = (parseInt(current_surah) - 1).toString();
              current_verse = self.props.quran_verses.quran_dictionary[current_surah]
            } else if (parseInt(current_verse) !== 0) {
              current_verse = (parseInt(current_verse) - 1).toString();
            }
  
            self.props.dispatch(grabVerse(current_surah, current_verse));
          }
          
        } else if (event.keyCode === 8) {
          // Backspace
          type = "SURAH"
          current_verse = ""
          current_surah = ""
        } else if (type === "VERSE") {
          current_verse += String.fromCharCode(event.keyCode)
          self.props.dispatch(currentSearch(current_surah, current_verse))
        } else if (type === "SURAH") {
          current_surah += String.fromCharCode(event.keyCode)
          self.props.dispatch(currentSearch(current_surah, current_verse))
        }
      }
    })
  }

  hideSettings() {
    this.props.dispatch({type: "TOGGLE_SETTINGS", payload: false})
  }

  setDefaultSettings() {
    document.getElementById("verse_container").style.backgroundColor = this.props.settings.background;
    document.getElementById("verse_container").style.height = this.props.settings.height;
    document.getElementById("verse_arabic_ayah").style.fontSize = this.props.settings.arabic_font;
    document.getElementById("verse_arabic_ayah").style.color = this.props.settings.arabic_color;
    document.getElementById("verse_english_ayah").style.fontSize = this.props.settings.english_font;
    document.getElementById("verse_english_ayah").style.color = this.props.settings.english_color;
    document.getElementById("verse_arabic_name").style.color = this.props.settings.english_name_colour
    document.getElementById("verse_english_name").style.color = this.props.settings.arabic_name_colour
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div id="quran_view_container" className="quran_view_container" onClick={this.hideSettings}>
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