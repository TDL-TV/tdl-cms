import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../../assets/css/Form.css";
import { useState, useEffect, useRef } from "react";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

import JoditEditor from "jodit-react";
// import { getUsers } from "../../firebase/FirebaseActions";

const Form = (props) => {
  const editor = useRef(null);

  const navigate = useNavigate();
  let { type } = useParams();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newImageLink, setNewImageLink] = useState("");
  const [newSourceLink, setNewSourceLink] = useState("");
  const [newYoutubeLink, setNewYoutubeLink] = useState("");

  const postCollectionRef = collection(db, "posts");
  const usersCollectionRef = collection(db, "users");
  const categoriesCollectionRef = collection(db, "categories");

  const createPost = async () => {
    if (type === "video") {
      async function addedDoc() {
        await addDoc(postCollectionRef, {
          title: newTitle,
          category: newCategory,
          description: newDescription,
          image: newImageLink,
          source: newSourceLink,
          date: date,
          username: newUser,
          type: type,
          createdAt: serverTimestamp(),
          youtube: newYoutubeLink,
        });
      }

      addedDoc();

      if (addedDoc) {
        alert("Added successfully");
        navigate("/dashboard/News and Events");
      } else {
        alert("failed, try again");
      }
    } else {
      async function addedDoc() {
        await addDoc(postCollectionRef, {
          title: newTitle,
          category: newCategory,
          description: newDescription,
          image: newImageLink,
          source: newSourceLink,
          date: date,
          username: newUser,
          createdAt: serverTimestamp(),
          type: type,
          youtube: newYoutubeLink,
        });
      }

      addedDoc();

      if (addedDoc) {
        alert("Added successfully");
        navigate("/dashboard/news and events");
      } else {
        alert("failed, try again");
      }
    }
  };

  useEffect(() => {
    document.title = ("Add new "+type)

    const getCategories = async () => {
      const categoryData = await getDocs(categoriesCollectionRef);
      setCategories(
        categoryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getUsers = async () => {
      const userData = await getDocs(usersCollectionRef);
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCategories();
    getUsers();
  }, []);

  if (type === "video") {
    return (
      <div className="form_container">
        <form action="" className="form_box">
          <button onClick={props.onClick}>
            <FaTimes size={20} />
          </button>
          <h3>Add new {type}</h3>
          <li>
            Title:
            <input
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
              type="text"
              placeholder="Title....."
            />
          </li>

          <li>
            Username:
            <select
              name=""
              id=""
              onChange={(event) => {
                setNewUser(event.target.value);
              }}
            >
              <option value="">Username</option>
              {users.map((user) => {
                return (
                  <>
                    <option value={user.username}>{user.username}</option>
                  </>
                );
              })}
            </select>
          </li>

          <li>
            Category:
            <select
              name=""
              id=""
              onChange={(event) => {
                setNewCategory(event.target.value);
              }}
            >
              <option value="">Category</option>
              {categories
                .filter(
                  (category) =>
                    category.tag !== "Innovation" &&
                    category.tag !== "Product" &&
                    category.tag !== "Potrait" &&
                    category.tag !== "Photography" &&
                    category.tag !== "Technology" &&
                    category.tag !== "Nature" &&
                    category.tag !== "Sports and Recreation"
                )
                .map((category) => {
                  return (
                    <>
                      <option value={category.tag}>{category.tag}</option>
                    </>
                  );
                })}
            </select>
          </li>

          <li>
            Description:
            <JoditEditor
              ref={editor}
              value={newDescription}
              onChange={(newContent) => setNewDescription(newContent)}
            />
          </li>

          <li>
            Image link:
            <input
              type="text"
              placeholder="Image Link..."
              onChange={(event) => {
                setNewImageLink(event.target.value);
              }}
            />
          </li>

          <li>
            Source link:
            <input
              type="text"
              placeholder="Source link..."
              onChange={(event) => {
                setNewSourceLink(event.target.value);
              }}
            />
          </li>

          <li>
            Youtube link:
            <input
              type="text"
              placeholder="http..."
              onChange={(event) => {
                setNewYoutubeLink(event.target.value);
              }}
            />
          </li>
          {/* <li>
            Date:
            <input type="text" placeholder="date..." />
          </li> */}
          <input type="submit" onClick={createPost} />
        </form>
      </div>
    );
  } else {
    return (
      <div className="form_container">
        <form action="" className="form_box">
          <button onClick={props.onClick}>
            <FaTimes size={20} />
          </button>
          <h3>Add new {type}</h3>
          <li>
            Title:
            <input
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
              type="text"
              placeholder="Title....."
            />
          </li>

          <li>
            Username:
            <select
              name=""
              id=""
              onChange={(event) => {
                setNewUser(event.target.value);
              }}
            >
              <option value="">Username</option>
              {users.map((user) => {
                return (
                  <>
                    <option value={user.username}>{user.username}</option>
                  </>
                );
              })}
            </select>
          </li>

          <li>
            Category:
            <select
              name=""
              id=""
              onChange={(event) => {
                setNewCategory(event.target.value);
              }}
            >
              <option value="">Category</option>
              {categories
                .filter((category) => {
                  if (type === "photo") {
                    return (
                      category.tag !== "Innovation" &&
                      category.tag !== "Music" &&
                      category.tag !== "Mini Documentaries" &&
                      category.tag !== "Sports and Recreation" &&
                      category.tag !== "Photography" &&
                      category.tag !== "Shows" &&
                      category.tag !== "Short Film" &&
                      category.tag !== "Educational"
                    );
                  } else {
                    return (
                      category.tag !== "Short Film" &&
                      category.tag !== "Product" &&
                      category.tag !== "Potrait" &&
                      category.tag !== "Sports" &&
                      category.tag !== "Technology" &&
                      category.tag !== "Shows" &&
                      category.tag !== "Mini Documentaries" &&
                      category.tag !== "Nature"
                    );
                  }
                })
                .map((category) => {
                  return (
                    <>
                      <option value={category.tag}>{category.tag}</option>
                    </>
                  );
                })}
            </select>
          </li>

          <li>
            Description:
            <JoditEditor
              ref={editor}
              value={newDescription}
              onChange={(newContent) => setNewDescription(newContent)}
            />
          </li>

          <li>
            Image link:
            <input
              type="text"
              placeholder="Image Link..."
              onChange={(event) => {
                setNewImageLink(event.target.value);
              }}
            />
          </li>

          <li>
            Source link:
            <input
              type="text"
              placeholder="Source link..."
              onChange={(event) => {
                setNewSourceLink(event.target.value);
              }}
            />
          </li>

          {/* <li>
            Date:
            <input type="text" placeholder="date..." />
          </li> */}
          <input type="submit" onClick={createPost} />
        </form>
      </div>
    );
  }
};

export default Form;
