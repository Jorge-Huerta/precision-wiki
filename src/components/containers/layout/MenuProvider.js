import React, {Component} from "react";
import MenuContext from "../../context/menu-context";

class MenuProvider extends Component {
  state = {
    showMenu: false,
    showNested: true,
    toggleMenu: () => {
      this.setState(prevState => ({showMenu: !prevState.showMenu}));
    },
    toggleCollapse: () => {
      this.setState(prevState => ({showNested: !prevState.showNested}));
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

//MenuContext es el contexto que provee el estado del menú
//MenuProvider es una clase que maneja el estado de los menús
//showMenu indica si el Drawer está abierto o cerrado
//toggleMenu es una función que cambia el valor de showMenu a lo contrario
//En el render se provee el estado de MenuProvider al MenuContext y se pasa a los hijos del wrap
