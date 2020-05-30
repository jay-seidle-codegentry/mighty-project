import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SummationPanel } from "../../Components/core";

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

export default function TrialAccounts() {
  const classes = useStyles();
  //const leftButton = clsx(classes.settingsButton, classes.buttons);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <SummationPanel
        expanded={expanded === "panel999"}
        onChange={handleChange("panel999")}
        id="panel999"
        title="Whoa Thingy"
        detail={[
          { name: "Checking111", amount: "1325.22" },
          { name: "Checking222", amount: "-995.22" },
        ]}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={change}
        removeHandler={remove}
      />
      <SummationPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        id="panel1"
        title="Checking Account"
        detail={[{ name: "Main Checking", amount: "13807.53" }]}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={change}
        removeHandler={remove}
      />
      <SummationPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        id="panel2"
        title="Savings Account"
        detail={[{ name: "Main Savings", amount: "1201.79" }]}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={change}
        removeHandler={remove}
      />
      <SummationPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        id="panel3"
        title="Chase Card"
        detail={[{ name: "Chase Credit Card", amount: "-978.09" }]}
        hideDetail={true}
        transactionHandler={showTransactions}
        changeHandler={change}
        removeHandler={remove}
      />
    </div>
  );
}
