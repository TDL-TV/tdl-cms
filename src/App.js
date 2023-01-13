import { Route, Routes } from "react-router-loading";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/pages/authentication/Login";
import Register from "./components/pages/authentication/Register";
import Content from "./components/pages/content/Content";
import Images from "./components/pages/content/Images";
import UpdateForm from "./components/pages/content/UpdateForm";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/home/Home";
import Users from "./components/pages/users/Users";
import ReactGA from 'react-ga'
import { topbar } from 'react-router-loading'

topbar.config({
  barColors: {
    0: 'rgb(0, 214, 214)',
    .3: 'rgb(0, 135, 144)',
    1.0: 'rgb(0, 87, 124)'
},
})

function App() {

  const TRACKING_ID = "G-W9K1NP8L2J"
  ReactGA.initialize(TRACKING_ID)


  return (
    <> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path=":type" element={<Content />} />
      <Route path="users" element={<Users />}/>
      <Route path="dashboard/:categoryName" element={<Dashboard />}/>
      <Route path="user/:userName" element={<Users/>}/>
      <Route path="update/:type/:title" element={<UpdateForm />}/>
      <Route path="/images" element={<Images />} />  
    </Routes>
    </>
  );
}

export default App;
