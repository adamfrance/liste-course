import { useState, useEffect } from "react";

const useDataFetching = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(url);
        const result = await data.json();

        if (result) {
          setData(result);
          setLoading(true);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
    return () => {
      setData([])
      setError('')
      setLoading(false)
    }
  }, [url]);
  return [loading, error, data];
};

export default useDataFetching;
