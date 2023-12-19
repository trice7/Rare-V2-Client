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

const deleteCategory = async (id, userId) => {
  try {
    const response = await axios.delete(`${databaseURL}/categories/${id}`, { headers: { Authorization: `${userId}` } });
    return response;
  } catch (e) {
    console.warn(e);
    return 'delete Category failed';
  }
};

export { getAllCategories, deleteCategory };
