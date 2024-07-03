"use client";
import React, { useEffect, useState } from 'react';
import UpdatePostModal from './UpdatePostModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Link from 'next/link';
import Image from 'next/image';
import back from "../../../public/back.png"

// Define the Post interface
interface Post {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Function to fetch a post by its ID
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

  // Fetch the post data when the component mounts or when id changes
  useEffect(() => {
    const loadPost = async () => {
      const fetchedPost = await fetchPostById(id);
      setPost(fetchedPost);
    };
    loadPost();
  }, [id]);

  // Show a loading message while fetching the post data
  if (!post) {
    return <div className='w-screen h-screen bg-white bg-opacity-50 flex flex-col items-center justify-center text-[30px]'>
      Loading....
    </div>;
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-start'>
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
          <Link className='absolute h-[50px] w-[50px] bg-white hover:bg-green-300 bottom-0 left-0 m-5 rounded-full shadow-xl hover:cursor-pointer' href={"/post"}>
            <Image src={back} w-full h-full alt='Back_Button'/>
          </Link>
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