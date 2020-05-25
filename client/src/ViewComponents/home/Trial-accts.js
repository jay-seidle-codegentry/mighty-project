import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import { CurrencyAmount, SummationPanel, RemoveChangeIconGroup } from "../../Components/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    textAlign: "right",
    marginRight: "10px",
    fontWeight: "800",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(17),
    color: theme.palette.text.secondary,
    fontWeight: "600",
  },
}));

function change(event) {
  alert(event + " button clicked");
}

function remove(event) {
  alert(event + " button clicked");
}

function showTransactions(event) {
  alert(event + " show transactions clicked");
}

function bump(event) {
  event.stopPropagation();
  alert(event.target.innerHTML);
}

export default function TrialAccounts() {
  const classes = useStyles();
  //const leftButton = clsx(classes.settingsButton, classes.buttons);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const things = [
    { name: "Checking111", amount: "1325.22" },
    { name: "Checking222", amount: "-995.22" },
  ];

  return (
    <div className={classes.root}>
       <SummationPanel
        id="panel999"
        title="Whoa Thingy"
        detail={things}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={change}
        removeHandler={remove}
      />
     <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={5} sm={3}>
              <Typography className={classes.heading}>
                <CurrencyAmount amount="13807.53" />
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Checking Account
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                style={{ padding: "unset" }}
                disableFocusRipple={true}
                disableRipple={true}
                onClick={bump}
              >
                <MoreHorizIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{ marginTop: "-30px", width: "100%" }}
            component="div"
          >
            <RemoveChangeIconGroup id="panel1" changeHandler={change} removeHandler={remove} />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Grid container>
            <Grid item xs={5} sm={3}>
              <Typography className={classes.heading}>
                <CurrencyAmount amount="1201.79" />
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Savings Account
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <MoreHorizIcon />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{ marginTop: "-30px", width: "100%" }}
            component="div"
          >
            <RemoveChangeIconGroup id="panel2" changeHandler={change} removeHandler={remove} />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Grid container>
            <Grid item xs={5} sm={3}>
              <Typography className={classes.heading}>
                <CurrencyAmount amount="-978.09" />
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Chase Card
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <MoreHorizIcon />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{ marginTop: "-30px", width: "100%" }}
            component="div"
          >
            <RemoveChangeIconGroup id="panel3" changeHandler={change} removeHandler={remove} />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
