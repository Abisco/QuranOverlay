import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input, Search } from "semantic-ui-react";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { grabVerse } from "../actions/quranVersesActions";

import { surahs_info } from "../helpers/quran_info";

class VerseSearch extends Component {
    constructor(props) {
        super(props);

        this.searchText = this.searchText.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.selectVerse = this.selectVerse.bind(this);
        this.selectType = this.selectType.bind(this);
        this.trackScrollingResults = this.trackScrollingResults.bind(this);
        this.isNearBottom = this.isNearBottom.bind(this);

        this.state = {
            isLoading: false,
            results: [],
            value: '',
            type: 'Quran',
            page: 1,
            grabbing: false,
            limit: false
        };
    }

    componentDidMount() {
        var results = document.getElementsByClassName('results')[0]
        results.addEventListener('scroll', this.trackScrollingResults)
    }

    //Taken from Stackoverflow
    boldString(str, find){
        var re = new RegExp(find, 'g');
        return str.replace(re, '<b>'+find+'</b>');
    }
    
    trackScrollingResults() {
        var results = document.getElementsByClassName('results')[0]
        if (this.isNearBottom(results) && ! this.state.grabbing && ! this.state.limit) {
            var search_input = document.getElementById('search_verse_input').value
            this.searchText(search_input, this.state.page)
        }
    }

    isNearBottom(el) {
        if (el) {
            return (el.scrollTop >= (el.scrollHeight * 0.75));
        }
    }

    checkInput(e, value) {
        this.setState({
            results: [],
            limit: false,
            page: 1,
            grabbing: true
        })

        if (value.value.length > 2) {
            this.searchText(value.value, 1)
        }
    }

    searchText(search_input, page) {
        this.setState({
            grabbing: true
        })

        var self = this;
        var limit = false

        if (this.state.type === "Quran") {
            axios.get('/api/quran_verses?find_verse=' + search_input + '&page=' + page)
            .then(function(response) {
                var search_results = []
                var result_text
                if (response.data.verses.length < 20) {
                    limit = true
                }

                for (var i = 0; i < response.data.verses.length; i++) {
                    result_text = response.data.verses[i].shakir_ayah
    
                    if (response.data.verses[i].arabic_ayah.indexOf(search_input) !== -1) {
                        result_text = response.data.verses[i].arabic_ayah
                    }
    
                    result_text = result_text.replace(search_input, "<div class='search_input_result'>" + search_input + "</div>")
    
                    var result = {}
                    result.title = "Surah " + surahs_info[response.data.verses[i].surah_id].latin + ", Verse " + response.data.verses[i].verse_id.toString()
                    result.price = response.data.verses[i].surah_id.toString() + ": " + response.data.verses[i].verse_id.toString()
                    result.description = <div>{ReactHtmlParser(result_text)}</div>
                    result.surah_id = response.data.verses[i].surah_id
                    result.verse_id = response.data.verses[i].verse_id
                    search_results.push(result)
                }
        
                self.setState({
                    results: self.state.results.concat(search_results),
                    page: page + 1,
                    grabbing: false,
                    limit: limit
                })
            })
        } else {
            axios.get('https://hadith.academyofislam.com/v1/narrations?q=' + search_input + '&page=' + (page - 1))
            .then(function(response) {
                var search_results = []
                var result_text
                if (response.data.collection.length < 10) {
                    limit = true
                }

                for (var i = 0; i < response.data.collection.length; i++) {
                    var title = response.data.collection[i].book + ", " + response.data.collection[i].number
                    
                    result_text = response.data.collection[i].english
                    if (response.data.collection[i].arabic.indexOf(search_input) !== -1) {
                        result_text = response.data.collection[i].arabic
                    }

                    if (response.data.collection[i].source) {
                        title = response.data.collection[i].source
                    }
                        
                    result_text = result_text.replace(search_input, "<div class='search_input_result'>" + search_input + "</div>")
                    result_text = result_text.replace('<span class="highlight">', "")
                    result_text = result_text.replace('</span>', "")

                    title = title.replace('<span class="highlight">', "")
                    title = title.replace('</span>', "")
                    
                    var result = {}
                    result.title = title
                    result.price = response.data.collection[i].number
                    result.description = <div>{ReactHtmlParser(result_text)}</div>
                    result.english = response.data.collection[i].english
                    result.arabic = response.data.collection[i].arabic
                    result.source = title
                    response.book = response.data.collection[i].book
                    search_results.push(result)
                }
    
                self.setState({
                    results: self.state.results.concat(search_results),
                    page: page + 1,
                    grabbing: false,
                    limit: limit
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
            this.props.dispatch({type: "SET_HADITH", payload: result})
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
                    onSearchChange={this.checkInput}
                    results={this.state.results}
                    placeholder='Search for a Verse'
                    onFocus={this.focused.bind(this)} 
                    onBlur={this.blurred.bind(this)}
                    id="search_verse_input"
                    className="search_verse_input"
                    minCharacters={3}
                    onResultSelect={this.selectVerse} />
                <Dropdown selection defaultValue='Quran' onChange={this.selectType} options={[{text: 'Quran', value: 'Quran'}, {text: 'Hadith', value: 'Hadith'}]} className="search_verse_type"/>
            </div>

        );
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(VerseSearch);