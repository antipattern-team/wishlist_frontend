import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import './MyProfile.css'
import Pic from '../../img/drohkstYrRc.jpg'
import  GiftPanel from '../../components/GiftPanel/GiftPanel'
export default class MyProfile extends React.Component {
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