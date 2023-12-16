import axios from 'axios';
import { clientCredentials } from '../client';

const databaseURL = clientCredentials.databaseURL;

const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${databaseURL}/categories`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getAllCategories failed';
  }
};

export { getAllCategories };
