"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    <div className="modal">
      <form onSubmit={handleSubmit} className="">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Update Post</h2>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Post Title'/>
        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Post Description'/>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
