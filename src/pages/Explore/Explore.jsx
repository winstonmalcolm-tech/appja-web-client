import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import AppCard from "../../components/AppCard/AppCard";

const Explore = () => {
  const api = useAxios();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParameter, setSearchParameter] = useState("App");
  const [completeList, setCompleteList] = useState([]);;


  const getApps = async () => {

    try {
      const response = await api.get("app");

      setApps(response.data.apps);
      setCompleteList(response.data.apps);

      console.log(response.data.apps);

    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const searchHandler = (e) => {
    setSearch(e.target.value);

    setApps(apps.filter(app => searchParameter == "App" ? app.app_name.includes(e.target.value) : app.username.includes(e.target.value)));

    if (e.target.value == "") {
      setApps(completeList);
    }
  }

  useEffect(() => {
    getApps();
  }, [])

  if (loading) {
    return <center>Loading</center>
  }

  return (
    <main className="mt-10"> 
      <center className="mb-16">
        <input type="text" value={search} onChange={searchHandler} className="w-2/3 h-10 border-[1px] border-gray-400 rounded-xl outline-none focus:border-purple-500 bg-transparent ps-2 py-6 mr-8" placeholder="Search..."/>
        <select onChange={(e) => setSearchParameter(e.target.value)} value={searchParameter} className="h-12 w-32 p-3 border-[1px] border-gray-400 bg-[#241f25] outline-none">
          <option value="App">App</option>
          <option value="Developer">Developer</option>
        </select>
      </center>

      <div className="flex gap-3 flex-wrap">
        {apps.length < 1 ? <h1 className='text-2xl'>{searchParameter == "App" ? "No apps" : "No developer by that username"}</h1> : apps.map((app, i) => <AppCard key={i} app={app} developerId={app.developer_id} />)}
      </div>
      
    </main>
  )
}

export default Explore;