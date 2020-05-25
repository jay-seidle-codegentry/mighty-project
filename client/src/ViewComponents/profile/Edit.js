import React, { useContext, useState } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "../../react-auth0-spa";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import Loading from "../../Components/loading/Loading";
import { ViewContext } from "../../Components/view/ViewProvider";
import { setProfile } from "../../usecases/user-api.usecase";

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

export const ProfileEdit = (props) => {
  const { logout } = useAuth0();
  const T = useContext(LanguageContext).dictionary;
  const { setView } = useContext(ViewContext);
  const profileContext = useContext(ProfileContext);
  const {
    exists,
    loading,
    avatar,
    nickName,
    email,
    onBoarded,
  } = profileContext;
  const {
    TitleLabel,
    EmailLabel,
    NameLabel,
    DateLabel,
    CancelLabel,
    SaveLabel,
  } = T.Profile.Editor;
  const classes = useStyles();
  const [newNickName, setNewNickName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  const styles = {
    picbox: {
      maxHeight: "90px",
      maxWidth: "100px",
    },
    center: {
      paddingTop: "15%",
    },
  };

  const onChangeName = (event) => {
    setNewNickName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setNewEmail(event.target.value);
  };

  const cancelIt = (event) => {
    if (exists) {
      setView("profile");
    } else {
      logout();
    }
  };

  const saveIt = (event) => {
    profileContext.setProfile(setProfile, {
      body: {
        nickName: newNickName,
        email: newEmail,
      },
    });
    setView("profile");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Typography component="div">
      <Box textAlign="center" fontSize="h3.fontSize">
        {TitleLabel}
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <img alt={nickName} style={styles.picbox} src={avatar} />
            <br />
            <TextField
              required
              id="name"
              label={NameLabel}
              defaultValue={nickName}
              onChange={onChangeName}
            />
            <br />
            <TextField
              required
              id="email"
              label={EmailLabel}
              defaultValue={email}
              onChange={onChangeEmail}
            />
            <br />
            <TextField
              id="onboarded"
              label={DateLabel}
              defaultValue={new Date(onBoarded).toLocaleDateString("en-US")}
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <div className={classes.buttons}>
              <Button onClick={cancelIt} variant="contained">
                {CancelLabel}
              </Button>
              <Button onClick={saveIt} variant="contained" color="primary">
                {SaveLabel}
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Typography>
  );
};

export default ProfileEdit;
