import React from "react";
import AppLayout from "../../../src/components/Layouts/appLayout";
import AuthHead from "../../../src/components/Misc/AuthHead";
import KRIItem from "../../../src/components/Misc/KRI-Item";

const CorporateKRIs = () => {
  const corporateKPIs = [
    {
      task: "Number of Projects on time and within Budget ",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Number_of_Projects"
    },
    {
      task: "Percentage of expected project benefits achieved",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Percentage_of_expected"
    },
    {
      task: "Percentage of projects using enterprise architecture services",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Percentage_of_projects"
    },
    {
      task: "Number of vulnerabilities discovered",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Number_of_vulnerabilities"
    },
    {
      task: "Frequency of programme/projects status reviews",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Frequency_of_programme"
    },
    {
      task: "Percentage of projects reviewed that meet target quality goals and objectives",
      timerange:  "Q3 - 2022",
      start: "Jul 01",
      end: "Sep 30",
      status: "Pending Approval",
      slug_id: "Percentage_of_projects"
    }
];

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />

        <div className="w-full pt-16 py-5 px-8">
          <h2 className="font-semibold text-xl">Corporate Key Risk Indicators</h2>

          <div className="pt-4">
            {corporateKPIs.map((el, index) => (
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

export default CorporateKRIs;
