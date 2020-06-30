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
    if (props.type === "inbox") {
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
      const response = await retrieveTransactions({ token: token, ...params });
console.log(response);
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

  const executeTransactionalUsecase = async (retrieveTransactions, params) => {
    // Setting no state here;  relying on profile update to refresh when account balance is set
    try {
      const token = await getTokenSilently();
      await retrieveTransactions({ token: token, ...params });
    } catch (e) {
      const errorMessage = { error: JSON.stringify(e.message, null, 2) };
      setErrorState(errorMessage);
    }
  };

  const [uploading, setUploading] = useState(false);
  const [stagedTransactionInfo, setStagedTransactionInfo] = useState(null);

  const uploadTransactions = async (retrieveUploadTransactions, params) => {
    setUploading(true);
    try {
      const token = await getTokenSilently();
      const response = await retrieveUploadTransactions({
        token: token,
        ...params,
      });

      // console.log(
      //   response.data.responseState
      //     ? response.data.responseState.msg
      //     : "no response state"
      // );

      setErrorState(
        response.error ? response.error : initialContext.errorState
      );

      setStagedTransactionInfo(response.data ? response.data : null);
    } catch (e) {
      const errorMessage = { error: JSON.stringify(e.message, null, 2) };
      setErrorState(errorMessage);
    }
    setUploading(false);
  };

  if (initializing) {
    createTransactionContext(runMethod, { page: 0 });
    setInitializing(false);
  }

  const provider = {
    loading,
    uploading,
    errorState,
    page,
    more,
    transactions,
    stagedTransactionInfo,
    setNextPage: async (params) => {
      createTransactionContext(runMethod, { page: page + 1, ...params });
    },
    setPrevPage: async (params) => {
      createTransactionContext(runMethod, { page: page - 1, ...params });
    },
  };

  // TODO: This is how i should have done all setter functions this way - REFACTOR and add to provider value
  const setUploadTransactions = (transactionUsecase, params) => {
    uploadTransactions(transactionUsecase, params);
  };

  const clearStagedTransactions = () => {
    setStagedTransactionInfo(null);
  };

  const executeNonStateUsecase = async (transactionUsecase, params) => {
    await executeTransactionalUsecase(transactionUsecase, params);
  };

  return (
    <TransactionContext.Provider
      value={{ provider, executeNonStateUsecase, setUploadTransactions, clearStagedTransactions }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
