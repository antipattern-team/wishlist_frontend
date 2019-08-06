import React from 'react';
import './UserPanel.css'
export default class PageHeader extends React.Component {
    render() {
        return (
            <div className="userPanel">
                <img src={this.props.profilePic} className="avatar" alt=""/>
                <div className="userInfo">
                    <text className="username">{this.props.username}</text>
                    <div>
                        <text className="listButton">Хочу подарить</text>
                        <text className="listButton">Хочу получить</text>
                    </div>
                    <button className="shareButton">Поделиться</button>
                </div>
            </div>
        )
    }
}