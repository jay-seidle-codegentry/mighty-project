import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

export const ExpansionPanel = withStyles({
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

export const ExpansionPanelSummary = withStyles({
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

export const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
