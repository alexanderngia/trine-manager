import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/`;

const getCustomerBoard = (idCus: string | number) => {
  return axios.get(API_URL + `customer?id=${idCus}`);
};

const customerService = {
  getCustomerBoard,
};
export default customerService;
