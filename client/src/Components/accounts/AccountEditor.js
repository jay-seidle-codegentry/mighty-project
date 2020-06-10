import React, { useContext, useState, useEffect, useCallback } from "react";
import { LanguageContext } from "../locale/LanguageProvider";
import { ProfileContext } from "../Profile/ProfileProvider";
import { Typography, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { saveAccount } from "../../usecases/profile-api.usecase";

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

export const AccountEditor = (props) => {
  const profileContext = useContext(ProfileContext);
  const T = useContext(LanguageContext).dictionary;
  const isEditing = props.account.id !== undefined;
  const { closeHandler, account } = props;
  const { id, title, detail } = account;
  const amount = detail ? detail[0].amount : "";
  const {
    EditTitle,
    NewTitle,
    NameLabel,
    StartingAmountLabel,
    CancelLabel,
    SaveLabel,
    SavedMessage,
    CanceledMessage,
  } = T.Account.Editor;
  const classes = useStyles();
  const [newAccountName, setNewAccountName] = useState(null);
  const [newBalance, setNewBalance] = useState(null);

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
    setNewAccountName(event.target.value);
  };

  const onChangeStartingBalance = (event) => {
    setNewBalance(event.target.value);
  };

  const cancelIt = (event) => {
    closeHandler({
      canceled: true,
      message: CanceledMessage,
    });
  };

  const saveIt = (event) => {
    const body = {};
    if (id) body.id = id;
    if (newAccountName) body.title = newAccountName;
    if (newBalance) {
      body.detail = [
        {
          name: body.title,
          amount: newBalance,
        },
      ];
    }
    profileContext.setProfile(saveAccount, { body: body });
    closeHandler({
      canceled: false,
      message: SavedMessage,
    });
  };

  return (
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
            <TextField
              required
              id="startingBalance"
              label={StartingAmountLabel}
              defaultValue={amount}
              onChange={onChangeStartingBalance}
              InputProps={{
                readOnly: isEditing,
              }}
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
  );
};

export default AccountEditor;
