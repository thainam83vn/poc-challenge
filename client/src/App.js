import React, { Component } from 'react';
import logo from './logo.svg';
import pdfService from './services/pdf.service';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    pdfService.genTemplate({templateName: "template2", address: "hellooo new address"})
      .then(res=>{
        this.setState({response: res.message});
      });
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/pdf-address/template1');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">FOC</div>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
