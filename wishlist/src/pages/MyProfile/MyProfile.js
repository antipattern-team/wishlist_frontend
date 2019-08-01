import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import './MyProfile.css'
import Pic from '../../img/drohkstYrRc.jpg'
import  GiftPanel from '../../components/GiftPanel/GiftPanel'
import connect from "@vkontakte/vkui-connect";
export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedUser: null,
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({ fetchedUser: e.detail.data });
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }
    render() {
        return (
            <div className="ProfilePage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                <div className="userPanel">
                    <img src={Pic} alt="" className="avatar"/>
                    <div className="userInfo">
                        <text className="username">Макс</text>
                        <div>
                            <text className="listButton">Хочу подарить</text>
                            <text className="listButton">Хочу получить</text>
                        </div>
                        <button className="shareButton">Поделиться</button>
                    </div>
                </div>
                <div className="GiftSection">
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                </div>
            </div>
        )
    }
}