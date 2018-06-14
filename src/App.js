import React, { Component } from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Volume from './components/volume/Volume';
import Comic from './components/comic/Comic';
import NotFound from './components/notfound/NotFound';

class App extends Component {
  render() {
    return (
        <HashRouter>
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/volume/:volume_id" component={Volume}/>
                    <Route exact path="/comic/:comic_id" component={Comic}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>
    );
  }
}

export default App;
