import React from "react";
import AppLayout from "../../../src/components/Layouts/appLayout";
import AuthHead from "../../../src/components/Misc/AuthHead";
import KRIItem from "../../../src/components/Misc/KRI-Item";

const MyKRIs = () => {
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
        <AuthHead />

        <div className="w-full pt-16 py-5 px-8">
          <h2 className="font-semibold text-xl">Personal Key Risk Indicators</h2>

          <div className="pt-4">
            {personalKPIs.map((el, index) => (
              <KRIItem 
                key={index}
                {...el}
              />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default MyKRIs;
