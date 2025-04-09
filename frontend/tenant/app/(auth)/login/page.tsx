"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {}),
});
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
      });
      setLoading(false);
      if (!res.error) {
        toast({
          title: "Logged in Successfully",
        });
        router.push(callbackUrl);
      } else {
        console.log(res.error);
        toast({
          title: "Incorrect credentials",
          description: "Please check your credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast({
        title: "An error occurred",
        description: "An error occurred while logging in.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="m-auto px-6 py-8 w-[500px]">
      <h1 className="text-3xl font-bold text-white">Log in</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 my-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 rounded-full w-full"
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="mt-4 flex space-x-2">
        <span className="text-white">New to Onboardex?</span>
        <a className="text-teal-600" href="/register">
          <span>Sign up today</span>
        </a>
      </div>
    </div>
  );
}
