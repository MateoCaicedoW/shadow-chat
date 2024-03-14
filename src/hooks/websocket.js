// create a custom hook to handle websocket connections and methods such as send, close, enter, etc.
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';

export const webSocket = () => {
    const WS_URL = `${import.meta.env.VITE_API_WEBSOCKET_URL}/ws`;
    const { user } = useAuth();

    const [socket, setSocket] = useState(null);
    const queryParams = {
        Authorization: `Bearer ${user.token}`,
        id : user.id,
        name : user.first_name + " " + user.last_name
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const socketUrl = `${WS_URL}?${queryString}`;
    useEffect(() => {

        const ws = new WebSocket(socketUrl);
    
        ws.addEventListener('open', () => {
            console.log('WebSocket connection opened');
        });
    
        ws.addEventListener('message', (event) => {
            console.log('Message received:', event.data);
        });
    
        ws.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    
        ws.addEventListener('error', (event) => {
            console.error('WebSocket error:', event);
        });
    
        setSocket(ws);
    
        return () => {
            ws.close();
        };

    }, [WS_URL]);
    

    return socket
};