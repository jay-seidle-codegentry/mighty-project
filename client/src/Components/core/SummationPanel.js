import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { CurrencyAmount, RemoveChangeIconGroup } from "../../Components/core";

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
  transactionButton: {
    padding: "unset",
  },
  transactions: {
    marginTop: "-30px",
    width: "100%",
  },
}));

export const SummationPanel = (props) => {
  const classes = useStyles();

  const {
    id,
    title,
    detail,
    hideDetail,
    transactionHandler,
    changeHandler,
    removeHandler,
    expanded,
    onChange,
  } = props;

  const RenderDetail = (details, hideDetails) => {
    const items = [];

    if (!details) return items;

    let sum = 0.0;

    for (const [index, value] of details.entries()) {
      sum = sum + parseFloat(value.amount, 10);

      if (!hideDetails) {
        let key = "sum" + index;
        items.push(
          <Grid key={key} container>
            <Grid item>
              <Typography component="span" className={classes.heading}>
                <CurrencyAmount amount={value.amount} />
              </Typography>
              <Typography component="span" className={classes.secondaryHeading}>
                {value.name}
              </Typography>
            </Grid>
          </Grid>
        );
      }
    }

    return { sum: sum, items: items };
  };

  const { sum, items } = RenderDetail(detail, hideDetail);

  const triggerTransactions = (event) => {
    event.stopPropagation();
    const transId = id;
    if (transactionHandler) transactionHandler(transId);
  };

  const ariaControls = id + "bh-content";
  const idHeader = id + "bh-header";

  return (
    <ExpansionPanel expanded={expanded} onChange={onChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={ariaControls}
        id={idHeader}
      >
        <Grid container>
          <Grid item xs={5} sm={3}>
            <Typography className={classes.heading}>
              <CurrencyAmount amount={sum} />
            </Typography>
          </Grid>
          <Grid item xs={5} sm={8}>
            <Typography className={classes.secondaryHeading}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              className={classes.transactionButton}
              onClick={triggerTransactions}
            >
              <MoreHorizIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.transactions} component="div">
          {items}
          <RemoveChangeIconGroup
            id={id}
            changeHandler={changeHandler}
            removeHandler={removeHandler}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SummationPanel;
