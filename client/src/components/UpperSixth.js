import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Segment } from "semantic-ui-react";

class UpperSixth extends Component {
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
                    </div>
                    <div className="bottom_upper_right">
                        {this.props.quran_verses.verses.length > 1 && this.props.quran_verses.type === "Quran" ? 
                            <Segment className="next_verse">
                                <Header size='tiny' className="next_header">Next Verse: </Header>
                                <div className="next_arabic">{this.props.quran_verses.verses[1].arabic_ayah}</div>
                                <div className="next_english">{this.props.quran_verses.verses[1].shakir_ayah}</div>
                            </Segment>
                            :
                            this.props.quran_verses.type === "Quran" ?
                                <Segment className="no_next_verse"><Header size='tiny' className="next_header">End of Surah </Header></Segment>
                            :
                                <div className="next_verse"></div>
                        }
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