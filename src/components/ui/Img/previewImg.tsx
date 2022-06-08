import React, { useState, useEffect } from "react";
import styles from "./previewImg.module.scss";
import { Storage } from "firebaseAuth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { ButtonMain } from "components/ui/button/button";
const { v4 } = require("uuid");

export interface PreviewImgProps {
  onImgList: any;
}

const PreviewImg: React.FC<PreviewImgProps> = ({ onImgList }) => {
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageList, setImageList] = useState<any>([]);

  const imageListRef = ref(Storage, "images/");
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(Storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev: any) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
  }, []);

  const handleUploadImg = (e: any) => {
    setImageUpload(e.target.files[0]);
    onImgList(imageUpload);
  };

  return (
    <>
      <div className={styles["container-Img"]}>
        {React.Children.toArray(
          imageList.map((url: string) => {
            return <img src={url} alt={`${url}`} />;
          })
        )}
      </div>

      <input
        type="file"
        // onChange={(e: any) => setImageUpload(e.target.files[0])}
        onChange={handleUploadImg}
      />
      <ButtonMain
        type="button"
        className={styles["upload-btn"]}
        onClick={uploadImage}
      >
        Upload
      </ButtonMain>
    </>
    // <div
    //   className={classNames(styles["root"], className)}
    //   style={{
    //     backgroundImage: `url(${preview})`,
    //   }}
    // ></div>
  );
};
export default PreviewImg;
