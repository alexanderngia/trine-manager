import { Layout } from "components/views/layout";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { messageActions } from "redux/reducers/messageSlice";
import postService from "services/postService";
import PreviewImg from "components/ui/image/previewImg";
import styles from "./index.module.scss";
import "./index.scss";
import { ButtonSub } from "components/ui/button/button";
import { history } from "utils/history";

const MarkdownIt = require("markdown-it");
const mdParser = new MarkdownIt(/* Markdown-it options */);

export interface PostProps {}

const Post: React.FC<PostProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { post } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    authorNew: `${user.fullNameUser}`,
    urlNew: "",
    titleNew: "",
    bodyNew: "",
    bodyHtmlNew: "",
    featureImgNew: "",
    categoryNew: "",
    keywordTagNew: "",
    titleTagNew: "",
    descripTagNew: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (post) {
          const urlPost = post.title
            .replaceAll(" ", "-")
            .replaceAll(",", "")
            .replaceAll(".", "")
            .replaceAll("?", "")
            .replaceAll("!", "")
            .replaceAll(":", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();

          setInitialValue({
            id: `${post.id}`,
            authorNew: `${post.author}`,
            urlNew: `${urlPost}`,
            titleNew: `${post.title}`,
            bodyNew: `${post.body}`,
            bodyHtmlNew: `${post.bodyHtml}`,
            featureImgNew: `${post.featureImg}`,
            categoryNew: `${post.category}`,
            keywordTagNew: `${post.keywordTag}`,
            titleTagNew: `${post.title}`,
            descripTagNew: `${post.descripTag}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, post]);

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const {
      authorNew,
      urlNew,
      titleNew,
      bodyNew,
      bodyHtmlNew,
      featureImgNew,
      categoryNew,
      keywordTagNew,
      titleTagNew,
      descripTagNew,
    } = formValue;
    try {
      let res = await postService.handleRegisterApi({
        authorNew,
        urlNew,
        titleNew,
        bodyNew,
        bodyHtmlNew,
        featureImgNew,
        categoryNew,
        keywordTagNew,
        titleTagNew,
        descripTagNew,
      });
      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        await alert(`${message}`);
        history.push("/post-manager");
      }

      // return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      authorNew,
      urlNew,
      titleNew,
      bodyNew,
      bodyHtmlNew,
      featureImgNew,
      categoryNew,
      keywordTagNew,
      titleTagNew,
      descripTagNew,
    } = formValue;
    try {
      let res = await postService.handleUpdateApi({
        id,
        authorNew,
        urlNew,
        titleNew,
        bodyNew,
        bodyHtmlNew,
        featureImgNew,
        categoryNew,
        keywordTagNew,
        titleTagNew,
        descripTagNew,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`Post ${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteItem = async (deleteItem: any) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${deleteItem.titleNew}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await postService.handleDeleteApi(deleteItem.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          await alert(deleteItem.titleNew + message);
          history.push("/post-manager");
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${deleteItem.titleNew}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const customOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    setFieldValue(
      "urlNew",
      e.target.value
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll("?", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
    );
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{post ? "CẬP NHẬT BÀI VIẾT" : "THÊM BÀI VIẾT"}</h1>
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          onSubmit={post ? handleUpdate : handleRegister}
          // onSubmit={(values) => {
          //   console.log(values);
          // }}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, handleChange }: any) => (
            <Form className={styles["form"]}>
              <div className={styles["container"]}>
                <span className={styles["column"]}>
                  <span className={styles["box"]}>
                    <Field
                      className={styles["input"]}
                      type="text"
                      name="id"
                      hidden
                    />
                    <Field
                      hidden
                      className={styles["input"]}
                      type="text"
                      name="authorNew"
                      onChange={() =>
                        setFieldValue("authorNew", `${post.author}`)
                      }
                    />
                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="TIÊU ĐỀ"
                      name="titleNew"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        customOnchange(e, setFieldValue);
                      }}
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="titleNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="urlNew" className={styles["label"]}>
                      Permalink
                    </label>
                    <Field
                      className={styles["input"]}
                      type="text"
                      name="urlNew"
                      value={values.titleNew
                        .replaceAll(" ", "-")
                        .replaceAll(",", "")
                        .replaceAll(".", "")
                        .replaceAll("?", "")
                        .replaceAll("!", "")
                        .replaceAll(":", "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/đ/g, "d")
                        .replace(/Đ/g, "D")
                        .toLowerCase()}
                      id="urlNew"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <MdEditor
                      style={{ height: "500px" }}
                      name="bodyNew"
                      value={`${values.bodyNew}`}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={(e) => {
                        setFieldValue("bodyNew", `${e.text}`);
                        setFieldValue("bodyHtmlNew", `${e.html}`);
                      }}
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="titleTagNew" className={styles["label"]}>
                      Tiêu Đề SEO
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="lingerie, đồ bơi,..."
                      name="titleTagNew"
                      id="titleTagNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="titleTagNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="descripTagNew" className={styles["label"]}>
                      Description SEO
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="lingerie, đồ bơi,..."
                      name="descripTagNew"
                      id="descripTagNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="descripTagNew"
                      component="div"
                    />
                  </span>
                </span>

                <span className={styles["column"]}>
                  <span className={styles["box"]}>
                    <PreviewImg />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="featureImgNew" className={styles["label"]}>
                      Ảnh Bài Viết
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="http://firebase.com/image"
                      name="featureImgNew"
                      id="featureImgNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="featureImgNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="keywordTagNew" className={styles["label"]}>
                      Từ Khóa
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="lingerie, đồ bơi,..."
                      name="keywordTagNew"
                      id="keywordTagNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="keywordTagNew"
                      component="div"
                    />
                  </span>
                  <span className={styles["box"]}>
                    <label htmlFor="categoryNew" className={styles["label"]}>
                      Thể Loại
                    </label>

                    <Field
                      className={styles["input"]}
                      type="text"
                      placeholder="Lingerie"
                      name="categoryNew"
                      id="categoryNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="categoryNew"
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
                    <button type="submit">{post ? "Update" : "Save"}</button>
                  </div>
                </span>
              </div>
              <p className={styles["message"]}>{message}</p>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Post;
function setFieldValue(arg0: string, value: string) {
  throw new Error("Function not implemented.");
}
