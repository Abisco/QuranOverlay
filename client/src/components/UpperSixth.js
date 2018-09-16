import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Segment } from "semantic-ui-react";

class UpperSixth extends Component {
	constructor(props) {
        super(props);
        
        this.previousVerse = this.previousVerse.bind(this);
        this.nextVerse = this.nextVerse.bind(this);

		this.state = {
		};
	}

	componentDidMount() {
	}
	
	convertEnglishToArabic(number) {
		var id= ['۰','۱','۲','۳','٤','۵','٦','۷','۸','۹']
		
		return number.replace(/[0-9]/g, function(w){
			return id[+w]
		});
    }

    previousVerse() {
        if (this.props.quran_verses.type === "Quran" && (this.props.quran_verses.verses.length !== 2 || this.props.quran_verses.verses[0].verse_id > 0) ) {
            var index = 0

            return (
                <Segment className="previous_verse">
                    <Header size='tiny' className="previous_header">Previous Verse: </Header>
                    <div className="previous_arabic">{this.props.quran_verses.verses[index].arabic_ayah}</div>
                    <div className="previous_english">{this.props.quran_verses.verses[index].shakir_ayah}</div>
                </Segment>
            )
        } else if (this.props.quran_verses.type === "Quran") {
            return (
                <Segment className="no_previous_verse"><Header size='tiny' className="previous_header">Beginning of Surah </Header></Segment>
            )
        }

        return (
            <div className="previous_verse"></div>
        )
    }
    
    nextVerse() {
        if (this.props.quran_verses.type === "Quran" && (this.props.quran_verses.verses.length !== 2 || this.props.quran_verses.verses[0].verse_id == 0 || this.props.quran_verses.verses[0].verse_id == 1)) {
            var index;

            if (this.props.quran_verses.verses.length === 3 || this.props.quran_verses.verses[0].verse_id > 1) {
              index = 2;
            } else if (this.props.quran_verses.verses[0].verse_id === 0 || this.props.quran_verses.verses[0].verse_id === 1) {
              index = 1
            }

            return (
                <Segment className="next_verse">
                    <Header size='tiny' className="next_header">Next Verse: </Header>
                    <div className="next_arabic">{this.props.quran_verses.verses[index].arabic_ayah}</div>
                    <div className="next_english">{this.props.quran_verses.verses[index].shakir_ayah}</div>
                </Segment>
            )
        } else if (this.props.quran_verses.type === "Quran") {
            return (
                <Segment className="no_next_verse"><Header size='tiny' className="next_header">End of Surah </Header></Segment>
            )
        }

        return (
            <div className="next_verse"></div>
        )
    }

	render() {
        return(
            <div className="upperSixth">
                <div className="top_upper">
                    <div className="playlist_container">
                    </div>
                    <div className="quicksettings_container">
                    </div>
                </div>
                <div className="bottom_upper">
                    <div className="bottom_upper_left">
                        {this.previousVerse()}
                    </div>
                    <div className="bottom_upper_right">
                        {this.nextVerse()}
                    </div>
                </div>
            </div>
        )
	}
}

const mapStateToProps = store => ({
	quran_verses: store.quranVerses
});

export default connect(mapStateToProps)(UpperSixth);