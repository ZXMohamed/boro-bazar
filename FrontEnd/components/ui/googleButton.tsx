"use client"
import Image from 'next/image'
import { Button } from './button'

const GoogleButton = () => {
    return (
        <Button type="button" className="text-black bg-gray-100 font-blod text-md w-full shadow-none capitalize my-0 py-6 hover:bg-gray-100">
            <Image src="/google-32px.png" width={50} height={50} alt="google icon" className='w-5' />
            LOGIN WITH GOOGLE
        </Button>
    )
}

export default GoogleButton
