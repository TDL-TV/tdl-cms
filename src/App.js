import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path=":type" element={<Content />} />
      <Route path="users" element={<Users />}/>
      <Route path="dashboard/:categoryName" element={<Dashboard />}/>
      <Route path="user/:userName" element={<Users />}/>
      <Route path="update/:title" element={<UpdateForm />}/>
      <Route path="/images" element={<Images />} />  
    </Routes>
    </>
  );
}

export default App;
