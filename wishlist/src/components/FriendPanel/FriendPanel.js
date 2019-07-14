import React from 'react';
import './FriendPanel.css'
export default class FriendPanel extends React.Component {
    render() {
        return (
            <div className="friendPanel" >
                <img className="friendAvatar" src={this.props.avatar}/>
                <div className="friendInfo">
                    <h1 className="friendName">{this.props.username}</h1>
                    <button className="friendButton">
                        <text className="friendButtonLabel">Узнать, что подарить</text>
                    </button>
                </div>
            </div>
        )
    }
}