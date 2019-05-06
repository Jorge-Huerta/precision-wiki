import React, {useContext} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import styles from "./styles/drawer-styles";
import {MenuContext} from "../containers/MenuProvider";

function NestedList(props) {
  const {classes, theme} = props;
  const menuContext = useContext(MenuContext);

  return menuContext.showMenu ? (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Menú</ListSubheader>}
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Perfil" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText inset primary="Cursos" />
      </ListItem>
    </List>
  ) : null;
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);
