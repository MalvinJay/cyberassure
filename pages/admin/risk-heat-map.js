import React from 'react'

import AdminLayout from "@/components/Layouts/adminLayout";
import ColorItem from '@/components/Admin/Branding/ColorItem';
import { Input } from 'antd';

const BusinessInformation = () => {
  const colorList = [
    {
      color: "bg-[#04AB1F]",
      lower: 70,
      upper: 100
    },
    {
      color: "bg-[#F4BE37]",
      lower: 50,
      upper: 69
    },
    {
      color: "bg-[#FE0D0D]",
      lower: 0,
      upper: 49
    }
  ]

  return (
    <AdminLayout title="Heat Map">
      <div className="relative max-w-[600px] mx-auto pt-20">
        <div>
          <div className="flex items-center justify-between pb-5">
            <div className='px-4 py-2 bg-slate-100 text-xl font-semibold -ml-5'>Colour</div>  
            <div className='text-xl font-semibold shadow-inner w-72 py-2 text-center'>
              Key Risk Indicator limit
            </div>  
          </div>

          {colorList.map((el, index) => (
            <div className="flex items-center justify-between pb-5" key={index}>
              <ColorItem color={el.color} />
              <Input 
                size="large" 
                className='text-center w-72 rounded-none font-semibold text-xl' 
                value={`${el.lower} - ${el.upper}%`} 
                style={{
                  background: 'rgba(217, 217, 217, 0.25)',
                  boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default BusinessInformation