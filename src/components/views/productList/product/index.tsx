import { Layout } from "components/views/layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { messageActions } from "redux/reducers/messageSlice";
import productService from "services/productService";
import PreviewImg from "../../../ui/image/previewImg";
import styles from "./index.module.scss";
import "./index.scss";
import { ButtonSub } from "components/ui/button/button";
import { history } from "utils/history";
const { v4 } = require("uuid");
const MarkdownIt = require("markdown-it");
const mdParser = new MarkdownIt(/* Markdown-it options */);

export interface ProductProps {}

const Product: React.FC<ProductProps> = () => {
  // const [deleteUser, setDeleteUser] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    idItemNew: `${v4()}`,
    imgItemNew: "",
    urlItemNew: "",
    nameItemNew: "",
    bodyItemNew: "",
    bodyHtmlItemNew: "",
    qualityItemNew: "",
    colorItemNew: "#000000",
    sizeItemNew: "",
    priceItemNew: "",
    categoryItemNew: "",
    keywordTagItemNew: "",
    titleTagItemNew: "",
    descripTagItemNew: "",
    authorItemNew: `${user.fullNameUser}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (product) {
          setInitialValue({
            id: `${product.id}`,
            idItemNew: `${product.idItem}`,
            imgItemNew: `${product.imgItem}`,
            urlItemNew: `${product.urlItem}`,
            nameItemNew: `${product.nameItem}`,
            bodyItemNew: `${product.bodyItem}`,
            bodyHtmlItemNew: `${product.bodyHtmlItem}`,
            qualityItemNew: `${product.qualityItem}`,
            colorItemNew: `${product.colorItem}`,
            sizeItemNew: `${product.sizeItem}`,
            priceItemNew: `${product.priceItem}`,
            categoryItemNew: `${product.categoryItem}`,
            keywordTagItemNew: `${product.keywordTagItem}`,
            titleTagItemNew: `${product.nameItem}`,
            descripTagItemNew: `${product.descripTagItem}`,
            authorItemNew: `${product.authorItem}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, product]);

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const {
      idItemNew,
      imgItemNew,
      urlItemNew,
      nameItemNew,
      bodyItemNew,
      bodyHtmlItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
      categoryItemNew,
      keywordTagItemNew,
      titleTagItemNew,
      descripTagItemNew,
      authorItemNew,
    } = formValue;
    try {
      let res = await productService.handleRegisterApi({
        idItemNew,
        imgItemNew,
        urlItemNew,
        nameItemNew,
        bodyItemNew,
        bodyHtmlItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
        categoryItemNew,
        keywordTagItemNew,
        titleTagItemNew,
        descripTagItemNew,
        authorItemNew,
      });

      resetForm({});

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        dispatch(messageActions.setMessage(message));
        alert(`Post ${message}`);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      idItemNew,
      imgItemNew,
      urlItemNew,
      nameItemNew,
      bodyItemNew,
      bodyHtmlItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
      categoryItemNew,
      keywordTagItemNew,
      titleTagItemNew,
      descripTagItemNew,
      authorItemNew,
    } = formValue;
    try {
      let res = await productService.handleUpdateApi({
        id,
        idItemNew,
        imgItemNew,
        urlItemNew,
        nameItemNew,
        bodyItemNew,
        bodyHtmlItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
        categoryItemNew,
        keywordTagItemNew,
        titleTagItemNew,
        descripTagItemNew,
        authorItemNew,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`Product ${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (deleteItem: any) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${deleteItem.nameItemNew}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await productService.handleDeleteApi(deleteItem.idItemNew);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          await alert(deleteItem.nameItemNew + message);
          history.push("/product-manager");
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${deleteItem.nameItemNew}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{product ? "CẬP NHẬT SẢN PHẨM" : "THÊM SẢN PHẨM"}</h1>
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          onSubmit={product ? handleUpdate : handleRegister}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }: any) => (
            <Form className={styles["form"]}>
              <div className={styles["container"]}>
                <span className={styles["column"]}>
                  <div className={styles["row"]}>
                    <span className={styles["box"]}>
                      <Field
                        className={styles["input"]}
                        type="text"
                        name="id"
                        hidden
                      />
                      <Field
                        className={styles["input"]}
                        type="text"
                        name="idItemNew"
                        hidden
                      />
                      <Field
                        hidden
                        className={styles["input"]}
                        type="text"
                        name="authorItemNew"
                        onChange={() =>
                          setFieldValue(
                            "authorItemNew",
                            `${product.authorItem}`
                          )
                        }
                      />
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="TÊN SẢN PHẨM"
                        name="nameItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="nameItemNew"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="urlItemNew" className={styles["label"]}>
                        Permalink
                      </label>
                      <Field
                        className={styles["input"]}
                        type="text"
                        name="urlItemNew"
                        value={values.nameItemNew
                          .replaceAll(" ", "-")
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/Đ/g, "D")
                          .toLowerCase()}
                        id="urlItemNew"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <MdEditor
                        style={{ height: "500px" }}
                        name="bodyItemNew"
                        value={`${values.bodyItemNew}`}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(e) => {
                          setFieldValue("bodyItemNew", `${e.text}`);
                          setFieldValue("bodyHtmlItemNew", `${e.html}`);
                        }}
                      />
                    </span>
                  </div>
                  <div className={styles["row"]}>
                    <span className={styles["box"]}>
                      <label
                        htmlFor="qualityItemNew"
                        className={styles["label"]}
                      >
                        Số Lượng
                      </label>

                      <Field
                        className={styles["input"]}
                        type="number"
                        placeholder="10"
                        name="qualityItemNew"
                        id="qualityItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="qualityItemNew"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="colorItemNew" className={styles["label"]}>
                        Màu Sắc
                      </label>

                      <Field
                        className={styles["input"]}
                        type="color"
                        name="colorItemNew"
                        id="colorItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="colorItemNew"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="sizeItemNew" className={styles["label"]}>
                        Size
                      </label>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="S" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="S"
                            name="sizeItemNew"
                            value="S"
                          ></Field>
                          <span>
                            <p>S</p>
                          </span>
                        </label>
                        <label htmlFor="M" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="M"
                            name="sizeItemNew"
                            value="M"
                          ></Field>
                          <span>
                            <p>M</p>
                          </span>
                        </label>
                        <label htmlFor="L" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="L"
                            name="sizeItemNew"
                            value="L"
                          ></Field>
                          <span>
                            <p>L</p>
                          </span>
                        </label>
                        <label htmlFor="XL" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="XL"
                            name="sizeItemNew"
                            value="XL"
                          ></Field>
                          <span>
                            <p>XL</p>
                          </span>
                        </label>
                        <label
                          htmlFor="FreeSize"
                          className={styles["checkbox"]}
                        >
                          <Field
                            type="radio"
                            id="FreeSize"
                            name="sizeItemNew"
                            value="Free Size"
                          ></Field>
                          <span>
                            <p>Free Size</p>
                          </span>
                        </label>

                        <ErrorMessage
                          className={styles["errMess"]}
                          name="sizeItemNew"
                          component="div"
                        />
                      </div>
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="priceItemNew" className={styles["label"]}>
                        Giá Bán
                      </label>
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="200.000"
                        name="priceItemNew"
                        id="priceItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="priceItemNew"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label
                        htmlFor="titleTagItemNew"
                        className={styles["label"]}
                      >
                        Tiêu Đề SEO
                      </label>

                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="lingerie, đồ bơi,..."
                        name="titleTagItemNew"
                        id="titleTagItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="titleTagItemNew"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label
                        htmlFor="descripTagItemNew"
                        className={styles["label"]}
                      >
                        Description SEO
                      </label>

                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="lingerie, đồ bơi,..."
                        name="descripTagItemNew"
                        id="descripTagItemNew"
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="descripTagItemNew"
                        component="div"
                      />
                    </span>
                  </div>
                </span>

                <span className={styles["column"]}>
                  <span className={styles["box"]}>
                    <PreviewImg />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="imgItemNew" className={styles["label"]}>
                      Ảnh Sản Phẩm
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="http://firebase.com/image"
                      name="imgItemNew"
                      id="imgItemNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="imgItemNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label
                      htmlFor="keywordTagItemNew"
                      className={styles["label"]}
                    >
                      Từ Khóa
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="lingerie, đồ bơi,..."
                      name="keywordTagItemNew"
                      id="keywordTagItemNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="keywordTagItemNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label
                      htmlFor="categoryItemNew"
                      className={styles["label"]}
                    >
                      Thể Loại
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="Lingerie"
                      name="categoryItemNew"
                      id="categoryItemNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="categoryItemNew"
                      component="div"
                    />
                  </span>
                  <div className={styles["button-container"]}>
                    <ButtonSub
                      type="button"
                      onClick={() => handleDeleteItem(values)}
                    >
                      Delete
                    </ButtonSub>
                    <button type="submit">{product ? "UPDATE" : "ADD"}</button>
                  </div>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Product;
