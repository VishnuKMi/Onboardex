'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  firstName: z.string().min(2, {}),
  lastName: z.string().min(2, {}),
  companyName: z.string().min(2, {}),
  url: z.string().min(2, {}),
  email: z.string().email(),
  password: z.string().min(8, {}),
  policy: z.boolean().default(false)
})
export default function page () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const axiosResponse = await axios.post(`/tenants/register`, data, {
        baseURL: process.env.NEXT_PUBLIC_API_URL
      })
      if (axiosResponse.status === 201) {
        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl: callbackUrl
        })
        setLoading(false)
        if (!signInResponse.error) {
          toast({
            title: 'Registered Successfully',
            description: 'Check your email for verification'
          })
          router.push(callbackUrl)
        } else {
          console.log(signInResponse.error)
          toast({
            title: 'Something went wrong',
            description: signInResponse.error,
            variant: 'destructive'
          })
        }
      } else {
        console.log(axiosResponse)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className='m-auto px-6 py-8 w-[600px]'>
      <h2 className='font-body text-white xxl:text-4xl mb-8 text-2xl font-bold'>
        Create an account
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6 my-6'
        >
          <div className='flex space-x-2 w-full'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-white'>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-white'>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your company name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='policy'
            render={({ field }) => (
              <FormItem className='flex gap-x-2 text-white'>
                <FormControl>
                  <Checkbox
                    className='mt-2 border border-white'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  By signing up, you confirm you have read and agree to Terms of
                  Use and Privacy Policy
                </FormLabel>
              </FormItem>
            )}
          />

          <p className='mt-6 text-sm text-white'>
            We collect your name and email address in order to allow you access
            to your account, to manage your account and to contact you about
            changes to your account. For more information in relation to our
            privacy practices, please see our{' '}
            <a
              target='_blank'
              className='whitespace-pre text-teal-600'
              href='https://consensys.net/privacy-policy/'
              rel='noopener noreferrer nob'
            >
              Privacy Policy
            </a>
          </p>
          <Button
            disabled={loading}
            type='submit'
            className='bg-purple-600 hover:bg-purple-500 rounded-full w-full'
          >
            {loading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Create account
          </Button>
        </form>
      </Form>
      <Separator />
      <div className='mt-4 flex space-x-2'>
        <span className='text-white'>Already have an account?</span>
        <a className='text-teal-600' href='/login'>
          <span>Login</span>
        </a>
      </div>
    </div>
  )
}
