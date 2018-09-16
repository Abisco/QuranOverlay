import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Icon } from "semantic-ui-react";

class ShortcutsMenu extends Component {
    constructor(props) {
        super(props);

        this.showShortcuts = this.showShortcuts.bind(this);
        this.hideShortcuts = this.hideShortcuts.bind(this);

        this.state = {
            show_shortcuts: false
        };
    }

    componentDidMount() {
    }

    showShortcuts() {
        this.setState({
            show_shortcuts: true
        })
    }

    hideShortcuts() {
        this.setState({
            show_shortcuts: false
        })
    }

    render() {
        var keyboard_menu = <div />
        if (this.state.show_shortcuts) {
            keyboard_menu =<div className="keyboard_menu">
                                <Header size='tiny' dividing>Keyboard Shortcuts</Header>
                                <Header size='tiny'>Toggles</Header>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Shift</kbd> + <kbd>/</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Toggle Toolbar
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Shift</kbd> + <kbd>Q</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Toggle Arabic
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Shift</kbd> + <kbd>E</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Toggle English
                                    </div>
                                </div>
                                <Header size='tiny'>Verse Search</Header>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>114</kbd> + <kbd>:</kbd> + <kbd>1</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Pull up Verse
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Backspace</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Clear Verse Search
                                    </div>
                                </div>
                                <Header size='tiny'>Font Sizes</Header>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Alt</kbd> + <kbd>Q</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Increase Arabic Size
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Alt</kbd> + <kbd>W</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Decrease Arabic Size
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Alt</kbd> + <kbd>E</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Increase English Size
                                    </div>
                                </div>
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Alt</kbd> + <kbd>R</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Decrease English Size
                                    </div>
                                </div>
                            </div>
        }

        return (
            <div className="keyboard_settings" >
                <Icon name='keyboard' className="navbar_settings_icon" onMouseEnter={this.showShortcuts} onMouseLeave={this.hideShortcuts}/>
                {keyboard_menu}
            </div>
        );
  }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(ShortcutsMenu);