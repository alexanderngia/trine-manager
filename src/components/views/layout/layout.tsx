import React, { useState, useEffect } from "react";
import styles from "./layout.module.scss";
import Sidebar from "../../sidebar/sidebar";
import Header from "../../header/header";
export interface LayoutProps {
  children: any;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className={styles["root"]}>
        <div className={styles["container"]}>
          <Sidebar />
          <div className={styles["wrapper"]}>
            <Header />
            <div className={styles["main-container"]}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
