import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const API_URL = `${BASE_URL}/chats`;

export const getMessagesFrom = async (token, first_user, second_user) => {
    try {
        const response = await axios.get(`${API_URL}/${first_user}/${second_user}`,{
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

export const createChat = async (token, first_user, second_user) => {
    try {
        const response = await axios.post(`${API_URL}/`,{
            first_user_id: first_user,
            second_user_id: second_user
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response;

    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}