import { ButtonMain } from "components/ui/button/button";
import CardList from "components/ui/card/cardList/cardList";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
import { messageActions } from "redux/reducers/messageSlice";
import { productActions } from "redux/reducers/productSlice";
import productService from "services/productService";
import { history } from "utils/history";
import styles from "./index.module.scss";

export interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = (props) => {
  const [idProduct, setIdProduct] = useState(`ALL`);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const { product } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProductBoard(idProduct);
        const resData = res.data.products;

        setData(resData);
        if (user) {
          setRole(user.typeRole);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [idProduct, data, user]);



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
              <IoAdd className={styles["icon"]} />
            </ButtonMain>
            {role === "ADMIN" && (
              <ButtonMain>
                <IoDownloadOutline className={styles["icon"]} />
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
                    >
                      <ul>
                        <li>
                          <div
                            style={{
                              backgroundImage: `url(${listItems.imgItem})`,
                              backgroundPosition: `center`,
                              backgroundRepeat: `no-repeat`,
                              backgroundSize: `cover`,
                              width: `50px`,
                              height: `50px`,
                              borderRadius: `50px`,
                            }}
                          ></div>
                        </li>
                        <li>{listItems.nameItem}</li>
                        <li>{listItems.qualityItem}</li>
                        <li>
                          <div
                            style={{
                              backgroundColor: `${listItems.colorItem}`,
                              width: `25px`,
                              height: `25px`,
                              borderRadius: `50px`,
                            }}
                          ></div>
                        </li>
                        <li>{listItems.sizeItem}</li>
                        <li>{listItems.priceItem}</li>
                      </ul>
                    </CardList>
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
