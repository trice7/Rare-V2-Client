import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/posts`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getAllPosts failed';
  }
};

const getSinglePost = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/posts/${id}`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'getSinglePost failed';
  }
};

const getUserPosts = async (userId) => {
  try {
    const { data } = await axios.get(`${dbUrl}/posts?user_id=$${userId}`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getUserPosts failed';
  }
};

const createPost = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/posts`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'createPost failed';
  }
};

const updatePost = async (id, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/posts/${id}`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'updatePost failed';
  }
};

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/posts/${id}`);
    return response;
  } catch (e) {
    console.warn(e);
    return 'deletePost failed';
  }
};

export { getAllPosts, getSinglePost, getUserPosts, createPost, updatePost, deletePost };
