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
    }
    render() {
        var panel;
        var list = [];
        var data = this.state.wishlist;
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
        if (this.state.wishlistIsLoaded)
        {
            for ( let i = 0; i < data.length; i++) {
                let cur = data[i].product;
                console.log(cur);
                list.push(React.createElement(
                    GiftPanel,
                    {
                        name: cur.name,
                        description: cur.descr,
                        price: cur.price,
                        buttonText: "Удалить",
                        pid:cur.pid,
                    }
                ))
            }
        }
        else
        {
            list.push(React.createElement(LoadingIcon, {}));
        }
        return (
            <div className="ProfilePage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                {panel}
                <div className="GiftSection">
                    {list}
                </div>
            </div>
        )
    }
}