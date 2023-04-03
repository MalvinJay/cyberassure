import React, { useEffect } from "react";
import AppLayout from "../../../src/components/Layouts/appLayout";
import AuthHead from "../../../src/components/Misc/AuthHead";
import KRIItem from "../../../src/components/Misc/KRI-Item";

import { useDispatch, useSelector } from "react-redux";
import api from "../../../services/config";
import { setKris } from "redux/features/krisSlice";

const AllKRIs = () => {
    const dispatch = useDispatch(); 
    const { list } = useSelector((state) => state.kris);

    const personalKPIs = [
        // {
        //   task: "Complete personal tasks within 4 hours",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Complete_personal"
        // },
        // {
        //   task: "Implement Dashboard for Enterprise architecture",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Implement_Dashboard"
        // },
        // {
        //   task: "Review projects for Software Centre ",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Review_projects"
        // },
        // {
        //   task: "Develop fraud management solution",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Develop_fraud"
        // },
        // {
        //   task: "Attend design forum",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Attend_design"
        // },
        // {
        //   task: "Number of Projects on time and within Budget",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Number_of_Projects"
        // }
    ];

    const corporateKPIs = [
        // {
        //   task: "Number of Projects on time and within Budget ",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Number_of_Projects"
        // },
        // {
        //   task: "Percentage of expected project benefits achieved",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Percentage_of_expected"
        // },
        // {
        //   task: "Percentage of projects using enterprise architecture services",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Percentage_of_projects"
        // },
        // {
        //   task: "Number of vulnerabilities discovered",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Number_of_vulnerabilities"
        // },
        // {
        //   task: "Frequency of programme/projects status reviews",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Frequency_of_programme"
        // },
        // {
        //   task: "Percentage of projects reviewed that meet target quality goals and objectives",
        //   timerange:  "Q3 - 2022",
        //   start: "Jul 01",
        //   end: "Sep 30",
        //   status: "Pending Approval",
        //   slug_id: "Percentage_of_projects"
        // }
    ];    

    const getKRIs = async () => {
      api.get('/kri/get-kris')
      .then((res) => {
        dispatch(setKris(res?.data?.message))
      }, (err) => {
        console.error('Error fetching kris:', err)
      })
      .catch(error => {
        if (error.response.status !== 409) throw error;
      })
    }   
    
    useEffect(() => {
      getKRIs()
    }, []);
    

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />

        <div className="pt-20 py-5 px-8">
            <span className="font-semibold text-xl bg-primary text-white rounded-lg p-2">
                Personal Key Risk Indicators
            </span>

            <div className="my-4">
                {list?.length > 0 ?
                  list?.map((el, index) => (
                  <KRIItem
                    key={index}
                    {...el}
                  />
                  ))
                  :
                  <div className="p-10 text-center">
                    No KRIs available
                  </div>
                }
            </div>

            <span className="font-semibold text-xl bg-primary text-white rounded-lg p-2">
                Corporate Key Risk Indicators
            </span>          

            <div className="pt-4">
                {corporateKPIs.length > 0 ?
                  corporateKPIs.map((el, index) => (
                    <KRIItem
                      key={index}
                      {...el}
                    />
                  ))
                :
                  <div className="p-10 text-center">
                    No KRIs available
                  </div>
                }
            </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default AllKRIs;
