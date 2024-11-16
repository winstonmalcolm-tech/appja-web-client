import Logo from "../../assets/logo.png";
import "./navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import TokenContext from "../../contexts/tokenContext/tokenContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {

    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate();


    const logoutHandler = async () => {
        
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/logout", 
                {
                    refreshToken: token.refreshToken
                }, 
                {
                    headers: `Bearer ${token.accessToken}`
                }
            );
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setToken(null);
            toast.success(`${response.data.message}`);

            navigate("/");

        } catch(error) {
            toast.error(`${error.response.data.message}`);
        }

    }

;  return (
    <nav>
        <div className="navbar_left">
            <img src={Logo} alt="Logo" />
        </div>

        <div className="middle">
            <ul>
                { !token && <NavLink to="/" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Home</li></NavLink>}
                <NavLink to="/explore" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Explore</li></NavLink> 
                <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>About</li></NavLink>
                { !token && <NavLink to="/pricing" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Pricing</li></NavLink>}
            </ul>
        </div>

        <div className="navbar_right">
            {
                (!token) ? (
                    <>
                        <Link to="/auth/register">Sign up</Link>
                        <Link to="/auth/login">Sign in</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile"> Profile </Link>
                        <button onClick={logoutHandler}>Logout</button>
                    </>
                )
            }
           
        </div>
    </nav>
  )
}

export default Navbar