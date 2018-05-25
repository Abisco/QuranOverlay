import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Header, Icon, Button, Dropdown } from "semantic-ui-react";
import ColorPicker from 'rc-color-picker';
import { font_sizes } from '../helpers/font_sizes';
import 'rc-color-picker/assets/index.css';

class settingsMenu extends Component {
    constructor(props) {
        super(props);

        this.changeBackgroundColour = this.changeBackgroundColour.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.setFullScreen = this.setFullScreen.bind(this);
        this.setLowerThird = this.setLowerThird.bind(this);

        this.state = {
            show_settings: false
        };
    }

    componentDidMount() {
    }

    setFullScreen() {
        document.getElementById("verse_container").style.height = "100vh";
        document.getElementById("verse").style.maxHeight = "100vh";
        this.props.dispatch({type: "CHANGE_HEIGHT", payload: "100vh"})
    }

    setLowerThird() {
        document.getElementById("verse_container").style.height = "30vh";
        document.getElementById("verse").style.maxHeight = "100vh";
        this.props.dispatch({type: "CHANGE_HEIGHT", payload: "30vh"})
    }

    changeBackgroundColour(colors) {
        document.getElementById("verse_container").style.backgroundColor = colors.color;
    }

    changeAllFontColours(colors) {
        document.getElementById("verse_arabic_ayah").style.color = colors.color;
        document.getElementById("verse_english_ayah").style.color = colors.color;
        document.getElementById("verse_english_name").style.color = colors.color;
        document.getElementById("verse_arabic_name").style.color = colors.color;
    }

    changeAllFontSize(e, value) {
        document.getElementById("verse_arabic_ayah").style.fontSize = value.value;
        document.getElementById("verse_english_ayah").style.fontSize = value.value;
        document.getElementById("verse_english_name").style.fontSize = value.value;
        document.getElementById("verse_arabic_name").style.fontSize = value.value;
    }

    changeArabicFontColour(colors) {
        document.getElementById("verse_arabic_ayah").style.color = colors.color;
    }

    changeArabicFontSize(e, value) {
        document.getElementById("verse_arabic_ayah").style.fontSize = value.value;
    }

    changeEnglishFontColour(colors) {
        document.getElementById("verse_english_ayah").style.color = colors.color;
    }

    changeEnglishFontSize(e, value) {
        document.getElementById("verse_english_ayah").style.fontSize = value.value;
    }

    changeEnglishSurahColour(colors) {
        document.getElementById("verse_english_name").style.color = colors.color;
    }

    changeEnglishSurahFontSize(e, value) {
        document.getElementById("verse_english_name").style.fontSize = value.value;
    }

    changeArabicSurahColour(colors) {
        document.getElementById("verse_arabic_name").style.color = colors.color;
    }

    changeArabicSurahFontSize(e, value) {
        document.getElementById("verse_arabic_name").style.fontSize = value.value;
    }

    toggleSettings() {
        this.props.dispatch({type: "TOGGLE_SETTINGS", payload: !this.props.settings.show_settings})
    }

    render() {
        var settings_menu = <div />
        if (this.props.settings.show_settings) {
            settings_menu = <div className="settings_menu">
                                <Header size='tiny' dividing>Template</Header>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Layout:   
                                        </div>  
                                        <Button.Group>
                                            <Button onClick={this.setLowerThird}>Third</Button>
                                            <Button.Or />
                                            <Button onClick={this.setFullScreen}>Full</Button>
                                        </Button.Group>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Background Colour:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#000'}
                                            onChange={this.changeBackgroundColour}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            All Font Sizes:  
                                        </div>
                                        <Dropdown placeholder='30' selection options={font_sizes} onChange={this.changeAllFontSize} id="arabic_font_size_dropdown" className="settings_menu_font_dropdown"/>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            All Font Colours:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#000'}
                                            onChange={this.changeAllFontColours}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                                <Header size='tiny' dividing>Arabic</Header>
                                    <div className="settings_menu_item">
                                        <Button.Group className="settings_menu_font_styles">
                                            <Button icon>
                                                <Icon name='bold' />
                                            </Button>
                                            <Button icon>
                                                <Icon name='underline' />
                                            </Button>
                                            <Button icon>
                                                <Icon name='italic' />
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Font Size:  
                                        </div>
                                        <Dropdown placeholder='30' selection options={font_sizes} onChange={this.changeArabicFontSize} id="arabic_font_size_dropdown" className="settings_menu_font_dropdown"/>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Font Colour:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#fff'}
                                            onChange={this.changeArabicFontColour}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                                <Header size='tiny' dividing>English</Header>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Font Size:  
                                        </div>
                                        <Dropdown placeholder='30' selection options={font_sizes} onChange={this.changeEnglishFontSize} id="arabic_font_size_dropdown" className="settings_menu_font_dropdown"/>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Font Colour:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#fff'}
                                            onChange={this.changeEnglishFontColour}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                                <Header size='tiny' dividing>Info</Header>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Arabic Surah Name Size:  
                                        </div>
                                        <Dropdown placeholder='14' selection options={font_sizes} onChange={this.changeArabicSurahFontSize} id="arabic_font_size_dropdown" className="settings_menu_font_dropdown"/>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            Arabic Surah Name Colour:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#fff'}
                                            onChange={this.changeArabicSurahColour}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            English Surah Name Size:  
                                        </div>
                                        <Dropdown placeholder='14' selection options={font_sizes} onChange={this.changeEnglishSurahFontSize} id="arabic_font_size_dropdown" className="settings_menu_font_dropdown"/>
                                    </div>
                                    <div className="settings_menu_item">
                                        <div className="settings_menu_label">
                                            English Surah Name Colour:  
                                        </div>
                                        <ColorPicker
                                            animation="slide-up"
                                            color={'#fff'}
                                            onChange={this.changeEnglishSurahColour}
                                            className="settings_menu_item_colour"
                                        />
                                    </div>
                            </div>
        }

        return (
            <div className="navbar_settings" >
                <Icon name='setting' className="navbar_settings_icon" onClick={this.toggleSettings}/>
                {settings_menu}
            </div>
        );
  }
}

const mapStateToProps = store => ({
    quran_verses: store.quranVerses,
    settings: store.settings
});

export default connect(mapStateToProps)(settingsMenu);