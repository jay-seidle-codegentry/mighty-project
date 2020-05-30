import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import PublishIcon from "@material-ui/icons/Publish";
import InboxCard from "./InboxCard";
import { LanguageContext } from "../../Components/locale/LanguageProvider";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from "../core/ExpansionPanels";

export const Inbox = (props) => {
  const [transactions, setNewTransactions] = useState([
    {
      amount: "-105.97",
      date: "Mon, December 17",
      description: "VERIZON ONLINE PMT",
      account: "Checking",
      type: "purchase",
      assignHandler: () => alert("whoa assign it"),
    },
    {
      amount: "10294.97",
      date: "Mon, December 17",
      description: "U-TRADE Direct Deposit",
      account: "Checking",
      type: "purchase",
      assignHandler: () => alert("whoa assign it"),
    },
    {
      amount: "-105.97",
      date: "Mon, December 17",
      description: "VERIZON ONLINE PMT",
      account: "Checking",
      type: "deposit",
      assignHandler: () => alert("whoa assign it"),
    },
  ]);
  const T = useContext(LanguageContext).dictionary;
  const classes = useStyles();

  const { expanded, onChange } = props;

  const buildInboxCard = (transaction, index) => {
    let showDark = !Boolean(index % 2);
    return (
      <InboxCard
        key={index}
        amount={transaction.amount}
        date={transaction.date}
        description={transaction.description}
        dark={showDark}
        account={transaction.account}
        type={transaction.type}
        assignHandler={transaction.assignHandler}
      />
    );
  };

  return (
    <ExpansionPanel square expanded={expanded} onChange={onChange}>
      <ExpansionPanelSummary aria-controls="inbox-content" id="inbox-header">
        <Typography className={classes.top} component="div">
          <Grid container>
            <Grid item sm={1} xs={2}>
              <MoveToInboxIcon className={classes.floatIcon} fontSize="large" />
            </Grid>
            <Grid className={classes.title} item xs={8} sm={10}>
              {T.Panels.Inbox}
            </Grid>
            <Grid item container xs={1}>
              <IconButton
                className={classes.buttons}
                disableFocusRipple={true}
                disableRipple={true}
              >
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
  );
};

export default Inbox;
