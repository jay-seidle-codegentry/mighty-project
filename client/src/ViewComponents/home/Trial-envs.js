import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    textAlign: "right",
    marginRight: "10px",
    color: "green",
    fontWeight: "800",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(17),
    color: theme.palette.text.secondary,
    fontWeight: "600",
  },
}));

export default function TrialEnvelopes() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
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
              <Typography className={classes.heading}>$1,807.53</Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Rent / Mortgage
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
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $1,807.53
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Checking Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid style={{marginLeft:"auto"}} item>
                <SettingsIcon style={{ paddingRight: "10px" }} />
                <DeleteIcon />
              </Grid>
            </Grid>
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
              <Typography className={classes.heading}>$201.79</Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Utilities
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
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $100.79
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Checking Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $101.00
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Savings Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid style={{marginLeft:"auto"}} item>
                <SettingsIcon style={{ paddingRight: "10px" }} />
                <DeleteIcon />
              </Grid>
            </Grid>
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
              <Typography className={classes.heading}>$78.09</Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Movies
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
            <Grid container>
              <Grid item>
                <Typography
                  style={{ color: "red" }}
                  component="span"
                  className={classes.heading}
                >
                  $21.91
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Checking Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $100.00
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Savings Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid style={{marginLeft:"auto"}} item>
                <SettingsIcon style={{ paddingRight: "10px" }} />
                <DeleteIcon />
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Grid container>
            <Grid item xs={5} sm={3}>
              <Typography className={classes.heading}>$900,099.99</Typography>
            </Grid>
            <Grid item xs={5} sm={8}>
              <Typography className={classes.secondaryHeading}>
                Savings
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
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $99.99
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Checking Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="span" className={classes.heading}>
                  $900,000.00
                </Typography>
                <Typography
                  component="span"
                  className={classes.secondaryHeading}
                >
                  Savings Account
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid style={{marginLeft:"auto"}} item>
                <SettingsIcon style={{ paddingRight: "10px" }} />
                <DeleteIcon />
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
