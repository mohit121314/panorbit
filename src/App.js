import React, { Component } from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Landingpage from './Landingpage';
import Home from './Home';

export default class App extends Component {
    render() {
        return (
            <Router>
            <Route path="/" exact component={Landingpage} />
            <Route exact path="/home/:id?" component={Home} render={props => <Home {...props} />} />
          </Router>
        )
    }
}
