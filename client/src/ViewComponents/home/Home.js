import React, { useContext, useState } from "react";
import Loading from "../../Components/loading/Loading";
import ErrorView from "../error/ErrorView";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import Inbox from "../../Components/inbox/Inbox";
import Accounts from "../../Components/accounts/Accounts";
import Envelopes from "../../Components/envelopes/Envelopes";
import TransactionProvider from "../../Components/transaction/TransactionProvider";

export const Home = (props) => {
  const profileContext = useContext(ProfileContext);
  const { loading, errorState } = profileContext;
  const [expanded, setExpanded] = useState("inbox");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (loading) return <Loading />;

  if (errorState.error) {
    return <ErrorView message={errorState.error} />;
  }

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
