import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pdfService from './services/pdf.service';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import AddressGenerator from './components/AddressGenerator/AddressGenerator';
import SmarterDoc from './components/SmarterDoc/SmarterDoc';
import { setLoading } from './actions/app-actions';
import Loader from './components/Controls/Loader';


class App extends Component {
  state = {
    path: '/'
  }
  componentDidMount(){
    this.setState({
      path: window.location.pathname
    })
  }
  changeRoute(path){
    console.log(path);
    this.setState({
      path: path
    })
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="App-title">FOC</div>
            <div className="App-menu">
              <Link className={this.state.path === '/' ? 'active' : ''} to='/' onClick={()=>this.changeRoute('/')}>Smart Doc</Link>
              <Link className={this.state.path === '/smarter' ? 'active' : ''} to='/smarter'  onClick={()=>this.changeRoute('/smarter')}>Smarter Doc</Link>
            </div>
          </header>
          <div>
            <Switch>
              <Route exact path="/" component={AddressGenerator} />
              <Route path="/smarter" component={SmarterDoc} />
            </Switch>
          </div>
          <Loader visible={this.props.isLoading} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setLoading: setLoading }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);

// export default App;
