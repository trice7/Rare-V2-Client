import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUser = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/users/id`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'getSingleUserFailed';
  }
};

export { getSingleUser };
