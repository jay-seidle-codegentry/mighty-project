import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const profile = "/api/profile";
const accountRemove = "/api/account/remove";
const accountSave = "/api/account/save";

export const getProfile = async (params) => {
  const responseData = await fetchIt(host + profile, params);
  return responseData;
};

export const setProfile = async (params) => {
  const responseData = await fetchIt(host + profile, params);
  return responseData;
};

export const removeAccount = async (params) => {
  const responseData = await fetchIt(host + accountRemove, params);
  return responseData;
};

export const saveAccount = async (params) => {
  const responseData = await fetchIt(host + accountSave, params);
  return responseData;
}

export default getProfile;
