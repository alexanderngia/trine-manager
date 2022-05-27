import React from "react";
import styles from "./form.module.scss";

export interface FormUserProps {}

const FormUser: React.FC<FormUserProps> = (props) => {
  return <div className={styles["root"]}>Form</div>;
};

export default FormUser;
