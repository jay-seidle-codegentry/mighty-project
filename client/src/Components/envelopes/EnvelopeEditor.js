import React, { useContext, useState, useEffect, useCallback } from "react";
import { LanguageContext } from "../locale/LanguageProvider";
import { ProfileContext } from "../Profile/ProfileProvider";
import { Typography, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { saveEnvelope } from "../../usecases/profile-api.usecase";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const EnvelopeEditor = (props) => {
  const profileContext = useContext(ProfileContext);
  const isEditing = props.envelope.id !== undefined;
  const { closeHandler, envelope } = props;
  const { id, title } = envelope;
  const {
    EditTitle,
    NewTitle,
    NameLabel,
    CancelLabel,
    SaveLabel,
    SavedMessage,
    CanceledMessage,
  } = useContext(LanguageContext).dictionary.Envelope.Editor;
  const classes = useStyles();
  const [newEnvelopeName, setNewEnvelopeName] = useState(null);

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        closeHandler({
          canceled: true,
          message: CanceledMessage,
        });
      }
    },
    [CanceledMessage, closeHandler]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  const onChangeName = (event) => {
    setNewEnvelopeName(event.target.value);
  };

  const cancelIt = () => {
    closeHandler({
      canceled: true,
      message: CanceledMessage,
    });
  };

  const saveIt = () => {
    const body = {};
    if (id) body.id = id;
    if (newEnvelopeName) body.title = newEnvelopeName;
    profileContext.withProfile(saveEnvelope, { body: body });
    closeHandler({
      canceled: false,
      message: SavedMessage,
    });
  };

  return (
    <ClickAwayListener onClickAway={cancelIt}>
      <Typography component="div">
        <Box textAlign="center" fontSize="h3.fontSize">
          {isEditing ? EditTitle : NewTitle}
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                required
                id="title"
                label={NameLabel}
                defaultValue={title}
                onChange={onChangeName}
                autoFocus
              />
              <br />
              <div className={classes.buttons}>
                <Button onClick={cancelIt} variant="contained">
                  {CancelLabel}
                </Button>
                <Button
                  type="submit"
                  onClick={saveIt}
                  variant="contained"
                  color="primary"
                >
                  {SaveLabel}
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Typography>
    </ClickAwayListener>
  );
};

export default EnvelopeEditor;
