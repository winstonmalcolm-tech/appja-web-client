import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import TokenContext from "../contexts/tokenContext/tokenContext";


//This is used to update the context - global state
const useAxios = () => {
    const { setToken, logout } = useContext(TokenContext);

    let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
    let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null;


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {Authorization: `Bearer ${accessToken}`}
    });

   
    
    axiosInstance.interceptors.request.use(async (req) => {
        
        if (!accessToken) {
            accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
            refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null;
        }
        //Decode the jwt token 
        const decodedToken = jwtDecode(accessToken);
    
        //Check if token expired by comparing the expiration date from the token to current date using dayjs package
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
    
    
        //If token is not expired continue with the request
        if (!isExpired) return req;
    
        
        const response = await axios.post("http://localhost:3000/auth/refresh_token", {refreshToken: refreshToken});

        if (response.status == 403) {
            return req;
        }
    
        localStorage.setItem("accessToken", response.data.accessToken);
        
        setToken({...token, accessToken: response.data.accessToken});

        req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    
    
        //Continue with the request
        return req;
    })


    return axiosInstance;
}

export default useAxios;

