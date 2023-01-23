import React from 'react';
import {connect } from 'react-redux';
import { signIn,signOut } from '../actions';
class GoogleAuth extends React.Component {


  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
                 "687474558819-fk2bh53cmtdilirgtb7hr4jdnio5k8ds.apps.googleusercontent.com",
          scope: "email",
          plugin_name: 'streamy'

        }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
 
          this.onAuthChange( this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
 
  onSignInClick=()=>{
    this.auth.signIn();
  };

  onSignOutClick=()=>{
    this.auth.signOut();
  }

  renderAuthButton() {
    //console.log('statu', this.state.isSigned);
    if (this.props.isSignedIn === null) {
      return (
            <div>I don't know</div>
             );
    }
    else if (this.props.isSignedIn) {
      return (
        
        <button className='ui red google button' onClick={this.onSignOutClick}>
            <i className='google icon'/>
            Sign Out
           </button>
      );
    }
    else {
      return (
        <button className='ui blue google button' onClick={this.onSignInClick}>
          <i className='google icon' />
          Sign in with Google
        </button>
      );
    }
  }

  onAuthChange = (isSigned) => {
    if(isSigned){
      this.props.signIn(this.auth.currentUser.get().getId());
    }
    else{
      this.props.signOut();
    }
  }


  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
};

const mapStateToProps=(state)=>{
     return {isSignedIn : state.auth.isSignedIn};
}

export default connect(
       mapStateToProps,
       {signIn,signOut}
       )(GoogleAuth);