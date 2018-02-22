import React, { Component } from 'react';
import logo from './logo.svg';
import pdfService from './services/pdf.service';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { AddressGenerator } from './components/AddressGenerator/AddressGenerator';
import { SmarterDoc } from './components/SmarterDoc/SmarterDoc';

class App extends Component {
  render() {
    console.log('App:', window.location);
    let path = window.location.pathname;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">FOC</div>
          <div className="App-menu">
            <Link className={path==='/'?'active':''} to='/'>Smart Doc</Link>
            <Link className={path==='/smarter'?'active':''} to='/smarter'>Smarter Doc</Link>
          </div>
        </header>
        <div>
            <Switch>
              <Route exact path="/" component={AddressGenerator} />
              <Route path="/smarter" component={SmarterDoc} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
