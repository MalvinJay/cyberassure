import React, { useState } from "react";
import Image from "next/image";
import { Button, Progress } from 'antd';

import AppLayout from "../../src/components/Layouts/appLayout";
import AuthHead from "../../src/components/Misc/AuthHead";
import DashboardFilter from "../../src/components/Misc/DashboardHead";
import SRHighlists from "../../src/components/Misc/SRHighlists";
import ChartComponent from "../../src/components/Misc/ChartComponent";
import AddComment from "../../src/components/Misc/AddComment";

const Dashboard = () => {
  const [defaultView] = useState(false);
  const [securedScore, setsecuredScore] = useState(0);
  const [change, setchange] = useState('-5');
  
  return (
    <AppLayout>
      <section className="relative w-full">
        <AuthHead />
        <DashboardFilter />

        <div className="w-full flex items-start flex-wrap pt-32 p-5">
          <div className="md:w-5/12">
            {defaultView ? 
              <div className="py-8 px-6 space-y-6 rounded-xl bg-default-2 h-screen flex justify-center items-center">
                <div className="text-center font-medium">
                  <p className="pb-4 text-4xl text-primary">Orgposture </p>
                  <p className="pt-3 text-2xl">Secure Score</p>
                </div>
              </div>
            :
              <section>
                <div className="p-6 pt-2 bg-[#CDCDCD]/20 drop-shadow-cs">
                  <h2 className="font-bold text-lg text-center">Secured Score</h2>
                  <div className="flex items-center justify-center pt-2">
                    <Progress 
                      type="circle"
                      percent={securedScore}
                      width={200}
                      strokeWidth={10}
                      strokeLinecap="square"
                      trailColor={securedScore < 30 ? '#FE0D0D' : '#F4BE37'}
                      strokeColor="#F4BE37"
                    />
                    <span className="text-4xl font-bold pl-4">{change}</span>
                  </div>
                </div>
                <p className="font-bold text-sm py-4 text-center">Last updated: Feb 20, 10:11am</p>
              </section>
            }
          </div>
          
          <div className="md:w-7/12 pl-6">
            {defaultView ? 
              <>
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

                  <div className="ml-4 ">
                    <Image src="/assets/images/KRIs.png" width={378} height={200} className="object-cover" alt="kris" />
                  </div>
                </div>
              </>
            :
              <>
                <SRHighlists />

                <div className="min-w-32 flex justify-end mt-4">
                  <Button 
                    href={`/app/KRIs/update/innovare`} 
                    type="primary" 
                    shape="default" 
                    className="bg-primary text-white px-16 rounded-none font-bold text-base flex items-center"
                  >
                    Update KRI
                  </Button>
              </div>
              </>
            }
          </div>
        </div>

        <div className="w-full flex items-start flex-wrap px-5 pb-10">
          <div className="md:w-5/12">
            <div className="h-[40vh]">
              <ChartComponent />
            </div>
          </div>
          <div className="md:w-7/12 pl-5">
            <AddComment width="w-full" rows={5} />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
