import { Link, useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import "../../assets/css/Content.css";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db, logout } from "../../firebase/FirebaseConfig";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import parse from "html-react-parser";
import ReactGA from "react-ga";

const Dashboard = () => {
  let { categoryName } = useParams();
  const loadingContext = useLoadingContext();

  // Login Details
  const [user, loading, error] = useAuthState(auth);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "usersg", where("uid", "==", user?.uid)));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      // setName(data.name);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState(false);

  const [addCategory, setAddCategory] = useState(false);

  const postCollectionRef = collection(db, "posts");

  const categoryCollectionRef = collection(db, "categories");

  const createCategory = async () => {
    await addDoc(categoryCollectionRef, {
      tag: addCategory,
    });
    alert("Added Category successfully");
    window.location.reload();
  };

  const deleteCategory = async (id) => {
    const postDoc = doc(db, "categories", id);

    await deleteDoc(postDoc);
    alert("Deleted category successfully");
    window.location.reload();
  };

  useEffect(() => {
    loadingContext.start();

    ReactGA.pageview(window.location.pathname);

    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();

    const getPosts = async () => {
      const postData = await getDocs(postCollectionRef);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      loadingContext.done();
    };

    const getCategories = async () => {
      const categoryData = await getDocs(categoryCollectionRef);
      setCategories(
        categoryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getCategories();
    getPosts();
  }, [user, loading]);

  return (
    <div className="content_container">
      <div className="dashboard">
        <div className="content_count">
          <Link to="/users">
            <div className="content_type">
              <li>Users</li>
            </div>
          </Link>
          <Link to="/photos">
            <div className="content_type">
              <li>Photos</li>
            </div>
          </Link>
          <Link to="/videos">
            <div className="content_type">
              <li>Videos</li>
            </div>
          </Link>
          <Link to="/articles and blog">
            <div className="content_type">
              <li>Articles and blogs</li>
            </div>
          </Link>
        </div>

        <h3>Categories</h3>
        <p className="account"> logged in as : {user?.email}</p>
        <div className="user_img">
          <button onClick={logout}>Logout</button>
        </div>

        <div className="add_category">
          {newCategory ? (
            <>
              <button onClick={createCategory}>
                <FaPlus /> Add {addCategory}
              </button>
              <input
                type="text"
                onChange={(event) => {
                  setAddCategory(event.target.value);
                }}
              />
            </>
          ) : (
            <button
              onClick={() => {
                setNewCategory(true);
              }}
            >
              <FaPlus />
              Add new category
            </button>
          )}
        </div>
        <div className="categories">
          <div className="category_list">
            {categories.map((categories) => {
              return (
                <>
                  <div className="usercategory">
                    <li>
                      <Link
                        to={"/dashboard/" + categories.tag.replace(/\s+/g, "-")}
                      >
                        {categories.tag}
                      </Link>
                    </li>
                    <div
                      onClick={() => {
                        if (
                          window.confirm(
                            `${
                              "Are you sure you want to delete " +
                              categories.tag
                            }`
                          )
                        ) {
                          deleteCategory(categories.id);
                        }
                      }}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="category_content">
            <h4>{categoryName.replaceAll("-", " ")}</h4>
            {posts
              .filter(
                (data) => data.category === categoryName.replaceAll("-", " ")
              )
              .map((data) => {
                return (
                  <>
                    <div className="content_details">
                      <li>
                        <p> Title: </p> {data.title}
                      </li>
                      <li>
                        <p> By: </p> {data.username}
                      </li>
                      <li>
                        <p> Type: </p> {data.type}
                      </li>
                      <li className="data_description">
                        <p> Description: </p> {parse(data.description)}
                      </li>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
