import React, { useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { removeAccount } from "../../usecases/profile-api.usecase";
import RemoveModal from "../core/Remove.modal";
import Dialoger from "../core/Dialoger";
import { AccountEditor } from "./AccountEditor";
import { GlobalContext } from "../Global/GlobalProvider";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";
import { SummationPanel } from "../core";

function showTransactions(event) {
  alert(event + " show transactions clicked");
}

export const Accounts = (props) => {
  const globalContext = useContext(GlobalContext);
  const T = useContext(LanguageContext).dictionary;
  const profileContext = useContext(ProfileContext);
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);
  const [changeItem, setChangeItem] = useState(null);

  const accountsHandler = (accounts) => {
    if(accounts) setAccounts(accounts);
  };

  useEffect(() => {
    globalContext.subscribe("accounts", accountsHandler);

    return () => {
      globalContext.unsubscribe("accounts", accountsHandler);
    };
  }, [globalContext]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeClicked = (account) => {
    setChangeItem(account);
  };

  const removeClicked = (account) => {
    setRemoveItem(account);
  };

  const changeClosed = (payload) => {
    setChangeItem(false);
  };

  const yesRemove = (account) => {
    profileContext.withProfile(removeAccount, { body: { id: account.id } });
    setRemoveItem(null);
  };

  const noRemove = (account) => {
    setRemoveItem(null);
  };

  const triggerAddAccount = (event) => {
    event.stopPropagation();
    setChangeItem({});
  };

  const buildAccountCard = (account, index) => {
    return (
      <SummationPanel
        key={index}
        expanded={expanded === "panel" + index}
        onChange={handleChange("panel" + index)}
        id={account}
        title={account.title}
        detail={account.detail}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={changeClicked}
        removeHandler={removeClicked}
      />
    );
  };

  return (
    <>
      <ExpansionPanel
        square
        expanded={props.expanded}
        onChange={props.onChange}
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
                  onClick={triggerAddAccount}
                >
                  <AddIcon className={classes.action} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.top}>
            {accounts.length === 0 && (
              <Typography>{T.Accounts.NoAccounts}</Typography>
            )}
            {accounts.map((account, index) => {
              return buildAccountCard(account, index);
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {removeItem && (
        <RemoveModal
          accountModal
          open={removeItem != null}
          item={removeItem}
          yesHandler={yesRemove}
          noHandler={noRemove}
        />
      )}
      {changeItem && (
        <Dialoger open={changeItem != null}>
          <AccountEditor account={changeItem} closeHandler={changeClosed} />
        </Dialoger>
      )}
    </>
  );
};

export default Accounts;
