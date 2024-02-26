import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;


export const fetcher = async (token, route) => {
    try {
        const response = await axios.get(`${BASE_URL}/${route}`,{
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
