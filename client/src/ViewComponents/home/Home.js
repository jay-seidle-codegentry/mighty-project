import React, { useState } from "react";
import Inbox from "../../Components/inbox/Inbox";
import Accounts from "../../Components/accounts/Accounts";
import Envelopes from "../../Components/envelopes/Envelopes";
import TransactionProvider from "../../Components/transaction/TransactionProvider";

export const Home = (props) => {
  const [expanded, setExpanded] = useState("inbox");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <TransactionProvider type="inbox">
        <Inbox
          expanded={expanded === "inbox"}
          onChange={handleChange("inbox")}
        />
      </TransactionProvider>
      <Envelopes
        expanded={expanded === "envelopes"}
        onChange={handleChange("envelopes")}
      />
      <Accounts
        expanded={expanded === "accounts"}
        onChange={handleChange("accounts")}
      />
    </>
  );
};

export default Home;
