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
      <SummationPanel
        expanded={expanded === "panel999"}
        onChange={handleChange("panel999")}
        id="panel999"
        title="Whoa Thingy"
        detail={[
          { name: "Checking111", amount: "1325.22" },
          { name: "Checking222", amount: "-995.22" },
        ]}
      />
      <SummationPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        id="panel1"
        title="Rent / Mortgage"
        detail={[{ name: "Checking", amount: "1807.53" }]}
      />
      <SummationPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        id="panel2"
        title="Utilities"
        detail={[
          { name: "Checking", amount: "100.79" },
          { name: "Savings", amount: "101.00" },
        ]}
      />
      <SummationPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        id="panel3"
        title="Movies"
        detail={[
          { name: "Checking", amount: "22.91" },
          { name: "Savings", amount: "100.00" },
        ]}
      />
      <SummationPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        id="panel4"
        title="Savings"
        detail={[
          { name: "Checking", amount: "99.99" },
          { name: "Savings", amount: "900000.00" },
        ]}
      />
    </div>
  );
}
