import React, { Component } from 'react';
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";

import SettingsMenu from './SettingsMenu';
import VerseSearch from './VerseSearch';

import { grabVerse, grabDua } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.selectSurah = this.selectSurah.bind(this);
        this.selectTypeSearch = this.selectTypeSearch.bind(this);
        this.setupSurahList = this.setupSurahList.bind(this);
        this.setupDuaList = this.setupDuaList.bind(this);

        this.state = {
            current_options:[],
            type: "Quran",
            verse_options: []
        };
    }

    componentWillMount() {
        this.setupSurahList()
    }

    setupSurahList() {
        var surah_options = []

        for (var i = 1; i < 115; i++) {
            var option = {}
            option.key = surahs_info[i].id
            option.value = surahs_info[i].id
            option.text = surahs_info[i].id + ". " + surahs_info[i].latin + " - " + surahs_info[i].english
            surah_options.push(option)
        }

        this.setState({
            current_options: surah_options
        })
        
    }

    setupDuaList() {
        var self = this; 

        axios.get("api/duas?dua_list")
        .then(function(response) {
            var dua_options = []

            for (var i = 0; i < response.data.dua.length; i++) {
                var option = {}
                option.key = response.data.dua[i]
                option.value = response.data.dua[i]
                option.text = response.data.dua[i]
                dua_options.push(option)
            }

            self.setState({
                current_options: dua_options
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    }  

    selectTypeSearch(e, value) {
        if (value.value === "Quran") {
            this.setupSurahList()
            this.setState({
                type: "Quran"
            })
        } else if (value.value === "Dua") {
            this.setupDuaList()
            this.setState({
                type: "Dua"
            })
        }
    }

    selectSurah(e, value) {
        if (this.state.type === "Quran") {
            var surah_number = value.value
            var verse_number = 0
            if (surah_number === "1" || surah_number === "9") {
                verse_number = 1
            }
    
            this.props.dispatch(grabVerse(surah_number, verse_number));
        } else if (this.state.type === "Dua") {
            this.props.dispatch(grabDua(value.value, 0));
        }
    }


    render() {
        var current_search = <div />
        if (this.props.quran_verses.surah_search && this.props.quran_verses.surah_search !== "") {
            current_search = <div className="navbar_current_search">Current Search: {this.props.quran_verses.surah_search}:{this.props.quran_verses.verse_search}</div>
        }
        return (
            <div className="navbar" id="navbar">
                <div className="navbar_left_options">
                    <VerseSearch />
                </div>
                {current_search}
                <div className="navbar_right_dropdown">
                    <Dropdown defaultValue='Quran' selection options={[{key: 'Quran', value: 'Quran', text: 'Quran'}, {key: 'Dua', value: 'Dua', text: 'Dua'}]} onChange={this.selectTypeSearch} className="navbar_select_type"/>
                    <Dropdown placeholder='Select Surah' search selection autocomplete options={this.state.current_options} onChange={this.selectSurah}/>
                </div>
                <div className="navbar_right_options">
                    <Dropdown item icon='question' simple direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Item className="keyboard_item">
                                <div>
                                    About us will be here
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item icon='keyboard' simple direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Item className="keyboard_item">
                                <div>
                                    BACKSPACE
                                </div>
                                <div>
                                    Reset Request
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <SettingsMenu />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(Navbar);