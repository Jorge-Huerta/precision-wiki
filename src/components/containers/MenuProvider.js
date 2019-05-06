import React, {Component} from "react";

export const MenuContext = React.createContext();

class MenuProvider extends Component {
  state = {
    showMenu: false,
    toggleMenu: () => {
      this.setState(prevState => ({showMenu: !prevState.showMenu}));
      console.log("click");
    }
  };

  render() {
    return (
      <MenuContext.Provider value={this.state}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}

export default MenuProvider;
