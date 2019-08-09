import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import  AppTitle from '../../components/AppTitle/AppTitle'
import  PageTitle from '../../components/PageTitle/PageTitle'
import  SearchField from '../../components/SearchField/SearchField'
import './Home.css'
import GiftPanel from '../../components/GiftPanel/GiftPanel'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import None from "../../components/None/None"

function tgtrimm(str){var ars = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', '); return ars;}
export default class Home extends React.Component {

    constructor (props)
    {
        super(props);
        this.search = this.search.bind(this);
        this.state={
            popular:[],
            isLoaded: false,
            isSearching:false,
            searched:false,
            results:[]
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
                    console.log(text);
                    return text ? JSON.parse(text) : null;
                })
            })
            .then(data=>{
                this.setState({
                    isLoaded:true,
                    popular: data.data,
                });
            })
    }

    search = (event)=>
    {
        if (event.target.value!=="") {
            this.setState({ isSearching:true});
            let formated =tgtrimm(event.target.value.toLowerCase());
            fetch('https://wishlist.kpacubo.xyz/products/search/' +formated,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: 'include'
                })
                .then(response => {
                    return response.text().then((text) => {
                        console.log(text);
                        return text ? JSON.parse(text) : null;
                    })
                })
                .then(data => {
                    this.setState({
                        searched: true,
                        results: data.data,
                    });
                })
        }
        else
        {
            this.setState({ isSearching:false});
        }
    };
    render() {
        let children =[];
        var {isLoaded,popular,isSearching,searched,results} = this.state;
        if (isSearching)
        {
            if(searched)
            {
                if(results.length>0) {
                for (let i = 0; i < results.length; i++) {
                    let cur = results[i];
                    children.push(React.createElement(
                        GiftPanel,
                        {
                            name: cur.name,
                            description: cur.descr,
                            image: cur.image,
                            price: cur.price,
                            buttonText: "Добавить в избранное",
                            method:"POST"
                        }
                    ))
                }
                }
                else {
                    children.push(React.createElement(None, {caption:"К сожалению, по запросу ничего не нашлось"}));
                }

            }
            else {
                children.push(React.createElement(LoadingIcon, {}));
            }

        }
        else {
            if (!isLoaded) {
                children.push(React.createElement(LoadingIcon, {}));
            } else {

                for (let i = 0; i < popular.length; i++) {
                    let cur = popular[i];
                    children.push(React.createElement(
                        GiftPanel,
                        {
                            name: cur.name,
                            description: cur.descr,
                            image: cur.image,
                            price: cur.price,
                            buttonText: "Добавить в избранное"
                        }
                    ))
                }

            }
        }
        return (
            <div className="Homepage">
                <PageHeader rightButtonTo="/friends" rightButtonText="Друзья" me={false}/>
                <div className = "HomeTop">
                    <AppTitle/>
                    <SearchField defaultCaption="Начните вводить название товара..." onChange={this.search}/>
                    <PageTitle text={isSearching?"Поиск":"Популярное"}/>
                </div>
                <div className="GiftSection">
                {children}
                </div>
            </div>
        )
    }

}