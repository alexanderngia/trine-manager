import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/customer`;

export interface RegisterProps {
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  cusGender: string;
  cusAdress: string;
}
export interface UpdateProps extends RegisterProps {
  id: number;
}

const getCustomerBoard = (idCus: string | number) => {
  return axios.get(API_URL + `?id=${idCus}`);
};

const handleRegisterApi = ({
  cusName,
  cusEmail,
  cusPhone,
  cusGender,
  cusAdress,
}: RegisterProps) => {
  return axios.post(API_URL + "/create", {
    fullNameCus: cusName,
    emailCus: cusEmail,
    phoneCus: cusPhone,
    genderCus: cusGender,
    adressCus: cusAdress,
  });
};

const handleUpdateApi = async ({
  id,
  cusName,
  cusEmail,
  cusPhone,
  cusGender,
  cusAdress,
}: UpdateProps) => {
  return await axios.put(API_URL + "/edit", {
    id: id,
    fullNameCus: cusName,
    emailCus: cusEmail,
    phoneCus: cusPhone,
    genderCus: cusGender,
    adressCus: cusAdress,
  });
};
const handleDeleteApi = async (userId: any) => {
  return await axios.delete(API_URL + "/delete", {
    data: {
      id: userId,
    },
  });
};

const customerService = {
  getCustomerBoard,
  handleRegisterApi,
  handleUpdateApi,
  handleDeleteApi,
};
export default customerService;
