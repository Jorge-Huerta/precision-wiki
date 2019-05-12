import React, {useContext} from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {MenuContext} from "../../containers/layout/MenuProvider";
import styles from "./styles/appbar-styles";
import {Link} from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';

function ButtonAppBar(props) {
  const {classes} = props;
  const menuContext = useContext(MenuContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar disableGutters={!menuContext.showMenu}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={menuContext.toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Precisión-Wiki
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <Button color="inherit" component={Link} to="/auth">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
