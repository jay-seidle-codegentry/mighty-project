import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const transactions = "/api/transactions";
const inbox = transactions + "/inbox";

export const getTransactions = async (params) => {
  const { token, page } = params;
  let requestUrl = transactions;
  requestUrl = requestUrl + "/inbox/" + page;
  const responseData = await fetchIt(host + requestUrl, token);
  return responseData;
};

export const getInboxTransactions = async (params) => {
  const { token, page } = params;
  const requestUrl = inbox + "/" + page;
  const responseData = await fetchIt(host + requestUrl, token);
  return responseData;
};

export default getTransactions;
