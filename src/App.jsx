import React, { Fragment, useEffect, useState } from 'react';
import Navbar from "./components/Navbar.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase.js";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import Modal from './components/Modal.jsx';
import EditModal from './components/EditModal.jsx';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contact");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    try {
      const docRef = await addDoc(collection(db, "contact"), newContact);
      setContacts([...contacts, { id: docRef.id, ...newContact }]);
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await deleteDoc(doc(db, "contact", contactId));
      setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      await updateDoc(doc(db, "contact", updatedContact.id), updatedContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      setContacts(updatedContacts);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  return (
    <div className='max-w-[370px] mx-auto'>
      <Navbar />
      <div className='flex items-center gap-2'>
        <div className='flex items-center relative flex-grow'>
          <IoSearchOutline className='text-3xl absolute' />
          <input type='text' className='bg-transparent border border-black rounded-md h-10 flex-grow pl-9' />
        </div>
        <div className='items-center'>
          <CiCirclePlus className='text-4xl cursor-pointer' onClick={() => setShowModal(true)} />
        </div>
      </div>
      <div>
        {contacts.map((contact) => (
          <div key={contact.id} className='bg-slate-400 flex justify-between items-center rounded-lg p-2 mt-2'>
            <div className='flex gap-3 items-center'>
              <HiOutlineUserCircle className='text-4xl' />
              <div className=''>
                <h2 className=''>{contact.name}</h2>
                <p className=''>{contact.phoneNo}</p>
              </div>
            </div>
            <div className='flex'>
              <RiEditCircleLine className='text-3xl' onClick={() => handleEditContact(contact)} />
              <IoMdTrash className='text-3xl' onClick={() => handleDeleteContact(contact.id)} />
            </div>
          </div>
        ))}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} onAddContact={handleAddContact} />
      <EditModal isVisible={showEditModal} onClose={() => setShowEditModal(false)} contact={selectedContact} onUpdateContact={handleUpdateContact} />
    </div>
  );
};

export default App;
