import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { IconButton } from "@material-ui/core";
import { CurrencyAmount } from "../core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dark: {
    background: "#E3E3E3",
  },
  light: {
    background: "white",
  },
  icon: {
    paddingTop: "5px",
    float: "left",
  },
  bigger: {
    fontSize: 20,
  },
  currency: {
    fontWeight: "bold",
    fontSize: 20,
  },
  assignButton: {
    padding: "unset",
  },
}));

const TransactionIcon = (type, style) => {
  return <ReceiptIcon className={style} />;
};

export default function InboxCard(props) {
  const {
    transaction,
    assignHandler,
    dark,
  } = props;

  const onAssignClick = () => {
    assignHandler(transaction);
  };

  const classes = useStyles();
  const cardStyle = dark ? classes.dark : classes.light;

  const {date, amount, type, description, account} = transaction;

  return (
    <Grid container spacing={1} direction="column">
      <Grid className={cardStyle} item container xs={12}>
        <Grid item xs={1}>
          {TransactionIcon(type, classes.icon)}
        </Grid>
        <Grid
          alignContent="flex-start"
          direction="column"
          item
          container
          xs={3}
        >
          <Grid className={classes.currency}>
            <CurrencyAmount amount={amount} />
          </Grid>
          <Grid>{date}</Grid>
        </Grid>
        <Grid
          alignContent="flex-start"
          direction="column"
          item
          container
          xs={7}
        >
          <Grid className={classes.bigger}>{description}</Grid>
          <Grid>{account.title}</Grid>
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.assignButton} onClick={onAssignClick}>
            <PostAddIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
