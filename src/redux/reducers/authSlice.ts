import { messageActions } from "./messageSlice";
import authService from "services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "utils/history";

export interface AuthState {
  isLoggedIn?: boolean;
  user?: any | null;
}

export interface IRegister {
  userName: string;
  userEmail: string;
  userPass: string;
  // confirmPass: string;
  userPhone: string;
  userGender: string;
  userAdress: string;
  userRole: string;
}

export interface ILogin {
  userEmail: string;
  userPass: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      userName,
      userEmail,
      userPass,
      userPhone,
      userGender,
      userAdress,
      userRole,
    }: IRegister,
    thunkAPI
  ) => {
    try {
      const response = await authService.handleRegisterApi({
        userName,
        userEmail,
        userPass,
        userPhone,
        userGender,
        userAdress,
        userRole,
      });
      thunkAPI.dispatch(messageActions.setMessage(response.data.message));
      return response.data;
    } catch (error: any) {
      console.log(error, "Register AuthSlice");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userEmail, userPass }: ILogin, thunkAPI) => {
    const data = await authService.handleLoginApi(userEmail, userPass);

    try {
      // Success Login
      if (data && data.errCode === 0) {
        history.push("/dashboard");
      }
      // Fail Login
      if (data && data.errCode !== 0) {
        thunkAPI.dispatch(messageActions.setMessage(data.message));
      }
      return { user: data.user };
    } catch (error: any) {
      console.log(error, "Login AuthSlice");
    }
  }
);

const initialState: AuthState = { isLoggedIn: false, user: null };

// Reducer
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },

  extraReducers: {
    // [register.fulfilled.toString()]: (state: AuthState) => {
    //   state.isLoggedIn = true;
    // },
    // [register.rejected.toString()]: (state: AuthState) => {
    //   state.isLoggedIn = true;
    // },

    [login.fulfilled.toString()]: (state: AuthState, action: any) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [login.rejected.toString()]: (state: AuthState) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selector
// export const isLoggedInSelect = (state: RootState) => state.auth.isLoggedIn;
// export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducers
const authReducer = authSlice.reducer;

export default authReducer;
