import React from "react";
import styles from "./cardList.module.scss";
import classNames from "classnames";
export interface CardListProps {
  children: any;
  className?: string;
  onClick?: any;
}
const CardList: React.FC<CardListProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <li onClick={onClick} className={classNames(styles["card"], className)}>
      {children}
    </li>
  );
};

export default CardList;
