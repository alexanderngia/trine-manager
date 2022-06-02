import axios from "../axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/order-list`;

const getOrderBoard = (idOrder: string | number) => {
  return axios.get(API_URL + `?id=${idOrder}`);
};
const orderService = {
  getOrderBoard,
};
export default orderService;
