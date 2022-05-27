import React, { useState } from "react";
import styles from "./sidebar.module.scss";

import { menuAdmin, menuSale } from "../../constant/sidebar";
import { DarkMode } from "../ui/darkmode/darkMode";
import { NavLink } from "react-router-dom";

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [subMenu, setSubMenu] = useState(false);

  return (
    <div className={styles["sidebar"]}>
      <span className={styles["logo"]}>S</span>
      <a className={styles["logo-expand"]} href="/dashboard">
        Trine Closet
      </a>
      <div className={styles["side-wrapper"]}>
        <div className={styles["side-title"]}>MENU</div>

        <div className={styles["side-menu"]}>
          {React.Children.toArray(
            menuAdmin.map((menu) => {
              return (
                <>
                  <NavLink className={styles["sidebar-link"]} to={menu.path}>
                    <span
                      className={styles["icon"]}
                      dangerouslySetInnerHTML={{ __html: menu?.icon }}
                    />

                    <p>{menu.title}</p>
                    {menu.subMenu && (
                      <span
                        className={
                          styles[`${subMenu ? "rightArr" : "downArr"}`]
                        }
                      ></span>
                    )}
                  </NavLink>
                </>
              );
            })
          )}
        </div>
      </div>
      <DarkMode />
    </div>
  );
};

export default Sidebar;
