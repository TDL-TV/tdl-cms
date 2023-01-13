import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/FirebaseConfig";
import { v4 } from "uuid";
import "../../assets/css/Image.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";

const Images = () => {
  const loadingContext = useLoadingContext()


  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    function uploadedImage() {
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          setMessage("Image uploaded Successfully");
        })
        .catch((error) => {
          setMessage(error + " Failed Try again");
        })
        .then(() => {
          window.location.reload();
        });
    }

    uploadedImage();

    if (uploadedImage) {
      // window.location.reload();
    } else {
      setMessage("Error uploading, try again");
    }
  };

  function deleteImage(url) {
    deleteObject(ref(storage, url)).then(() => {
      setMessage("Deleted Image successfully");
    }).then(() => {
      window.location.reload()
    });
  }

  useEffect(() => {

    loadingContext.start()


    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    }).then(() => {
      loadingContext.done()
    });
  }, []);

  return (
    <div className="image_container">
      <div className="image_div">
        <div className="add_new">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Add image</button>
        </div>

        <div className="image_content">
          {message && (
            <div className="message">
              {message}
              <RiCloseCircleFill
                size={27}
                onClick={() => {
                  setMessage(false);
                }}
              />
            </div>
          )}
          {imageList.map((url) => {
            return (
              <>
                <div className="image_box">
                  <div className="image">
                    <img src={url} alt={"image"} />
                  </div>
                  <div className="image_details">
                    <div className="copy">
                      <p>{url}</p>
                    </div>
                    <button
                      className="copy_img"
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        setMessage("Copied to clipboard");
                      }}
                    >
                      Copy image URL
                    </button>
                    <button
                      onClick={() => {
                        deleteImage(url);
                      }}
                      className="delete_img"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Images;
