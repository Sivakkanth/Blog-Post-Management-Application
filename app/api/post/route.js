import PostModel from "../../../models/postModel"
import { NextResponse } from "next/server";
import connectMongoDB from "@/database/data";

export async function POST(req){
  const {name, description} = await req.json();
  await connectMongoDB();
  await PostModel.create({name, description});
  await NextResponse.json({message: "Blogs Created"}, {status: 201});
}

export async function GET(){
  await connectMongoDB();
  const posts = await PostModel.find();
  return NextResponse.json({posts});
}