import React from 'react';
import  PageHeader from '../../components/PageHeader/PageHeader'
import './MyProfile.css'
import Pic from '../../img/drohkstYrRc.jpg'
import WishList from '../../components/WishList/WishList'
import  UserPanel from '../../components/UserPanel/UserPanel'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'
import None from '../../components/None/None'
import { Router,Link,Switch,Route,Redirect} from 'react-router-dom';
export default class MyProfile extends React.Component {
    render() {
        return (
            <div className="ProfilePage">
                <PageHeader to="/home" sideButtonText="Вернуться"/>
                <UserPanel profilePic={Pic} username="Макс "/>
                <Switch>
                    <Route path="/my-profile/list" component={WishList}/>
                    <Route path="/my-profile/loading" component={LoadingIcon}/>
                    <Route path="/my-profile/none" component={None}/>
                    <Redirect to = "/my-profile/loading"/>
                </Switch>
            </div>
        )
    }
}