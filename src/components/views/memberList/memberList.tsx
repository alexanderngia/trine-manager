import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./memberList.module.scss";
import { Layout } from "../layout/layout";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import { IoAdd, IoDownloadOutline, IoRemoveCircleSharp } from "react-icons/io5";
import userService from "../../../services/userService";

export interface MemberListProps {}

const MemberList: React.FC<MemberListProps> = (props) => {
  const [idUser, setIdUser] = useState(`ALL`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUserBoard(idUser);
        const resData = res.data.users;

        setData(resData);
      } catch (error: any) {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setData(_content);
      }
    };
    fetchData();
  }, [idUser]);

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH THÀNH VIÊN</h1>
        <div className={styles["btn-container"]}>
          <ButtonMain>
            <IoAdd className={styles["icon"]} />
          </ButtonMain>
          <ButtonMain>
            <IoDownloadOutline className={styles["icon"]} />
          </ButtonMain>
        </div>
        {data.length > 0 && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              data.map((listItems: any) => {
                return (
                  <CardList>
                    <a href="/#">
                      <ul>
                        <li>{listItems.fullNameUser}</li>
                        <li>
                          {listItems.genderUser === 1 ? "Male" : "Female"}
                        </li>
                        <li>{listItems.phoneUser}</li>
                        <li>{listItems.emailUser}</li>
                        <li>
                          <IoRemoveCircleSharp />
                        </li>
                      </ul>
                    </a>
                  </CardList>
                );
              })
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default MemberList;
