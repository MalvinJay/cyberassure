import React from 'react';
import { Switch } from 'antd';

import AdminLayout from "@/components/Layouts/adminLayout";

const Billing = () => {
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
      enabled: true,
    },
    {
      name: "Bahasa",
      enabled: true,
    }
  ];

  return (
    <AdminLayout title="Billing">
      <div className="w-full grid grid-cols-1 py-12 px-6 gap-5">
      </div>
    </AdminLayout>
  )
}

export default Billing