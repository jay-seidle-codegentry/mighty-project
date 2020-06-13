const axios = require("axios");
const postUpload = async (token, url, file) => {
  var formData = new FormData();
  formData.append("csv", file);

  const res = await axios({
    url: url,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });

  return res;
};

export const fetchIt = async (url, params) => {
  const { token, body, file } = params; //type, headers??
  let options = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  options = body
    ? {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
          ...options.headers,
        },
        body: JSON.stringify(body),
      }
    : options;

  if (file) {
    return postUpload(token, url, file);
  }

  let data = null;

  const res = await fetch(url, options);
  data = await res.json();

  return data;
};

export default fetchIt;
