import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../../assets/css/Form.css";
import { useState, useEffect, useRef } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

import JoditEditor from 'jodit-react';
import parse from 'html-react-parser'
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
  const [newType, setNewType] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newImageLink, setNewImageLink] = useState("");
  const [newSourceLink, setNewSourceLink] = useState("");
  const [newYoutubeLink, setNewYoutubeLink] = useState("");
  const [newDate, setNewData] = useState("");

  const postCollectionRef = collection(db, "posts");
  const usersCollectionRef = collection(db, "users");
  const categoriesCollectionRef = collection(db, "categories");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title: newTitle,
      category: newCategory,
      description: newDescription,
      image: newImageLink,
      source: newSourceLink,
      date: date,
      username: newUser,
      type: type,
      youtube: newYoutubeLink,
    });
    alert("Added successfully");
    navigate("/dashboard");
  };

  useEffect(() => {
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

  // createdAt : firebase.firestore.FieldValue.serverTimestamp()

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
            {categories.map((category) => {
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
          onChange={newContent => setNewDescription(newContent)}
          />


      
          {/* <textarea
            placeholder="Description"
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
          ></textarea> */}
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
          Youtube link: (For videos only)
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
};

export default Form;
