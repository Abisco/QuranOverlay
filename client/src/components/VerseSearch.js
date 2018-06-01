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
        this.selectType = this.selectType.bind(this);

        this.state = {
            isLoading: false,
            results: [],
            value: '',
            type: 'Quran'
        };
    }

    componentDidMount() {
    }

    //Taken from Stackoverflow
    boldString(str, find){
        var re = new RegExp(find, 'g');
        return str.replace(re, '<b>'+find+'</b>');
    }
    

    searchText(e, value) {
        var self = this;
        var search_input = value.value

        if (this.state.type === "Quran") {
            axios.get('/api/quran_verses?find_verse=' + search_input)
            .then(function(response) {
                var search_results = []
                var result_text
    
                for (var i = 0; i < response.data.verses.length; i++) {
                    result_text = response.data.verses[i].shakir_ayah
    
                    if (response.data.verses[i].arabic_ayah.indexOf(search_input) !== -1) {
                        result_text = response.data.verses[i].arabic_ayah
                    }

                    var result_array_text = result_text.split(" ")
                    var result_index = result_array_text.indexOf(search_input)
                    var result_truncated = result_array_text
    
                    var result = {}
                    result.title = "Surah " + surahs_info[response.data.verses[i].surah_id].latin + ", Verse " + response.data.verses[i].verse_id.toString()
                    result.price = response.data.verses[i].surah_id.toString() + ": " + response.data.verses[i].verse_id.toString()
                    result.description = result_text
                    result.surah_id = response.data.verses[i].surah_id
                    result.verse_id = response.data.verses[i].verse_id
                    search_results.push(result)
                }
    
                self.setState({
                    results: search_results
                })
            })
        } else {
            axios.get('https://hadith.academyofislam.com/v1/narrations?q=' + search_input + '&page=0')
            .then(function(response) {
                var search_results = []
                var result_text = response.data.collection[i].english

                for (var i = 0; i < response.data.collection.length; i++) {
                    result_text = response.data.collection[i].english
                    if (response.data.collection[i].arabic.indexOf(search_input) !== -1) {
                        result_text = response.data.collection[i].arabic
                    }

                    var result = {}
                    result.title = response.data.collection[i].source
                    result.price = response.data.collection[i].number
                    result.description = result_text
                    result.english = response.data.collection[i].english
                    result.arabic = response.data.collection[i].arabic
                    response.book = response.data.collection[i].book
                    search_results.push(result)
                }

                self.setState({
                    results: search_results
                })
            })
        }

    }

    focused() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: true})
    }

    blurred() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: false})
    }

    selectVerse(e, { result }) {
        if (this.state.type === "Quran") {
            this.props.dispatch({type: "CHANGE_TYPE", payload: "Quran"})
            this.props.dispatch(grabVerse(result.surah_id, result.verse_id));
        } else if (this.state.type === "Hadith") {
            this.props.dispatch({type: "CHANGE_TYPE", payload: "Hadith"})
        }
        
    }

    selectType(e, data) {
        this.setState({
            type: data.value
        })
    }

    render() {
        return (
            <div className="search_bar">
                <Search
                    loading={this.state.isLoading}
                    onSearchChange={this.searchText}
                    results={this.state.results}
                    placeholder='Search for a Verse'
                    onFocus={this.focused.bind(this)} 
                    onBlur={this.blurred.bind(this)}
                    id="search_verse_input"
                    className="search_verse_input"
                    minCharacters={3}
                    onResultSelect={this.selectVerse}
                />
                <Dropdown selection defaultValue='Quran' onChange={this.selectType} options={[{text: 'Quran', value: 'Quran'}, {text: 'Hadiths', value: 'Hadiths'}]} className="search_verse_type"/>
            </div>

        );
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(VerseSearch);