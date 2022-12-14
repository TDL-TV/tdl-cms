import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/tdllogo.png";
import image from "../assets/images/image.JPG";
import "../assets/css/Navbar.css";

import {
  FaBook,
  FaHome,
  FaImages,
  FaPhotoVideo,
  FaPlay,
  FaUserFriends,
} from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { RiCloseCircleLine, RiMenuFill } from "react-icons/ri";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const [name, setName] = useState("");

  const [sideMenu, setSideMenu] = useState(false);

  let navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "usersg", where("uid", "==", user?.uid)));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      // setName(data.name)
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data")
    }
  };

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/")
    fetchUserName();
  });

  const types = ["photos", "videos", "articles and blog"];

  return (
    <>
      <div className="top_nav">
        <div className="left_menu">
          {sideMenu ? (
            <>
              <div className="menu_container">

                <div className="bar">
                <div className="container_btn">
                  <RiCloseCircleLine size={27}  onClick={() => {
                    setSideMenu(false)
                  }}/>
                </div>
                  {/* <div className="side_nav"> */}
                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      <Link to="/dashboard/news and events">
                        {" "}
                        <FaHome size={20} /> <p>Dashboard</p>
                      </Link>
                    </li>
                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      <Link to={"photo"}>
                        {" "}
                        <FaImages size={20} /> <p> Photos</p>
                      </Link>
                    </li>
                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      <Link to={"video"}>
                        {" "}
                        <FaPlay size={20} /> <p> Videos</p>
                      </Link>
                    </li>
                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      {" "}
                      <Link to={"articles and blog"}>
                        {" "}
                        <FaBook size={20} /> <p>Articles and Blog</p>
                      </Link>
                    </li>

                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      <Link to="users/">
                        <FaUserFriends />
                        <p> Users</p>
                      </Link>
                    </li>

                    <li onClick={() => {
                      setSideMenu(false)
                    }}>
                      <Link to={"/images"}>
                        <FaPhotoVideo />
                        <p>Images</p>
                      </Link>
                    </li>
                  {/* </div> */}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="menu_btn">
                <RiMenuFill onClick={() => {
                  setSideMenu(true)
                }} size={27} />
              </div>
            </>
          )}
          <div className="logo">
            <Link to="/dashboard">
            <img src={logo} />
            </Link>
          </div>
        </div>

        <div className="user">
          <p>{user?.email}</p>
          <div className="user_img">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="side_nav">
        <li>
          <Link to="/dashboard/news and events">
            {" "}
            <FaHome size={20} /> <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to={"photo"}>
            {" "}
            <FaImages size={20} /> <p> Photos</p>
          </Link>
        </li>
        <li>
          <Link to={"video"}>
            {" "}
            <FaPlay size={20} /> <p> Videos</p>
          </Link>
        </li>
        <li>
          {" "}
          <Link to={"articles and blog"}>
            {" "}
            <FaBook size={20} /> <p>Articles and Blog</p>
          </Link>
        </li>

        <li>
          <Link to="users/">
            <FaUserFriends />
            <p> Users</p>
          </Link>
        </li>

        <li>
          <Link to={"/images"}>
            <FaPhotoVideo />
            <p>Images</p>
          </Link>
        </li>
      </div>
    </>
  );
};

export default Navbar;
