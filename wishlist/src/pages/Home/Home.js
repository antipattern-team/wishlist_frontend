import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  AppTitle from '../../components/AppTitle/AppTitle'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import './Home.css'
import None from "../../components/None/None"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import WishList from "../../components/WishList/WishList"
import {Switch,Route,Redirect} from 'react-router-dom';
function getPopular() {
    var popular;
    fetch('http://wishlist.kpacubo.xyz/products/popular',
        {
            method: "GET",
            mode:"cors",
            credentials: 'include'
        })
        .then(response =>
        {
            return response.text().then((text) => {
                console.log(text);
                return text ? JSON.parse(text) : null;
            })
        }).then((data) => {
            popular = data.data;
    }).catch(()=> popular='');
    return popular;
}
export default class Home extends React.Component {
    render() {
       console.log( getPopular());
        /*const json ="[{\"ref\": \"real_url\", \"img\": \"img_url\", \"name\": \"Lol\", \"type\": \"type\", \"descr\": \"description\", \"price\": 1337},{\"ref\": \"real_url\", \"img\": \"img_url\", \"name\": \"kek\", \"type\": \"type\", \"descr\": \"description\", \"price\": 1337},{\"ref\": \"real_url\", \"img\": \"img_url\", \"name\": \"cheburek\", \"type\": \"type\", \"descr\": \"description\", \"price\": 1337}]";
        const data = JSON.parse(json);
        console.log(data);
        let children =[];
        for ( let i = 0; i < 3; i++) {

            let cur =data.pop();
            console.log(cur.name);
            children.push(React.createElement(
                GiftPanel,
                {
                    name : cur.name,
                    description:cur.descr,
                    price: cur.price,
                    buttonText : "Добавить в избранное"}
            ))
        }*/

        return (
            <div className="Homepage">
                <PageHeader to="/friends" sideButtonText="Друзья"/>
                <div className = "HomeTop">
                    <AppTitle/>
                    <SearchField defaultCaption="Начните вводить название товара..."/>
                    <PageTitle text="Популярное"/>
                </div>
                <Switch>
                    <Route path="/home/none" component={ None }/>
                    <Route path="/home/loading" component={ LoadingIcon }/>
                    <Route path="/home/popular" component={ WishList }/>
                    <Redirect to="/home/popular" />
                </Switch>

            </div>
        )
    }
}