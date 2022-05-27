import React from "react";
import styles from "./cardList.module.scss";
import classNames from "classnames";
export interface CardListProps {
  children: any;
  className?: string;
}
const CardList: React.FC<CardListProps> = ({ children, className }) => {
  return <li className={classNames(styles["card"], className)}>{children}</li>;
};

export default CardList;
