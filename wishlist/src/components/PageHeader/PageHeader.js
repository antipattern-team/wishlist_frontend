import React from 'react';
import  Avatar from '../../img/drohkstYrRc.jpg'
import './PageHeader.css'
export default class PageHeader extends React.Component {
    render() {
        return (
                <div className="PageHeader">
                    <img className="Avatar" src ={Avatar} alt="ava"/>
                    <text className="UserName">Макс</text>
                    <text className="SideButton">{this.props.sideButtonText}</text>
                </div>
        )
    }
}