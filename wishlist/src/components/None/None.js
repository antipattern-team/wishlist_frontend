import React from 'react';
import './None.css'
import  emoji from '../../img/Very_sad_emoji_icon_png.png'
import {Link} from 'react-router-dom';
export default class None extends React.Component {
    render() {
        return (
            <div className="loadingArea">
                <img className="emoji" src={emoji} alt=""/>
                <p>{this.props.caption}</p>
            </div>

        )
    }
}