import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';

import { Route, Routes, Navigate} from 'react-router-dom';
import Explore from './pages/Explore/Explore.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import About from './pages/About/About.jsx';
import Home from './pages/Home/Home.jsx';
import Detail from './pages/Detail/Detail.jsx';
import NewApp from './pages/NewApp/NewApp.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Profile from './pages/Profile/Profile.jsx';


function App() {

  return (
    <div className="container">
      <Navbar/>
      <Routes>
        <Route path='/' element={localStorage.getItem("accessToken") ? <Navigate replace={true} to="/profile"/>: <Home />} />
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/apps'>
          <Route path=':id' element={<Detail />} />
          <Route path='new' element={<NewApp />} />
        </Route>
        <Route path='/auth'>
          <Route path='login' element={<SignIn />} />
          <Route path='register' element={<SignUp />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
  </div>
  )
}

export default App;
