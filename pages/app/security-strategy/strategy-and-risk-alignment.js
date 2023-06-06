import React, { useState, useEffect } from "react";
import Image from "next/image";
import AppLayout from "@/components/Layouts/appLayout";
import AuthHead from "@/components/Misc/AuthHead";

import RegisterTable from "@/components/Misc/KRITable";
import api from "../../../services/config";

const StrategyAndRiskAlignment = () => {

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

            <h2 className="font-bold text-2xl ">Strategy & Risk Alignment</h2>

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

export default StrategyAndRiskAlignment;
