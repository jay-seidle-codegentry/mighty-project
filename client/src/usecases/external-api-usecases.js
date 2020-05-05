import { successResponse, errorResponse } from "../utils/json.utils";
import { fetchIt } from "../utils/service.utils";

const extApi = "http://localhost:3001/api/external";
const timeStamp = "http://localhost:3001/api/timestamp";

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

export const getExternalApi = async (token) => {
  var response;
  try {
    const responseData = await fetchIt({ token: token, endPoint: extApi });

    response = successResponse(responseData);
  } catch (error) {
    console.error(error);
    response = errorResponse(error);
  }
  return response;
};
