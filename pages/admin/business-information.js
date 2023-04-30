import React from 'react'

import AdminLayout from "@/components/Layouts/adminLayout";
import BusinessInfo from '@/components/Admin/BusinessInfomation/BusinessInfo';
import Logo from '@/components/Admin/Branding/Logo';
import Appearance from '@/components/Admin/Branding/Appearance';

const BusinessInformation = () => {
  return (
    <AdminLayout title="Business Information">
        <div className="px-6 pb-12">
            <BusinessInfo />

            <h2 className="text-base font-bold">Branding</h2>
            <Logo />
            <Appearance />
        </div>
    </AdminLayout>
  )
}

export default BusinessInformation