"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
// import useSWR from 'swr';
import api from "../../services/config";

import AppLayout from "@/components/Layouts/appLayout";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "redux/features/profileSlice";

const { RangePicker } = DatePicker;

const rangePresets = [
    {
    label: 'Datepicker',
    value: <RangePicker picker="week" />
    },
    {
    label: 'Weekly',
    value: <RangePicker picker="week" />
    },
    {
    label: 'Monthly',
    value: <RangePicker picker="month" />,
    },
    {
    label: 'Quarterly',
    value: <RangePicker picker="quarter" />,
    },
    {
    label: 'Annually',
    value: <RangePicker picker="year" />,
    }
];

const landingPage = [
    {
    name: "KRI",
    value: "kri"
    },
    {
    name: "Dashboard",
    value: "dashboard"
    },
    {
    name: "Task",
    value: "task"
    },
    {
    name: "Risk Register",
    value: "risk"
    },
];

const Profile = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const { profile } = useSelector((state) => state.profile);

    const [loading, setloading] = useState(false);

    const onFinish = async (values) => {
        try {
          form.validateFields();
    
          setloading(true);
    
          api.post('user/user-profile', { ...values })
          .then((res) => {
            setloading(false);
            notification.success({ message: "User profile updated successfully" })
          }, (error) => {
            console.error('Error posting user info:', error)
            setloading(false);
            notification.error({ message: "Error updating profile" })
          })
        } catch (error) {
          console.error('Error validating fields:', error);
        }
    };

    useEffect(() => {
      form.setFieldsValue(profile);
    }, [profile]);
    
    useEffect(() => {
        dispatch(getProfile());
    }, []);

    return (
        <AppLayout>
            <div className="w-full flex items-stretch py-5 px-8">
                <div className="w-full py-6 sm:w-2/3">
                    <Form
                        form={form}
                        layout="vertical"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-12" 
                        data-aos="fade-up" data-aos-duration="800"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item label="Firstname" name="first_name">
                            <Input 
                                type="text" 
                                id="fname" 
                                name="fname" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="First name"
                            />                
                        </Form.Item>  

                        <Form.Item label="Lastname" name="last_name">
                            <Input 
                                type="text" 
                                id="fname" 
                                name="fname" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Last name"
                            />          
                        </Form.Item>

                        <Form.Item label="Location" name="location">
                            <Input 
                                type="text" 
                                id="location" 
                                name="location" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Location"
                            />                
                        </Form.Item>  

                        <Form.Item label="Time Zone" name="timezone">
                            <Input 
                                type="text" 
                                id="time_zone" 
                                name="time_zone" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Timezone"
                            />                
                        </Form.Item>    

                        <Form.Item label="Organization Name" name="org_name">
                            <Input 
                                type="text" 
                                id="location" 
                                name="location" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Business name"
                            />                
                        </Form.Item>  

                        <Form.Item label="Email Address" name="email">
                            <Input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Email Address"
                            />                
                        </Form.Item>  

                        <Form.Item label="Department" name="dept_name">
                            <Input 
                                type="text" 
                                name="dept_name" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Department"
                            />              
                        </Form.Item>  

                        <Form.Item label="Role" name="role_name">
                            <Input 
                                id="text" 
                                name="role_name" 
                                className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Role"
                            />                
                        </Form.Item>                             

                        <Form.Item label="Default Landing Page" name="landing_page">
                            <Select 
                                className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                                placeholder="Select Priority"
                                size="large"
                                style={{ height: '43px' }}
                            >
                                {landingPage.map((el, index) => (
                                    <Select.Option key={index}>{el.name}</Select.Option>
                                ))}
                            </Select>              
                        </Form.Item>

                        <div className="flex items-end justify-end">
                            <Button
                                type="primary"
                                className="w-full mb-6 px-4 py-5 text-lg font-bold text-white bg-primary rounded-md flex justify-center items-center"
                                loading={loading}
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>

                <div className="w-full sm:w-1/3 pt-10">
                    <div className="w-full relative">
                        <Image
                            width={250}
                            height={250}
                            className="object-contain ml-auto bg-default"
                            src="/assets/images/profile.svg"
                            alt="profile pic"
                        />
                    </div>
                </div>

            </div>
        </AppLayout>
    );
};

export default Profile;
