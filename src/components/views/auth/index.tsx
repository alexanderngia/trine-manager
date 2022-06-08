import React, { useState } from "react";
import styles from "./index.module.scss";
import Login from "components/views/auth/login/login";
import Register from "components/views/auth/register/register";
interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = (props) => {
  const [signin, setSingin] = useState(true);

  const toggle = () => {
    setSingin(!signin);
  };
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
