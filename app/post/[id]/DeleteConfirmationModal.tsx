"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

// Define the props interface for DeleteConfirmationModal
interface DeleteConfirmationModalProps{
  id: string,
  name: string,
  closeModal: () => void,
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ id, name, closeModal }) => {
  const router = useRouter();
  
    // Handle form submission for deleting a post
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
    <div className="fixed w-screen h-screen bg-gray-700 bg-opacity-50 flex flex-col items-center justify-center z-100">
      <form onSubmit={handleSubmit} className="relative flex flex-col items-center justify-start bg-green-100 p-10 rounded-[15px]">
        <h2 className="text-[15px] font-semibold my-3">Confirm Delete</h2>
        <p className="text-[15px] font-medium my-3">Are you sure you want to delete the post: <b>{name}</b>?</p>
        <div className='flex flex-row flex-nowrap items-center justify-around w-full'>
          <button className='bg-red-500 px-2 py-1 rounded-[5px] hover:bg-red-100 border-[1px] border-red-500' type='submit'>Yes</button>
          <button className='bg-gray-300 px-2 py-1 rounded-[5px] hover:bg-gray-100 border-[1px] border-gray-300' onClick={closeModal}>No</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteConfirmationModal;