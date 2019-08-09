import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import './MyProfile.css'
import  GiftPanel from '../../components/GiftPanel/GiftPanel'
import UserPanel from '../../components/UserPanel/UserPanel'
import connect from "@vkontakte/vkui-connect";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedUser: null,
            userIsLoaded:false,
            wishlist:[],
            wishlistIsLoaded:false,
            giftlist:[],
            giftlistIsLoaded:false,
        };
    }


    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({
                        fetchedUser: e.detail.data,
                        userIsLoaded:true,
                    });
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        fetch('https://wishlist.kpacubo.xyz/wishlist',
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
                 if (data!==null)
                this.setState({
                    wishlistIsLoaded:true,
                    wishlist: data.data,
                });
            });
        connect.send('VKWebAppGetUserInfo', {});
        fetch('https://wishlist.kpacubo.xyz/gifts',
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
                if (data!==null)
                    this.setState({
                        giftlistIsLoaded:true,
                        gistlist: data.data,
                    });
            });
    }
    render() {
        let panel;
        let wlist = [];
        let glist = [];
        let data = this.state.wishlist;
        if (this.state.userIsLoaded) {
            var user = this.state.fetchedUser;
            panel = React.createElement(UserPanel, {
                username: user.first_name + " " + user.last_name,
                profilePic: user.photo_200,
            })
        }
        else {
            panel = React.createElement(LoadingIcon, {});
        }
        if (this.state.giftlistIsLoaded)
        {
            for ( let i = 0; i < data.length; i++) {
                let cur = data[i].product;
                console.log(cur);
                glist.push(React.createElement(
                    GiftPanel,
                    {
                        name: cur.name,
                        description: cur.descr,
                        price: cur.price,
                        buttonText: "Отмена",
                        pid:cur.pid,
                        friendId:data[i].user.id,
                        method:"DELETE",
                    }
                ))
            }
        }
        else
        {
            glist.push(React.createElement(LoadingIcon, {}));
        }
        if (this.state.wishlistIsLoaded)
        {
            for ( let i = 0; i < data.length; i++) {
                let cur = data[i].product;
                console.log(cur);
                wlist.push(React.createElement(
                    GiftPanel,
                    {
                        name: cur.name,
                        description: cur.descr,
                        price: cur.price,
                        buttonText: "Удалить",
                        pid:cur.pid,
                        friendId:"",
                        method:"DELETE"
                    }
                ))
            }
        }
        else
        {
            wlist.push(React.createElement(LoadingIcon, {}));
        }
        return (
            <div className="ProfilePage">
                <PageHeader rightButtonTo="/friends" rightButtonText="Друзья" me={true} />
                {panel}
                <div className="GiftSection">
                    {wlist}
                </div>
            </div>
        )
    }
}