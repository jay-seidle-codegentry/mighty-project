import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../locale/LanguageProvider";
import { GlobalContext } from "../Global/GlobalProvider";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { CurrencyAmount } from "../core/CurrencyAmount";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const buildAccountSelectorButton = (account, index, handler) => {
  return (
    <ListItem onClick={handler} key={"item" + index} button>
      <ListItemText style={{ textAlign: "center" }}>
        <strong>
          <span>
            {account.title} {}
          </span>
          <CurrencyAmount amount={account.detail[0].amount} />
        </strong>
      </ListItemText>
    </ListItem>
  );
};

export const AccountSelector = (props) => {
  const globalContext = useContext(GlobalContext);
  const { accountSelectedHandler } = props;
  const { Title, SelectedMessage, SelectOneLabel } = useContext(
    LanguageContext
  ).dictionary.Account.Selector;
  const [accounts, setAccounts] = useState([]);
  const selectedAccount = useRef();

  const accountsHandler = (accounts) => {
    if (accounts) setAccounts(accounts);
  };

  useEffect(() => {
    globalContext.subscribe("accounts", accountsHandler);

    return () => {
      globalContext.unsubscribe("accounts", accountsHandler);
    };
  }, [globalContext]);

  const selectAccount = (account) => {
    selectAccount.current = account;
    accountSelectedHandler({
      account: selectAccount.current,
      message: SelectedMessage,
    });
  };

  const closeIt = () => {
    if (!selectedAccount) accountSelectedHandler({ canceled: true });
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        closeIt();
      }}
    >
      <Typography style={{ textAlign: "center" }} component="div">
        <Typography variant="h3">{Title}</Typography>
        <Typography style={{ textAlign: "left" }}>{SelectOneLabel}</Typography>
        <List component="nav" aria-label="select account to receive upload">
          {accounts.map((account, index) => {
            return buildAccountSelectorButton(account, index, () =>
              selectAccount(account)
            );
          })}
        </List>
      </Typography>
    </ClickAwayListener>
  );
};

export default AccountSelector;
