import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { menuAdmin, menuSale } from "constant/sidebar";
import { useAppSelector } from "hooks/useRedux";
import DarkMode from "components/ui/darkmode";
import styles from "./sidebar.module.scss";

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [subNav, setSubNav] = useState(false);
  const [role, setRole] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setRole(user.typeRole);
    }
  }, [user]);

  const showSubNav = () => {
    setSubNav(!subNav);
  };

  const navLinkClass = ({ isActive }: any) => {
    return isActive
      ? classNames(styles["link"], styles["activated"])
      : styles["link"];
  };

  return (
    <div className={styles["root"]}>
      <span className={styles["logo"]}>S</span>
      <a className={styles["logo-expand"]} href="/dashboard">
        Trine Closet
      </a>
      <div className={styles["wrapper"]}>
        <div className={styles["title"]}>MENU</div>

        <ul className={styles["side-menu"]}>
          {React.Children.toArray(
            (role === "ADMIN" ? menuAdmin : menuSale).map((menu) => {
              return (
                <li>
                  <NavLink
                    to={menu.path}
                    onClick={menu.subMenu && showSubNav}
                    className={navLinkClass}
                  >
                    {/* <span
                      className={styles["icon"]}
                      dangerouslySetInnerHTML={{ __html: menu?.icon }}
                    /> */}
                    <span className={styles["icon"]}> {menu?.icon}</span>
                    <p>{menu.title}</p>
                  </NavLink>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <DarkMode />
    </div>
  );
};

export default Sidebar;
