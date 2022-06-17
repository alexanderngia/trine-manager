import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Storage } from "firebaseAuth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { ButtonMain } from "components/ui/button/button";
const { v4 } = require("uuid");

export interface PreviewImgProps {}

const PreviewImg: React.FC<PreviewImgProps> = () => {
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageList, setImageList] = useState<any>([]);

  const uploadImage = () => {
    if (imageUpload === null) return;
    Object.values(imageUpload).forEach((item: any) => {
      const imageRef = ref(Storage, `posts/${item.name}`);
      uploadBytes(imageRef, item).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
  };

  useEffect(() => {
    setImageList([]);
  }, []);

  const handleUploadImg = (e: any) => {
    setImageUpload(e.target.files);
  };

  return (
    <div className={styles["root"]}>
      {imageList.length > 0 && (
        <ul className={styles["container-preview"]}>
          {React.Children.toArray(
            imageList.map((url: string) => {
              return (
                <li>
                  <img src={url} alt={`${url}`} />
                  <input value={`${url}`} onChange={(e) => e.target.value} />
                </li>
              );
            })
          )}
        </ul>
      )}

      <div className={styles["container-upload"]}>
        <input
          className={styles["upload-input"]}
          type="file"
          onChange={handleUploadImg}
          multiple
        />
        <ButtonMain
          type="button"
          className={styles["upload-btn"]}
          onClick={uploadImage}
        >
          Upload Ảnh
        </ButtonMain>
      </div>
    </div>
    // <div
    //   className={classNames(styles["root"], className)}
    //   style={{
    //     backgroundImage: `url(${preview})`,
    //   }}
    // ></div>
  );
};
export default PreviewImg;
