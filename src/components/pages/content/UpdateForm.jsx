import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import { db } from "../../firebase/FirebaseConfig";
import { useState, useEffect, useRef } from "react";
import "../../assets/css/Form.css";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import JoditEditor from 'jodit-react';

const UpdateForm = (props) => {

  const editor = useRef(null);


  let { title } = useParams();

  const navigate = useNavigate();

  const [allPosts, setAllPosts] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [newDescription, setNewDescription] = useState("");

  const postCollectionRef = collection(db, "posts");
  const userCollectionRef = collection(db, "users");
  const categoryCollectionRef = collection(db, "categories");

  const titleInputRef = useRef();
  const youtubeInputRef = useRef();
  // const descriptionInputRef = useRef();
  const sourceInputRef = useRef();
  const imageInputRef = useRef();
  const userInputRef = useRef();
  const categoryInputRef = useRef();
  const dateInputRef = useRef()

  const submitHandler = async (id) => {
    const updatedTitle = titleInputRef.current.value;
    const updatedYoutube = youtubeInputRef.current.value;
    // const updatedDescription = descriptionInputRef.current.value;
    const updatedSource = sourceInputRef.current.value;
    const updatedImage = imageInputRef.current.value;
    const updatedUsername = userInputRef.current.value;
    const updatedCategory = categoryInputRef.current.value;
    const updatedDate = dateInputRef.current.value

    const postDoc = doc(db, "posts", id);

    const newData = {
      title: updatedTitle,
      youtube: updatedYoutube,
      description: newDescription,
      source: updatedSource,
      image: updatedImage,
      username: updatedUsername,
      category: updatedCategory,
      date: updatedDate
    };

    await updateDoc(postDoc, newData)
      .then(() => {
        alert("Updated Successfully");
      })
      .then(() => {
        navigate(-2);
      });
  };

  useEffect(() => {
    const getPosts = async () => {
      const postData = await getDocs(postCollectionRef);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
      const userData = await getDocs(userCollectionRef);
      setAllUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getCategories = async () => {
      const categoryData = await getDocs(categoryCollectionRef);
      setAllCategories(
        categoryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getPosts();
    getUsers();
    getCategories();
  }, []);

  return (
    <div className="updateform_container">
      {allPosts
        .filter((data) => data.title === title)
        .map((data) => {
          return (
            <form
              action=""
              className="updateform_box"
              onSubmit={() => {
                submitHandler(
                  data.id,
                  data.category,
                  data.description,
                  data.title,
                  data.source,
                  data.youtube,
                  data.username,
                  data.date
                );
              }}
            >
              <div className="cancel_btn" onClick={() => navigate(-1)}>
                <FaTimes size={20} />
              </div>
              <h3>Update {data.title}</h3>
              <li>
                Title:
                <textarea ref={titleInputRef}>{data.title}</textarea>
              </li>

              <li>
                Username:
                <select ref={userInputRef}>
                  <option value={data.username}>{data.username}</option>
                  {allUsers.map((user) => {
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
                <select ref={categoryInputRef}>
                  {allCategories.map((category) => {
                    return (
                      <>
                        <option value={category.tag}>{category.tag}</option>
                      </>
                    );
                  })}
                </select>
              </li>

              <li>
                Description: <i>You must Updated to keep current description</i>
                {/* <textarea ref={descriptionInputRef}>
                  {data.description}
                </textarea> */}

                <JoditEditor
                   ref={editor}
                   value={data.description}
                   onChange={newContent => setNewDescription(newContent)}
                 />
          
              </li>

              <li>
                Image link:
                <textarea ref={imageInputRef}>{data.image}</textarea>
              </li>

              <li>
                Source link:
                <textarea ref={sourceInputRef}>{data.source}</textarea>
              </li>

              <li>
                Youtube link:
                <textarea ref={youtubeInputRef}>{data.youtube}</textarea>
              </li>

              <li>
                Date:
                <textarea ref={dateInputRef}>{data.date}</textarea>
              </li>
              <input type="submit" />
            </form>
          );
        })}
      {/* <FirebaseActions /> */}
    </div>
  );
};

export default UpdateForm;
