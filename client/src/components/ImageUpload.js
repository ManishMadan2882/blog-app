import React from 'react';
import def from '../assets/defaultimg.png'
function ImageUploader({ image, setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  React.useEffect(() => {
    if(image.length==0)
    setImage("https://res.cloudinary.com/dy4n5em1q/image/upload/v1711747225/defaultimg_grgr0j.png")
  }, [image])
  return (
    <div className='px-6 '>
    <label className='block'>Upload Cover image</label>
      <input
        className='cursor-pointer bg-blue-500 shadow-lg p-2 text-white'
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && (
        <div>
          <h2>Preview</h2>
          <div className='flex justify-center border p-2 rounded-2xl'>
            <img className='h-48 rounded-md shadow-md' src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
