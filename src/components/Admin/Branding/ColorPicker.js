import React from 'react'
import ColorItem from './ColorItem'

const ColorPicker = ({ type="", headColor="bg-[#FFF]", options=[] }) => {
  return (
    <div>
        <div className="border-b border-gray-2 pb-4 my-4">
            <span className='text-sm font-semibold'>Pick a {type} color</span>
        </div>      

        <div className="flex items-center gap-x-4">
            <div className='pr-4 border-r border-gray-2'>
                <ColorItem type='main' color={headColor} />
            </div>
            
            {options.map((el, index) => (
                <ColorItem key={index} color={el} />
            ))}
        </div>
    </div>
  )
}

export default ColorPicker