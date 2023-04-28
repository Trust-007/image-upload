import ImageList from "./components/ImageList";
import AddImage from "./components/AddImage";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  // const [images, setImages] = useState([])

  // const API_KEY = "728772617814122";
  // const API_SECRET = "GupvwxmgeFJuAQyc0KksX1kNWsw";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<ImageList />} />
      <Route path="/add-image" element={<AddImage />} />
    </Routes>
  );
}

export default App;
