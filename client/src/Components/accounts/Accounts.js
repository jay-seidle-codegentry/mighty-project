import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";
import { SummationPanel } from "../core";

function change(event) {
  alert(event + " button clicked");
}

function remove(event) {
  alert(event + " button clicked");
}

function showTransactions(event) {
  alert(event + " show transactions clicked");
}

const handlers = {
  showIconHandler: showTransactions,
  changeIconHandler: change,
  removeIconHandler: remove,
};

export const Accounts = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const profileContext = useContext(ProfileContext);
  const { accounts } = profileContext;
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const buildAccountCard = (handlers, account, index) => {
    return (
      <SummationPanel
        key={index}
        expanded={expanded === "panel" + index}
        onChange={handleChange("panel" + index)}
        id={"panel" + index}
        title={account.title}
        detail={account.detail}
        hideDetail={true}
        transactionHandler={handlers.showIconHandler}
        changeHandler={handlers.changeIconHandler}
        removeHandler={handlers.removeIconHandler}
      />
    );
  };

  return (
    <ExpansionPanel square expanded={props.expanded} onChange={props.onChange}>
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
        <div className={classes.top}>
          {accounts.map((account, index) => {
            return buildAccountCard(handlers, account, index);
          })}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Accounts;
