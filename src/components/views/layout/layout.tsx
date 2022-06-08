import React from "react";
import Header from "components/header/header";
import Sidebar from "components/sidebar/sidebar";
import styles from "./layout.module.scss";
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
