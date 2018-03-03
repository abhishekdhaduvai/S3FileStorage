import React from 'react';

class Google extends React.Component {

  state = {
    signedIn: false, // check if the user is signed in
    auth: undefined, // object to listen to signIn status change
  }
  
  componentDidMount() {
    
    /*
     * Triggered when the signIn status is changed.
     */
    const signInChanged = () => {
      const { auth } = this.state
      if(auth.isSignedIn.get()){
        this.setState({signedIn: true});
        this.handleSignIn(auth.currentUser.get());
      }
      else {
        this.setState({signedIn: false});
        this.props.onLogout();
      }
    }
    
    /*
     * Inititalize Google API
     */
    const init = () => {
      const params = {
        client_id: this.props.clientId,
        scope: this.props.scope,
      }
      window.gapi.load('auth2', () => {
        // Initialize the GoogleAuth object
        window.gapi.auth2.init(params)
        .then(gauth => {
          this.setState({auth: gauth})
          if(gauth.isSignedIn.get()) {
            this.setState({signedIn: true});
            this.handleSignIn(gauth.currentUser.get());
          }
          gauth.isSignedIn.listen(signInChanged);
        });
      });
    }

    // Inserts a new script tag with the Google API src
    (function(d, s, id, callback){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js";
      js.onload = callback;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-api', init));

  }
  
  handleSignIn = (res) => {
    const basicProfile = res.getBasicProfile();
    res.googleId = basicProfile.getId();
    res.profile = {
      id: basicProfile.getId(),
      name: basicProfile.getName(),
      email: basicProfile.getEmail(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    }
    this.props.onLogin(res)
  }

  signIn = (e) => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn();
  }

  signOut = (e) => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({signedIn: false})
    });
    
  }
  
  render(){
    const { signedIn } = this.state;
    const { signInText, signOutText } = this.props;
    return (
      <div style={{margin: '1em'}}>
        {signedIn ? 
          <button 
            onClick={this.signOut}
            style={styles.default}>
              {signOutText || 'Sign Out'}
          </button>
          :
          <button 
            onClick={this.signIn}
            style={styles.default}>
              {signInText || 'Sign In'}
          </button>
        }
      </div>
    )
  }
}

const styles = {
  default: {
    display: 'inline-block',
    background: '#d14836',
    color: '#fff',
    width: 150,
    height: 29,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
    border: '1px solid transparent',
    fontSize: 13,
    fontFamily: 'Roboto',
    cursor: 'pointer',
  }
}

export default Google;