import React, { Component } from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import Event from '../Event/Event';
import Choices from '../../components/choices/choices';

class Main extends Component {
    render(){
        let routes = (
            <Switch>
                {/* <Route path="/event" component={Ch}/> */}
                <Route path="/" component={Event}/>
            </Switch>
        )
        return (
            <div>
                {routes}
            </div>
        )
    }
}

export default Main;