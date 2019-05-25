import React, {useState, useEffect, useContext} from "react";

import {Link} from "react-router-dom";

import axios from "axios";
import shortid from "shortid";

import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachmentIcon from "@material-ui/icons/Attachment";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/persistentdrawer-styles";

import MenuContext from "../../context/menu-context";

const getCourses = (courses, classes) => {
  return courses.map(course => {
    console.log(course);
    return (
      <ListItem
        key={shortid.generate()}
        button
        className={classes.nested}
        component={Link}
        to={`${course.route}`}
      >
        º
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText inset primary={`${course.title}`} />
      </ListItem>
    );
  });
};

const PersistentDrawerLeft = props => {
  const [data, setData] = useState([]);
  const menuContext = useContext(MenuContext);
  const {classes, theme} = props;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(
          "https://my-json-server.typicode.com/dissonants/precisiondb/courses"
        )
        .then(result => setData(result.data));
    };
    fetchData();
  }, []);

  console.log(data);

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

        <ListItem button component={Link} to="/create">
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText inset primary="Crear curso" />
        </ListItem>

        <ListItem button component={Link} to="/update">
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          <ListItemText inset primary="Actualizar curso" />
        </ListItem>

        <ListItem button component={Link} to="/delete">
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Borrar curso" />
        </ListItem>

        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Perfil" />
        </ListItem>

        <ListItem button component={Link} to="/upload">
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          <ListItemText inset primary="Subir Archivos" />
        </ListItem>

        <ListItem button onClick={menuContext.toggleCollapse}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText inset primary="Cursos" />
          {menuContext.toggleCollapse ? <ExpandMore /> : <ExpandLess />}
        </ListItem>
        <Collapse in={menuContext.showNested} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {getCourses(data, classes)}
          </List>
        </Collapse>
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
