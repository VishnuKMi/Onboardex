'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useSession } from 'next-auth/react'
// import csv from 'csv-parser'

export function BatchMintModal () {
  const [selectedFile, setSelectedFile] = useState(null)

  const { data: session } = useSession()

  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    // if (selectedFile) {
    //   try {
    //     const reader = new FileReader()
    //     reader.onload = async () => {
    //       const contents = reader.result
    //       // Parse CSV and generate metadata
    //       const data = []
    //       const parser = csv({
    //         mapValues: ({ value }) => value.trim(), // Trim whitespace from values
    //         skipLines: /^$/
    //       })
    //       parser.on('data', row => {
    //         const requiredCategories = [
    //           'Name',
    //           'Description',
    //           'Serial ID',
    //           'Production Date',
    //           'Image'
    //         ]
    //         const missingCategories = requiredCategories.filter(
    //           category => !(category in row)
    //         )
    //         if (missingCategories.length > 0) {
    //           console.log(
    //             `Error: Categories missing - ${missingCategories.join(', ')}`
    //           )
    //           return
    //         }
    //         const {
    //           Name,
    //           Description,
    //           Image,
    //           'Serial ID': serialId,
    //           'Production Date': productionDate,
    //           ...restData
    //         } = row
    //         const metadata = {
    //           name: Name,
    //           description: Description,
    //           image: Image,
    //           attributes: [
    //             {
    //               trait_type: 'Serial ID',
    //               value: serialId
    //             },
    //             {
    //               display_type: 'date',
    //               trait_type: 'Production Date',
    //               value: productionDate
    //             }
    //           ]
    //         }
    //         Object.entries(restData).forEach(([key, value]) => {
    //           metadata.attributes.push({ trait_type: key, value })
    //         })
    //         data.push(metadata)
    //       })
    //       console.log(data)
    //       const response = await axios.post('tenants/batch-mint', data, {
    //         baseURL: process.env.NEXT_PUBLIC_API_URL,
    //         headers: {
    //           x_tenant_id: session?.user?.tenant?.id
    //         }
    //       })
    //       console.log(response)
    //       if (response.status === 201 && response.data.success) {
    //         toast({
    //           title: 'NFTs Minted Successfully',
    //           description: 'Your NFTs have been minted successfully.'
    //         })
    //       } else {
    //         toast({
    //           title: 'Something went wrong',
    //           description: response.data.message,
    //           variant: 'destructive'
    //         })
    //       }
    //       // Clear the selected file
    //       setSelectedFile(null)
    //       parser.write(contents)
    //       parser.end()
    //     }
    //     reader.readAsText(selectedFile)
    //   } catch (error) {
    //     console.error('Error uploading CSV file:', error)
    //   }
    // } else {
    //   toast({
    //     title: 'No File Selected',
    //     description: 'Please select a CSV file before submitting.'
    //   })
    // }
  }

  return (
    <div>
      <div className='grid w-full max-w-sm items-center gap-6'>
        <Label htmlFor='csvFile'>Upload CSV file</Label>
        <Input
          id='csvFile'
          type='file'
          name='csvFile'
          accept='.csv'
          onChange={handleFileChange}
        />
      </div>
      <Button className='mt-2' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}
