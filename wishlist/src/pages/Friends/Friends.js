import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import  FriendPanel from '../../components/FriendPanel/FriendPanel'
import TonyPic from '../../img/Tony.jpg'
import KiraPic from '../../img/Kira.jpg'
import './Friends.css'
export default class Friends extends React.Component {
    render() {
        return (

            <div className="Homepage">
                <PageHeader sideButtonText="Вернуться"/>
                <div>
                    <PageTitle text="Мои друзья"/>
                    <SearchField defaultCaption="Начните вводить имя друга..."/>
                </div>
                <div>
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