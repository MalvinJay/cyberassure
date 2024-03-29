'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Form, Input, notification } from 'antd'
import { useAuth } from "../Context/auth";

// import api from "../services/config"
// import Cookies from 'js-cookie';

import DefaultLayout from '../src/components/Layouts/defaultLayout'
import VerifyAuth from "@/components/Misc/VerifyAuth";

const Signin = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);

  const socialAuth = [
    {
      logo: '/assets/images/social/google.svg',
      text: 'Log in with Google',
      color: '#0364B8'
    },
    {
      logo: '/assets/images/social/apple.svg',
      text: 'Log in with Apple',
      color: '#000000'
    },
    {
      logo: '/assets/images/social/slack.svg',
      text: 'Log in with Slack',
      color: '#5A62C3'
    },
    {
      logo: '/assets/images/social/office.svg',
      text: 'Log in with Office 365',
      color: '#FF0000D6'
    },
  ];

  const onFinish = async (values) => {
    form.validateFields();
    try {
      setloading(true);

      login(values?.email, values?.password)
      .then((res) => {
        console.log('Login Response:', res);
        // router.push('/app/dashboard');
      }, (err) => {
        console.log('Err in login page:', err);
        setloading(false);
      })   
      .catch((error) => {
        console.log('Error in login page:', error);
        setloading(false);
      })  
    } catch (error) {
      console.error('Error validating fields:', error);
    }
  };

  const handleVerifyComplte = () => {
    setloading(false);
    router.push('/app/dashboard');
  }

  return (
    <>
      <Head>
        <title>Login | OrgPosture</title>
        <meta name="description" content="Get real time summary reports on security solutions & controls implemented within your enterprise" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <section className="max-w-screen-xl mx-auto body-font relative">
        <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-3/5 md:w-1/2 py-10 relative flex justify-center items-center">
            <p className="text-4xl lg:text-5xl font-medium sm:pr-20 lg:pr-32 lg:pb-24"
              data-aos="fade-up" data-aos-duration="800"
            >
              Get real time summary reports on security solutions & controls 
              implemented within your enterprise
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5 bg-white drop-shadow-cs flex flex-col py-4 mt-8 mb-12">
            <div className="px-10">
              <h2 className="text-primary text-lg md:text-3xl mb-1 font-medium title-font">
                Login
              </h2>
              <p className="leading-relaxed mb-5 font-medium">
                Sign in to your account to continue
              </p>

              <Form
                form={form}
                className="grid grid-cols-1" 
                // data-aos="zoom-in" data-aos-duration="500"
                onFinish={onFinish}
                autoComplete="off"                  
              >
                <Form.Item name="email" rules={[ {required: true, message: 'Email is required'}]}>
                  <Input 
                    type="email" 
                    label=""
                    name="email" 
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item name="password" rules={[ {required: true, message: 'Password is required'}]}>
                  <Input.Password
                    type="password" 
                    label="" 
                    name="password" 
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                    placeholder="Password"
                  />
                </Form.Item>

                <div className="w-full text-right">
                  <Link href='/forgot-password' className='font-medium text-primary text-base'>Forgot Password</Link>
                </div>

                <div className="pb-4">
                  <Button type="primary" className="w-full sm:w-auto sm:px-4 lg:px-6 h-12 text-white bg-primary rounded-lg border-0 py-2 focus:outline-none hover:bg-primary/90 text-lg flex justify-between items-center"
                    htmlType="submit"
                    // onClick={(e) => handleAuth(e)}
                  >
                    <span>Login</span>

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
                </div>

                <p className='w-full text-center font-black text-lg pb-4'>Or</p>

                {socialAuth.map((el, index) => (
                  <button className={`relative w-full h-10 text-center mb-4 bg-transparent rounded-xl border
                      ${el?.text.includes('Google') && 'border-[#0364B8]'}
                      ${el?.text.includes('Apple') && 'border-[#000000]'}
                      ${el?.text.includes('Slack') && 'border-[#5A62C3]'}
                      ${el?.text.includes('Office') && 'border-[#FF0000D6]'}                        
                    `} 
                    key={index}
                  >
                    <Image src={el.logo} width={25} height={25} alt={el.text} className="absolute object-cover left-0 ml-4" />
                    <span className={`
                      ${el?.text.includes('Google') && 'text-[#0364B8]'}
                      ${el?.text.includes('Apple') && 'text-[#000000]'}
                      ${el?.text.includes('Slack') && 'text-[#5A62C3]'}
                      ${el?.text.includes('Office') && 'text-[#FF0000D6]'}
                    `}
                    >
                      {el.text}
                    </span>
                  </button>
                ))}
              </Form>
            </div>

            <div className='mt-4 pt-4 border-t border-gray-1'>
              <p className="leading-relaxed text-center font-medium text-lg">
                Not registered? &nbsp;
                <Link href="/signup" className="text-primary">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <VerifyAuth 
        show={show}
        email={form.getFieldsValue()["email"]}
        setshow={setshow}
        handleVerifyComplete={handleVerifyComplte}
      />
    </>
  )
}

const LoginComp = () => (
  <DefaultLayout>
    <Signin />
  </DefaultLayout>
);

export default LoginComp