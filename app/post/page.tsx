"use client";
import React, { useState, useEffect } from 'react';
import AddNewPostModal from './AddNewPostModal';
import Link from 'next/link';
import Image from 'next/image';
import back from "../../public/back.png"

// Define the interface for the Post type
interface Post {
  _id: string;
  name: string;
  description: string;
  createdAt: string; 
  updatedAt: string; 
}

// Function to fetch posts from the API
const getPosts = async () =>{
  try {
    const res = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fail to fetch Posts");
    }
    return await res.json();
  } catch (error) {
    console.log("Error loading Posts: ", error);
    return {posts: []};
  }
};

const PostsPage:React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Function to fetch posts and update the state
  const fetchPosts = async () => {
    const {posts} = await getPosts();
    setPosts(posts);
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-start'>
      <div className='fixed w-screen bg-white z-10 border-b-[5px] border-green-700'>
        <h1 className="text-[18px] sm:text-[20px] md:text-[25px] font-bold p-[30px] mr-[50px]">Blog Post Management Application</h1>
        <button className='fixed top-0 font-semibold right-0 mt-[30px] mx-2 sm:mx-3 bg-green-700 px-[10px] sm:px-[20px] py-[10px] text-[12px] rounded-[25px] text-white hover:bg-green-500 hover:text-green-800' onClick={openModal}>+ Add New</button>
      </div>
      <div className='flex flex-col items-center mt-[100px] bg-green-100 bg-opacity-50 w-screen h-auto min-h-full py-5 border-b-[5px] border-green-700'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-4'>
            {posts.map((p) => (
              <div key={p._id} className='bg-gray-100 shadow-md shadow-green-700 rounded-[5px] m-3 w-[285px] flex flex-col items-center justify-between p-3'>
                <div className='flex flex-col w-full items-center justify-start'>
                  <h2 className="text-[20px] font-bold text-green-700">{p.name}</h2>
                  <div className='h-[5px] bg-green-700 w-[10%] rounded-full'></div>
                </div>
                <p className='text-[14px] font-medium py-[5px] w-full text-justify'>{p.description}</p>
                <div className='flex flex-col items-center justify-start'>
                  <p className='text-[10px] pt-[10px] w-full'>Created at: {p.createdAt}</p>
                  <p className='text-[10px] text-green-600 w-full'>Updated at: {p.updatedAt}</p>
                  <a className='bg-green-700 p-2 text-[10px] m-3 text-white rounded-full hover:bg-green-100 hover:text-black border-[1px] hover:border-green-700' href={`/post/${p._id}`}>View Details</a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Link className='fixed z-15 h-[50px] w-[50px] bg-white hover:bg-green-300 bottom-0 left-0 m-5 rounded-full shadow-xl hover:cursor-pointer' href={"/"}>
        <Image src={back} w-full h-full alt='Back_Button'/>
      </Link>
      {showModal && <AddNewPostModal closeModal={closeModal} refreshPosts={fetchPosts} />}
    </div>
  );
};

export default PostsPage;