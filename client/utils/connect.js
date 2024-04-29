import Axios from 'axios';
import env from '../env.json'

export const chat = async ({ chatData }) => {
    const url = env.REACT_APP_BACKEND_URL + '/chat';
    const data = {
            chatData: chatData,
        };
        try {
            const response = await Axios.post(url, data);
            return response.data;
        } 
        catch (error) {
            throw new Error(error.message);
        }
    };

export const login = async (username, password) => {
    const url = env.REACT_APP_BACKEND_URL + '/login';
    try {
      const response = await Axios.post(url, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
  };

export const register = async (email, password, verificationCode) => {
    const url = env.REACT_APP_BACKEND_URL + '/register';
    try {
      const response = await Axios.post(url, {
        username,
        password,
        verificationCode
      });
      return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}