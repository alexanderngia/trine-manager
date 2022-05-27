import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./customerList.module.scss";
import { Layout } from "../layout/layout";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import {
  IoAdd,
  IoDownloadOutline,
  IoRemoveCircleSharp,
} from "react-icons/io5";

export interface CustomerListProps {}

const CustomerList: React.FC<CustomerListProps> = (props) => {
  const [idCus, setIdCus] = useState(`ALL`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/customer?id=${idCus}`
        );
        const resData = res.data.customers;

        setData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idCus]);

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
                        <li>{listItems.fullNameCus}</li>
                        <li>{listItems.genderCus === 1 ? "Male" : "Female"}</li>
                        <li>{listItems.phoneCus}</li>
                        <li>{listItems.emailCus}</li>
                        <li>{listItems.adressCus}</li>
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

export default CustomerList;
