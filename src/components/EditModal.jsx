import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPlus } from 'react-icons/fa'; // Import the Plus icon from react-icons

const EditModal = ({ isVisible, onClose, contact, onUpdateContact }) => {
  const [name, setName] = useState(contact ? contact.name : '');
  const [phoneNo, setPhoneNo] = useState(contact ? contact.phoneNo : '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(contact ? contact.imageUrl : '');
  const [label, setLabel] = useState(contact ? contact.label : '');
  const [significantDate, setSignificantDate] = useState(contact ? contact.significantDate : '');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhoneNo(contact.phoneNo);
      setImageUrl(contact.imageUrl);
      setLabel(contact.label);
      setSignificantDate(contact.significantDate);
    }
  }, [contact]);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedImageUrl = imageUrl;
    if (image) {
      updatedImageUrl = await handleImageUpload(image);
    }
    const updatedContact = { 
      id: contact.id, 
      name, 
      phoneNo, 
      imageUrl: updatedImageUrl, 
      label,
      significantDate 
    };
    onUpdateContact(updatedContact);
    onClose();
  };

  return isVisible ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Contact</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex items-center justify-center'>
            <label htmlFor='image-upload' className='relative cursor-pointer'>
              <div className='w-24 h-24 rounded-full border border-gray-300 flex justify-center items-center overflow-hidden'>
                {imageUrl ? (
                  <img src={imageUrl} alt='Uploaded' className='w-full h-full object-cover' />
                ) : (
                  <FaPlus className='text-gray-400 text-2xl' />
                )}
              </div>
              <input id='image-upload' type='file' onChange={(e) => setImage(e.target.files[0])} className='hidden' />
            </label>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='text'
              placeholder='Phone Number'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Label</label>
            <select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            >
              <option value=''>Select Label</option>
              <option value='work'>Work</option>
              <option value='business'>Business</option>
              <option value='school'>School</option>
              <option value='home'>Home</option>
              <option value='student'>Student</option>
              <option value='professor'>Professor</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Significant Date</label>
            <input
              type='date'
              value={significantDate}
              onChange={(e) => setSignificantDate(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-500 text-white rounded-md'
            >
              Close
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditModal;
