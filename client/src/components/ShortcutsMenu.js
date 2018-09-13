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
                                <div className="keyboard_item">
                                    <div className="keyboard_left">
                                        <kbd>Shift</kbd> + <kbd>Q</kbd>
                                    </div>
                                    <div className="keyboard_right">
                                        Toggle Arabic
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