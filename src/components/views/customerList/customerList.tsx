import React, { useEffect, useState } from "react";
import { IoAdd, IoDownloadOutline, IoRemoveCircleSharp } from "react-icons/io5";
import { useAppSelector } from "../../../hooks/useRedux";
import customerService from "../../../services/customerService";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import { Layout } from "../layout/layout";
import styles from "./customerList.module.scss";

export interface CustomerListProps {}

const CustomerList: React.FC<CustomerListProps> = (props) => {
  const [idCus, setIdCus] = useState(`ALL`);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customerService.getCustomerBoard(idCus);
        const resData = res.data.customers;

        setData(resData);
        setRole(user.typeRole);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [idCus, user.typeRole]);

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH KHÁCH HÀNG</h1>
        <div className={styles["btn-container"]}>
          <ButtonMain>
            <IoAdd className={styles["icon"]} />
          </ButtonMain>
          {role === "ADMIN" && (
            <ButtonMain>
              <IoDownloadOutline className={styles["icon"]} />
            </ButtonMain>
          )}
        </div>
        {data.length > 0 && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              data.map((listItems: any) => {
                return (
                  <CardList>
                    <ul>
                      <li>{listItems.fullNameCus}</li>
                      <li>{listItems.genderCus === 1 ? "Male" : "Female"}</li>
                      <li>{listItems.phoneCus}</li>
                      <li>{listItems.emailCus}</li>
                      <li>{listItems.adressCus}</li>
                      {role === "ADMIN" && (
                        <li>
                          <IoRemoveCircleSharp />
                        </li>
                      )}
                    </ul>
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
