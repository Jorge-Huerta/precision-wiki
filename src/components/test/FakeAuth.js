import React, {Component} from "react";

class FakeAuth extends Component {
  state = {
    authenticated: false,
    login: () => {
      this.setState(prevState => ({authenticated: !prevState.authenticated}));
    }
  };

  isAuthenticated() {
    return this.state.authenticated;
  }
}

export default FakeAuth;
