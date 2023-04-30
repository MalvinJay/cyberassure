import React, { useState } from "react";
import { Button, Select, Form, Input, notification } from "antd";
import api from "../../../../services/config";

const BusinessInfo = () => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);

  const formItems = [
    {
      name: "Business Name",
      fieldName: "business_name",
      type: "text",
    },
    {
      name: "Business Location",
      fieldName: "business_location",
      type: "text",
    },
    {
      name: "Time Zone",
      fieldName: "time_zone",
      type: "select",
      options: [
        {
          name: "GMT",
          val: "gmt",
        },
      ],
    },
    {
      name: "Phone",
      fieldName: "phone",
      type: "text",
    },
    {
      name: "Address",
      fieldName: "address",
      type: "text",
    },
    {
      name: "Country",
      fieldName: "country",
      type: "select",
      options: [
        {
          name: "Ghana",
          code: "gh",
        },
      ],
    },
    {
      name: "Zip Code",
      fieldName: "zip_code",
      type: "text",
    },
    {
      name: "City",
      fieldName: "city",
      type: "select",
      options: [
        {
          name: "Accra",
          code: "Accra",
        },
      ],
    },
    {
      name: "State",
      fieldName: "state",
      type: "select",
      options: [
        {
          name: "Greater Accra",
          code: "Accra",
        },
      ],
    },
  ];

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);

      const payload = {
        ...values,
        assigned_by: profile?.id,
        target_date: values?.target_date[1],
      };

      api
        .post("/task/create-task", payload)
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
    <Form
      form={form}
      className="py-6"
      onFinish={onFinish}
      autoComplete="off"
      layout="horizontal"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 business--info">
        {formItems.map((item) => (
          <Form.Item
            key={item.fieldName}
            className="w-full mb-0"
            name="task_name"
            label={
              <span className="block text-base font-bold text-gray-700">
                {item.name}
              </span>
            }
            rules={[
              {
                required: item.required || false,
                message: `${item.name} is required`,
              },
            ]}
          >
            {item.type === "text" && (
              <Input
                name="business name"
                className="w-80 px-3 py-2 text-base leading-tight border-none focus:outline-none focus:shadow-none rounded-none bg-gray-2"
                type="text"
              />
            )}

            {item.type === "select" && (
              <Select
                className="!w-80 text-base leading-tight bg-gray-2 appearance-none focus:outline-none focus:shadow-outline"
                // placeholder={`Select ${item.name}`}
                size="large"
                style={{ height: "36px" }}
                bordered={false}
                suffixIcon={
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.1548 8.71582L0.495195 0.0468597H11.8144L6.1548 8.71582Z"
                        fill="#0883C7"
                      />
                    </svg>
                  }
              >
                {item?.options?.map((el) => (
                  <Select.Option key={el.value} value={el.value}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ))}
      </div>

      <div className="mt-10 mb-4 flex items-center justify-end">
        <Button
          type="primary"
          className="w-40 px-2 h-10 flex items-center justify-center font-bold text-black text-lg !bg-gray-2 shadow-inner rounded-none focus:outline-none"
          htmlType="submit"
        >
          Cancel
        </Button>

        <Button
          type="primary"
          className="w-40 px-2 h-10 flex items-center justify-center font-bold text-white text-lg !bg-primary shadow-inner rounded-none focus:outline-none"
          htmlType="submit"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default BusinessInfo;
