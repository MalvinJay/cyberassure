import Link from 'next/link'
import React from 'react'
import DefaultLayout from '../src/components/Layouts/defaultLayout'

const Signup = () => {
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
            
            <form className="" data-aos="fade-up" data-aos-duration="800">
              <div className="relative mb-5">
                <input 
                  type="text" 
                  id="fname" 
                  name="fname" 
                  className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                  placeholder="First name"
                />
              </div>
              <div className="relative mb-5">
                <input 
                  type="text" 
                  id="lname" 
                  name="lname" 
                  className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                  placeholder="Last name"
                />
              </div>
              <div className="relative mb-5">
                <input 
                  type="text" 
                  id="bussname" 
                  name="bussname" 
                  className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                  placeholder="Business Name"
                />
              </div>
              <div className="relative mb-5">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                  placeholder="Email"
                />
              </div>
              <div className="relative mb-8">
                <input 
                  type="password" 
                  id="pass" 
                  name="pass" 
                  className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                  placeholder="Password"
                />
              </div>

              <button className="w-full h-12 text-white bg-primary rounded-lg border-0 py-2 px-6 focus:outline-none hover:bg-primary/90 text-lg flex justify-between items-center">
                <span>Sign up</span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z" fill="white"/>
                </svg>
              </button>

              <p className="text-sm text-opacity-90 mt-3 text-center">
                By confirming your email, you agree to our Terms of Service and that you have read and understood our Privacy Policy.
              </p>
            </form>
          </div>              
        </section>
    </DefaultLayout>
  )
}

export default Signup