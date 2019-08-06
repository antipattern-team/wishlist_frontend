import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import  FriendPanel from '../../components/FriendPanel/FriendPanel'
import connect from "@vkontakte/vkui-connect";
import './Friends.css'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
export default class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            isLoaded:false,
            accessToken: null,
            gotToken:false,
            requestedToken:false,
            requestedFriends:false,
        };
    }
    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppCallAPIMethodResult':
                    console.log(e.detail);
                    this.setState({
                        friends: e.detail.data.response.items,
                        isLoaded:true,
                    });
                    break;
                case 'VKWebAppAccessTokenReceived':
                    console.log("кек2");
                    this.setState({
                        accessToken: e.detail.data.access_token,
                        gotToken:true,
                    });
                    break;
                default:
                    console.log(e.detail);
            }
        });
        if(!this.state.requestedToken) {
            console.log("кек");
            connect.send("VKWebAppGetAuthToken", {"app_id": 7070781, "scope": "friends"});
            this.setState({requestedToken:true});
        }


    }

    render() {
        let friendList = [];
        if (this.state.gotToken && !this.state.requestedFriends )
        {
            connect.send("VKWebAppCallAPIMethod", {
                "method": "friends.get",
                "request_id": "GetFriends",
                "params": {"v":"5.8","access_token":this.state.accessToken,"count":"10","fields":"photo_200"}});
            this.setState({
                requestedFriends:true,
            })
        }
        if (this.state.isLoaded)
        {
            for ( let i = 0; i < this.state.friends.length; i++) {
                let cur = this.state.friends[i];
                friendList.push(React.createElement(
                    FriendPanel,{
                        username:  cur.first_name + " " + cur.last_name,
                        avatar:cur.photo_200,
                    }
                ))
            }
        }
        else
        {
            friendList.push(React.createElement(LoadingIcon,{}))
        }
        return (
            <div className="friendsPage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                <div className="friendsTop">
                    <PageTitle text="Мои Друзья"/>
                    <SearchField defaultCaption="Начните вводить имя друга..."/>
                </div>
                <div className="friendList">
                    {friendList}
                </div>
            </div>
        )
    }
}