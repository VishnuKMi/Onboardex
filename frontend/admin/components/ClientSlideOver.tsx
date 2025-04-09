import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'

const ClientSlideOver = ({ isOpen, setIsOpen, modalData }) => {
  const side = 'right'

  console.log(modalData)

  const isStatusEnabled = modalData?.original?.users[0]?.isActive === true
  let statusText = isStatusEnabled ? 'Enabled' : 'Disabled'
  let toggleCheckbox = isStatusEnabled ? 'Disable' : 'Enable'

  const toggleStatus = async () => {
    try {
      const response = await axios.post(
        '/admin/toggle-status',
        {
          contract: modalData?.original?.contract?.contractAddress
          // isActive: !isStatusEnabled
        },
        {
          baseURL: process.env.NEXT_PUBLIC_API_URL
        }
      )
      console.log(response)

      if (response.status === 201) {
        const newStatus = response.data.data
        modalData.original.users[0].isActive = newStatus

        const statusText = newStatus ? 'Enabled' : 'Disabled'
        const toggleCheckbox = newStatus ? 'Disable' : 'Enable'

        toast({
          title: `Client ${statusText} successfully`
        })
      } else {
        toast({
          title: 'Something went wrong',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Error updating client status:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.post('/admin/delete', {
        address: modalData?.original?.address
      })
    } catch (error) {
      console.error('Error deleting client:', error)
    }
  }

  return (
    <Sheet key={side} open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{modalData?.original?.client}</SheetTitle>
          <SheetDescription>
            <div className='flex justify-between mt-6'>
              {`Currently ${statusText}`}
              <div className='flex justify-center items-center gap-2'>
                {toggleCheckbox}
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    value=''
                    className='sr-only peer'
                    onChange={() => toggleStatus()}
                    checked={isStatusEnabled}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <div className='h-screen relative'>
            <button
              className='absolute -left-[100px] bottom-[130px] bg-red-500 px-6 py-1 rounded-md text-white'
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ClientSlideOver
