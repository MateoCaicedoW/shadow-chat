import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const API_URL = `${BASE_URL}/users`;

export const myChats = async (token, id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/chats`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}


