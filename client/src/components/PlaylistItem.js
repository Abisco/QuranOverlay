import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Segment, Icon } from "semantic-ui-react";
import { grabVerse } from '../actions/quranVersesActions';
import { timingSafeEqual } from 'crypto';
import { removeFromPlaylist } from '../actions/playlistActions';

class PlaylistItem extends Component {
    constructor(props) {
        super(props);
        
        this.showItem = this.showItem.bind(this);
        this.removeFromPlaylist = this.removeFromPlaylist.bind(this);

		this.state = {
		};
    }

    showItem() {
        var current_verse = this.props.item.verse_id
        var current_surah = this.props.item.surah_id

        this.props.dispatch(grabVerse(current_surah, current_verse));
    }

    removeFromPlaylist() {
        this.props.dispatch(removeFromPlaylist(this.props.index, this.props.playlist.playlist))
    }

    render() {
        if (this.props.quran_verses.type === "Quran") {
			var index; 
			if (this.props.quran_verses.verses.length === 3 || this.props.quran_verses.verses[0].verse_id > 1) {
				index = 1;
			} else if (this.props.quran_verses.verses[0].verse_id === 0 || this.props.quran_verses.verses[0].verse_id === 1) {
				index = 0
            }
        }

        return (
            <div className={"playlist_item" + (this.props.quran_verses.type === "Quran" && this.props.quran_verses.verses[index].surah_id === this.props.item.surah_id && this.props.quran_verses.verses[index].verse_id === this.props.item.verse_id ? " active" : "")}>
                <div className="playlist_text"  onClick={this.showItem}>
                    <div className="playlist_arabic">
                        {this.props.item.arabic_ayah}
                    </div>
                    <div className="playlist_english">
                        {this.props.item.shakir_ayah}
                    </div>
                </div>
                <div className="playlist_item_info">
                    <div className="playlist_number">
                        {this.props.item.surah_id}:{this.props.item.verse_id}
                    </div>
                    <div className="playlist_surah_name">
                        {this.props.item.surah_name_latin}
                    </div>
                    <div className="playlist_remove">
                        <Icon color='red' name='close' onClick={this.removeFromPlaylist}/>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    playlist: store.playlist
});

export default connect(mapStateToProps)(PlaylistItem);