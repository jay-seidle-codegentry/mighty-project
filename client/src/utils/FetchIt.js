export const fetchIt = async (url, token, body) => {
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

  let data = null;

  const res = await fetch(url, options);
  data = await res.json();

  return data;
};

export default fetchIt;
