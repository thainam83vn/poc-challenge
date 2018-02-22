import React, { Component } from 'react';
import logo from './logo.svg';
import pdfService from './services/pdf.service';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { AddressGenerator } from './components/AddressGenerator/AddressGenerator';

class App extends Component {
  componentDidMount() {
    // pdfService.genTemplate({templateName: "template2", address: "hellooo new address"})
    //   .then(res=>{
    //     console.log("result", res);
    //   });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">FOC</div>
        </header>
        <div>
            <Switch>
              <Route path="/" component={AddressGenerator} />
            </Switch>
        </div>
        <div className='error'>
        </div>
      </div>
    );
  }
}

export default App;
