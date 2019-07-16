import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  AppTitle from '../../components/AppTitle/AppTitle'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import  GiftPanel from '../../components/GiftPanel/GiftPanel'
import './Home.css'
export default class Home extends React.Component {
    render() {
        return (

            <div className="Homepage">
                <PageHeader to="/friends" sideButtonText="Друзья"/>
                <div className = "HomeTop">
                    <AppTitle/>
                    <SearchField defaultCaption="Начните вводить название товара..."/>
                    <PageTitle text="Популярное"/>
                </div>
                <div className="GiftSection">
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                    <GiftPanel buttonText="Добавить в избранное"/>
                </div>
            </div>
        )
    }
}