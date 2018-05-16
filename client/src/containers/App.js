import React, { Component } from 'react';
import { connect } from "react-redux";

import { grabVerse } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";

import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verse: {
        arabic_ayah: "",
        shakir_ayah: ""
      }
    };
  }

  componentDidMount() {
    var type = "SURAH"
    var current_verse = ""
    var current_surah = ""
    var self = this;

    document.addEventListener("keydown", function(event) {
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
      } else if (event.keyCode === 58 || event.keyCode === 186 || event.keyCode === 16) {
        //Colon, switch from surah to verse
        type = "VERSE"
      } else if (event.keyCode === 32 || event.keyCode === 39) {
        //Space bar or Right arrow
        if (current_verse === "" || current_surah === "") {
          current_verse = self.props.quran_verses.verses[0].verse_id
          current_surah = self.props.quran_verses.verses[0].surah_id
        }

        if (parseInt(current_verse) !== self.props.quran_verses.quran_dictionary[114] || parseInt(current_surah) !== 114) {
          if (parseInt(current_verse) + 1 > self.props.quran_verses.quran_dictionary[current_surah]) {
            current_surah = (parseInt(current_surah) + 1).toString();
            current_verse = 1
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
          if (parseInt(current_verse) === 1 && parseInt(current_surah) !== 1) {
            current_surah = (parseInt(current_surah) - 1).toString();
            current_verse = self.props.quran_verses.quran_dictionary[current_surah]
          } else if (parseInt(current_verse) !== 1) {
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
      } else if (type === "SURAH") {
        current_surah += String.fromCharCode(event.keyCode)
      }
    })
  
    this.props.dispatch(grabVerse(1, 1));

  }

  render() {
    var english_name = ""
    var arabic_name = ""
    if (surahs_info[this.props.quran_verses.verses[0].surah_id]) {
      english_name = surahs_info[this.props.quran_verses.verses[0].surah_id].english
      arabic_name = surahs_info[this.props.quran_verses.verses[0].surah_id].arabic
    }
  
    return (
      <div className="App">
        <div className="verse_container_third">
          <h4>{arabic_name}</h4>
          <h4>{english_name}</h4>
          <h1>{this.props.quran_verses.verses[0].arabic_ayah}</h1>
          <h3>{this.props.quran_verses.verses[0].shakir_ayah}</h3>
          <h5>({this.props.quran_verses.verses[0].surah_id}, {this.props.quran_verses.verses[0].verse_id})</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
	quran_verses: store.quranVerses
});

export default connect(mapStateToProps)(App);