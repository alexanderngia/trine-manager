import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { history } from "utils/history";
import styles from "./register.module.scss";
import { messageActions } from "redux/reducers/messageSlice";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = (props) => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageActions.clearMessage());
  }, [dispatch]);

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
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPass, setUserPass] = useState("");
  // const [userPhone, setUserPhone] = useState("");
  // const [userGender, setUserGender] = useState("");
  // const [userAdress, setUserAdress] = useState("");
  // const [userRole, setUserRole] = useState("");

  // const [errMessage, setErrMessage] = useState("");

  // const dispatch = useAppDispatch();

  // const handleLogin = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setErrMessage("");

  //   try {
  //     let data: any = await authService.handleLoginApi(userEmail, userPass);

  //     // Success Login
  //     if (data && data.errCode === 0) {
  //       setErrMessage(data.message);
  //       // dispatch(authActions.loginSuccess(data.user));
  //       localStorage.setItem("ACCESS_TOKEN", "TRUE");
  //       history.push("/dashboard");
  //     }
  //     // Fail Login
  //     if (data && data.errCode !== 0) {
  //       setErrMessage(data.message);
  //       // dispatch(authActions.loginFail());
  //     }
  //   } catch (error: any) {
  //     if (error.response) {
  //       if (error.response.data) {
  //         setErrMessage(error.response.data.message);
  //       }
  //     }
  //   }
  // };
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  // };
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
    <div className={styles["root"]}>
      <div className={styles["login-page"]}>
        <h1>Let's signup!</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, handleChange }: any) => (
            <Form className={styles["form"]}>
              {!successful && (
                <div className={styles["login-form"]}>
                  <Field
                    className={styles["input"]}
                    type="text"
                    placeholder="Enter your fullname"
                    name="userName"
                    value={values.userName}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userName"
                    component="div"
                  />

                  <Field
                    className={styles["input"]}
                    type="email"
                    placeholder="Enter your email"
                    name="userEmail"
                    value={values.userEmail}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userEmail"
                    component="div"
                  />

                  <Field
                    className={styles["input"]}
                    type="password"
                    placeholder="Enter your password"
                    name="userPass"
                    value={values.userPass}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userPass"
                    component="div"
                  />
                  <Field
                    className={styles["input"]}
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPass"
                    value={values.confirmPass}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="confirmPass"
                    component="div"
                  />

                  <Field
                    className={styles["input"]}
                    type="phone"
                    placeholder="Enter your phone"
                    name="userPhone"
                    value={values.userPhone}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userPhone"
                    component="div"
                  />
                  <Field
                    className={styles["select"]}
                    id="gender"
                    name="userGender"
                    component="select"
                    value={values.userGender}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </Field>
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userGender"
                    component="div"
                  />

                  <Field
                    className={styles["input"]}
                    type="text"
                    placeholder="Enter your address"
                    name="userAdress"
                    value={values.userAdress}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userAdress"
                    component="div"
                  />

                  <Field
                    className={styles["select"]}
                    id="role"
                    name="userRole"
                    component="select"
                    value={values.userRole}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <option value="1">Admin</option>
                    <option value="2">Sale</option>
                  </Field>
                  <ErrorMessage
                    className={styles["errMess"]}
                    name="userRole"
                    component="div"
                  />

                  {/* <p className={styles["errMessage"]}>{errMessage}</p> */}
                  <button type="submit">Signup</button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
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
    </div>
  );
};

export default Register;
