import connectMongoDB from "@/database/data";
import PostModel from "../../../../models/postModel"
import { NextResponse } from "next/server";

// Handler for PUT requests to update a blog post
export async function PUT(req, {params}){
  const {id} = params; // Extracting the post ID from the request parameters
  const {newPostName: name, newPostDescription: description} = await req.json();
  await connectMongoDB();
  await PostModel.findByIdAndUpdate(id, {name, description});
  return NextResponse.json({message: "Blog Update"}, {status: 200});
}

// Handler for GET requests to fetch a specific blog post by ID
export async function GET(req, {params}){
  const {id} = params;
  await connectMongoDB();
  const post = await PostModel.findById({_id:id});
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ post }, { status: 200 });
}

// Handler for DELETE requests to delete a specific blog post by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await PostModel.findByIdAndDelete(id);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}