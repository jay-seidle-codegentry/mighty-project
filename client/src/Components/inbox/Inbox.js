import React, { useContext, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import PublishIcon from "@material-ui/icons/Publish";
import InboxCard from "./InboxCard";
import { TransactionContext } from "../transaction/TransactionProvider";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";
import { uploadTransactions } from "../../usecases/transactions_api.usecase";
import Dialoger from "../core/Dialoger";
import { AccountSelector } from "../accounts/AccountSelector";

export const Inbox = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const setUploadTransactions = useContext(TransactionContext)
    .setUploadTransactions;
  const { transactions } = useContext(TransactionContext).provider;
  const classes = useStyles();

  const { expanded, onChange } = props;

  const [showAccountSelector, setShowAccountSelector] = useState(false);

  const assign = (event) => {
    alert("assign transaction from " + event);
  };

  const buildInboxCard = (transaction, index) => {
    let showDark = !Boolean(index % 2);
    return (
      <InboxCard
        id={"ic_" + index}
        key={index}
        amount={transaction.amount}
        date={transaction.date}
        description={transaction.description}
        dark={showDark}
        account={transaction.account}
        type={transaction.type}
        assignHandler={assign}
      />
    );
  };

  const uploader = useRef(null);

  const triggerUpload = (event) => {
    event.stopPropagation();
    setShowAccountSelector(true);
  };

  const accountSelected = (result) => {
    const { account, message} = result;
    setShowAccountSelector(false);
    if(message) console.log(message);
    if (account) {
      uploader.current.click();
    }
  };

  const fileSelected = (event) => {
    if(!event.target.value) return;
    setShowAccountSelector(false);
    const formData = new FormData();
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    formData.append("csv", event.target.files[0], event.target.files[0].name);
    setUploadTransactions(uploadTransactions, { type: "csv", file: file });
    event.target.value="";
  };

  return (
    <>
      <ExpansionPanel square expanded={expanded} onChange={onChange}>
        <ExpansionPanelSummary aria-controls="inbox-content" id="inbox-header">
          <Typography className={classes.top} component="div">
            <Grid container>
              <Grid item sm={1} xs={2}>
                <MoveToInboxIcon
                  className={classes.floatIcon}
                  fontSize="large"
                />
              </Grid>
              <Grid className={classes.title} item xs={8} sm={10}>
                {T.Panels.Inbox}
              </Grid>
              <Grid item container xs={1}>
                <IconButton
                  className={classes.buttons}
                  disableFocusRipple={true}
                  disableRipple={true}
                  onClick={triggerUpload}
                >
                  <input
                    onChange={fileSelected}
                    type="file"
                    style={{ display: "none" }}
                    accept=".csv, text/csv"
                    ref={uploader}
                  />
                  <PublishIcon className={classes.action} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.root}>
            <Typography component="div">
              {transactions.map((transaction, index) => {
                return buildInboxCard(transaction, index);
              })}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {showAccountSelector && (
        <Dialoger open={showAccountSelector} closeHandler={accountSelected}>
          <AccountSelector accountSelectedHandler={accountSelected} />
        </Dialoger>
      )}
    </>
  );
};

export default Inbox;
