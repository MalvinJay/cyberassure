import React, { useState, useMemo, memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Form, Input, notification } from 'antd'
import api from "../services/config"

import DefaultLayout from '../src/components/Layouts/defaultLayout'
import VerifyAuth from "@/components/Misc/VerifyAuth";

const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  
  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);

      api.post('user/sign-up', { 
        ...values,
        role_id : 1
      })
      .then((res) => {
        setloading(false);

        if (res.data.status) {
          console.log('signup response:', res.data);
          notification.success({ 
            message: "Successfully Created User", 
            description: "User created. Kindly proceed to verify your account" 
          });
          setshow(true);
        }
      }, (error) => {
        setloading(false);
        console.error('Error posting user info:', error)
        setshow(true);
        notification.error({ message: error?.response?.data?.message?.errorMessage || 'Error creating user, please try agian' })
      })
    } catch (error) {
      console.error('Error validating fields:', error);
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleVerifyComplte = () => {
    setloading(false);
    router.push('/app/dashboard');
  }  

  // console.log('signup re-rendered')

  return (
    <DefaultLayout>
      <section className="w-full flex justify-center items-center pb-12 max-w-screen-xl mx-auto">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col md:py-8 mt-8 md:mt-0 mx-auto text-lg">
          <h2 className="text-primary text-lg md:text-3xl mb-2 font-medium title-font text-center">
            Sign up to get started
          </h2>
          <p className="leading-relaxed text-center mb-2 font-medium">
            Create a secure account  to get started 
          </p>
          <p className="leading-relaxed text-center mt-1 mb-5 font-medium">
            Already having an account? &nbsp;
            <Link href="/login" className="text-primary">Login</Link>
          </p>
          
          <Form 
            form={form}
            className="grid grid-cols-1 gap-2" 
            data-aos="fade-up" data-aos-duration="800"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="first_name"
              rules={[ {required: true, message: 'Please input your firstname'}]}
            >
              <Input 
                type="text" 
                id="first_name" 
                label="first_name" 
                className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                placeholder="First name"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[ {required: true, message: 'Please input your lastname'}]}
            >
              <Input 
                type="text" 
                id="last_name" 
                label="last_name" 
                className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item
              name="org_name"
              rules={[ {required: true, message: 'Please input your business name'}]}
            >
              <Input 
                type="text" 
                id="org_name" 
                label="org_name" 
                className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                placeholder="Organization Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[ {required: true, message: 'Please input your email'}]}
            >
              <Input 
                type="email" 
                id="email" 
                label="email" 
                className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                placeholder="Email"
              />
            </Form.Item>   
            <Form.Item
              name="password"
              rules={[ {required: true, message: 'Please input your password'}]}
            >
              <Input.Password
                id="password" 
                label="password" 
                className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                placeholder="Password"
              />
            </Form.Item>               

            <Button type="primary" className="w-full h-12 text-white bg-primary rounded-lg border-0 py-2 px-6 focus:outline-none hover:bg-primary/90 text-lg flex justify-between items-center"
             htmlType="submit"
            >
              <span>Sign up</span>

              {loading ? 
                <svg className="animate-spin ml-4 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              :
                <svg className="ml-4" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z" fill="white"/>
                </svg>
              }              
            </Button>

            <p className="text-sm text-opacity-90 mt-3 text-center">
              By confirming your email, you agree to our Terms of Service and that you have read and understood our Privacy Policy.
            </p>
          </Form>
        </div>              
      </section>

      <VerifyAuth 
        show={show}
        setshow={setshow}
        email={form.getFieldsValue()["email"]}
        handleVerifyComplete={handleVerifyComplte}
      />      
    </DefaultLayout>
  )
}

export default Signup