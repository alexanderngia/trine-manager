import React, { ChangeEventHandler } from "react";
import { SunFill } from "@styled-icons/bootstrap/SunFill";
import { WeatherMoon } from "@styled-icons/fluentui-system-filled/WeatherMoon";
import styles from "./index.module.scss";

export interface DarkModeProps {}

const DarkMode: React.FC<DarkModeProps> = () => {
  /* NEW (START) */
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  } else {
    setLight();
  }

  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };
  /* NEW (END) */
  return (
    <div className={styles["root"]}>
      <input
        type="checkbox"
        className={styles["checkbox"]}
        id="checkbox"
        onChange={toggleTheme}
        defaultChecked={defaultDark}
      />
      <label htmlFor="checkbox" className={styles["label"]}>
        <WeatherMoon color={"yellow"} size={"10px"} />
        <SunFill color={"orange"} size={"10px"} />

        <span className={styles["ball"]}></span>
      </label>
    </div>
  );
};
export default DarkMode;
