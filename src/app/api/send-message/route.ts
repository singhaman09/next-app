import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    // Create a properly formatted message
   const newMessage = {
      content: content,
      createdAt: new Date(),
      _id: new Types.ObjectId() // Explicitly add _id
    };

    // Type assertion to handle Mongoose document requirements
    user.messages.push(newMessage as any);
    await user.save();

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding message:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}