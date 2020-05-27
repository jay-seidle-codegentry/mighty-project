import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TrialItems from "./TrialItems";
import AddIcon from "@material-ui/icons/Add";
import { Grid, IconButton } from "@material-ui/core";
import TrialEnvelopes from "./Trial-envs";
import TrialAccounts from "./Trial-accts";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 26,
    "&$expanded": {
      minHeight: 26,
    },
  },
  content: {
    margin: "2px",
    "&$expanded": {
      margin: "2px",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme) => ({
  top: {
    width: "100%",
  },
  floatIcon: {
    paddingTop: "6px",
  },
  title: {
    fontSize: "2rem",
  },
  action: {
    padding: "6px",
  },
  buttons: {
    padding: "unset",
  },
}));

export const Trial = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <MoveToInboxIcon
                  className={classes.floatIcon}
                  fontSize="large"
                />
              </Grid>
              <Grid className={classes.title} item xs={9} sm={10}>
                Inbox
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TrialItems />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <DraftsIcon className={classes.floatIcon} fontSize="large" />
              </Grid>
              <Grid className={classes.title} item xs={8} sm={10}>
                Envelopes
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
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
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
                Accounts
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
    </div>
  );
};

export default Trial;
