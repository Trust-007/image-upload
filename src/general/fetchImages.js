import axios from 'axios';

const fetchImages = async () => {
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${
        process.env.REACT_APP_CLOUD_NAME
      }/image/list/finesse.json?cache-buster=${Math.random()}`,
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
  return '';
};

export default fetchImages;
