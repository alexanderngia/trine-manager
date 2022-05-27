import axios from "../axios";

const handleProductApi = () => {
  return axios.post("/api/login");
};

export { handleProductApi };
