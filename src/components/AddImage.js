import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import fetchImages from "../general/fetchImages";
import classes from "./AddImage.module.css";

const AddImage = (props) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getfileHandler = (event) => {
    setMessage("");
    setFile(event.target.files[0]);
  };

  const addPicHandler = () => {
    if (file !== "") {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "finessecodes");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
          formData
        )
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setMessage(
              "Upload successful, might take a few seconds to reflect."
            );
            const fetchUploadedPictures = async () => {
              setIsLoading(true);
              const response = await fetchImages();
              props.getImages(response.data.resources);
              setIsLoading(false);
            };

            fetchUploadedPictures();
          } else {
            setIsLoading(false);
            setMessage("Upload failed");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      setMessage("Please select a file to upload");
    }
  };
  return (
    <Modal onHide={props.onHide}>
      <div className={classes.upload}>
        {message !== "" && <p className={classes.confirm}>{message}</p>}
        <input type="file" accept="image/*" onChange={getfileHandler} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={addPicHandler}>Add Picture</button>
        )}
      </div>
    </Modal>
  );
};

export default AddImage;
