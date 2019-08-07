import React from 'react';
import './FriendPanel.css'
import connect from "@vkontakte/vkui-connect";
import { Link } from 'react-router-dom';
export default class FriendPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedUser:null,
            isLoaded:false,
            isRequested:false
        };
    }
    componentDidMount() {
        if (!this.state.isRequested)
        {
            connect.send("VKWebAppCallAPIMethod", {
                "method": "users.get",
                "request_id": "getUser"+this.props.id,
                "params": {"v":"5.8","user_ids":this.props.id ,"access_token":this.props.accessToken,"fields":"photo_100"}});
            this.setState({
                isRequested:true,
            })
        }
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppCallAPIMethodResult':
                    if (e.detail.data.request_id.indexOf("getUser")>=0) {
                        this.setState({
                            fetchedUser: e.detail.data.response[0],
                            isLoaded: true,
                        });
                    }
                    break;
                default:
                    console.log(e.detail.type);
            }
        });

    }

    render() {
        let user = {
            photo:"https://vk.com/images/camera_200.png?ava=1",
            name:"",
            link:"/friends"
        };
        if (this.state.isLoaded)
        {
            user.photo=this.state.fetchedUser.photo_100;
            user.name=this.state.fetchedUser.first_name+" "+this.state.fetchedUser.last_name;
            user.link="/user/"+this.props.accessToken+"/"+this.state.fetchedUser.id;
        }
        return (
            <div className="friendPanel" >
                <img className="friendAvatar" alt="" src={user.photo}/>
                <div className="friendInfo">
                    <h1 className="friendName">{user.name}</h1>
                    <Link to={user.link}>
                        <button className="friendButton">
                            <text className="friendButtonLabel">Узнать, что подарить</text>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}