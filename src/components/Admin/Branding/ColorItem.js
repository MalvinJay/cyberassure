import React from 'react'

const ColorItem = ({ type="", color="bg-[#e5e7eb]" }) => {
  return (
    <div className='relative'>
        {type === 'main' && (
            <svg className='w-5 absolute -right-2 top-0' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#2196F3"/>
                <path d="M18.0909 7L9.09091 16L5 11.9091" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        )}
        <div className={`w-12 h-12 border-2 border-gray-2 rounded-full flex items-center justify-center ${color}`}>
            {type === 'main' && (
                <svg className='w-4' viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1.82843C16.2626 1.56578 16.5744 1.35744 16.9176 1.2153C17.2608 1.07316 17.6286 1 18 1C18.3714 1 18.7392 1.07316 19.0824 1.2153C19.4256 1.35744 19.7374 1.56578 20 1.82843C20.2626 2.09107 20.471 2.40287 20.6131 2.74603C20.7553 3.0892 20.8284 3.45699 20.8284 3.82843C20.8284 4.19986 20.7553 4.56766 20.6131 4.91082C20.471 5.25398 20.2626 5.56578 20 5.82843L6.5 19.3284L1 20.8284L2.5 15.3284L16 1.82843Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            )}
        </div>
    </div>
  )
}

export default ColorItem