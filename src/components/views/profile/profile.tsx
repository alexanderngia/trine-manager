import React from "react";
// import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useRedux";
import styles from "./profile.module.scss";

export interface ProfileProps {}
const Profile: React.FC<ProfileProps> = (props) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  console.log(currentUser);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className={styles["container"]}>
      <header className={styles["jumbotron"]}>
        <h3>
          <strong>{currentUser.fullNameUser}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {/* {currentUser.accessToken.substring(0, 20)} ...{" "} */}
        {/* {currentUser.accessToken.substr(currentUser.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.emailUser}
      </p>
      <strong>Authorities:</strong> {currentUser.typeRole}
    </div>
  );
};
export default Profile;
