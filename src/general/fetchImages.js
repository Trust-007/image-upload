import axios from "axios";

const fetchImages = async () => {
  try {
    const response = await axios.get(
      `http://res.cloudinary.com/${
        process.env.REACT_APP_CLOUD_NAME
      }/image/list/finesse.json?cache-buster=${Math.random()}`
    );
    if (response.status === 200) {
      return response;
    } else {
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchImages;
