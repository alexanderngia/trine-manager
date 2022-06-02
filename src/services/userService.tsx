import axios from "axios";
// import authHeader from "./authHeader";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/`;
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
// const requestConfig: AxiosRequestConfig = { headers: authHeader() };
const getUserBoard = (idUser: string | number) => {
  return axios.get(API_URL + `?id=${idUser}`);
};

const handleUpdateApi = async (updatedData: any) => {
  return await axios.put(API_URL + "edit", updatedData);
};
const handleDeleteApi = async (userId: any) => {
  return await axios.delete(API_URL + "delete", {
    data: {
      id: userId,
    },
  });
};

const userService = {
  getUserBoard,
  handleUpdateApi,
  handleDeleteApi,
};
export default userService;
