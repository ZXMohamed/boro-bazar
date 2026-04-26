import React from 'react'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { FaPlus } from "react-icons/fa";
import AddressCard from '../common/addressCard'


function AddressList() {
  return (
    <aside className='w-full lg:w-195'>
      <Card className='pb-3 pt-2 gap-y-2'>
        <CardHeader className='border-b-1 py-4 items-center'>
          <CardTitle className='row-span-2'>
            <h1 className='text-[20px]'>Select Delivery Address</h1>
          </CardTitle>
          <CardAction>
            <Button variant={'outline'} className='text-primary border-primary rounded-sm hover:text-secondary hover:bg-primary'><FaPlus /> Add New Address</Button>
          </CardAction>
        </CardHeader>
        <CardContent className='py-4 px-6 flex flex-col gap-y-4'>
            <AddressCard address={{ id: "", city: "city", country: "country", fullName: "user", phone: "01054184", state: "state", street: "street", type: "home" }}/>
            <AddressCard address={{ id: "", city: "city", country: "country", fullName: "user", phone: "01054184", state: "state", street: "street", type: "home" }}/>
            <AddressCard address={{ id: "", city: "city", country: "country", fullName: "user", phone: "01054184", state: "state", street: "street", type: "home" }}/>
            <AddressCard address={{ id: "", city: "city", country: "country", fullName: "user", phone: "01054184", state: "state", street: "street", type: "home" }}/>
        </CardContent>
      </Card>
    </aside>
  )
}

export default AddressList