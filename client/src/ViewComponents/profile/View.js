import React, { useContext } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import Loading from "../../Components/loading/Loading";
import { ViewContext } from "../../Components/view/ViewProvider";

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
  const profileContext = useContext(ProfileContext);
  const { loading, avatar, nickName, email, onBoarded } = profileContext;
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

  const editIt = (event) => {
    setView("editProfile");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Typography component="div">
      <Box textAlign="center" fontSize="h3.fontSize">
        {TitleLabel}
        <div className={classes.root}>
          <div>
            <img alt={nickName} style={styles.picbox} src={avatar} />
            <br />
            <Box textAlign="center" fontSize="h6.fontSize">
            <span>{NameLabel} </span>
              <span><strong>{nickName}</strong></span>
            <br />
              <span>{EmailLabel} </span>
              <span><strong>{email}</strong></span>
              <br />
              <span>{DateLabel} </span>
              <span><strong>{new Date(onBoarded).toLocaleDateString("en-US")}</strong></span>
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
