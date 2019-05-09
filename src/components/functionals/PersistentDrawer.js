import React, {useContext} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import styles from "./styles/persistentdrawer-styles";
import {MenuContext} from "../containers/MenuProvider";
import {Link} from "react-router-dom";

function PersistentDrawerLeft(props) {
  const menuContext = useContext(MenuContext);
  const {classes, theme} = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={menuContext.showMenu}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <p>Menú</p>

          <IconButton onClick={menuContext.toggleMenu}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Perfil" />
        </ListItem>

        <ListItem button component={Link} to="/course">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText inset primary="Cursos" />
        </ListItem>

        <ListItem button component={Link} to="/upload">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText inset primary="Subir Archivos" />
        </ListItem>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: menuContext.showMenu
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(PersistentDrawerLeft);
