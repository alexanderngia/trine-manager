import axios from "axios";
import { useState } from "react";

export const useApi = (url: string, pathDB: string) => {
  const [response, setResponse] = useState([]);
  const [fetchStatus, setFetchStatus] = useState<string>("");

  const getData = async () => {
    try {
      setFetchStatus("Loading");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL + url}`);
      const resData = res.data.pathDB;
      setResponse(resData);

      setFetchStatus("Success");
    } catch (error) {
      console.log(error);
    }
  };

  return [response, fetchStatus, getData] as const;
};
