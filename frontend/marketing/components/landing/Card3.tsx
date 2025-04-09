'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  company: z.string(),
  country: z.string(),
  message: z.string()
})

export default function Card3 () {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    console.log(data)
    // TODO - SEND EMAIL
    const response = await axios.post('send-email', data, {})
    if (response.status === 201 && response.data.success) {
      toast({
        title: 'Email sent',
        description: 'Our team member will soon reach out to you'
      })
    } else {
      toast({
        title: 'Something went wrong',
        description: response.data.message,
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='relative mx-auto px-4'>
      {/* <div className='w-full flex justify-center mb-[520px] lg:mb-96'> */}
      <div className='w-full flex justify-center mb-16'>
        <div className='w-full md:w-11/12 xl:w-10/12 rounded-xl text-center bg-gradient-to-r from-indigo-500 to-indigo-700 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16'>
          <div className='text-black uppercase text-xs md:text-sm font-semibold tracking-widest'>
            Are You Ready?
          </div>
          <div className='mt-2 text-xl md:text-4xl tracking-wide leading-snug roboto-700'>
            Be A Part Of The <br />
            Next Big Thing
          </div>
          {/* form */}
          {/* <div className='w-full flex items-center justify-center my-6'>
            <div className='absolute top-[70%] bg-priceCard shadow rounded-xl py-8 px-6'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
                >
                  <div className='uppercase text-xs md:text-sm font-semibold tracking-widest'>
                    get a quote
                  </div>
                  <div className='sm:flex sm:gap-4 space-y-6 sm:space-y-0'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Name'
                              className='placeholder:text-gray-400'
                            />
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
                          <FormControl>
                            <Input
                              {...field}
                              type='email'
                              placeholder='Email Address'
                              className='placeholder:text-gray-400'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='sm:flex sm:gap-4 space-y-6 sm:space-y-0'>
                    <FormField
                      control={form.control}
                      name='company'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Company Name'
                              className='placeholder:text-gray-400'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Country'
                              className='placeholder:text-gray-400'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder='Type your message here.'
                            className='placeholder:text-gray-400'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    className='bg-purple-600 hover:bg-purple-900'
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
