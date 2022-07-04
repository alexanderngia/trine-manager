import { Download } from "@styled-icons/bootstrap/Download";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { ButtonMain } from "components/ui/button/button";
import { CardList } from "components/ui/card";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { productActions } from "redux/reducers/productSlice";
import productService from "services/productService";
import { history } from "utils/history";
import styles from "./index.module.scss";

export interface IProduct {}

export interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const [data, setData] = useState([] as IProduct[]);
  const [role, setRole] = useState("");

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProductBoard("ALL");
        const resData = res.data.products;

        setData(resData);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setRole(user.typeRole);
    }
  }, [user]);

  const openProduct = (product: any) => {
    dispatch(productActions.setProduct(product));
    history.push("/product");
  };
  const handleAddProduct = () => {
    dispatch(productActions.clearProduct());
    history.push("/product");
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH SẢN PHẨM</h1>
        <div className={styles["btn-container"]}>
          <div className={styles["filter"]}>
            <ButtonMain>LINGERIA</ButtonMain>
            <ButtonMain>ACCESSORIES</ButtonMain>
            <ButtonMain>DRESS</ButtonMain>
          </div>
          <div className={styles["btnCrud"]}>
            <ButtonMain onClick={handleAddProduct}>
              <Plus size={20} className={styles["icon"]} />
            </ButtonMain>
            {role === "ADMIN" && (
              <ButtonMain>
                <Download size={20} className={styles["icon"]} />
              </ButtonMain>
            )}
          </div>
        </div>
        {data.length > 0 && (
          <>
            <ul className={styles["card-container"]}>
              {React.Children.toArray(
                data.map((listItems: any) => {
                  return (
                    <CardList
                      onClick={() => openProduct(listItems)}
                      className={styles["product-list"]}
                      titleCard={listItems.nameItem}
                      imgCard={listItems.imgItem}
                      qtyCard={listItems.qualityItem}
                      colorCard={listItems.colorItem}
                      sizeCard={listItems.sizeItem}
                      priceCard={listItems.priceItem}
                    />
                  );
                })
              )}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductList;
