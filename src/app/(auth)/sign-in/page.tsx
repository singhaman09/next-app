"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  //zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    //infers type will be signupSchema
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
    }
    if(result?.url){
      router.replace('/dashboard')
    }

    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-700 tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4 text-gray-600">
            Sign In to get started.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
             Sign In
            </Button>

            <Button
              type="button"
              onClick={() => signIn("github")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              {/* GitHub Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.57 2.57 0 01.76-1.61c-2.67-.3-5.47-1.34-5.47-5.97a4.68 4.68 0 011.24-3.25 4.36 4.36 0 01.12-3.21s1.01-.32 3.3 1.23a11.34 11.34 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.63 1.6.42 2.79.12 3.21a4.68 4.68 0 011.24 3.25c0 4.64-2.81 5.67-5.49 5.97a2.89 2.89 0 01.82 2.25v3.34c0 .32.21.69.82.58A12 12 0 0012 0z" />
              </svg>
              Sign in with GitHub
            </Button>
            <Button
                type="button"
                onClick={() => signIn("google")}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h146.9c-6.3 33.9-25 62.6-53.2 81.8v67h85.9c50.3-46.3 81.9-114.5 81.9-193.7z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-85.9-67c-23.9 16-54.6 25.5-92.2 25.5-70.9 0-131-47.9-152.4-112.2H31.5v70.6C75.6 486.1 167.3 544.3 272 544.3z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.6 325.2c-10.3-30.2-10.3-62.5 0-92.7V161.9H31.5c-39.5 77.5-39.5 169.2 0 246.7l88.1-67.4z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272 107.7c39.5-.6 77.4 14.3 106.2 41.7l79.2-79.2C397.3 24.3 335.6-.4 272 0 167.3 0 75.6 58.2 31.5 161.9l88.1 70.6C141 155.6 201.1 107.7 272 107.7z"
                    fill="#ea4335"
                  />
                </svg>
                Sign in with Google
              </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default page;