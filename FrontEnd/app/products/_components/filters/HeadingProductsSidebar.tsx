import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const HeadingProductsSidebar = ({ title, open, setOpen }: { title: string, open?: boolean, setOpen?: (value: boolean) => void }) => {
  const handleToggle = () => setOpen && setOpen(!open)
  return (
    <div className='flex justify-between items-center' onClick={handleToggle}>
      <h6 className='text-[16px] font-500 leading-[22px] text-gray-700'>{title}</h6>
      {
        setOpen && (
          open ? <BsChevronUp className=' text-xl font-extrabold' /> : <BsChevronDown className=' text-xl font-extrabold' />
        )

      }
    </div>
  )
}

export default HeadingProductsSidebar
