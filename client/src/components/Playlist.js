import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Segment, Button, List, Icon } from "semantic-ui-react";
import PlaylistItem from './PlaylistItem';
import { addToPlaylist, clearPlaylist } from '../actions/playlistActions';

class Playlist extends Component {
    constructor(props) {
        super(props);
        
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.clearPlaylist = this.clearPlaylist.bind(this);

		this.state = {
		};
    }
    
    addToPlaylist() {
        if (this.props.quran_verses.type === "Quran") {
			var index; 
			if (this.props.quran_verses.verses.length === 3 || this.props.quran_verses.verses[0].verse_id > 1) {
				index = 1;
			} else if (this.props.quran_verses.verses[0].verse_id === 0 || this.props.quran_verses.verses[0].verse_id === 1) {
				index = 0
			}

            this.props.dispatch(addToPlaylist(this.props.quran_verses.verses[index], this.props.playlist.playlist))
        }
    }

    clearPlaylist() {
        if (window.confirm("Are you sure you want to clear the playlist?")) {
            this.props.dispatch(clearPlaylist())
        }
    }

    render() {
        return (
            <Segment className="playlist_segment">
                <Header size='tiny'> <Icon name='list' /> Playlist:</Header>
                {
                    this.props.playlist.playlist.length === 0 ?
                        <Header as='tiny' icon='book' textAlign='center' content='Your List is Empty' style={{margin: "auto"}}/>  
                    :
                        <div className="playlist_list">
                            {
                                this.props.playlist.playlist.map((item, index) => (
                                    <PlaylistItem item={item} index={index}/>
                                ))
                            }
                        </div>
                }
            <div className="playlist_actions">
                <Button icon negative labelPosition='left' onClick={this.clearPlaylist}>
                    <Icon name='close' />
                    Clear Playlist
                </Button>
                <Button icon positive labelPosition='right' onClick={this.addToPlaylist}>
                    Add Current Verse
                    <Icon name='add' />
                </Button>
            </div>
            </Segment>

        )
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    playlist: store.playlist
});

export default connect(mapStateToProps)(Playlist);