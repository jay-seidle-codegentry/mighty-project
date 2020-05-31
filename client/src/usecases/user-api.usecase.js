import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const profile = "/api/profile";

export const getProfile = async (params) => {
  const { token, headers } = params;
  const responseData = await fetchIt(host + profile, token, headers);
  return responseData;
};

export const setProfile = async (params) => {
  console.log(params);
  const { token, body } = params;
  console.log(body);
  const responseData = await fetchIt(host + profile, token, body);
  return responseData;
};

export default getProfile;
