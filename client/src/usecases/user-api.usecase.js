import { successResponse, errorResponse } from "../utils/json.utils";
import { fetchIt } from "../utils/service.utils";

//const profile = "http://localhost:3001/api/profile";
const extApi = "http://localhost:3001/api/external";
const timeStamp = "http://localhost:3001/api/timestamp";

export const getProfile = async (token) => {
  var response;
  try {
    const responseData = await fetchIt({ token: token, endPoint: extApi });

    response = successResponse({
        exists: true,
        nickName: responseData.msg,
        email: "",
        onBoarded: Date.now,
        errorState: {},      
    });
  } catch (error) {
    console.error(error);
    response = errorResponse(error);
  }

  return response;
};

export const setProfile = async (token, profile) => {
    return successResponse({
        exists: true,
        nickName: profile.nickName,
        email: profile.email,
        onBoarded: Date.now,
        errorState: {},      
    });
};

export const updateProfile = async (token) => {};

export const getTimestamp = async () => {
  var response;
  try {
    const responseData = await fetchIt({ endPoint: timeStamp });

    response = successResponse(responseData);
  } catch (error) {
    console.error(error);
    response = errorResponse(error);
  }
  return response;
};
