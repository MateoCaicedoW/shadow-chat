import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const API_URL = `${BASE_URL}/messages`;

export const getMessages = async (token) => {
    try {
        const response = await axios.get(`${API_URL}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response;
        }

        return response;

    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const sendMessage = async (token, message) => {
    try {
        const response = await axios.post(`${API_URL}`, {
            content: message.content, 
            user_first_name: message.user_first_name,
            user_last_name: message.user_last_name,
            user_email: message.user_email,
            kind : message.kind,
            user_picture: message.user_picture
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response;
        }

        return response;

    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}
