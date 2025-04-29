import {z} from "zod";

export const verifySchema=z.object({
    identifier:z.string().length(6,{message:"Verification code must be at least 6 digits"}),
    password:z.string()
})

