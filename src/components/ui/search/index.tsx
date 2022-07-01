import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

export interface SearchProps {
  className?: string;
}
export const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={classNames(styles["root"], className)}>
      <input type="text" placeholder="Search" />
    </div>
  );
};
