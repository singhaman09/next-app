import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import becrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerficationEmail";
import { messageSchema } from "@/schemas/messageSchema";
import bcrypt from "bcryptjs";

export async function POST(request:Request) {

    await dbConnect()

    try{
       const {username,email,password}= await request.json()
       const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified:true
       })

       if(existingUserVerifiedByUsername){
        return Response.json({
            success:false,
            message:"Username is already taken."
        }, {status:400})
       }

       const existingUserVerifiedByEmail= await UserModel.findOne({email})

       const verifyCode=Math.floor(100000+Math.random()*900000).toString()
       if(existingUserVerifiedByEmail){
                // if(existingUserVerifiedByEmail.isVerified){
                //     return Response.json({
                //         success: false,
                //         message:"User already exists with this email"
                //     }, {status:400})
                // }
                // else{
                    const hashedPassword= await bcrypt.hash(password,10);
                    existingUserVerifiedByEmail.username = username; //always update username
                    existingUserVerifiedByEmail.password=hashedPassword;
                    existingUserVerifiedByEmail.verifyCode=verifyCode
                    existingUserVerifiedByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)

                    await existingUserVerifiedByEmail.save();
                // }

       }
       else{
        const hashedPassword= await bcrypt.hash(password,10);
        const expiryDate=new Date();
        expiryDate.setHours(expiryDate.getHours()+1)

        const newUser= new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            verifyCodeExpiry:expiryDate,
            isAcceptingMessage: true,
            isVerified: false,
            message:[]
        })

        await newUser.save();
       }

       //send Verification email

       const emailResponse= await sendVerificationEmail(
        email,
        username,
        verifyCode
       )

       if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message
        }, {status:500})
       }

       return Response.json({
        success:true,
        message:"User Registered succesfully .PLease verify your email."
    }, {status:201})



    }
    catch(error){
         console.error("Error registering user",error)

         return Response.json(
            {
                success:false,
                message:"Error registering user"
            },
            {
                status:500
            }
         )
    }
    
}