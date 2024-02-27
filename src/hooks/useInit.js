import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetcher } from '../api/fetcher';
import { getUsers } from '../redux/usersSlice';
import { useAuth } from '../components/auth/AuthProvider';


export const useInit = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const dataFromServer = useRef(false)
    async function initState() {
        const users = await fetcher(user.token, 'users');
        dispatch(getUsers(users.data));
    }
    
    useEffect(() => {
        if (dataFromServer.current) return;
        dataFromServer.current = true;

        initState();
    }, []);

}