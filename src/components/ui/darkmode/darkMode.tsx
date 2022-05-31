import React, { ChangeEventHandler } from "react";
import { Moon, Sunny } from "react-ionicons";
import "./darkMode.scss";

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
    <div className={"root"}>
      <input
        type="checkbox"
        className={"checkbox"}
        id="checkbox"
        onChange={toggleTheme}
        defaultChecked={defaultDark}
      />
      <label htmlFor="checkbox" className={"label"}>
        <Moon color={"yellow"} height={"15px"} width={"15px"} />
        <Sunny color={"orange"} height={"15px"} width={"15px"} />

        <span className={"ball"}></span>
      </label>
    </div>
  );
};
export default DarkMode;
