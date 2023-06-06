import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "antd";

import AppLayout from "@/components/Layouts/appLayout";
import AuthHead from "@/components/Misc/AuthHead";
import DashboardFilter from "@/components/Misc/DashboardHead";

import ExportEntity from "@/components/Misc/ExportEntity";
import RegisterTable from "@/components/Misc/KRITable";
import api from "../../services/config";
import Image from "next/image";

const SecurityStrategy = () => {

  const columns = [
    {
      title: "Security Plan Area",
      dataIndex: "plan_area",
      key: "plan_area",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Strategy ID",
      dataIndex: "strategy_id",
      key: "strategy_id",
    },
    {
      title: "Unit owner",
      dataIndex: "unit_owner",
      key: "unit_owner",
    },
    {
      title: "Initiative / Key Result",
      dataIndex: "initiative_Key_result",
      key: "initiative_Key_result",
    },
    {
      title: "Start by",
      dataIndex: "start_by",
      key: "start_by",
    },
    {
      title: "Delivered by",
      dataIndex: "delivered_by",
      key: "delivered_by",
    }
  ];

  const [dataSource, setList] = useState([
    {
      plan_area: "Identify",
      category: "Asset Management",
      strategy_id: "ID-001",
      unit_owner: "Cybersecurity",
      initiative_Key_result: "Establish and maintain an Ericsson wide software inventory",
      start_by: "Q1 - 2023",
      delivered_by: "Q4 - 2023",
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

  useEffect(() => {
    fetchRiskRegisters();
  }, [])

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />
        {/* <DashboardFilter /> */}

        <div className="w-full pt-6 pb-20 px-8">
          <div className="flex justify-between items-center">
            {/* <Link href="/app/risk-register/new">
              <button className="text-white bg-primary rounded-lg border-0 py-1 px-4 focus:outline-none hover:bg-primary/90 text-lg space-x-4 inline-flex items-center leading-tight">
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
            </Link> */}

            <h2 className="font-bold text-2xl ">Cybersecurity Strategy and Tactical Plan</h2>

            {/* <ExportEntity name="Import CSV" /> */}
          </div>

          <div>
            <div className="py-10 flex items-start gap-2">
              <RegisterTable 
                bordered={false}
                customClass="risk-register"
                columns={columns}
                dataSource={dataSource}
                addRecord={false}
              />
              
              <div className="mt-4">
                <Image width={19} height={19} className="cursor-pointer" src="/assets/images/edit_table.svg" alt="edit_table" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default SecurityStrategy;
