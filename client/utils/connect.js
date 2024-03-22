import Axios from 'axios';
import env from '../env.json'

export const chat = async ({ chatData }) => {
    const url = env.REACT_APP_BACKEND_URL + '/';
    console.log(url);
    const data = {
        chatData: chatData,
        };
        try {
        const response = await Axios.post(url, data);
        return response.data;
        } catch (error) {
        throw new Error(error.message);
        }
    };