
import { createContext, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, removeCurrentUser } from "../../redux/currentUserSlice";
import { currentUser, login } from "../../api/auth";
import { emptyAuthErrors, setAuthErrors } from "../../redux/authErrors";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useSelector(state => state.currentUser.value)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // call this function when you want to authenticate the user
    const signin = async (data) => {
        const res = await login(data.email)
        if (res.status !== 200) {
            dispatch(setAuthErrors(res.data))
            return
        }

        dispatch(setAuthErrors(emptyAuthErrors))
        const token = res.data.token
        const resp = await currentUser(token)
        if (resp.status !== 200) {
            dispatch(removeCurrentUser())
            return
        }

        let details = resp.data
        details.token = token

        dispatch(setCurrentUser(details))
        navigate("/chat");
    };

    // call this function to sign out logged in user
    const logout = () => {
        dispatch(removeCurrentUser())
        navigate("/", { replace: true });
    };


    const value = useMemo(() => ({ user, signin, logout }), [user]);
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};