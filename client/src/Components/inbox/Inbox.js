import React, { useContext, useRef, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import PublishIcon from "@material-ui/icons/Publish";
import InboxCard from "./InboxCard";
import ImportVerification from "./ImportVerification";
import { TransactionContext } from "../transaction/TransactionProvider";
import { GlobalContext } from "../Global/GlobalProvider";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";
import {
  uploadTransactions,
  assignEnvelopeToTransaction,
} from "../../usecases/transactions_api.usecase";
import Dialoger from "../core/Dialoger";
import { AccountSelector } from "../accounts/AccountSelector";
import { EnvelopeSelector } from "../envelopes/EnvelopeSelector";

export const Inbox = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const globalContext = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]);
  const [stagedTransactionInfo, setStagedTransactionInfo] = useState(null);
  const transactionContext = useContext(TransactionContext);

  const inboxItemsHandler = (inboxItems) => {
    setTransactions(inboxItems);
  };

  const stagedDataHandler = (stagedDataInfo) => {
    setUiState(3); //??????
    setStagedTransactionInfo(stagedDataInfo);
  };

  useEffect(() => {
    globalContext.subscribe("inbox", inboxItemsHandler);
    globalContext.subscribe("stagedData", stagedDataHandler);

    return () => {
      globalContext.unsubscribe("stagedData", stagedDataHandler);
      globalContext.unsubscribe("inbox", inboxItemsHandler);
    };
  }, [globalContext]);

  const classes = useStyles();

  const { expanded, onChange } = props;

  const buildInboxCard = (transaction, index) => {
    let showDark = !Boolean(index % 2);
    return (
      <InboxCard
        id={"ic_" + index}
        key={index}
        transaction={transaction}
        dark={showDark}
        assignHandler={showAssign}
      />
    );
  };

  const uploader = useRef(null);

  const selectedAccount = useRef();

  const [showAccountSelector, setShowAccountSelector] = useState(false);

  const activeTransaction = useRef();
  const [uiState, setUiState] = useState(0);

  useEffect(() => {
    if (uiState === 0) return;
    setShowAccountSelector(Boolean(uiState === 1));
    if (uiState === 2) {
      uploader.current.click();
      setUiState(0);
    }
  }, [uiState]);

  const triggerUpload = (event) => {
    event.stopPropagation();
    if (uiState !== 0) return;
    selectedAccount.current = null;
    setUiState(1);
  };

  const dialogerCloseHandler = () => {
    if (uiState === 1) {
      setUiState(0);
    }
  };

  const [showAssignItem, setShowAssignItem] = useState(false);
  const showAssign = (transaction) => {
    activeTransaction.current = transaction;
    setShowAssignItem(true);
  };

  const envelopeAssigned = async (result) => {
    const { canceled, envelope, message } = result;
    setShowAssignItem(false);
    if (canceled) {
      console.log(message);
    } else {
      const params = {
        body: {
          transactionId: activeTransaction.current.id,
          envelopeId: envelope.id,
        },
      };
      transactionContext.withTransactions(assignEnvelopeToTransaction, params);
    }
  };

  const dialogerEnvelopeCloseHandler = () => {
    setShowAccountSelector(false);
  };

  const accountSelected = (result) => {
    selectedAccount.current = result.account;
    setUiState(2);
    if (result.message) console.log(result.message);
  };

  const fileSelected = (event) => {
    if (!event.target.value) return;

    if (event.target.files.length < 1) return;
    const file = event.target.files[0];

    transactionContext.withTransactions(uploadTransactions, {
      account: selectedAccount.current,
      type: "csv",
      file: file,
    });
    event.target.value = "";
  };

  const dialogerImportCloseHandler = () => {
    if (uiState === 3) {
      setStagedTransactionInfo(null);
      setUiState(0);
    }
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
              {transactions.length === 0 && (
                <Typography>{T.Inbox.NoItems}</Typography>
              )}
              {transactions.map((transaction, index) => {
                return buildInboxCard(transaction, index);
              })}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {uiState === 1 && (
        <Dialoger
          open={showAccountSelector}
          closeHandler={dialogerCloseHandler}
        >
          <AccountSelector accountSelectedHandler={accountSelected} />
        </Dialoger>
      )}
      {Boolean(uiState === 3 && stagedTransactionInfo) && (
        <Dialoger
          open={Boolean(uiState === 3 && stagedTransactionInfo)}
          closeHandler={dialogerImportCloseHandler}
        >
          <ImportVerification closeHandler={dialogerImportCloseHandler} />
        </Dialoger>
      )}
      {showAssignItem && (
        <Dialoger
          open={showAssignItem}
          closeHandler={dialogerEnvelopeCloseHandler}
        >
          <EnvelopeSelector envelopeSelectedHandler={envelopeAssigned} />
        </Dialoger>
      )}
    </>
  );
};

export default Inbox;
