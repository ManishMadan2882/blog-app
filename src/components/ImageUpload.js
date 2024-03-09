import React from "react";
import ImageUploading from "react-images-uploading";
import def from "../assets/defaultimg.png";
import DeleteIcon from '@mui/icons-material/Delete';
import uploadMultimedia from '../utils/multimedia';
function ImageUpload({ maxNumber, preSetImages, hitUrl }) {
  let arrObjs = [];
  preSetImages &&
    preSetImages?.map((elem) => {
      arrObjs.push({
        data_url: elem,
      });
    });
  function upload() {
    var formdata = new FormData();
    console.log(images);
    images.map((image) => {
      if (image.file) formdata.append("images", image.file);
    });
    console.log(formdata);
    uploadMultimedia(`${hitUrl}/${maxNumber}`, "POST", formdata)
      .then((data) => {
        if (data.success) {
          console.log("upload", data);
        }
      })
      .catch((err) => console.log(err));
  }
  const [images, setImages] = React.useState([...arrObjs]);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => {
          imageList = [...images];
          return (
            <div className="border mx-8 p-2">
              <button
                disabled={maxNumber === imageList.length}
                className="bg-sky-400 text-white p-2 rounded-md hover:bg-sky-700 disabled:opacity-40 disabled:hover:bg-sky-400"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Drop here
              </button>
              &nbsp;
              <button
                className="bg-green-400 text-white p-2 rounded-md hover:bg-green-700"
                onClick={upload}
              >
                Upload Image
              </button>
              <div className="flex justify-evenly flex-wrap my-5 max-h-[300px]">
                {imageList.length === 0 && (
                  <img className="max-h-[180px] " src={def} alt="" />
                )}
                {imageList.map((image, index) => (
                  <div key={index} className="inline]">
                    <img
                      className="max-h-[200px] "
                      src={image.data_url}
                      alt=""
                    />
                    <div className="flex justify-center">
                      <button
                        className="p-1 hover:border-black m-2"
                        onClick={() => onImageUpdate(index)}
                      >
                        <img
                          src="https://www.freeiconspng.com/uploads/edit-new-icon-22.png"
                          width="30"
                          alt="Edit, new, icon"
                        />
                      </button>
                      <button
                        className="p-1 hover:border-black m-2 "
                        onClick={() => onImageRemove(index)}
                      >
                        <DeleteIcon/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;