import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input } from "semantic-ui-react";
import ColorPicker from 'rc-color-picker';
import SettingsMenu from './SettingsMenu';
import VerseSearch from './VerseSearch';

import { grabVerse } from "../actions/quranVersesActions"

import { surahs_info } from "../helpers/quran_info";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.selectSurah = this.selectSurah.bind(this);

        this.state = {
            verse_options: []
        };
    }

    componentWillMount() {
        var surah_options = []

        for (var i = 1; i < 115; i++) {
            var option = {}
            option.key = surahs_info[i].id
            option.value = surahs_info[i].id
            option.text = surahs_info[i].id + ". " + surahs_info[i].latin + " - " + surahs_info[i].english
            surah_options.push(option)
        }

        this.props.dispatch({type: "SET_SURAH_OPTIONS", payload: surah_options})
    }

    selectSurah(e, value) {
        var surah_number = value.value
        var verse_number = 0
        if (surah_number === "1" || surah_number === "9") {
            verse_number = 1
        }

        this.props.dispatch(grabVerse(surah_number, verse_number));
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
                    <Dropdown placeholder='Select Surah' search selection autocomplete options={this.props.quran_verses.surah_options} onChange={this.selectSurah}/>
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