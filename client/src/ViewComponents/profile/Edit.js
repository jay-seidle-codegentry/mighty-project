import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { ViewContext } from "../../Components/view/ViewProvider";
import { setProfile } from "../../usecases/profile-api.usecase";
import { GlobalContext } from "../../Components/Global/GlobalProvider";

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
  const globalContext = useContext(GlobalContext);
  const profileContext = useContext(ProfileContext);
  const T = useContext(LanguageContext).dictionary;
  const { setView } = useContext(ViewContext);
  const [exists, setExists] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [onBoarded, setOnBoarded] = useState("");

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

  const profileHandler = (newProfile) => {
    if (newProfile.nickName) setNickName(newProfile.nickName);
    if (newProfile.exists) setExists(true);
    else setExists(false);
    if (newProfile.avatar) setAvatar(newProfile.avatar);
    if (newProfile.email) setEmail(newProfile.email);
    if (newProfile.onBoarded) {
      setOnBoarded(newProfile.onBoarded);
    } else {
      setOnBoarded(new Date().toLocaleDateString("us-en"));
    }
  };

  useEffect(() => {
    globalContext.subscribe("profile", profileHandler);

    return () => {
      globalContext.unsubscribe("profile", profileHandler);
    };
  }, [globalContext]);

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
      globalContext.logoutUser();
    }
  };

  const saveIt = (event) => {
    profileContext.withProfile(setProfile, {
      body: {
        nickName: newNickName,
        email: newEmail,
      },
    });
    setView("home");
  };

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
              value={nickName}
              onChange={onChangeName}
            />
            <br />
            <TextField
              required
              id="email"
              label={EmailLabel}
              value={email}
              onChange={onChangeEmail}
            />
            <br />
            <TextField
              id="onboarded"
              label={DateLabel}
              value={new Date(onBoarded).toLocaleDateString("en-US")}
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
