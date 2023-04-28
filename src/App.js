import { useState } from "react";
import axios from "axios";
import ImageList from "./components/ImageList";

function App() {
  const [file, setFile] = useState("");
  // const [images, setImages] = useState([])

  // const API_KEY = "728772617814122";
  // const API_SECRET = "GupvwxmgeFJuAQyc0KksX1kNWsw";

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
      <img
        style={{ width: "200px", height: "200px" }}
        src="http://res.cloudinary.com/dojhgnnw8/image/upload/v1682553651/nf9aqo7gvimgjfrbz0kv.jpg"
      />
      <input type="file" accept="image/*" onChange={getfileHandler} />
      <button onClick={addPicHandler}>Add Picture</button>
      <ImageList />
    </div>
  );
}

export default App;
