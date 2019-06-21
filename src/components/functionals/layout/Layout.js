import React, {Component} from "react";

import {connect} from "react-redux";

import AppBar from "./ButtonAppBar";
import Drawer from "./PersistentDrawer";
import MenuProvider from "../../containers/layout/MenuProvider";
import Aux from "../../hoc/Aux";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <MenuProvider>
          <AppBar token={this.props.token} />
          <Drawer token={this.props.token} courses={this.props.crs} />
        </MenuProvider>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.decodedToken,
    crs: state.userCourses.myCourses
  };
};

export default connect(mapStateToProps)(Layout);
