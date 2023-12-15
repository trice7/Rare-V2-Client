import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createComment = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/comments`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'createComment failed';
  }
};

const updateComment = async (id) => {
  try {
    const response = await axios.put(`${dbUrl}/comments/${id}`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'updateComment failed';
  }
};

const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/comments/${id}`);
    return response;
  } catch (e) {
    console.warn(e);
    return 'deleteComment failed';
  }
};

export { createComment, updateComment, deleteComment };
