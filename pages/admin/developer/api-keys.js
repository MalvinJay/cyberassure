import React from 'react'

import AdminLayout from "@/components/Layouts/adminLayout";
import ColorItem from '@/components/Admin/Branding/ColorItem';
import { Button, Input } from 'antd';

const BusinessInformation = () => {
  const keysList = [
    {
      name: "API Key",
      value: "9acdb99-ewjfwe-39iekeo-30033g",
      regenerate: false,
      hasDivider: false
    },
    {
      name: "Access Key",
      value: "20cdb99-ewjfwe-39iekeo-30033g",
      regenerate: true,
      hasDivider: false
    },
    {
      name: "SCMI Key",
      value: "1Ucdb99-ew39we-dsieke30-ADJ033g",
      regenerate: true,
      hasDivider: true
    },
  ]

  return (
    <AdminLayout title="API Access">
      <div className="relative max-w-[786px] px-6 pt-20">
          {keysList.map((el, index) => (
            <div className={`flex items-center justify-between pb-5 ${el.hasDivider ? 'border-t border-gray-2 pt-4':''}`} key={index}>
              <div className=' font-semibold text-base text-right w-24'>{el.name}</div>
              <div className='w-4/5'>
                <Input 
                  size="large" 
                  className='px-4 w-full rounded-none text-base' 
                  value={el.value}
                  suffix={
                    <svg className='stroke-[#2196f3] cursor-pointer'  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  }
                  readOnly
                />

                {el.regenerate && (
                  <Button type="text" size='large' className="!text-lg text-[#2196f3] mt-3 cursor-pointer">Regenerate</Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </AdminLayout>
  )
}

export default BusinessInformation