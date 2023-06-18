import { Routes, Route } from 'react-router-dom';
import ImageList from './components/ImageList';
import Home from './components/Home';

function App() {
  // const [images, setImages] = useState([])

  // const API_KEY = "728772617814122";
  // const API_SECRET = "GupvwxmgeFJuAQyc0KksX1kNWsw";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<ImageList />} />
    </Routes>
  );
}

export default App;
