import { fetchIt } from "../utils/FetchIt";
require("dotenv");

const host =
  process.env.REACT_APP_API_ORIGIN + ":" + process.env.REACT_APP_API_PORT;
const profile = "/api/profile";
//const extApi = "/api/external";
//const timeStamp = "/api/timestamp";

export const getProfile = async (params) => {
  const { token } = params;
  const responseData = await fetchIt(host + profile, token);
  return responseData;
};

export const setProfile = async (params) => {
  console.log(params);
  const { token, body } = params;
  console.log(body);
  const responseData = await fetchIt(host + profile, token, body);
  return responseData;
};

export const updateProfile = async (token) => {};

export const getTimestamp = async () => {
  // var response;
  // try {
  //   const responseData = { data: "pizza" }; //await useFetch({ endPoint: timeStamp });
  //   response = successResponse(responseData);
  // } catch (error) {
  //   console.error(error);
  //   response = errorResponse(error);
  // }
  // return response;
};

export default getProfile;
