import React from 'react';

class Facebook extends React.Component {

  componentDidMount(){
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : this.props.appId,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.9',
      });

      window.FB.Event.subscribe('auth.statusChange', response => {
        if(response.authResponse){
          this.props.onLogin(response)
        }
        else {
          this.props.onLogout('logged out');
        }
      });

      window.FB.getLoginStatus();

      // window.FB.login((res) => {
      // }, {
      //   scope: 'email',
      //   return_scopes: true
      // })

    }.bind(this);

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div 
        className="fb-login-button" 
        data-max-rows="1" 
        data-size={this.props.size} 
        data-button-type={this.props.buttonText} 
        data-show-faces={this.props.showFriends} 
        data-auto-logout-link={this.props.logoutLink} 
        data-use-continue-as={this.props.continueAs}>
      </div>
    )
  }
}

export default Facebook;