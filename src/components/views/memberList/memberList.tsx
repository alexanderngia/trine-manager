import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoDownloadOutline,
  IoEllipsisVerticalSharp,
} from "react-icons/io5";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { register } from "../../../redux/reducers/authSlice";
import userService from "../../../services/userService";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import { Modal } from "../../ui/modal/modal";
import { Layout } from "../layout/layout";
import styles from "./memberList.module.scss";

export interface MemberListProps {}

const MemberList: React.FC<MemberListProps> = (props) => {
  const [idUser, setIdUser] = useState(`ALL`);
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

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
    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    }
  }, [idUser]);

  const openModal = () => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");
  };

  const closeModal = () => {
    setModal(false);
    localStorage.removeItem("MODAL");
  };

  const initialValues = {
    userName: "",
    userEmail: "",
    userPass: "",
    userPhone: "",
    userGender: "",
    userAdress: "",
    userRole: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPass: Yup.string()
      .required("Required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
    confirmedUserPass: Yup.string()
      .required("Required!")
      .oneOf([Yup.ref("userPass"), null], "Password must match!"),
    userPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    userGender: Yup.string().required("Required!"),
    userAdress: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!"),
  });

  const handleRegister = (formValue: any) => {
    try {
      const {
        userName,
        userEmail,
        userPass,
        confirmPass,
        userPhone,
        userGender,
        userAdress,
        userRole,
      } = formValue;
      setSuccessful(false);
      dispatch(
        register({
          userName,
          userEmail,
          userPass,
          // confirmPass,
          userPhone,
          userGender,
          userAdress,
          userRole,
        })
      );
      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH THÀNH VIÊN</h1>
        <div className={styles["btn-container"]}>
          <ButtonMain onClick={openModal}>
            <IoAdd className={styles["icon"]} />
          </ButtonMain>
          <ButtonMain>
            <IoDownloadOutline className={styles["icon"]} />
          </ButtonMain>
        </div>
        {modal && (
          <Modal onClick={closeModal}>
            <h1>Let's signup!</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  {!successful && (
                    <div className={styles["container"]}>
                      <span className={styles["box"]}>
                        <label htmlFor="userName" className={styles["label"]}>
                          Full Name
                        </label>
                        <Field
                          id="userName"
                          className={styles["input"]}
                          type="text"
                          placeholder="Nguyễn Văn A"
                          name="userName"
                          value={values.userName}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userName"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="userEmail" className={styles["label"]}>
                          Email
                        </label>

                        <Field
                          className={styles["input"]}
                          type="email"
                          placeholder="nguyenvana@gmail.com"
                          name="userEmail"
                          id="userEmail"
                          value={values.userEmail}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userEmail"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="userPass" className={styles["label"]}>
                          Mật Khẩu
                        </label>

                        <Field
                          className={styles["input"]}
                          type="password"
                          placeholder="abc1223@"
                          name="userPass"
                          id="userPass"
                          value={values.userPass}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userPass"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="confirmPass"
                          className={styles["label"]}
                        >
                          Xác Nhận Mật Khẩu
                        </label>

                        <Field
                          className={styles["input"]}
                          type="password"
                          placeholder="abc123@"
                          name="confirmPass"
                          id="confirmPass"
                          value={values.confirmPass}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="confirmPass"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="userPhone" className={styles["label"]}>
                          Phone
                        </label>

                        <Field
                          className={styles["input"]}
                          type="phone"
                          placeholder="0988379379"
                          name="userPhone"
                          id="userPhone"
                          value={values.userPhone}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userPhone"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="userAdress" className={styles["label"]}>
                          Địa Chỉ
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          placeholder="100C Hậu Giang Quận 6 TP.HCM"
                          name="userAdress"
                          id="userAdress"
                          value={values.userAdress}
                          onChange={(e: any) => handleChange(e)}
                        />
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userAdress"
                          component="div"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <p>Giới Tính</p>
                        <div className={styles["container-checkbox"]}>
                          <label htmlFor="Male" className={styles["checkbox"]}>
                            <Field
                              type="radio"
                              id="Male"
                              name="userGender"
                              value="1"
                            ></Field>
                            <span>
                              <p>Male</p>
                            </span>
                          </label>
                          <label
                            htmlFor="Female"
                            className={styles["checkbox"]}
                          >
                            <Field
                              type="radio"
                              id="Female"
                              name="userGender"
                              value="0"
                            ></Field>
                            <span>
                              <p>Female</p>
                            </span>
                          </label>
                          <div>{values.userGender}</div>
                          {/* {console.log(values.userGender)} */}
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userGender"
                            component="div"
                          />
                        </div>
                      </span>

                      <span className={styles["box"]}>
                        <p>Vai Trò</p>
                        <div className={styles["container-checkbox"]}>
                          <label htmlFor="Admin" className={styles["checkbox"]}>
                            <Field
                              type="radio"
                              id="Admin"
                              name="userRole"
                              value="1"
                            ></Field>
                            <span>
                              <p>Admin</p>
                            </span>
                          </label>
                          <label htmlFor="Sale" className={styles["checkbox"]}>
                            <Field
                              type="radio"
                              id="Sale"
                              name="userRole"
                              value="2"
                            ></Field>
                            <span>
                              <p>Sale</p>
                            </span>
                          </label>
                          <div>{values.userRole}</div>

                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userRole"
                            component="div"
                          />
                        </div>
                      </span>

                      {/* <p className={styles["errMessage"]}>{errMessage}</p> */}
                      <button type="submit">Signup</button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Modal>
        )}
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
                          <IoEllipsisVerticalSharp />
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
