import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const API_URL = `${BASE_URL}/auth`;

export const login = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { 
            email: email
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

export const register = async (email, first_name, last_name) => {
    try {
        const response = await axios.post(`${API_URL}/sign-up`, {
            email: email,
            first_name: first_name,
            last_name: last_name
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

export const currentUser = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/current_user`,{
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
