import React from 'react';
import './PageHeader.css'
import { Link } from 'react-router-dom';
function miniAva(props) {
    return (
        <div>
            <img className="miniAvatar" src= "https://pp.userapi.com/c840726/v840726559/6f0c9/u_dId2snqZE.jpg" alt=""/>
            <Link to = "/my-profile" className="UserName">Макс</Link>
        </div>
    );
}
function leftButton(props) {
    return (
        <div>
            <Link to = "/home" className="UserName">Вернуться</Link>
        </div>
    );
}
export default class PageHeader extends React.Component {

    render() {
        let left;
        if (!this.props.me) {
            left=React.createElement(miniAva,{})
        }
        else {
            left=React.createElement(leftButton,{})
        }
        return (
                <div className="PageHeader">
                    {left}
                    <Link to = {this.props.rightButtonTo} className="SideButton">{this.props.rightButtonText}</Link>
                </div>
        )
    }
}