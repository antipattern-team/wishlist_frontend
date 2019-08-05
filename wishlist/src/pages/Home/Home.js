import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  AppTitle from '../../components/AppTitle/AppTitle'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import './Home.css'
import GiftPanel from '../../components/GiftPanel/GiftPanel'
import None from "../../components/None/None"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import WishList from "../../components/WishList/WishList"
import {Switch,Route,Redirect} from 'react-router-dom';
function getPopular() {
    var popular;
    fetch('http://wishlist.kpacubo.xyz/products/popular',
        {
            method: "GET",
            mode: "cors",
            credentials: 'include'
        })
        .then(response => {
            return response.text().then((text) => {
                return text ? JSON.parse(text) : null;
            })
        }).then((data) => {
            console.log(data.data);
        popular = data.data;
    }).catch(() => popular = '');
    return popular;
};
export default class Home extends React.Component {

    constructor (props)
    {
        super(props);
        this.state={
            popular:[],
            isLoaded: false,
        }
    }
    componentDidMount() {
        fetch('https://wishlist.kpacubo.xyz/products/popular',
            {
                method: "GET",
                mode: "cors",
                credentials: 'include'
            })
            .then(response => {
                return response.text().then((text) => {
                    return text ? JSON.parse(text) : null;
                })
            })
            .then(data=>{
                this.setState({
                    isLoaded:true,
                    popular: data.data,
                })
                console.log(this.state.popular);
            })
    }

    render() {
        let children =[];
        var {isLoaded,popular} = this.state;
        if (!isLoaded) {
            children.push(React.createElement(LoadingIcon, {}));
        }
        else
        {

            for ( let i = 0; i < popular.length; i++) {
                let cur = popular.pop();
                console.log(cur.name);
                children.push(React.createElement(
                    GiftPanel,
                    {
                        name: cur.name,
                        description: cur.descr,
                        price: cur.price,
                        buttonText: "Добавить в избранное"
                    }
                ))
            }

        }
        return (
            <div className="Homepage">
                <PageHeader to="/friends" sideButtonText="Друзья"/>
                <div className = "HomeTop">
                    <AppTitle/>
                    <SearchField defaultCaption="Начните вводить название товара..."/>
                    <PageTitle text="Популярное"/>
                </div>
                {children}
            </div>
        )
    }

}