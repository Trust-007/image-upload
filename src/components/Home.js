import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <Link to="/images">Images</Link>
        <Link to="/add-image">Add Image</Link>
      </div>
    </div>
  );
};

export default Home;
