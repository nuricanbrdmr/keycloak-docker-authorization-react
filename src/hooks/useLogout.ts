import axios from "../api/axios";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogout = () => {
    const { setAuth } = useAuth();
    const refreshToken = Cookies.get("refreshToken")
    const logout = async () => {
        setAuth({});
        try {
            await axios.post('/Auth/logout', {
                refreshToken: refreshToken
            }, {
                withCredentials: true
            });
            Cookies.remove("refreshToken")
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return logout;
};

export default useLogout;
