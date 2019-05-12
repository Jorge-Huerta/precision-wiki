import React, {Component} from "react";
import AppBar from "./ButtonAppBar";
import Drawer from "./PersistentDrawer";
import MenuProvider from "../../containers/layout/MenuProvider";
import Aux from "../../hoc/Aux";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <MenuProvider>
          <AppBar />
          <Drawer />
        </MenuProvider>
      </Aux>
    );
  }
}

export default Layout;
