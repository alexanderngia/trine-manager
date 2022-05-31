import React, { useState } from "react";
import styles from "./sidebar.module.scss";

import { menuAdmin } from "../../constant/sidebar";
import DarkMode from "../ui/darkmode/darkMode";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [subNav, setSubNav] = useState(false);

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
            menuAdmin.map((menu) => {
              return (
                <li>
                  <NavLink
                    to={menu.path}
                    onClick={menu.subMenu && showSubNav}
                    className={navLinkClass}
                  >
                    <span
                      className={styles["icon"]}
                      dangerouslySetInnerHTML={{ __html: menu?.icon }}
                    />

                    <p>{menu.title}</p>

                    {/* {menu.subMenu && (
                      <span
                        className={styles["sub-icon"]}
                        dangerouslySetInnerHTML={{
                          __html: subNav ? menu.downArr : menu.rightArr,
                        }}
                      ></span>
                    )} */}
                  </NavLink>
                  {/* {subNav &&
                    React.Children.toArray(
                      menu?.subMenu?.map((item: any) => {
                        return (
                          <ul>
                            <li>
                              <NavLink
                                to={menu.path}
                                className={styles["sub-link"]}
                              >
                                <span
                                  className={styles["icon"]}
                                  dangerouslySetInnerHTML={{
                                    __html: item?.icon,
                                  }}
                                />

                                <p>{item.title}</p>
                              </NavLink>
                            </li>
                          </ul>
                        );
                      })
                    )} */}
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
