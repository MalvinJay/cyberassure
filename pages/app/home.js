import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from 'antd';

import AppLayout from "@/components/Layouts/appLayout";
import AuthHead from "@/components/Misc/AuthHead";
import ChartComponent from "@/components/Misc/ChartComponent";

import { useSelector } from "react-redux";

const Dashboard = () => {
  // const [securedScore, setsecuredScore] = useState(0);
  // const [change, setchange] = useState(0);
  const { defaultView } = useSelector((state) => state.general);

  const LegendComp = ({ color, label}) => (
    <div className="flex items-center gap-4">
      <div className={`w-4 h-4 ${color}`}></div>
      <p className="m-0">{label}</p>
    </div>
  );

  const legends = [
    {
      label: "65% Secure",
      color: "bg-[#F4BE37]"
    },
    {
      label: "35% Not Completed",
      color: "bg-[#f0f0f0]"
    },
  ];
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, []);
  
  return (
    <AppLayout>
      <section className="relative w-full">
        <AuthHead />

        <div className="w-full flex items-start flex-wrap p-5">
          <div className="md:w-1/3">
            <div className="py-8 px-6 space-y-6 rounded-xl bg-default-2 shadow-xl h-screen flex justify-center items-center">
              <div className="text-center font-medium">
                <p className="pb-4 text-4xl text-primary">Orgposture </p>
                <p className="pt-3 text-2xl">Secure Score</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 pl-6">
            <div className="h-full px-6">
              <h2 className="text-primary text-lg font-medium">Enterprise Secure Score</h2>

              <div className="pt-5">
                <h3 className="font-bold text-base">Overview</h3>
                <p className="">Orgposture provides a representation of your oganization’s overall security posture in line with security frameworks such as COBIT, NIST, ISO 27001, ISO 9001, ISO 22301, ISO 31000 etc. Orgposture provides an opportunity to improve with actions in line with cyber and information security risk management and business strategy.</p>
              </div>

              <div className="pt-5">
                <h3 className="font-bold text-base">Metrics and Trends </h3>
                <p className="">Get an deep dive into your security posture through several graphs and charts to give you more visibility into trends and set key goal and risk indicators. You can set the date range for the whole page of visualizations.</p>
              </div>
            </div>

            <div className="py-6 px-6 flex items-start">
              <div>
                <div className="flex items-center">
                  <Progress 
                    type="circle" 
                    percent={65}
                    width={183}
                    strokeWidth={15}
                    strokeLinecap="square"
                    strokeColor="#F4BE37"
                  />
                  <span className="text-4xl font-bold pl-4">+5</span>
                </div>
                <div className="flex flex-col gap-1 pt-10">
                  {legends?.map((el, index) => (
                    <LegendComp color={el.color} label={el.label} key={index} />
                  ))}

                </div>
              </div>

              <div className="ml-4 ">
                <Image src="/assets/images/KRIs.png" width={378} height={200} className="object-cover" alt="kris" />
              </div>
            </div>
          </div>
        </div>

        {!defaultView && (
          <div className="w-full flex justify-end px-5 pb-10">
            <div className="md:w-5/12">
              <div className="">
                <ChartComponent />
              </div>
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default Dashboard;
