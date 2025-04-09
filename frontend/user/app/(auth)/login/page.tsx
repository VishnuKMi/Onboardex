"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
});
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await axios.post(
        "auth/users/login",
        {
          destination: data.email,
        },
        {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        }
      );
      setIsEmailSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "User not found",
        variant: "destructive",
      });
      console.log(error);
    }
  }
  return (
    <div className="m-auto px-6 py-8 w-[500px]">
      <h1 className="text-3xl font-bold text-white">Log in</h1>
      {!isEmailSent ? (
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
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 rounded-full w-full"
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-white">Check your email for a login link</div>
      )}
    </div>
  );
}
