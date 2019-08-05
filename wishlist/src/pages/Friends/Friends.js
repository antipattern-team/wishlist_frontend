import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import  FriendPanel from '../../components/FriendPanel/FriendPanel'
import TonyPic from '../../img/Tony.jpg'
import KiraPic from '../../img/Kira.jpg'
import connect from "@vkontakte/vkui-connect";
import './Friends.css'
export default class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            isLoaded:false,
            accessToken: null,
            gotToken:false,
        };
    }
    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppCallAPIMethodResult':
                    this.setState({
                        friends: e.detail.data,
                        isLoaded:true,
                    });
                    break;
                case 'VKWebAppAccessTokenReceived':
                    this.setState({
                        accessToken: e.detail.data.access_token,
                        gotToken:true,
                    });
                    break;
                default:
                    console.log(e.detail);
            }
        });

        connect.send("VKWebAppGetAuthToken", {"app_id": 7070781, "scope": "friends"});

    }

    render() {

        return (
            <div className="friendsPage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                <div className="friendsTop">
                    <PageTitle text="Мои Друзья"/>
                    <SearchField defaultCaption="Начните вводить имя друга..."/>
                </div>
                <div className="friendList">
                    <FriendPanel avatar ={TonyPic} username = "Антон" />
                    <FriendPanel avatar ={KiraPic} username = "Кирилл" />
                    <FriendPanel avatar ={TonyPic} username = "Антон" />
                    <FriendPanel avatar ={KiraPic} username = "Кирилл" />
                    <FriendPanel avatar ={TonyPic} username = "Антон" />
                    <FriendPanel avatar ={KiraPic} username = "Кирилл" />

                </div>
            </div>
        )
    }
}