import { Link } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => (
  <div className={classes.home}>
    <h1>Welcome to FinessePics</h1>
    <Link to="/images" className={classes.link}>
      Gallery
    </Link>
  </div>
);

export default Home;
