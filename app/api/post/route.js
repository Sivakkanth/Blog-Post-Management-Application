import PostModel from "../../../models/postModel"
import { NextResponse } from "next/server";
import connectMongoDB from "@/database/data";

// Handler for POST requests to create a new blog post
export async function POST(req){
  const {name, description} = await req.json();
  await connectMongoDB();
  await PostModel.create({name, description});  // Creating a new post document in the database
  await NextResponse.json({message: "Blogs Created"}, {status: 201});
}

// Handler for GET requests to fetch all blog posts
export async function GET(){
  await connectMongoDB();
  const posts = await PostModel.find();
  return NextResponse.json({posts});
}