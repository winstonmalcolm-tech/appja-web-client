import Logo from "../../assets/logo.png";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContextProvider";


const Navbar = () => {

    const {tokens, logout} = useContext(TokenContext);

    return (
        <nav>
            <div className="navbar_left">
                <img src={Logo} alt="Logo" />
            </div>

            <div className="middle">
                <ul>
                    { !tokens && <NavLink to="/" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Home</li></NavLink>}
                    <NavLink to="/explore" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Explore</li></NavLink> 
                    { !tokens && <NavLink to="/pricing" className={({ isActive }) => isActive ? 'navbar_active' : 'navbar_unactive'}><li>Pricing</li></NavLink>}
                </ul>
            </div>

            <div className="navbar_right">
                {
                    (!tokens) ? (
                        <>
                            <Link to="/auth/register">Sign up</Link>
                            <Link to="/auth/login">Sign in</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile"> Profile </Link>
                            <button onClick={() => logout()}>Logout</button>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar