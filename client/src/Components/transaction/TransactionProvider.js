import React, { useContext } from "react";
import {
  getInboxTransactions,
  getTransactions,
} from "../../usecases/transactions_api.usecase";
import { useAuth0 } from "../../react-auth0-spa";
import { GlobalContext } from "../Global/GlobalProvider";

// Setup Context and Initialize
export const TransactionContext = React.createContext();

// Create Provider
export const TransactionProvider = (props) => {
  const globalContext = useContext(GlobalContext);
  let subject = "transactions";
  let runMethod = getTransactions;
  if (props) {
    if (props.type === "inbox") {
      subject = "inbox";
      runMethod = getInboxTransactions;
    }
  }
  const { getTokenSilently } = useAuth0();

  const secureParams = async (params) => {
    const token = await getTokenSilently();
    return { token: token, ...params };
  };

  const withTransactions = async (usecase, params) => {
    const results = await usecase(await secureParams(params));
    globalContext.publish(subject, results);
    //if (results.envelopes) profileContext.updateEnvelopes(results.envelopes);
  };

  globalContext.addInitializer(subject, withTransactions, runMethod, {
    page: 0,
  });

  const provider = {
    withTransactions: withTransactions,
    // setNextPage: async (params) => {
    //   createTransactionContext(runMethod, { page: page + 1, ...params });
    // },
    // setPrevPage: async (params) => {
    //   createTransactionContext(runMethod, { page: page - 1, ...params });
    // },
  };

  return (
    <TransactionContext.Provider value={provider}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
