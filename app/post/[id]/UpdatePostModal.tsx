"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Define the interface for the props expected by the component
interface UpdatePostModalProps {
  id: string;
  name: string;
  description: string;
  closeModal: () => void;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({ id, name, description, closeModal }) => {
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/post/${id}`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify({newPostName: newName, newPostDescription: newDescription}),
      });
      if(!res.ok){
        throw new Error("Failed to update post");
      }
      router.push("/post");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-screen h-screen bg-gray-700 bg-opacity-50 flex flex-col items-center justify-center z-100">
      <div className="relative flex flex-col items-center justify-start bg-green-200 p-10 rounded-[15px]">
        <span className="absolute top-0 right-0 mx-5 my-3 bg-red-500 px-2 py-0 rounded-full hover:cursor-pointer" onClick={closeModal}>&times;</span>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-[15px] font-semibold my-3">Update Post</h2>
          <input className='my-2 rounded-[5px] p-1' type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Post Title'/>
          <textarea className='my-2 rounded-[5px] p-1' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Post Description'/>
          <button className='bg-blue-600 my-3 py-1 rounded-[10px] text-white hover:bg-blue-100 hover:text-blue-700 border-[1px] border-blue-700' type='submit'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
