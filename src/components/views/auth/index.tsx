import Login from "components/views/auth/login";
import Register from "components/views/auth/register";
import { useAppSelector } from "hooks/useRedux";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./index.module.scss";

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = (props) => {
  const [signin, setSingin] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const toggle = () => {
    setSingin(!signin);
  };

  if (user) {
    const userLength = Object.keys(user).length;
    if (userLength > 0) {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className={styles["root"]}>
      {signin ? <Login /> : <Register />}

      <div className={styles["toggle"]}>
        <p>Đăng Nhập</p>
        <div className={styles["container"]}>
          <input
            type="checkbox"
            className={styles["checkbox"]}
            id="checkbox"
            onClick={toggle}
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
