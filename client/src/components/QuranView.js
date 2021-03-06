import React, { Component } from 'react';
import { connect } from "react-redux";
import { } from "semantic-ui-react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
			var index; 
			if (this.props.quran_verses.verses.length === 3 || this.props.quran_verses.verses[0].verse_id > 1) {
				index = 1;
			} else if (this.props.quran_verses.verses[0].verse_id === 0 || this.props.quran_verses.verses[0].verse_id === 1) {
				index = 0
			}

			return (
				<div className="verse_container" id="verse_container">
					<div id="verse_info">
						<div className="verse_info verse_info_left">
							{this.props.quran_verses.verses[index].surah_name_arabic}
						</div>
						<div className="verse_info verse_info_right">
							Surah {this.props.quran_verses.verses[index].surah_name_latin}
						</div>
					</div>
					<div className="verse" id="verse">
						<p id="verse_arabic_ayah">{this.props.quran_verses.verses[index].arabic_ayah} <div className="verse_circle">{this.convertEnglishToArabic(this.props.quran_verses.verses[index].verse_id.toString())}</div></p>
						<p id="verse_english_ayah">{this.props.quran_verses.verses[index].shakir_ayah} ({this.props.quran_verses.verses[index].surah_id}:{this.props.quran_verses.verses[index].verse_id})</p>
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
							Powered by A.L.I's Hadith Database
						</div>
					</div>
					<div className="verse" id="verse">
						<p id="verse_arabic_ayah">{this.props.quran_verses.hadith.arabic} </p>
						<p id="verse_english_ayah">{ReactHtmlParser(this.props.quran_verses.hadith.english)}</p>
					</div>
					
				</div>
			);
		} else if (this.props.quran_verses.type === "Dua") {
			return (
				<div className="verse_container" id="verse_container">
					<div id="verse_info">
						<div className="verse_info verse_info_right">
							{this.props.quran_verses.dua_line.dua_name_arabic}
						</div>
					</div>
					<div className="verse" id="verse">
						<p id="verse_arabic_ayah">{this.props.quran_verses.dua_line.arabic} </p>
						<p id="verse_english_ayah">{this.props.quran_verses.dua_line.english_translation} ({this.props.quran_verses.dua_line.line_id + 1})</p>
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