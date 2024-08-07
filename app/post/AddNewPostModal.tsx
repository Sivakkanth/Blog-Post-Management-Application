"use client"
import React, { useState } from 'react';

const AddNewPostModal = ({ closeModal, refreshPosts }: { closeModal: () => void, refreshPosts: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name || !description){
      alert("Name and Description are required.");
      return;
    }
    try {
      // Send a POST request to create a new post
      const res = await fetch("http://localhost:3000/api/post",{
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({name, description}),
      });
        closeModal();
        refreshPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed w-screen h-screen bg-gray-700 bg-opacity-50 flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-start bg-green-200 p-10 rounded-[15px]">
        <span className="absolute top-0 right-0 mx-5 my-3 bg-red-500 px-2 py-0 rounded-full hover:cursor-pointer" onClick={closeModal}>&times;</span>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <h2 className="text-[15px] font-semibold my-3">Create New Post</h2>
          <input className='my-2 rounded-[5px] p-1' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className='my-2 rounded-[5px] p-1' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type='submit' className='bg-blue-600 my-3 py-1 rounded-[10px] text-white hover:bg-blue-100 hover:text-blue-700 border-[1px] border-blue-700'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPostModal;