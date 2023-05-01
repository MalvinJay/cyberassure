import React from 'react';
import { Switch } from 'antd';

import AdminLayout from "@/components/Layouts/adminLayout";

const BusinessInformation = () => {
  const meetingConfigs = [
    {
      name: "Enable Microsoft Teams",
      enabled: true,
    },
    {
      name: "Enable Microsoft Outlook",
      enabled: false,
    },
    {
      name: "Enable calendly",
      enabled: false,
    },
    {
      name: "Enable Google Calender",
      enabled: true,
    },
    {
      name: "Enable Slack",
      enabled: true,
    }
  ];

  return (
    <AdminLayout title="Meetings">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-12 px-6 gap-5">
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

export default BusinessInformation