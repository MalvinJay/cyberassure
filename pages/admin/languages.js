import React from 'react';
import { Switch } from 'antd';

import AdminLayout from "@/components/Layouts/adminLayout";

const Languages = () => {
  const meetingConfigs = [
    {
      name: "US English",
      enabled: true,
    },
    {
      name: "Spain",
      enabled: false,
    },
    {
      name: "Simplified Chines",
      enabled: false,
    },
    {
      name: "Dutch",
      enabled: false,
    },
    {
      name: "Japan",
      enabled: false,
    },
    {
      name: "Bahasa",
      enabled: false,
    }
  ];

  return (
    <AdminLayout title="Meetings">
      <div className="w-full grid grid-cols-1 py-12 px-6 gap-5">
        {meetingConfigs.map((el, index) => (
          <div key={index} className="w-full space-x-4">
            <Switch defaultChecked={el.enabled} onChange={() => {}} />
            <span className='text-lg font-semibold'>{el.name}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default Languages