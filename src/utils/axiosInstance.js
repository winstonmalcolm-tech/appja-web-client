import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {Authorization: `Bearer ${accessToken ?? ""}`}
});

axiosInstance.interceptors.request.use(async (req) => {
    
    //If accessToken is null get it from local storage
    if (!accessToken) {
        accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
        refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null;

        //Add jwt token to headers
        req.headers.Authorization = `Bearer ${accessToken}`;
    }

    //Decode the jwt token 
    const decodedToken = jwtDecode(accessToken);

    //Check if token expired by comparing the expiration date from the token to current date using dayjs package
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;


    //If token is not expired continue with the request
    if (!isExpired) return req;

    
    const response = await axios.post("http://localhost:3000/auth/refresh_token", {refreshToken});

    localStorage.setItem("accessToken", response.data.accessToken);

    req.headers.Authorization = `Bearer ${response.data.accessToken}`;


    //Continue with the request
    return req;
})




export default axiosInstance;