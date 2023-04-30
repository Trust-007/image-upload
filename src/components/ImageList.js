import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto";
import AddImage from "./AddImage";
import fetchImages from "../general/fetchImages";
import LoadingSpinner from "./LoadingSpinner";
import classes from "./ImageList.module.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUploadedPictures = async () => {
      setIsLoading(true);
      const response = await fetchImages();
      setImages(response.data.resources);
      setIsLoading(false);
    };

    fetchUploadedPictures();
  }, []);

  const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const deleteImageHandler = (e) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      const publicId = e.target.parentElement.nextSibling.id;

      const deleteImage = async () => {
        const timestamp = new Date().getTime();
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiSecret = process.env.REACT_APP_API_SECRET;
        const signature = generateSHA1(generateSignature(publicId, apiSecret));
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`;

        try {
          const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key: apiKey,
            timestamp: timestamp,
          });
          if (response.status === 200) {
            setIsLoading(true);
            const response = await fetchImages();

            setImages(response.data.resources);
            setIsLoading(false);
            alert(
              "Image has been deleted, might take a few seconds to reflect."
            );
          } else {
            alert("something went wrong.");
            return;
          }
        } catch (error) {
          throw new Error(error);
        }
      };

      deleteImage();
    } else {
      return;
    }
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const getImages = (images) => {
    setImages(images);
  };

  return (
    <>
      <div className={classes.home_add}>
        <Link to="/">Home</Link>
        <button type="button" onClick={showModalHandler}>
          Add Image
        </button>
      </div>
      {showModal && (
        <AddImage onHide={hideModalHandler} getImages={getImages} />
      )}
      <h1 className={classes.gallery_h1}>
        Photo <span>Gallery</span>
      </h1>
      {isLoading ? (
        <div className={classes.loader_container}>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {images !== [] ? (
            <div className={classes.grid_container}>
              {images.map((img) => {
                return (
                  <div className={classes.card} key={img.public_id}>
                    <div className={classes.delete}>
                      <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={deleteImageHandler}
                      >
                        Delete Picture
                      </button>
                    </div>
                    <img
                      src={`http://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/c_fit,h_300,w_300/${img.public_id}`}
                      alt={img.public_id}
                      id={img.public_id.toString()}
                      className={classes.pic}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <h2>No Images Added</h2>
          )}
        </div>
      )}
    </>
  );
};

export default ImageList;
