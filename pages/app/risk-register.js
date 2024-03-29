import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Drawer } from "antd";
import api from "../../services/config";

import AppLayout from "@/components/Layouts/appLayout";

const AuthHead = dynamic(() => import("@/components/Misc/AuthHead"))
const DashboardFilter = dynamic(() => import("@/components/Misc/DashboardHead"))
const ExportEntity = dynamic(() => import("@/components/Misc/ExportEntity"))
const RegisterTable = dynamic(() => import("@/components/Misc/KRITable"))
const AddEditRiskRegister = dynamic(() => import("@/components/RiskRegister/AddEditRiskRegister"))

const RiskRegister = () => {
  const columns = [
    {
      title: "Risk Description ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Linked KRI",
      dataIndex: "linked_kri",
      key: "linked_kri",
    },
    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Risk Level",
      dataIndex: "risk_level",
      key: "risk_level",
    },
    {
      title: "Risk Response",
      dataIndex: "risk_response",
      key: "risk_response",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Risk Owner",
      dataIndex: "risk_owner",
      key: "risk_owner",
    },
    {
      title: "Target Date",
      dataIndex: "target_date",
      key: "target_date",
    },
  ];

  const [open, setOpen] = useState(false);
  const [dataSource, setList] = useState([
    {
      description: "A vulnerable CRM Application Server on the internet",
      linked_kri: "Number of vulnerabilities",
      risk: "Denial of Service",
      risk_level: "High",
      risk_response: "Disconnect Server from Internet",
      status: "Open",
      risk_owner: "COO",
      target_date: "upload file",
    }
  ]);

  const fetchRiskRegisters = async (filters={}) => {
    // setloading(true);
    api.get('/task/get-risks')
    .then((res) => {
      // setloading(false);
      console.log('risks:', res.data)
      // const list = res?.data?.message?.map((el) => {
      //   return {
      //     tasks: el.task_name,
      //     assigned_by: el.assigned_by,
      //     assigned_to: el.id,
      //     level_of_priority: el.level_of_priority,
      //     due_ate: formatDate(el?.target_date)
      //   }
      // })
      // setList(list)
    }, () => {
      // setloading(false);
    })
  };  

  const onClose = useCallback(() => {
    setOpen(false);
  }, [])  

  useEffect(() => {
    fetchRiskRegisters();
  }, [])

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />
        <DashboardFilter />

        <div className="w-full pt-14 pb-20 px-8">
          <div className="flex justify-between items-center">
            <button className="text-white bg-primary rounded-lg border-0 py-1 px-4 focus:outline-none hover:bg-primary/90 text-lg space-x-4 inline-flex items-center leading-tight"
              onClick={() => setOpen(true)}
            >
              <span>Create Risk <br /> Register</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                  fill="white"
                />
              </svg>
            </button>

            <h2 className="font-bold text-2xl ">Risk Register</h2>

            <ExportEntity name="Import CSV" />
          </div>

          <div className="py-10">
            <RegisterTable 
              bordered={false}
              customClass="risk-register" 
              columns={columns}
              dataSource={dataSource}
              addRecord={false}
            />
          </div>
        </div>

        <Drawer width={670} title={<h3 className="text-3xl font-bold">Create Risk Register</h3>} placement="right" onClose={onClose} open={open}>
          <AddEditRiskRegister kriType={2} onComplete={onClose} />
        </Drawer>        
      </section>
    </AppLayout>
  );
};

export default RiskRegister;
