import { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./ImageList.module.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  // const [warning, setWarning] = useState(false);

  const CLOUD_NAME = "dojhgnnw8";
  const API_SECRET = "GupvwxmgeFJuAQyc0KksX1kNWsw";

  useEffect(() => {
    const fetchUploadedPictures = async () => {
      const response = await axios.get(
        `http://res.cloudinary.com/${CLOUD_NAME}/image/list/finesse.json`
      );

      console.log(response.data.resources);
      setImages(response.data.resources);
    };

    fetchUploadedPictures();
  }, []);

  const deleteImageHandler = (e) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      const publicId = e.target.parentElement.nextSibling.id;
      const deleteImage = async () => {
        try {
          const response = await axios.post(
            `http://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`,
            {
              token: API_SECRET,
              public_id: publicId,
            }
          );
          console.log(response.data);
        } catch (error) {
          throw new Error(error);
        }
      };

      deleteImage();
    } else {
      console.log("abort");
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Photo Gallery</h1>
      <CloudinaryContext cloudName="dojhgnnw8">
        <div className={classes.grid_container}>
          {images.map((img) => {
            return (
              <div className={classes.card} key={img.public_id}>
                <div className={classes.delete}>
                  <button type="button" onClick={deleteImageHandler}>
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
    </>
  );
};

export default ImageList;
