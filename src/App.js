import ImageList from "./components/ImageList";
import AddImage from "./components/AddImage";

function App() {
  // const [images, setImages] = useState([])

  // const API_KEY = "728772617814122";
  // const API_SECRET = "GupvwxmgeFJuAQyc0KksX1kNWsw";

  return (
    <div>
      <AddImage />
      <ImageList />
    </div>
  );
}

export default App;
