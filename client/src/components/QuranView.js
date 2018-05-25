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
		var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
		
		number.replace(/[0-9]/g, function(w){
			return id[+w]
		});
	}

	render() {
		var english_name = ""
		var arabic_name = ""
		if (surahs_info[this.props.quran_verses.verses[0].surah_id]) {
			english_name = surahs_info[this.props.quran_verses.verses[0].surah_id].english
			arabic_name = surahs_info[this.props.quran_verses.verses[0].surah_id].arabic
		}
	
		return (
			<div className="verse_container" id="verse_container">
			<div className="verse" id="verse">
				<p id="verse_arabic_name">{arabic_name}</p>
				<p id="verse_english_name">{english_name}</p>
				<p id="verse_arabic_ayah">{this.props.quran_verses.verses[0].arabic_ayah} </p>
				<p id="verse_english_ayah">{this.props.quran_verses.verses[0].shakir_ayah} ({this.props.quran_verses.verses[0].verse_id})</p>
			</div>
			</div>
		);
	}
}

const mapStateToProps = store => ({
	quran_verses: store.quranVerses
});

export default connect(mapStateToProps)(QuranView);