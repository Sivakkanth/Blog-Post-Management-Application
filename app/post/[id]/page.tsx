"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UpdatePostModal from './UpdatePostModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Post {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const fetchPostById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/post/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching post: ", error);
    return null;
  }
};

const PostDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const {id} = params;
  const [post, setPost] = useState<Post | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openUpdateModal = () => setShowUpdateModal(true);
  const closeUpdateModal = () => setShowUpdateModal(false);
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    const loadPost = async () => {
      const fetchedPost = await fetchPostById(id);
      setPost(fetchedPost);
    };
    loadPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-start p-[10%]'>
      <h1 className='text-[25px] font-bold py-5'>Post Detail</h1>
      <div className='flex flex-col items-center w-full h-auto justify-start bg-green-100 border-[10px] rounded-[30px] border-green-900 p-5'>
        <h2 className="text-[25px] font-bold text-green-700">{post.name}</h2>
        <div className='h-[5px] bg-green-700 w-[5%] rounded-full'></div>
        <p className='text-[15px] font-medium py-[5px] w-full text-justify'>{post.description}</p>
        <div className='flex flex-col items-center justify-start'>
          <p className='text-[12px] font-medium pt-[10px] w-full'>Created at: {new Date(post.createdAt).toLocaleString()}</p>
          <p className='text-[12px] font-medium text-green-700 w-full'>Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
          <div className='flex flex-row items-center justify-evenly w-full mt-3'>
            <button className='bg-green-700 p-2 font-medium text-[12px] m-3 text-white rounded-full hover:bg-green-100 hover:text-green-700 border-[1px] hover:border-green-700' onClick={openUpdateModal}>Update</button>
            <button className='bg-red-700 p-2 font-medium text-[12px] m-3 text-white rounded-full hover:bg-green-100 hover:text-red-700 border-[1px] hover:border-red-700' onClick={openDeleteModal}>Delete</button>
          </div>
        </div>
      </div>
      {showUpdateModal && <UpdatePostModal
          id={post._id}
          name={post.name}
          description={post.description}
          closeModal={closeUpdateModal}
        />}
        {showDeleteModal && ( <DeleteConfirmationModal
            id={post._id}
            name={post.name}
            closeModal={closeDeleteModal}
          />)}
    </div>
  );
};

export default PostDetailPage;