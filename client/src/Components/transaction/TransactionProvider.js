import React, { useContext, useState } from "react";
import {
  getInboxTransactions,
  getTransactions,
} from "../../usecases/transactions_api.usecase";
import { useAuth0 } from "../../react-auth0-spa";

const initialContext = {
  loading: true,
  page: 0,
  more: false,
  errorState: {},
  transactions: [],
};

// Setup Context and Initialize
export const TransactionContext = React.createContext(initialContext);

// Create Provider
export const TransactionProvider = (props) => {
  let runMethod = getTransactions;
  if (props) {
    if(props.type === "inbox") {
      runMethod = getInboxTransactions;
    }
  }
  const { getTokenSilently } = useAuth0();
  const transactionContext = useContext(TransactionContext);
  const [initializing, setInitializing] = useState(true);

  // internal states
  const [loading, setLoading] = useState(transactionContext.loading);
  const [page, setPage] = useState(transactionContext.page);
  const [more, setMore] = useState(transactionContext.more);
  const [errorState, setErrorState] = useState(transactionContext.errorState);

  const [transactions, setTransactions] = useState(
    transactionContext.transactions
  );

  const createTransactionContext = async (retrieveTransactions, params) => {
    setLoading(true);
    try {
      const token = await getTokenSilently();
      //console.log(params)
      const response = await retrieveTransactions({ token: token, ...params });

      setErrorState(
        response.error ? response.error : initialContext.errorState
      );
      setPage(response.page ? response.page : transactionContext.page);
      setMore(response.more ? response.more : transactionContext.more);
      setTransactions(
        response.transactions
          ? response.transactions
          : transactionContext.transactions
      );
    } catch (e) {
      const errorMessage = { error: JSON.stringify(e.message, null, 2) };
      setErrorState(errorMessage);
    }
    setLoading(false);
  };

  if (initializing) {
    createTransactionContext(runMethod, { page: 0 });
    setInitializing(false);
  }

  const provider = {
    loading,
    errorState,
    page,
    more,
    transactions,
    setNextPage: async (params) => {
      createTransactionContext(runMethod, { page: (page + 1), ...params });
    },
    setPrevPage: async (params) => {
      createTransactionContext(runMethod, { page: (page - 1), ...params });
    },
  };

  return (
    <TransactionContext.Provider value={provider}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
