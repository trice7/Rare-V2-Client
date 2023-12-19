import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createPostTag = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/posttags`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'createPost failed';
  }
};

const deletePostTag = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/posttags/${id}`);
    return response;
  } catch (e) {
    console.warn(e);
    return 'deletePostTag failed';
  }
};

const getAndDeleteAllPostTagsByPostId = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/posttags?post_id=${id}`);
    data.forEach(async (postTag) => {
      await deletePostTag(postTag.id);
    });
    return data;
  } catch (e) {
    console.warn(e);
    return 'deletePostTag failed';
  }
};

export { createPostTag, deletePostTag, getAndDeleteAllPostTagsByPostId };
