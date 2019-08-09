import React from 'react';
import Home from './Home/Home'
import MyProfile from './MyProfile/MyProfile'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import history from '../utils/history';
import Friends from './Friends/Friends'
import './App.css';
import Profile from "./Profile/Profile";

class App extends React.Component {


    render() {

        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/friends" component={Friends}/>
                        <Route path="/my-profile" component={MyProfile}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/user/:accesstoken/:id" component={Profile}/>
                        <Redirect to = "/home"/>
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
