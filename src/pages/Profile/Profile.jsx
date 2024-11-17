import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import useAxios from '../../utils/useAxios';
import AppCard from '../../components/AppCard/AppCard';


const INITIAL_STATE = {
  loading: true,
  user: {},
  apps: [],
  socials: []
}

const userReducer = (state, action) => {

  switch(action.type) {
    case "ADD_USER": {
      return {
      ...state,
      loading: false,
      user: action.payload,
    };
  }

    case "ADD_APPS" : {
        return {
            ...state,
            loading: false,
            apps: action.payload
          }
      }

    case "ADD_SOCIALS": {
        return {
        ...state,
        loading: false,
        socials: action.payload
      }
    }

    default: return state;
  }

}

const Profile = () => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const navigate = useNavigate();

    const api = useAxios()

    const fetchUserData = async (api) => {

      try {

        const response = await api.get("/developer");

        if (response.status == 403) {
          toast.error(`Something Happened`);
          logout()
          navigate("/auth/login");
          return;
        }
    
        dispatch({type: "ADD_USER", payload: response.data.user});
        dispatch({type: "ADD_APPS", payload: response.data.apps});
        dispatch({type: "ADD_SOCIALS", payload: response.data.socials});

        console.log(state)
    
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
        
      }
    }


    useEffect(() => {
      fetchUserData(api);
    }, []);

    if (state.loading) return <h1>Loading</h1>;

  return (
    <div className='profile_container'>

        <div className="profile_header">
          <div className="profile_header_left">
            <div className="profile_avatar_container">
              {state.user.profile_image ? <img src={state.user?.profile_image } /> : <h3>{state.user.first_name.charAt(0)}{state.user?.last_name?.charAt(0)}</h3>}
              <label htmlFor="file-upload">+</label>
              <input type="file" id="file-upload"/>
            </div>
            
            <div className="profile_subtitle">
              <h1>{state.user.first_name} {state.user.last_name}</h1>
              <h3>@{state.user.username}</h3>
              <button>Contact</button>
            </div>
          </div>

          <div className="profile_header_right">
            <button>Post App</button>
          </div>
        </div>

        <div className="profile_app_display">
          <div className="profile_app_display_header">
            <h1>Created Apps</h1>
          </div>
          
          {state.apps.length == 0 ? <h1>No Apps</h1> : null}

          {state.apps.map((app) => <AppCard app={app}/>)}
        </div>
        
    </div>
  )
}

export default Profile