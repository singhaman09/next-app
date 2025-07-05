import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    
    email:string,
    username:string,
    verifycode:string
) : Promise<ApiResponse>{


    try{
        console.log("Sending verification email to:", email);
        await resend.emails.send({
        from: 'auth@resend.dev',
        to: email,
        subject: 'Verification Code | Aman',
        react: VerificationEmail({username,otp:verifycode}),
        });

        return {success:true, message:"Verification Email send successfully."}
    }
    catch(emailError){
        console.error("Error sending verifcation email",emailError)
        return {success:false, message:"Failed to send verification email"}
    }
    
}