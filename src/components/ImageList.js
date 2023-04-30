import { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto";
import AddImage from "./AddImage";
import classes from "./ImageList.module.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUploadedPictures = async () => {
      try {
        const response = await axios.get(
          `http://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/list/finesse.json`,
          { cache: false }
        );
        if (response.status === 200) {
          console.log(response.data.resources);
          setImages(response.data.resources);
        } else {
          return;
        }
      } catch (error) {
        throw new Error(error);
      }
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

          console.log(response);
        } catch (error) {
          throw new Error(error);
        }
      };

      deleteImage();
    } else {
      console.log("abort");
    }
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className={classes.home_add}>
        <Link to="/">Home</Link>
        <button type="button" onClick={showModalHandler}>
          Add Image
        </button>
      </div>
      {showModal && <AddImage onHide={hideModalHandler} />}
      <h1 className={classes.gallery_h1}>
        Photo <span>Gallery</span>
      </h1>
      {images !== [] ? (
        <CloudinaryContext cloudName="dojhgnnw8">
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
                  <Image
                    publicId={img.public_id}
                    width="300"
                    height="300"
                    crop="fit"
                    id={img.public_id.toString()}
                    className={classes.pic}
                  />
                </div>
              );
            })}
          </div>
        </CloudinaryContext>
      ) : (
        <h2>No Images Added</h2>
      )}
    </>
  );
};

export default ImageList;
