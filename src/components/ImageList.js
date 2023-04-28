import { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  const CLOUD_NAME = "dojhgnnw8";

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

  return (
    <CloudinaryContext cloudName="dojhgnnw8">
      {images.map((img) => {
        return (
          <Image
            publicId={img.public_id}
            width="300"
            height="300"
            crop="fit"
            key={img.public_id}
          />
        );
      })}
    </CloudinaryContext>
  );
};

export default ImageList;
