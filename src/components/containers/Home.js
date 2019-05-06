import React, {Component} from "react";
import AppBar from "../functionals/ButtonAppBar";
import Drawer from "../functionals/Drawer";
import MenuProvider from "./MenuProvider";

class Home extends Component {
  render() {
    return (
      <MenuProvider>
        <AppBar />
        <Drawer />
      </MenuProvider>
    );
  }
}

export default Home;
