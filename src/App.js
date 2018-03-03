import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AppNav from './web-components/AppNav';
import Dashboard from './components/Dashboard';
import Facebook from './components/Facebook';
import Google from './components/Google';
import axios from 'axios';

class App extends Component {

  state = {
    fb: false,
    google: false,
    userinfo: undefined,
  }

  handleFBLogin = (e) => {
    window.FB.api('/me', {fields: 'first_name, last_name, email'}, function(response) {
      this.setState({
        userinfo: response, 
        fb:true
      });
    }.bind(this));
  }

  handleFBLogout = (e) => {
    this.setState({fb: false})
  }

  googleLogin = (response) => {
    this.setState({
      userinfo: response.profile,
      google: true
    })
  }

  googleLogout = (e) => {
    this.setState({googe: false})
  }

  render() {

    return (
      <div className="App">

        <px-branding-bar />

        {(this.state.fb || this.state.google) ?
          <Switch>
            <Route 
              exact path='/dashboard'
              render={(props) => <Dashboard {...props} userinfo={this.state.userinfo} />} />
            <Route path='/' render={() => {
              return <Redirect to='/dashboard' />
            }}/>
          </Switch>
          :
          <div style={styles.login}>
            <Facebook 
              appId={338815113280479} 
              onLogin={this.handleFBLogin}
              onLogout={this.handleFBLogout}
              size='medium' 
              buttonText='login_with'
              showFriends='false'
              continueAs='true'
              logoutLink='false'/>

          <Google 
            clientId='753560117840-c272384f7hcfv66f7o9s50n84qt1bv1m.apps.googleusercontent.com'
            signInText='Log In With Google'
            signOutText='Log Out'
            scope='email'
            onLogin={this.googleLogin}
            onLogout={this.googleLogout} />
          </div>
        }

      </div>
    );
  }
}

const styles = {
  login: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginBottom: '10em',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}

export default withRouter(App);
