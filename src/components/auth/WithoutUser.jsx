import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const WithoutUser = ({ children }) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/chats" />;
    }
    return children;

};