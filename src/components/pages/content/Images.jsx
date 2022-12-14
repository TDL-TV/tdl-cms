import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/FirebaseConfig";
import { v4 } from "uuid";
import "../../assets/css/Image.css";

const Images = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image uploaded successfully");
      window.location.reload()
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
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
          <p onClick={uploadImage}>Add new image</p>
        </div>

        <div className="image_content">
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
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(url);
                        }}
                      >
                        Copy image URL
                      </button>
                    </div>
                    <button>Delete</button>
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
