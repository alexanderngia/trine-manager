import React from "react";
import styles from "./cardTotal.module.scss";
export interface CardTotalProps {
  title: string;
  total: string;
  icon: any;
}
const CardTotal: React.FC<CardTotalProps> = ({ icon, total, title }) => {
  return (
    <div className={styles["root"]}>
      <div
        className={styles["icon"]}
        dangerouslySetInnerHTML={{ __html: icon }}
      ></div>
      <div className={styles["data"]}>
        <div className={styles["total"]}>{total}</div>
        <div className={styles["title"]}>{title}</div>
      </div>
    </div>
  );
};

export default CardTotal;
