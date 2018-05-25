import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input } from "semantic-ui-react";
import ColorPicker from 'rc-color-picker';
import SettingsMenu from './SettingsMenu';

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
        // Options to:
        // Change arabic and english fonts and colours
        // Change background colour
        // Change extra font size and colour
        return (
            <div className="navbar" id="navbar">
                <div className="navbar_left_options">
                    <Input icon='search' placeholder='Search for a Verse' />
                </div>
                <div className="navbar_current_search">
                </div>
                <div className="navbar_right_options">
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