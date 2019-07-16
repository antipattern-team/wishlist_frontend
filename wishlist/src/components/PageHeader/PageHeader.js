import React from 'react';
import  Avatar from '../../img/drohkstYrRc.jpg'
import './PageHeader.css'
import { Router,Link } from 'react-router-dom';
export default class PageHeader extends React.Component {
    render() {
        return (
                <div className="PageHeader">
                    <img className="miniAvatar" src ={Avatar} alt="ava"/>
                    <Link to = "/my-profile" className="UserName">Макс</Link>
                    <Link to = {this.props.to} className="SideButton">{this.props.sideButtonText}</Link>
                </div>
        )
    }
}