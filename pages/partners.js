import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/defaultLayout";
import { Button, Checkbox, Select } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Partners = () => {
  const [loading, setloading] = useState(false);
  return (
    <div className="">
      <Head>
        <title>OrgPosture | Partners</title>
        <meta name="description" content="Manage your organization" />
        <link rel="icon" href="logo.svg" />
      </Head>

      <DefaultLayout>
        <main className="w-full bg-white dark:bg-gray-900">
          <div className="relative min-h-[65vh]">
            <Image
              className="object-cover w-full h-full"
              fill
              data-aos="fade-zoom-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="2000"
              src="/assets/images/partners.png"
              alt="mockup"
            />
          </div>

          <div className="max-w-screen-xl mx-auto px-4 md:px-10 md:py-10 lg:py-16">
            <div className="" data-aos="fade-up" data-aos-duration="800">
              <p className="font-semibold leading-loose text-2xl text-center pb-10 mx-auto">
                <span>
                  All our products and services seeks to serve one purpose
                </span>
                <br />
                <span className="text-primary dark:text-white">
                  - Deliver value to customers through security investment -
                </span>
                <br />
                <span>
                  We are stronger together when we join forces as we become the
                  trusted cyber and information security service provider.
                </span>
              </p>
              <div className="w-full mx-auto flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="text-white bg-primary dark:bg-white dark:text-black"
                >
                  <span className="text-lg -mt-1">Become a Partner</span>
                </Button>
              </div>
            </div>

            <div className="w-full sm:w-8/12 mx-auto pt-10">
              <div className="pl-10">
                <h3 className="text-2xl text-primary dark:text-white font-semibold">
                  Get Started Today
                </h3>
              </div>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5">
                <div className="w-full">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="First name"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Last name"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Email"
                  />
                </div>
                <div />

                <div className="w-full">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Company Name"
                  />
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="w-full h-12 rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Country"
                  />
                </div>
                <div />
                <div className="w-full">
                  <textarea
                    type="text"
                    id="lname"
                    name="lname"
                    rows={5}
                    className="w-full rounded-lg border border-gray-1 focus:border-primary focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="message"
                  />
                </div>
                <div />

                <div className="pb-4">
                  <button
                    className="w-full sm:w-auto sm:px-4 lg:px-6 h-10 text-white bg-primary rounded-lg border-0 py-2 focus:outline-none hover:bg-primary/90 text-lg flex justify-between items-center"
                    onClick={(e) => handleAuth(e)}
                  >
                    <span>Submit</span>

                    {loading ? (
                      <svg
                        className="animate-spin ml-4 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="ml-4"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="pt-5 text-black">
                    <Checkbox className="border-black">
                      <span className="pl-2">
                        I agree to receive communication from OrgPosture
                      </span>
                    </Checkbox>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </div>
  );
};

export default Partners;
