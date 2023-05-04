import React from 'react'

import AdminLayout from "@/components/Layouts/adminLayout";
import ColorItem from '@/components/Admin/Branding/ColorItem';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';

const PasswordChange = () => {
  const keysList = [
    {
      name: "Current Password",
      regenerate: false,
      hasDivider: false
    },
    {
      name: "Password",
      regenerate: true,
      hasDivider: false
    },
    {
      name: "Comfirm",
      regenerate: true,
    },
  ]

  return (
    <AdminLayout title="Password">
      <div className="relative max-w-[786px] px-6 pt-20">
          {keysList.map((el, index) => (
            <div className={`flex items-center justify-between pb-2 ${el.hasDivider ? 'border-t border-gray-2 pt-4':''}`} key={index}>
              <div className='font-semibold text-base text-right w-1/5'>{el.name}</div>
              <div className='w-9/12'>
                <Input
                  size="large"
                  type='password' 
                  className='px-4 py-4 w-full rounded-none text-base' 
                  value={el.value}
                  // suffix={
                  //   <svg className='stroke-[#2196f3] cursor-pointer'  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  // }
                  addonAfter={
                    <EyeInvisibleOutlined />
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </AdminLayout>
  )
}

export default PasswordChange;
