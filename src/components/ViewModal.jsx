// ViewModal.jsx
import React from 'react';

const ViewModal = ({ isVisible, onClose, contact }) => {
  if (!isVisible || !contact) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-96 shadow-lg'>
        <button className='text-black text-2xl place-self-end mb-4' onClick={onClose}>&times;</button>
        <div className='text-center'>
          {contact.imageUrl ? (
            <img src={contact.imageUrl} alt={contact.name} className='w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300' />
          ) : (
            <div className='w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-gray-200'>
              {/* You may use an icon library for a user placeholder icon */}
              <span className='text-6xl text-gray-500'>👤</span>
            </div>
          )}
          <h2 className='text-2xl font-bold mb-2'>{contact.name}</h2>
          <p className='text-gray-600 mb-1'><strong>Phone Number:</strong> {contact.phoneNo}</p>
          <p className='text-gray-600 mb-1'><strong>Date of Birth:</strong> {contact.significantDate}</p>
          <p className='text-gray-600'><strong>Label:</strong> {contact.label}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
