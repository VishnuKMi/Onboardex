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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  productName: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  productDescription: z.string(),
  serialId: z.string(),
  imageURL: z.string(),
});

export function SingleMintModal({ setOpen }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await axios.post("tenants/single-mint", data, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    setLoading(false);
    if (response.status === 201 && response.data.success) {
      toast({
        title: "NFT Minted Successfully",
        description: "Your NFT has been minted successfully.",
      });
      setOpen(false);
    } else {
      toast({
        title: "Something went wrong",
        description: response.data.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serialId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Mint NFT
        </Button>
      </form>
    </Form>
  );
}
