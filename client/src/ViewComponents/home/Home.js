import React, { useContext } from "react";
import Loading from "../../Components/loading/Loading";
import ErrorView from "../error/ErrorView";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import { Grid, IconButton } from "@material-ui/core";
import TrialEnvelopes from "./Trial-envs";
import TrialAccounts from "./Trial-accts";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../../Components/core/ExpansionPanels";
import Inbox from "../../Components/inbox/Inbox";

export const Home = (props) => {
  const profileContext = useContext(ProfileContext);
  const T = useContext(LanguageContext).dictionary;
  const { loading, errorState } = profileContext;
  const [expanded, setExpanded] = React.useState("inbox");
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (loading) return <Loading />;

  if (errorState.error) {
    return <ErrorView message={errorState.error} />;
  }

  return (
    <>
      <Inbox expanded={expanded === "inbox"} onChange={handleChange("inbox")} />
      <ExpansionPanel
        square
        expanded={expanded === "envelopes"}
        onChange={handleChange("envelopes")}
      >
        <ExpansionPanelSummary
          aria-controls="envelopes-content"
          id="envelopes-header"
        >
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <DraftsIcon className={classes.floatIcon} fontSize="large" />
              </Grid>
              <Grid className={classes.title} item xs={8} sm={10}>
                {T.Panels.Envelopes}
              </Grid>
              <Grid item container xs={1}>
                <IconButton
                  className={classes.buttons}
                  disableFocusRipple={true}
                  disableRipple={true}
                >
                  <AddIcon className={classes.action} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TrialEnvelopes />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "accounts"}
        onChange={handleChange("accounts")}
      >
        <ExpansionPanelSummary
          aria-controls="accounts-content"
          id="accounts-header"
        >
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <AccountBalanceIcon
                  fontSize="large"
                  className={classes.floatIcon}
                />{" "}
              </Grid>
              <Grid className={classes.title} item xs={8} sm={10}>
                {T.Panels.Accounts}
              </Grid>
              <Grid item container xs={1}>
                <IconButton
                  className={classes.buttons}
                  disableFocusRipple={true}
                  disableRipple={true}
                >
                  <AddIcon className={classes.action} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TrialAccounts />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default Home;
