import connectMongoDB from "@/database/data";
import PostModel from "../../../../models/postModel"
import { NextResponse } from "next/server";

export async function PUT(req, {params}){
  const {id} = params;
  const {newPostName: name, newPostDescription: description} = await req.json();
  await connectMongoDB();
  await PostModel.findByIdAndUpdate(id, {name, description});
  return NextResponse.json({message: "Blog Update"}, {status: 200});
}

export async function GET(req, {params}){
  const {id} = params;
  await connectMongoDB();
  const post = await PostModel.findById({_id:id});
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ post }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await PostModel.findByIdAndDelete(id);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}