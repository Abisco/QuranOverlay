import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input, Search } from "semantic-ui-react";
import axios from 'axios';

import { grabVerse } from "../actions/quranVersesActions";

import { surahs_info } from "../helpers/quran_info";

class VerseSearch extends Component {
    constructor(props) {
        super(props);

        this.searchText = this.searchText.bind(this);
        this.selectVerse = this.selectVerse.bind(this);

        this.state = {
            isLoading: false,
            results: [],
            value: ''
        };
    }

    componentDidMount() {
    }

    searchText() {
        var self = this;
        axios.get('/api/quran_verses?find_verse=' + document.getElementById('search_verse_input').value)
        .then(function(response) {
            var search_results = []

            for (var i = 0; i < Math.min(10, response.data.verses.length); i++) {
                var result = {}
                result.title = surahs_info[response.data.verses[i].surah_id].arabic + ", Verse " + response.data.verses[i].verse_id.toString()
                result.price = response.data.verses[i].surah_id.toString() + ": " + response.data.verses[i].verse_id.toString()
                result.description = response.data.verses[i].shakir_ayah
                result.surah_id = response.data.verses[i].surah_id
                result.verse_id = response.data.verses[i].verse_id
                search_results.push(result)
            }

            self.setState({
                results: search_results
            })
        })
    }

    focused() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: true})
    }

    blurred() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: false})
    }

    selectVerse(e, { result }) {
        this.props.dispatch(grabVerse(result.surah_id, result.verse_id));
    }

    render() {
        return (
            <Search
                loading={this.state.isLoading}
                onSearchChange={this.searchText}
                results={this.state.results}
                placeholder='Search for a Verse'
                onFocus={this.focused.bind(this)} 
                onBlur={this.blurred.bind(this)}
                id="search_verse_input"
                minCharacters={3}
                onResultSelect={this.selectVerse}
            />
        );
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(VerseSearch);