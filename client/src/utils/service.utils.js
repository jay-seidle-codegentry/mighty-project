export const fetchIt = async (requestParams) => {
  const { token, endPoint } = requestParams;
  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;

  const response = await fetch(endPoint, headers);

  return response.json();
};
