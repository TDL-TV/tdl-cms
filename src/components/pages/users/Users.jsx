import { Link } from "react-router-dom";
import "../../assets/css/Content.css";
import "../../assets/css/Users.css";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useLoadingContext } from "react-router-loading";
import JoditEditor from "jodit-react";

const Users = () => {
  const editor = useRef(null);

  const loadingContext = useLoadingContext();

  const navigate = useNavigate();
  let { userName } = useParams();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState(false);

  const [addUser, setAddUser] = useState(false);
  const [addDescription, setAddDescription] = useState(false);

  const postCollectionRef = collection(db, "posts");

  const usersCollectionRef = collection(db, "users");

  const usernameInputRef = useRef();
  const descriptionInputRef = useRef();

  const updateUserBio = async (id) => {
    const updatedUserName = usernameInputRef.current.value;
    // const updatedUserDescription = descriptionInputRef.current.value;

    const postDoc = doc(db, "users", id);

    const newUserBio = {
      username: updatedUserName,
      description: addDescription,
    };

    await updateDoc(postDoc, newUserBio);
    alert("User information updated successfully");
    window.location.reload();
    navigate("/users");
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      username: addUser,
      description: addDescription,
    });
    alert("Added User successfully");
    window.location.reload();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await deleteDoc(userDoc);
    alert("Deleted User successfully");
    window.location.reload();
  };

  useEffect(() => {
    loadingContext.start();

    const getPosts = async () => {
      const postData = await getDocs(postCollectionRef);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
      const userData = await getDocs(usersCollectionRef);
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      loadingContext.done();
    };

    getPosts();
    getUsers();
  }, []);

  return (
    <div className="content_container">
      <div className="dashboard">
        {/* Categorizing by users */}
        <h3>Users</h3>

        <div className="add_category">
          {newUser ? (
            <>
              <button onClick={createUser}>
                <FaPlus /> Add {addUser}
              </button>
              <input
                type="text"
                placeholder="Name...."
                onChange={(event) => {
                  setAddUser(event.target.value);
                }}
              />
              <div>
                {/* <textarea
                  onChange={(event) => {
                    setAddDescription(event.target.value);
                  }}
                ></textarea> */}
                Description:
                <JoditEditor
                  ref={editor}
                  // value={addDescription}
                  onChange={(newContent) => setAddDescription(newContent)}
                />
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                setNewUser(true);
              }}
            >
              <FaPlus />
              Add new user
            </button>
          )}
        </div>

        <div className="categories">
          <div className="category_list">
            {users.map((username) => {
              return (
                <>
                  <div className="usercategory">
                    <li>
                      <Link to={"/user/" + username.username}>
                        {username.username}
                      </Link>
                    </li>
                    <div
                      onClick={() => {
                        if (
                          window.confirm(
                            `${
                              "Are you sure you want to delete" +
                              username.username
                            }`
                          )
                        ) {
                          deleteUser(username.id);
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
            <h4>{userName}</h4>

            {users
              .filter((user) => user.username === userName)
              .map((user) => {
                return (
                  <>
                    <div className="user_bio_container">
                      <fieldset>
                        <legend>Update User Information</legend>
                        <label htmlFor="username"></label>
                        <hr />

                        <div className="username_textarea">
                          <h4>New Username:</h4>
                          <textarea
                            type="text"
                            id="username"
                            // name={user.username}
                            ref={usernameInputRef}
                          >
                            {user.username}
                          </textarea>
                        </div>
                        <hr />

                        <div className="description_textarea">
                          <h4>New Description:</h4>
                          <JoditEditor
                            ref={editor}
                            value={user.description}
                            onChange={(newContent) =>
                              setAddDescription(newContent)
                            }
                          />
                        </div>
                        <button
                          onClick={() => {
                            updateUserBio(
                              user.id,
                              user.description,
                              user.username
                            );
                          }}
                        >
                          Update {user.username}'s Bio
                        </button>
                      </fieldset>
                    </div>
                  </>
                );
              })}

            <h3>Posts Under {userName}</h3>

            {posts
              .filter((data) => data.username === userName)
              .map((data) => {
                return (
                  <>
                    <div className="content_details">
                      <li>
                        <p> Title: </p> {data.title}
                      </li>
                      <li>
                        <p> Type: </p> {data.type}
                      </li>
                      <li className="userdata_description">
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

export default Users;
