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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

export const TransferForm = ({ serialId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await axios.post(
      "tenants/initiate-self-transfer",
      {
        serialId: serialId,
        destination: data.destination,
      },
      {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    setLoading(false);
    if (response.status === 201 && response.data.success) {
      toast({
        title: "NFT Transfer Initiated Successfully",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Transfer
        </Button>
      </form>
    </Form>
  );
};

const FormSchema = z.object({
  destination: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});
