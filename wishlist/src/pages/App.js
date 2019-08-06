import React from 'react';
import Home from './Home/Home'
import MyProfile from './MyProfile/MyProfile'
import { Router,Switch,Route,Redirect} from 'react-router-dom';
import history from '../utils/history';
import Friends from './Friends/Friends'
import './App.css';

class App extends React.Component {


    render() {

        return (
            <Router history={history}>
                <div className="App">
                    <Switch>
                        <Route path="/friends" component={Friends}/>
                        <Route path="/my-profile" component={MyProfile}/>
                        <Route path="/home" component={Home}/>
                        <Redirect to="/home"/>
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
