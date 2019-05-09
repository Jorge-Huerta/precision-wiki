import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "./styles/upload-styles";


function UploadButton (props) {
  const {classes} = props;

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Seleccionar archivo
        </Button>
        <Button variant="contained" component="span" className={classes.button}>
          Subir
        </Button>
      </label>
    </div>
  );
}

export default withStyles(styles)(UploadButton);
