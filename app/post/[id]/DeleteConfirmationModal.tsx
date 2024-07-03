"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface DeleteConfirmationModalProps{
  id: string,
  name: string,
  closeModal: () => void,
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ id, name, closeModal }) => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/post/${id}`,{
        method:"DELETE",
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
      <form onSubmit={handleSubmit} className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete the post: {name}?</p>
        <button type='submit'>Yes</button>
        <button onClick={closeModal}>No</button>
      </form>
    </div>
  );
};

export default DeleteConfirmationModal;