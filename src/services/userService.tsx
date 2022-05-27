import axios from "axios";
// import authHeader from "./authHeader";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/`;
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
// const requestConfig: AxiosRequestConfig = { headers: authHeader() };
const getUserBoard = (idUser: string | number) => {
  return axios.get(API_URL + `user?id=${idUser}`);
};
const getCustomerBoard = (idCus: string | number) => {
  return axios.get(API_URL + `customer?id=${idCus}`);
};
const getOrderBoard = (idOrder: string | number) => {
  return axios.get(API_URL + `order-list?id=${idOrder}`);
};
const getProductBoard = (idProduct: string | number) => {
  return axios.get(API_URL + `warehouse?id=${idProduct}`);
};
const userService = {
  getUserBoard,
  getCustomerBoard,
  getOrderBoard,
  getProductBoard,
};
export default userService;
