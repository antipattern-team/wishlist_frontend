import React from 'react';
import  Avatar from '../../img/drohkstYrRc.jpg'
import './PageHeader.css'
import { Link } from 'react-router-dom';
export default class PageHeader extends React.Component {

    render() {
        return (
                <div className="PageHeader">
                    <img className="miniAvatar" src= "https://pp.userapi.com/c840726/v840726559/6f0c9/u_dId2snqZE.jpg" alt=""/>
                    <Link to = "/my-profile" className="UserName">Макс</Link>
                    <Link to = {this.props.to} className="SideButton">{this.props.sideButtonText}</Link>
                </div>
        )
    }
}