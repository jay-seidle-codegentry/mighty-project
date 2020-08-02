import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ViewContext } from "../../Components/view/ViewProvider";
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

export const ProfileView = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const { setView } = useContext(ViewContext);
  const globalContext = useContext(GlobalContext);
  const [profile, setProfile] = useState({});
  const {
    TitleLabel,
    EditLabel,
    EmailLabel,
    NameLabel,
    DateLabel,
  } = T.Profile.View;
  const classes = useStyles();

  const styles = {
    picbox: {
      maxHeight: "180px",
      maxWidth: "200px",
    },
    center: {
      paddingTop: "15%",
    },
  };

  const profileHandler = (profileData) => {
    if (profileData) {
      if (!profileData.onBoarded) {
        profileData.onBoarded = new Date().toLocaleDateString();
      }
      setProfile(profileData);
    }
  };

  useEffect(() => {
    globalContext.subscribe("profile", profileHandler);

    return () => {
      globalContext.unsubscribe("profile", profileHandler);
    };
  }, [globalContext]);

  const editIt = (event) => {
    setView("editProfile");
  };

  return (
    <Typography component="div">
      <Box textAlign="center" fontSize="h3.fontSize">
        {TitleLabel}
        <div className={classes.root}>
          <div>
            <img
              alt={profile.nickName}
              style={styles.picbox}
              src={profile.avatar}
            />
            <br />
            <Box textAlign="center" fontSize="h6.fontSize">
              <span>{NameLabel} </span>
              <span>
                <strong>{profile.nickName}</strong>
              </span>
              <br />
              <span>{EmailLabel} </span>
              <span>
                <strong>{profile.email}</strong>
              </span>
              <br />
              <span>{DateLabel} </span>
              <span>
                <strong>
                  {new Date(profile.onBoarded).toLocaleDateString("en-US")}
                </strong>
              </span>
            </Box>
            <div className={classes.buttons}>
              <Button onClick={editIt} variant="contained" color="primary">
                {EditLabel}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Typography>
  );
};

export default ProfileView;
