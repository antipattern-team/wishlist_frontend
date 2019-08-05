import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import './MyProfile.css'
import Pic from '../../img/drohkstYrRc.jpg'
import  GiftPanel from '../../components/GiftPanel/GiftPanel'
import UserPanel from '../../components/UserPanel/UserPanel'
import connect from "@vkontakte/vkui-connect";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedUser: null,
            isLoaded:false,
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({
                        fetchedUser: e.detail.data,
                        isLoaded:true,
                    });
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }
    render() {
        var panel;
        if (this.state.isLoaded) {
            var user = this.state.fetchedUser;
            panel = React.createElement(UserPanel, {
                username: user.first_name + " " + user.last_name,
                profilePic: user.photo_200,
            })
        }
        else
            panel=React.createElement(LoadingIcon,{});
        return (
            <div className="ProfilePage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                {panel}
                <div className="GiftSection">
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                </div>
            </div>
        )
    }
}