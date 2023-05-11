import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Select, Form, Input, notification } from "antd";

import { useDispatch, useSelector } from "react-redux";

import api from "../../../services/config";
import AdminLayout from "../../../src/components/Layouts/adminLayout";

const NewUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const { departments } = useSelector((state) => state.departments); 
  const { roles } = useSelector((state) => state.general); 

  const [loading, setloading] = useState(false);


  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);

      const payload = {
        ...values
      };

      api
        .post("user/create-user", payload)
        .then(
          (res) => {
            setloading(false);

            if (res.data.status) {
              notification.success({ message: "Task Created Successfully" });
              router.push("/app/tasks");
            } else {
              notification.error({
                message: (
                  <span className="capitalize">
                    {res?.response?.data?.status || "Failed"}
                  </span>
                ),
                description:
                  res?.response?.data?.message ||
                  "Error creating Task, please try again or contact support.",
              });
            }
          },
          (error) => {
            setloading(false);
            notification.error({
              message: (
                <span className="capitalize">
                  {error?.response?.data?.status || "Failed"}
                </span>
              ),
              description:
                error?.response?.data?.message ||
                "Error creating Task, please try again or contact support.",
            });
          }
        )
        .catch((error) => {
          console.error("Error creating task:", error);
          notification.error({
            message: (
              <span className="capitalize">
                {error?.response?.data?.status || "Failed"}
              </span>
            ),
            description:
              error?.response?.data?.message ||
              "Error creating Task, please try again or contact support.",
          });
        });
    } catch (error) {
      console.error("Error creating task", error);
    }
  };


  return (
    <AdminLayout>
      <div className="w-full lg:w-9/12 py-10 px-6">
        <h3 className="text-3xl font-bold">Active User</h3>

        <Form
          form={form}
          className="pt-10 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-12"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
            <Form.Item
                className="w-full"
                name="id"
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    User ID
                </span>
                }
            >
                <Input
                name="risk_description"
                className="w-full px-3 py-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                readOnly
                placeholder="Auto Generated"
                />
            </Form.Item>

            <div className="w-full" />

            <Form.Item
                className="w-full"
                name="first_name"
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Firstname
                </span>
                }
            >
                <Input
                type="text"
                id="fname"
                name="fname"
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter First name"
                />
            </Form.Item>

            <Form.Item
                className="w-full"
                name="last_name"
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Lastname
                </span>
                }
            >
                <Input
                type="text"
                id="fname"
                name="fname"
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter Last name"
                />
            </Form.Item>

            <Form.Item
                className="w-full"
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Email Address
                </span>
                }
                name="email"
            >
                <Input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Email Address"
                />
            </Form.Item>
            <div className="w-full" />

            <div className="w-full pt-3 pb-6">
                <h2 className="block mb-2 text-base font-bold text-gray-700">Department Details</h2>
            </div>
            <div className="w-full" />

            <Form.Item
                className="w-full"
                name="manager"
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Manger
                </span>
                }
                rules={[{ required: true, message: "Provide risk response" }]}
            >
                <Input
                name="manager"
                className="w-full px-3 py-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Employee Manager's Name"
                />
            </Form.Item>
            <div className="w-full" />

            <Form.Item
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Department
                </span>
                }
                name="dept_name"
            >
                <Select
                className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Please Choose"
                size="large"
                style={{ height: "43px" }}
                suffixIcon={
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.1548 8.71582L0.495195 0.0468597H11.8144L6.1548 8.71582Z"
                        fill="#0883C7"
                    />
                    </svg>
                }
                >
                {departments.map((el) => (
                    <Select.Option key={el.id} value={el.id}>
                    {el.name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                    Job Title
                </span>
                }
                name="job_title"
            >
                <Select
                    name="job_title"
                    className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Please Choose"
                    size="large"
                    style={{ height: "43px" }}
                    suffixIcon={
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.1548 8.71582L0.495195 0.0468597H11.8144L6.1548 8.71582Z"
                            fill="#0883C7"
                        />
                        </svg>
                    }
                >
                {departments.map((el) => (
                    <Select.Option key={el.id} value={el.id}>
                    {el.name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>

            <div className="w-full pt-3 pb-6">
                <h2 className="block mb-2 text-base font-bold text-gray-700">Access Level</h2>
            </div>
            <div className="w-full" />  

            <Form.Item
                label={<span className="block mb-2 text-base font-bold text-gray-700">Role</span>}
                name="role_id"
            >
                <Select
                    className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Please Choose"
                    size="large"
                    style={{ height: "43px" }}
                    suffixIcon={
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.1548 8.71582L0.495195 0.0468597H11.8144L6.1548 8.71582Z"
                            fill="#0883C7"
                        />
                        </svg>
                    }
                >
                    {roles?.map((el) => (
                        <Select.Option key={el.id} value={el.id}>
                            {el.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <div className="w-full" />  

            <Form.Item
                className="w-full"
                name="proxy"
                label={<span className="block mb-2 text-base font-bold text-gray-700">Proxy Users/Backup</span>}
                rules={[{ required: true, message: "Provide proxy users" }]}
            >
                <Input
                    name="proxy_users"
                    className="w-full px-3 py-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter users"
                />
            </Form.Item>    

            <div className="flex items-end justify-end pt-10">
                <Button
                    type="primary"
                    className="w-40 px-4 h-10 flex items-center justify-center font-bold text-white text-lg !bg-primary rounded-lg focus:outline-none focus:shadow-outline"
                    htmlType="submit"
                    loading={loading}
                >
                    Create
                </Button>
            </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default NewUser;
