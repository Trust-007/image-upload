import { useState } from "react";
import axios from "axios";

const AddImage = () => {
  const [file, setFile] = useState("");

  const getfileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const addPicHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "finessecodes");
    axios
      .post("https://api.cloudinary.com/v1_1/dojhgnnw8/image/upload", formData)
      .then((res) => console.log(res));
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={getfileHandler} />
      <button onClick={addPicHandler}>Add Picture</button>
    </div>
  );
};

export default AddImage;
