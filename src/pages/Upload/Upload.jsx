import "./upload.css";
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from 'react-spinners';

const Upload = () => {

    const api = useAxios();
    const [appName, setAppName] = useState("");
    const [category, setCategory] = useState("Please select one category");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState(null);
    const [images, setImages] = useState(null);
    const [app, setApp] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formHandler = async (e) => {

        try {

            e.preventDefault();

            if (!appName || !description) {
                toast.info("Please fill all fields");
                return;
            }

            if (!icon) {
                toast.info("Please select an icon");
                return;
            }

            if (!images || images?.length < 1) {
                toast.info("Please select at least 1 image");
                return;
            }

            if (!app) {
                toast.info("Please select the apk file for your app");
                return;
            }

            if (images.length > 4) {
                toast.info("Only the first 4 images will be uploaded");
             }
            
            const formData = new FormData();
    
            formData.append("app_name", appName);
            formData.append("app_category", category);
            formData.append("app_description", description);
            formData.append("app", app);
            
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]); 
            }
            
            formData.append("icon", icon);

            setLoading(true);

            const response = await api.post(
                "app/upload", 
                formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success(response.data.message);
            navigate(-1);
        
    
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }


    }

    const appCategories = [
        "Android Wear",
        "Art & Design",
        "Auto & vehicles",
        "Beauty",
        "Books & Reference",
        "Business",
        "Comics",
        "Communication",
        "Dating",
        "Entertainment",
        "Education",
        "Events",
        "Finance",
        "Food & Drink",
        "Health & Fitness",
        "House & Home",
        "Lifestyle",
        "Maps & Navigation",
        "Medical",
        "Music & Audio",
        "News & Magazines",
        "Parenting",
        "Personalization",
        "Photography",
        "Productivity",
        "Shopping",
        "Social",
        "Sports",
        "Tools",
        "Travel & Local",
        "Video Players & Editors",
        "Weather",
        "Family",
        "Game"
    ]

  return (
    <div className='upload_container'>
        
        <div className="upload_return_container">
        <Link to={'/profile'}><IoReturnDownBack size={25} color="red"/>Return</Link>
        </div>

        <div className="upload_form_container">
            <form onSubmit={formHandler} method="post">
                <input type="text" placeholder="App Name" value={appName} onChange={(e) => setAppName(e.target.value)}/>
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option disabled>Please select one category</option>
                    {appCategories.map((item, i) => { 
                        return (
                        <option key={i} value={item}>{item}</option>
                        )
                    })}
                    
                </select>
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <label htmlFor="app_icon">Select an Icon</label>
                <input type="file" id="app_icon" hidden accept="image/png, image/jpeg" onChange={(e) => setIcon(e.target.files[0])}/>

                <p>{icon?.name}</p>

                <label htmlFor="app_showcase_images">Select 4 images for showcase</label>
                <input type="file" id="app_showcase_images" hidden accept="image/png, image/jpeg" multiple={true} onChange={(e) => setImages(e.target.files)} max={4}/>
                
                <p>{images && "Images selected"}</p>
                <label htmlFor="app_apk">Apk file</label>
                <input type="file" id="app_apk" hidden accept=".apk" onChange={(e) => setApp(e.target.files[0])}/>

                <p>{app?.name}</p>
                
                { isLoading ? <CircleLoader size={60} color="#cf70db" className='overflow-hidden'/>: <button type="submit">Upload</button>}
               
            </form>
        </div>
    </div>
  )
}

export default Upload