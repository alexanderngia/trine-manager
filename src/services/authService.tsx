import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/`;

export interface IUser {
  user: any;
}

export interface RegisterProps {
  userName: string;
  userEmail: string;
  userPass: string;
  userPhone: string;
  userGender: string;
  userAdress: string;
  userRole: string;
}

const handleRegisterApi = ({
  userName,
  userEmail,
  userPass,
  userPhone,
  userGender,
  userAdress,
  userRole,
}: RegisterProps) => {
  return axios.post(API_URL + "signup", {
    fullNameUser: userName,
    emailUser: userEmail,
    passwordUser: userPass,
    phoneUser: userPhone,
    genderUser: userGender,
    adressUser: userAdress,
    idRole: userRole,
  });
};

const handleLoginApi = async (userName: string, userPass: string) => {
  const res = await axios.post(API_URL + "signin", {
    emailUser: userName,
    passwordUser: userPass,
  });

  const { data } = res;
  if (data.accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const authService = {
  handleRegisterApi,
  handleLoginApi,
};
export default authService;
