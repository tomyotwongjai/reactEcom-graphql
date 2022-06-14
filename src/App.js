import { Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
    <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:category" component={Home} />
        </Switch>
    </div>
    )
  }
}

