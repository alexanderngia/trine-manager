import axios from "../axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/warehouse`;

const getProductBoard = (idProduct: string | number) => {
  return axios.get(API_URL + `?id=${idProduct}`);
};

const productService = {
  getProductBoard,
};
export default productService;
