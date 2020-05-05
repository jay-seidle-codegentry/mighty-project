import React, { useContext } from "react";
import "typeface-roboto";
import { useAuth0 } from "../../react-auth0-spa";
import { Typography, Button, Link } from "@material-ui/core";
import SimpleMenu from "../simple-menu/SimpleMenu";
import Image from "../../imges/josh-appel-NeTPASr-bmQ-unsplash-2k.jpg";
import LanguageSelector from "../locale/LanguageSelector";
import { LanguageContext } from "../locale/LanguageProvider";

const styles = {
  paperContainer: {
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    border: "2px solid rgb(44,44,44)",
  },
  textStyling: {
    textShadow: "3px 3px 6px #000000",
  },
  buttonStyling: {
    padding: "5px",
  },
  floatIt: {
    paddingRight: "3px",
    textShadow: "3px 3px 8px #000000",
    position: "absolute",
    float: "right",
    bottom: 0,
    right: 0,
  },
  floatLanguage: {
    marginRight: "35px",
    marginTop: "35px",
    position: "absolute",
    float: "right",
    top: 0,
    right: 0,
  },
};

export const LandingPage = (props) => {
  const { loginWithRedirect } = useAuth0();
  const T = useContext(LanguageContext).dictionary;

  return (
    <div className="App">
      <header className="App-header" style={styles.paperContainer}>
        <LanguageSelector style={styles.floatLanguage} />
        <SimpleMenu />
        <Typography style={styles.textStyling} variant="h3" component="h2">
          {T.WelcomeMessage1}
        </Typography>
        <Typography style={styles.textStyling} variant="h3" component="h2">
          {T.WelcomeMessage2}
        </Typography>
        <Button
          onClick={() => loginWithRedirect({})}
          style={styles.buttonStyling}
          variant="contained"
          color="primary"
        >
          {T.Login}
        </Button>
        <Typography
          style={styles.floatIt}
          variant="caption"
          display="block"
          color="inherit"
          gutterBottom
        >
          <span>
            Photo by&nbsp;
            <Link
              target="_blank"
              rel="noopener"
              href="https://unsplash.com/@joshappel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="inherit"
            >
              Josh Appel
            </Link>
            &nbsp;on&nbsp;
            <Link
              target="_blank"
              rel="noopener"
              href="https://unsplash.com/s/photos/money?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              color="inherit"
            >
              Unsplash
            </Link>
          </span>
        </Typography>
      </header>
    </div>
  );
};

export default LandingPage;
