import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const transactions = "/api/transactions";
const inbox = transactions + "/inbox";
const upload = transactions + "/upload";
const importT = transactions + "/import";
const assign = transactions + "/assign";

export const getTransactions = async (params) => {
  const { page } = params;
  let requestUrl = transactions;
  requestUrl = requestUrl + "/inbox/" + page;
  const responseData = await fetchIt(host + requestUrl, params);
  return responseData;
};

export const getInboxTransactions = async (params) => {
  const { page } = params;
  const requestUrl = inbox + "/" + page;
  const responseData = await fetchIt(host + requestUrl, params);
  return responseData;
};

export const uploadTransactions = async (params) => {
  const responseData = await fetchIt(host + upload, params);
  return responseData;
};

export const importStoredTransactions = async (params) => {
  const responseData = await fetchIt(host + importT, params);
  return responseData;
};

export const assignEnvelopeToTransaction = async (params) => {
  const responseData = await fetchIt(host + assign, params);
  return responseData;
};

export default getTransactions;
