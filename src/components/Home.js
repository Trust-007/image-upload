import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <h1>Welcome to FinessePics</h1>
      <div className={classes.links}>
        <Link to="/images">Images</Link>
        <Link to="/add-image">Add Image</Link>
      </div>
    </div>
  );
};

export default Home;
