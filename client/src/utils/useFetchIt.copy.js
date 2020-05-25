import { useEffect, useState } from "react";

export const fetchIt = async (url, token) => {
  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;

  let data = null;
  let error = null;

  try {
    const res = await fetch(url, headers);
    data = await res.json();
  } catch (e) {
    error = e;
  }

  return { res: data, err: error };
};

const useFetchIt = (url, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mUrl = url;
  const mToken = token;

  useEffect(() => {
    (async () => refresh())();
  }, [url, token]);

  const refresh = async () => {
    setLoading(true);
    const { res, err } = await fetchIt(url, token);
    if (res) {
      setData(res);
    }
    if (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, error, loading, refresh };
};

export default useFetchIt;
