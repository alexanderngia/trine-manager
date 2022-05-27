import React from "react";
import styles from "./darkMode.module.scss";
import { Sunny, Moon } from "react-ionicons";

export interface DarkModeProps {}

export const DarkMode: React.FC<DarkModeProps> = (props) => {
  //   const [darkmode, setDarkmode] = useState(false);
  return (
    <div className={styles["root"]}>
      <input type="checkbox" className={styles["checkbox"]} id="checkbox" />
      <label htmlFor="checkbox" className={styles["label"]}>
        <Sunny color={"orange"} height={"15px"} width={"15px"} />
        <Moon color={"yellow"} height={"15px"} width={"15px"} />
        <span className={styles["ball"]}></span>
      </label>
    </div>
  );
};
