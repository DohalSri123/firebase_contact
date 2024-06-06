import React, { useState } from 'react';

const Modal = ({ isVisible, onClose, onAddContact }) => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onAddContact function with the new contact data
    onAddContact({ name, phoneNo });
    // Clear the form fields
    setName('');
    setPhoneNo('');
    // Close the modal
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-xl mb-4'>Add New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='text'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              className='mr-2 p-2 text-gray-600 hover:text-gray-800'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='p-2 bg-blue-500 text-white rounded'
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
