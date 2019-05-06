import React, {Component} from "react";
import AppBar from "../functionals/ButtonAppBar";
import Drawer from "../functionals/PersistentDrawer";
import MenuProvider from "./MenuProvider";

class Menu extends Component {
  render() {
    return (
      <MenuProvider>
        <AppBar />
        <Drawer />
      </MenuProvider>
    );
  }
}

export default Menu;
