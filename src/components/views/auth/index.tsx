import Login from "components/views/auth/login";
import Register from "components/views/auth/register";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { messageActions } from "redux/reducers/messageSlice";
import styles from "./index.module.scss";

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = (props) => {
  const [signin, setSignin] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  const toggle = (e: any) => {
    setSignin(!signin);
    dispatch(messageActions.clearMessage());
  };

  if (user) {
    const userLength = Object.keys(user).length;
    if (userLength > 0) {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className={styles["root"]}>
      {signin ? <Register /> : <Login />}

      <div className={styles["toggle"]}>
        <p>Đăng Nhập</p>
        <div className={styles["container"]}>
          <input
            type="checkbox"
            className={styles["checkbox"]}
            id="checkbox"
            onClick={toggle}
            defaultChecked={signin}
          />
          <label htmlFor="checkbox" className={styles["label"]}>
            <span className={styles["ball"]}></span>
          </label>
        </div>
        <p>Đăng Ký</p>
      </div>
    </div>
  );
};

export default Authentication;
