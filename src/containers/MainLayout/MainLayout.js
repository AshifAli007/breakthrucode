import React, { Component } from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import Event from '../Event/Event';

class Main extends Component {
    render(){
        let routes = (
            <Switch>
                <Route path="/event" component={Event}/>
            </Switch>
        )
        return (
            <div>
                <h1>hii</h1>
                {routes}
            </div>
        )
    }
}

export default Main;