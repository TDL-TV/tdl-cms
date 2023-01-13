import { Link, useParams } from "react-router-dom";
import "../../assets/css/Content.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { BsPen, BsTrash2 } from "react-icons/bs";
import Form from "./Form";
import parse from "html-react-parser";
import { useLoadingContext } from "react-router-loading";

import { useNavigate } from "react-router-dom";

const Content = () => {
  const loadingContext = useLoadingContext();

  const navigate = useNavigate();
  let { type } = useParams();

  const [loadedPost, setLoadedPost] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const [clickedAdd, setClickedAdd] = useState(false);

  const sortPosts = query(postCollectionRef);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    alert("Deleted successfully");
    navigate("/dashboard/News and Events");
  };

  useEffect(() => {
    loadingContext.start();
    document.title = (type)

    const getPosts = async () => {
      const postData = await getDocs(sortPosts);
      setLoadedPost(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done();
    };
    getPosts();
  }, []);

  return (
    <>
      <div className="content_container">
        <div className="page_title">
          <h3> {type} Content</h3>

          {clickedAdd ? (
            <>
              <Form
                onClick={() => {
                  setClickedAdd(false);
                }}
              />
            </>
          ) : (
            <>
              <p
                onClick={() => {
                  setClickedAdd(true);
                }}
              >
                Add new {type}
              </p>
            </>
          )}
        </div>
        <div className="content_page">
          {loadedPost
            .filter((post) => post.type === type)
            .map((data) => {
              if (type === "video") {
                return (
                  <>
                    <div className="content_box">
                      <div className="change_buttons">
                        <h4>{data.title}</h4>
                        <div className="change_btn">
                          <Link
                            to={
                              "/update/" +
                              data.type.replace(/\s+/g, "-") +
                              "/" +
                              data.title.replace(/\s+/g, "-")
                            }
                          >
                            <BsPen />
                          </Link>
                        </div>

                        <div
                          className="change_btn"
                          onClick={() => {
                            if (
                              window.confirm(
                                `${
                                  "Are you sure you want to delete " +
                                  data.title
                                }`
                              )
                            ) {
                              deletePost(data.id);
                            }
                          }}
                        >
                          <BsTrash2 />
                        </div>
                      </div>
                      <img src={data.image} alt="" />
                      <h4>
                        Posted on : {data.createdAt.toDate().toDateString()}
                      </h4>
                      <h4>{data.category}</h4>
                      <h3>{data.username}</h3>
                      <p>{parse(data.description)}</p>
                      <div className="iframe">{parse(data.youtube)}</div>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="content_box">
                      <div className="change_buttons">
                        <h4>{data.title}</h4>
                        <div className="change_btn">
                          <Link
                            to={
                              "/update/" +
                              data.type.replace(/\s+/g, "-") +
                              "/" +
                              data.title.replace(/\s+/g, "-")
                            }
                          >
                            <BsPen />
                          </Link>
                        </div>

                        <div
                          className="change_btn"
                          onClick={() => {
                            if (
                              window.confirm(
                                `${
                                  "Are you sure you want to delete " +
                                  data.title
                                }`
                              )
                            ) {
                              deletePost(data.id);
                            }
                          }}
                        >
                          <BsTrash2 />
                        </div>
                      </div>
                      <img src={data.image} alt="" />
                      <h4>
                        Posted on : {data.createdAt.toDate().toDateString()}
                      </h4>
                      <h4>{data.category}</h4>
                      <h3>{data.username}</h3>
                      <p>{parse(data.description)}</p>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Content;
