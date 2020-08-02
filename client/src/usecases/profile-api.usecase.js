import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const profile = "/api/profile";
const userPreferences = "/api/user-preferences";
const accountRemove = "/api/account/remove";
const accountSave = "/api/account/save";
const envelopeRemove = "/api/envelope/remove";
const envelopeSave = "/api/envelope/save";

export const getProfile = async (params) => {
  const responseData = await fetchIt(host + profile, params);
  if (responseData.profile) {
    if (!responseData.profile.avatar) {
      responseData.profile.avatar = params.avatar;
    }
  }
  return responseData;
};

export const setProfile = async (params) => {
  const responseData = await fetchIt(host + profile, params);
  return responseData;
};

export const getPreferences = async (params) => {
  const responseData = await fetchIt(host + userPreferences, params);
  return responseData;
};

export const setPreferences = async (params) => {
  const responseData = await fetchIt(host + userPreferences, params);
  return responseData;
};

export const removeAccount = async (params) => {
  const responseData = await fetchIt(host + accountRemove, params);
  return responseData;
};

export const saveAccount = async (params) => {
  const responseData = await fetchIt(host + accountSave, params);
  return responseData;
};

export const removeEnvelope = async (params) => {
  const responseData = await fetchIt(host + envelopeRemove, params);
  return responseData;
};

export const saveEnvelope = async (params) => {
  const responseData = await fetchIt(host + envelopeSave, params);
  return responseData;
};

export default getProfile;
