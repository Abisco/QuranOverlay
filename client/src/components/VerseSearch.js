import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Input } from "semantic-ui-react";

class VerseSearch extends Component {
    constructor(props) {
        super(props);

        this.searchText = this.searchText.bind(this);

        this.state = {
            
        };
    }

    componentDidMount() {
    }

    searchText() {
        
    }

    focused() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: true})
    }

    blurred() {
        this.props.dispatch({type: "SEARCH_INPUT_FOCUSED", payload: false})
    }

    render() {
        return (
            <Input icon='search' placeholder='Search for a Verse' id="search_verse_input" onChange={this.searchText} onFocus={this.focused.bind(this)} onBlur={this.blurred.bind(this)}/>
        );
    }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(VerseSearch);