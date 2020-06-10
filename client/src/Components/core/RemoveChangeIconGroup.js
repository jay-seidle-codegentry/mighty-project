import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  outerItem: {
    marginLeft: "auto",
  },
  buttons: {
    padding: "unset",
    marginTop: "10px",
  },
  settingsButton: {
    marginRight: "10px",
  },
}));

export const RemoveChangeIconGroup = (props) => {
  const classes = useStyles();
  const { id, changeHandler, removeHandler } = props;
  const leftButton = clsx(classes.settingsButton, classes.buttons);

  const triggerChanged = (event) => {
    if (changeHandler) changeHandler(id);
  };

  const triggerRemove = () => {
    if (removeHandler) removeHandler(id);
  };

  return (
    <Grid container>
      <Grid className={classes.outerItem} item>
        <IconButton
          className={leftButton}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={triggerChanged}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          className={classes.buttons}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={triggerRemove}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default RemoveChangeIconGroup;
