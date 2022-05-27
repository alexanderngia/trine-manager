import { actionType } from "./actionTypes";

export const userLoginSuccess = (currentUser: any) => ({
  type: actionType.ADD_USER_SUCCESS,
  payload: currentUser,
});

export const userLoginFail = () => ({
  type: actionType.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionType.PROCESS_LOGOUT,
});
