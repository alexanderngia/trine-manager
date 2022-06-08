import { ButtonMain, ButtonSub } from "components/ui/button/button";
import CardList from "components/ui/card/cardList/cardList";
import { Modal } from "components/ui/modal/modal";
import { Layout } from "components/views/layout/layout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
import { messageActions } from "redux/reducers/messageSlice";
import productService from "services/productService";
import * as Yup from "yup";
import { Storage } from "firebaseAuth";
import styles from "./productList.module.scss";
const { v4 } = require("uuid");

export interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = (props) => {
  const [idProduct, setIdProduct] = useState(`ALL`);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState([]);

  const [imageUpload, setImageUpload] = useState<any>([]);
  const [imageList, setImageList] = useState<any>("");
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    imgItemNew: "",
    nameItemNew: "",
    qualityItemNew: "",
    colorItemNew: "#000000",
    sizeItemNew: "",
    priceItemNew: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProductBoard(idProduct);
        const resData = res.data.products;

        setData(resData);
        setRole(user.typeRole);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();

    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [idProduct, data, user]);

  const openModal = () => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");
    dispatch(messageActions.clearMessage());
  };

  const closeModal = () => {
    setModal(false);
    setImageList("");
    setInitialValue({ ...initialValue });
    localStorage.removeItem("MODAL");
  };

  const openItemModal = async (infoUser: any) => {
    setProfile(true);
    if (infoUser) {
      setInitialValue({
        id: `${infoUser.id}`,
        imgItemNew: `${infoUser.imgItem}`,
        nameItemNew: `${infoUser.nameItem}`,
        qualityItemNew: `${infoUser.qualityItem}`,
        colorItemNew: `${infoUser.colorItem}`,
        sizeItemNew: `${infoUser.sizeItem}`,
        priceItemNew: `${infoUser.priceItem}`,
      });
      setDeleteProduct(infoUser);
      dispatch(messageActions.clearMessage());
    }
  };

  const closeItemModal = () => {
    setProfile(false);
    setInitialValue({
      id: "",
      imgItemNew: "",
      nameItemNew: "",
      qualityItemNew: "",
      colorItemNew: "#000000",
      sizeItemNew: "",
      priceItemNew: "",
    });
  };

  const handleDeleteItem = async (userRemove: any) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${userRemove.nameItem}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await productService.handleDeleteApi(userRemove.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          alert(userRemove.nameItem + message);
          setProfile(false);
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${userRemove.nameItem}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    // imgItemNew: Yup.string().required("Thiếu ảnh sản phẩm"),
    nameItemNew: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),
    qualityItemNew: Yup.string().required("Thiếu số lượng sản phẩm!"),
    colorItemNew: Yup.string().required("Thiếu màu sắc sản phẩm!"),
    sizeItemNew: Yup.string(),
    priceItemNew: Yup.string().required("Thiếu giá bán sản phẩm!"),
  });

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const {
      imgItemNew,
      nameItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
    } = formValue;
    try {
      let res = await productService.handleRegisterApi({
        imgItemNew,
        nameItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
      });
      dispatch(messageActions.setMessage(res.data.message));
      resetForm({});

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      imgItemNew,
      nameItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
    } = formValue;
    try {
      let res = await productService.handleUpdateApi({
        id,
        imgItemNew,
        nameItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`${nameItemNew} ${message}`);
        setProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    if (imageUpload === null) {
      return;
    } else {
      const imageRef = ref(Storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot: any) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList(`${url}`);
          // initialValue["imgItemNew"] = `${url}`;
          setInitialValue({
            ...initialValue,
            imgItemNew: `${url}`,
          });
        });
      });
    }
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
            <ButtonMain onClick={openModal}>
              <IoAdd className={styles["icon"]} />
            </ButtonMain>
            <ButtonMain>
              <IoDownloadOutline className={styles["icon"]} />
            </ButtonMain>
          </div>
        </div>
        {modal && (
          <Modal onClick={closeModal}>
            <h1>Thêm Sản Phẩm</h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
              // onSubmit={(values: any) => {
              //   console.log(values);
              // }}
              enableReinitialize={true}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <span className={styles["column"]}>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="nameItemNewUpdate"
                          className={styles["label"]}
                        >
                          Tên Sản Phẩm
                        </label>

                        <Field
                          id="nameItemNew"
                          className={styles["input"]}
                          type="text"
                          placeholder="Iphone X"
                          name="nameItemNew"
                          value={values.nameItemNew}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="nameItemNew"
                          component="div"
                        />
                      </span>
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
                          value={values.qualityItemNew}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="qualityItemNew"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="colorItemNew"
                          className={styles["label"]}
                        >
                          Màu Sắc
                        </label>

                        <Field
                          className={styles["input"]}
                          type="color"
                          // placeholder="0988379379"
                          name="colorItemNew"
                          id="colorItemNew"
                          value={values.colorItemNew}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="colorItemNew"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <p>Size</p>
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
                        <label
                          htmlFor="priceItemNew"
                          className={styles["label"]}
                        >
                          Giá Bán
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          placeholder="200.000"
                          name="priceItemNew"
                          id="priceItemNew"
                          value={values.priceItemNew}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="priceItemNew"
                          component="div"
                        />
                      </span>
                    </span>
                    <span className={styles["column"]}>
                      <span className={styles["box"]}>
                        <label htmlFor="imgItemNew" className={styles["label"]}>
                          Ảnh Sản Phẩm
                        </label>
                        {/* <progress value={progress} max="100" /> */}

                        {imageList && (
                          <div className={styles["container-Img"]}>
                            <img src={imageList} alt={`${imageList}`} />
                          </div>
                        )}
                        <input
                          type="file"
                          className={styles["input"]}
                          onChange={(e: any) => {
                            setImageUpload(e.target.files[0]);
                          }}
                        />
                        <ButtonMain
                          type="button"
                          className={styles["upload-btn"]}
                          onClick={handleUploadImage}
                        >
                          Upload
                        </ButtonMain>
                        <Field
                          hidden
                          name="imgItemNew"
                          className={styles["input"]}
                          type="text"
                          id="imgItemNew"
                          value={values.imgItemNew}
                          onChange={(e: any) => handleChange(e)}
                        />
                      </span>
                    </span>
                  </div>
                  <p className={styles["message"]}>{message}</p>

                  <div className={styles["button-container"]}>
                    <button type="submit">THÊM SẢN PHẨM</button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
        {data.length > 0 && (
          <>
            <ul className={styles["card-container"]}>
              {React.Children.toArray(
                data.map((listItems: any) => {
                  return (
                    <CardList
                      onClick={() => openItemModal(listItems)}
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
            {profile && (
              <Modal onClick={closeItemModal}>
                <h1>THÔNG TIN SẢN PHẨM</h1>
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdate}
                >
                  {({ values, handleChange }: any) => (
                    <Form className={styles["form"]}>
                      <div className={styles["container"]}>
                        <span className={styles["column"]}>
                          <span className={styles["box"]}>
                            <Field
                              className={styles["input"]}
                              type="text"
                              name="id"
                              value={values.id}
                              onChange={(e: any) => handleChange(e)}
                              hidden
                            />
                            <label
                              htmlFor="nameItemNewUpdate"
                              className={styles["label"]}
                            >
                              Tên Sản Phẩm
                            </label>

                            <Field
                              id="nameItemNewUpdate"
                              className={styles["input"]}
                              type="text"
                              placeholder="Iphone X"
                              name="nameItemNew"
                              value={values.nameItemNew}
                              onChange={(e: any) => handleChange(e)}
                            />
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="nameItemNew"
                              component="div"
                            />
                          </span>
                          <span className={styles["box"]}>
                            <label
                              htmlFor="qualityItemNewUpdate"
                              className={styles["label"]}
                            >
                              Số Lượng
                            </label>

                            <Field
                              className={styles["input"]}
                              type="number"
                              placeholder="10"
                              name="qualityItemNew"
                              id="qualityItemNewUpdate"
                              value={values.qualityItemNew}
                              onChange={(e: any) => handleChange(e)}
                            />
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="qualityItemNew"
                              component="div"
                            />
                          </span>
                          <span className={styles["box"]}>
                            <label
                              htmlFor="colorItemNewUpdate"
                              className={styles["label"]}
                            >
                              Màu Sắc
                            </label>

                            <Field
                              className={styles["input"]}
                              type="color"
                              // placeholder="0988379379"
                              name="colorItemNew"
                              id="colorItemNewUpdate"
                              value={values.colorItemNew}
                              onChange={(e: any) => handleChange(e)}
                            />
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="colorItemNew"
                              component="div"
                            />
                          </span>
                          <span className={styles["box"]}>
                            <p>Size</p>
                            <div className={styles["container-checkbox"]}>
                              <label
                                htmlFor="SUpdate"
                                className={styles["checkbox"]}
                              >
                                <Field
                                  type="radio"
                                  id="SUpdate"
                                  name="sizeItemNew"
                                  value="0"
                                ></Field>
                                <span>
                                  <p>S</p>
                                </span>
                              </label>
                              <label
                                htmlFor="MUpdate"
                                className={styles["checkbox"]}
                              >
                                <Field
                                  type="radio"
                                  id="MUpdate"
                                  name="sizeItemNew"
                                  value="1"
                                ></Field>
                                <span>
                                  <p>M</p>
                                </span>
                              </label>
                              <label
                                htmlFor="LUpdate"
                                className={styles["checkbox"]}
                              >
                                <Field
                                  type="radio"
                                  id="LUpdate"
                                  name="sizeItemNew"
                                  value="2"
                                ></Field>
                                <span>
                                  <p>L</p>
                                </span>
                              </label>
                              <label
                                htmlFor="XLUpdate"
                                className={styles["checkbox"]}
                              >
                                <Field
                                  type="radio"
                                  id="XLUpdate"
                                  name="sizeItemNew"
                                  value="3"
                                ></Field>
                                <span>
                                  <p>XL</p>
                                </span>
                              </label>
                              <label
                                htmlFor="FreeSizeUpdate"
                                className={styles["checkbox"]}
                              >
                                <Field
                                  type="radio"
                                  id="FreeSizeUpdate"
                                  name="sizeItemNew"
                                  value="4"
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
                            <label
                              htmlFor="priceItemNewUpdate"
                              className={styles["label"]}
                            >
                              Giá Bán
                            </label>
                            <Field
                              className={styles["input"]}
                              type="text"
                              placeholder="200.000"
                              name="priceItemNew"
                              id="priceItemNewUpdate"
                              value={values.priceItemNew}
                              onChange={(e: any) => handleChange(e)}
                            />
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="priceItemNew"
                              component="div"
                            />
                          </span>
                        </span>
                        <span className={styles["column"]}>
                          <span className={styles["box"]}>
                            <label
                              htmlFor="imgItemNewUpdate"
                              className={styles["label"]}
                            >
                              Ảnh Sản Phẩm
                            </label>
                            {values.imgItemNew && (
                              <div className={styles["container-Img"]}>
                                <img
                                  src={values.imgItemNew}
                                  alt={`${values.imgItemNew}`}
                                />
                              </div>
                            )}
                            <input
                              type="file"
                              className={styles["input"]}
                              onChange={(e: any) => {
                                setImageUpload(e.target.files[0]);
                              }}
                            />
                            <ButtonMain
                              type="button"
                              className={styles["upload-btn"]}
                              onClick={handleUploadImage}
                            >
                              Upload
                            </ButtonMain>
                            <Field
                              hidden
                              name="imgItemNew"
                              className={styles["input"]}
                              type="text"
                              id="imgItemNewUpdate"
                              value={values.imgItemNew}
                              onChange={(e: any) => handleChange(e)}
                            />
                          </span>
                        </span>
                      </div>
                      <p className={styles["message"]}>{message}</p>

                      <div className={styles["button-container"]}>
                        <ButtonSub
                          type="button"
                          onClick={() => handleDeleteItem(deleteProduct)}
                        >
                          Xóa Sản Phẩm
                        </ButtonSub>
                        <button type="submit">Cập Nhật</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductList;
