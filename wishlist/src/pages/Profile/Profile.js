import React from 'react';
import { Link } from 'react-router-dom';
import connect from "@vkontakte/vkui-connect";
import UserPanel from "../../components/UserPanel/UserPanel";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import PageHeader from "../../components/PageHeader/PageHeader";
import GiftPanel from "../../components/GiftPanel/GiftPanel";
export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedUser: null,
            userIsLoaded:false,
            wishlist:[],
            wishlistIsLoaded:false,
            isRequested:false,
        };
    }
    componentDidMount() {
        if (!this.state.isRequested)
        {
            connect.send("VKWebAppCallAPIMethod", {
                "method": "users.get",
                "request_id": "getProfile",
                "params": {
                    "v":"5.8",
                    "user_ids":this.props.match.params.id ,
                    "access_token":this.props.match.params.accesstoken,
                    "fields":"photo_200"}});
            this.setState({
                isRequested:true,
            })
        }
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppCallAPIMethodResult':
                    if (e.detail.data.request_id==="getProfile") {
                        this.setState({
                            fetchedUser: e.detail.data.response[0],
                            userIsLoaded: true,
                        });
                    }
                    break;
                default:
                    console.log(e.detail.type);
            }
        });

    }

    render() {
        let panel;
        let list = [];
        var data = this.state.wishlist;
        if (this.state.userIsLoaded) {
            var user = this.state.fetchedUser;
            panel = React.createElement(UserPanel, {
                username: user.first_name + " " + user.last_name,
                profilePic: user.photo_200,
            });
            if (!this.state.requested){
            fetch('https://wishlist.kpacubo.xyz/wishlist/'+user.id,
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
            this.setState({requested:true})
            }
        }
        else {
            panel = React.createElement(LoadingIcon, {});
        }
        if (this.state.wishlistIsLoaded && data!==undefined)
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
                        buttonText: data[i].reserved?"Отмена":"Забронировать",
                        pid:cur.pid,
                        method:data[i].reserved?"DELETE":"POST"
                    }
                ))
            }
        }
        else
        {
            list.push(React.createElement(LoadingIcon, {}));
        }
        return (
            <div>
                <PageHeader rightButtonTo="/friends" rightButtonText="Друзья" me={false}/>
                {panel}
                {list}
            </div>
        );
    }
}