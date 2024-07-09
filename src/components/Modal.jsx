import React, { useState } from "react";
import { storage } from "../config/firebase"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPlus } from "react-icons/fa"; // Import the Plus icon from react-icons

const Modal = ({ isVisible, onClose, onAddContact }) => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [label, setLabel] = useState("");

  const handleImageUpload = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, phoneNo, imageUrl, label };
    onAddContact(newContact);
    setName("");
    setPhoneNo("");
    setImage(null);
    setImageUrl("");
    setLabel("");
    onClose();
  };

  return isVisible ? (
    <div className="modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-md p-8">
      <div className='flex justify-center items-center'>
            <label htmlFor='image-upload' className='relative cursor-pointer'>
              <div className='w-24 h-24 rounded-full border border-gray-300 flex justify-center items-center overflow-hidden'>
                {imageUrl ? (
                  <img src={imageUrl} alt='Uploaded' className='w-full h-full object-cover' />
                ) : (
                  <FaPlus className='text-gray-400 text-2xl' />
                )}
              </div>
              <input id='image-upload' type='file' onChange={(e) => handleImageUpload(e.target.files[0])} className='hidden' />
            </label>
          </div>
          
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />

          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Label</option>
            <option value="work">Work</option>
            <option value="business">Business</option>
            <option value="school">School</option>
            <option value="home">Home</option>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Contact
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
