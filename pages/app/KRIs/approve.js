import { Button } from "antd";
import React, { useState } from "react";
import AppLayout from "../../../src/components/Layouts/appLayout";
import AddComment from "../../../src/components/Misc/AddComment";
import AuthHead from "../../../src/components/Misc/AuthHead";
import KRIItem from "../../../src/components/Misc/KRI-Item";

const KRIApproval = () => {
    const [current, setcurrent] = useState(2);

    const departments = [
        {
            id: 1,
            name: "ENTERPRISE SECURITY POSTURE"
        },
        {
            id: 2,
            name: "PMO"
        },
        {
            id: 3,
            name: "CYBERSECURITY"
        },
        {
            id: 4,
            name: "INFORMATION TECH"
        },
        {
            id: 5,
            name: "HUMAN RESOURCE"
        },
        {
            id: 6,
            name: " AUDIT"
        },
        {
            id: 7,
            name: "PROJECT MGT"
        },
    ];

    const personalKPIs = [
        {
          task: "Complete personal tasks within 4 hours",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Complete_personal"
        },
        {
          task: "Implement Dashboard for Enterprise architecture",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Implement_Dashboard"
        },
        {
          task: "Review projects for Software Centre ",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Review_projects"
        },
        {
          task: "Develop fraud management solution",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Develop_fraud"
        },
        {
          task: "Attend design forum",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Attend_design"
        },
        {
          task: "Number of Projects on time and within Budget",
          timerange:  "Q3 - 2022",
          start: "Jul 01",
          end: "Sep 30",
          status: "",
          slug_id: "Number_of_Projects"
        }
    ];    

  return (
    <AppLayout>
      <section className="relative">
        <div className="fixed z-10 overflow-y-hidden py-4 bg-white flex items-center">
            {departments.map((el) => (
                <div 
                    key={el.id}
                    className={`uppercase text-white  px-4 py-2 text-sm font-semibold mr-4 shadow-inner cursor-pointer
                    ${current === el.id ? 'bg-[#03314A]' : 'bg-primary'}`}
                    style={{ boxShadow: 'inset 0px 2.7421px 2.7421px rgba(0, 0, 0, 0.25)' }}
                    onClick={() => setcurrent(el.id)}
                >
                    {el.name}
                </div>
            ))}
        </div>

        <div className="fixed" style={{ top: '8.2rem'}}>
            <AuthHead />
        </div>

        <div className="w-full pt-40 pb-20 px-8">
            <div className="w-full sm:w-1/2 lg:w-1/3 font-semibold text-xl bg-primary text-white p-2 text-center"
                style={{ boxShadow: 'inset 0px 2.7421px 2.7421px rgba(0, 0, 0, 0.25)' }}
            >
                Approvals
            </div>    
            
            {/* <h2 className="font-semibold text-xl">Personal Key Risk Indicators</h2> */}

            <div className="pt-4">
                {personalKPIs.map((el, index) => (
                    <KRIItem
                        key={index}
                        showTime={false}
                        {...el}
                    />
                ))}
            </div>  

            <section className="w-full flex items-end">
                <AddComment />

                <div className="w-full md:w-1/2 md:pl-10 space-x-6">
                    <Button type="primary" size="large" className="bg-[#198754] text-white w-auto md:w-2/5">
                        Approve
                    </Button>
                    <Button type="primary" size="large" className="bg-danger text-white w-auto md:w-2/5">
                        Decline
                    </Button>
                </div>
            </section>
        </div>
      </section>
    </AppLayout>
  );
};

export default KRIApproval;
