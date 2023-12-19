import axios from 'axios';
import { clientCredentials } from '../client';

const databaseURL = clientCredentials.databaseURL;

const getAllTags = async () => {
  try {
    const { data } = await axios.get(`${databaseURL}/tags`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getAllTags failed';
  }
};

export { getAllTags };
