import React from "react";
import Link from "next/link";
import { Button } from "antd";

import AppLayout from "@/components/Layouts/appLayout";
import AuthHead from "@/components/Misc/AuthHead";
import DashboardFilter from "@/components/Misc/DashboardHead";

import ExportEntity from "@/components/Misc/ExportEntity";
import RegisterTable from "@/components/Misc/KRITable";

const MyTask = () => {
  const columns = [
    {
      title: "Tasks ",
      dataIndex: "tasks",
      key: "tasks",
    },
    {
      title: "Assigned By",
      dataIndex: "assigned_by",
      key: "assigned_by",
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
    },
    {
      title: "Level of Priority ",
      dataIndex: "level_of_priority",
      key: "level_of_priority",
    },
    {
      title: "Due Date ",
      dataIndex: "due_ate",
      key: "due_ate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    }
  ];

  const dataSource = [
    {
      tasks: "",
      assigned_by: "",
      assigned_to: "",
      level_of_priority: "",
      due_ate: "",
      status: ""
    }
  ];

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />
        <DashboardFilter />

        <div className="w-full pt-32 pb-20 px-8">
          <div className="">
            <Link href="/app/tasks/new">
              <button className="h-10 text-white bg-primary rounded-lg border-0 py-2 px-4 focus:outline-none hover:bg-primary/90 text-lg space-x-4 inline-flex items-center">
                <span>Create Task</span>
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
            </Link>
          </div>

          <div>
            <div className="py-10">
              <RegisterTable 
                bordered={false}
                customClass="" 
                columns={columns}
                dataSource={dataSource}
              />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default MyTask;
