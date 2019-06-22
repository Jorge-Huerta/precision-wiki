import React, {useContext} from "react";

import {Link} from "react-router-dom";

import shortid from "shortid";

import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachmentIcon from "@material-ui/icons/Attachment";
import BookIcon from "@material-ui/icons/Book";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AttachIcon from "@material-ui/icons/AttachFile";
import styles from "./styles/persistentdrawer-styles";

import MenuContext from "../../context/menu-context";

const getCourses = (courses, classes) => {
  return courses.map(course => {
    return (
      <ListItem
        key={shortid.generate()}
        button
        className={classes.nested}
        component={Link}
        to={`${course.ruta}`}
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText inset primary={`${course.nombre}`} />
      </ListItem>
    );
  });
};

const getCoursesAdmin = (courses, classes) => {
  return courses.map(course => {
    return (
      <ListItem
        key={shortid.generate()}
        button
        className={classes.nested}
        component={Link}
        to={`${course.ruta}`}
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText inset primary={`${course.nombre}`} />
      </ListItem>
    );
  });
};

const PersistentDrawerLeft = props => {
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
        {props.token.administrador ? (
          <ListItem button component={Link} to="/usermanagement">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText inset primary="Gestionar Usuarios" />
          </ListItem>
        ) : null}
        {props.token.administrador ? (
          <ListItem button component={Link} to="/coursemanagement">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText inset primary="Gestionar Cursos" />
          </ListItem>
        ) : null}

        {!props.token.administrador &&
        !props.token.aportador &&
        props.token.id ? (
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Perfil" />
          </ListItem>
        ) : null}
        {!props.token.administrador &&
        !props.token.aportador &&
        props.token.id ? (
          <ListItem button component={Link} to="/management">
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inscribir Curso" />
          </ListItem>
        ) : null}
        {!props.token.administrador &&
        !props.token.aportador &&
        props.token.id ? (
          <ListItem button onClick={menuContext.toggleCollapse}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText inset primary="Cursos" />
            {menuContext.showNested ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
        ) : null}
        <Collapse in={menuContext.showNested} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.courses !== null ? getCourses(props.courses, classes) : null}
          </List>
        </Collapse>

        {props.token.administrador ? (
          <ListItem button onClick={menuContext.toggleCollapse}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText inset primary="Asociar Link" />
            {menuContext.showNested ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
        ) : null}
        {props.token.administrador ? (
          <Collapse in={menuContext.showNested} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.allCourses !== null
                ? getCoursesAdmin(props.allCourses, classes)
                : null}
            </List>
          </Collapse>
        ) : null}
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
};

export default withStyles(styles, {withTheme: true})(PersistentDrawerLeft);
