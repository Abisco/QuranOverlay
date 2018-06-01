import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input } from "semantic-ui-react";
import ColorPicker from 'rc-color-picker';
import SettingsMenu from './SettingsMenu';
import VerseSearch from './VerseSearch';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        verse: {
        }
        };
    }

    componentDidMount() {
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