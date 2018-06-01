import React, { Component } from 'react';
import { connect } from "react-redux";
import { } from "semantic-ui-react";

import { grabVerse } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";

class QuranView extends Component {
	constructor(props) {
		super(props);

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

	render() {
		//var verse_number = <div className="verse_circle">{this.convertEnglishToArabic(this.props.quran_verses.verses[0].verse_id.toString())}</div>
		if (this.props.quran_verses.type === "Quran") {
			return (
				<div className="verse_container" id="verse_container">
					<div id="verse_info">
						<div className="verse_info verse_info_left">
							{this.props.quran_verses.verses[0].surah_id}: {this.props.quran_verses.verses[0].verse_id}
						</div>
						<div className="verse_info verse_info_right">
							Surah {this.props.quran_verses.verses[0].surah_name_latin}
						</div>
					</div>
					<div className="verse" id="verse">
						<p id="verse_arabic_ayah">{this.props.quran_verses.verses[0].arabic_ayah} <div className="verse_circle">{this.convertEnglishToArabic(this.props.quran_verses.verses[0].verse_id.toString())}</div></p>
						<p id="verse_english_ayah">{this.props.quran_verses.verses[0].shakir_ayah} ({this.props.quran_verses.verses[0].verse_id})</p>
					</div>
					
				</div>
			);
		} else if (this.props.quran_verses.type === "Hadith") {
			return (
				<div className="verse_container" id="verse_container">
					<div id="verse_info">
						<div className="verse_info verse_info_left">
							{this.props.quran_verses.hadith.source}
						</div>
						<div className="verse_info verse_info_right">
							Provided by A.L.I's Hadith Database
						</div>
					</div>
					<div className="verse" id="verse">
						<p id="verse_arabic_ayah">{this.props.quran_verses.hadith.arabic} </p>
						<p id="verse_english_ayah">{this.props.quran_verses.hadith.english}</p>
					</div>
					
				</div>
			);
		}

	}
}

const mapStateToProps = store => ({
	quran_verses: store.quranVerses
});

export default connect(mapStateToProps)(QuranView);