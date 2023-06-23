import React, { useState, memo } from "react";
import { Button, Select, Form, Input, DatePicker, notification } from "antd";
import dayjs from "dayjs";

import api from "../../../services/config";

const { RangePicker } = DatePicker;

const viewership = [
  {
    name: "Executive Management",
    type: "corporate",
  },
  {
    name: "All Employees",
    type: "all_employees",
  },
  {
    name: "Only Me",
    type: "personal",
  },
  {
    name: "Access List",
    type: "access_list",
  },
];

const AddEditKRIs = ({ 
  kriType=2,
  onComplete = () => {} 
}) => {
  const [form] = Form.useForm();

  const [loading, setloading] = useState(false);
  const [type, setType] = useState("date");

  const rangePresets = [
    {
      label: <div onClick={() => setType("date")}>Day</div>,
      value: dayjs(),
    },
    {
      label: <div onClick={() => setType("week")}>Weekly</div>,
      value: dayjs(),
    },
    {
      label: <div onClick={() => setType("month")}>Monthly</div>,
      value: dayjs(),
    },
    {
      label: <div onClick={() => setType("quarter")}>Quarterly</div>,
      value: dayjs(),
    },
    {
      label: <div onClick={() => setType("year")}>Annually</div>,
      value: dayjs(),
    },
  ];

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);

      const payload = {
        ...values,
        kri_type_id: kriType,
        target_date: values.target_date[1],
        comment: values.comment ?? values.viewer,
        approval_comment: 'N/A'
      };

      api
        .post("kri/create-kri", payload)
        .then((res) => {
            setloading(false);
            console.log('KRI create response:', res.data)

            if (res.data.status === 'success') {
              notification.success({ message: "KRI Created Successfully" });
              onComplete();
            } else {
              notification.error({
                message: (
                  <span className="capitalize">
                    {res?.response?.data?.status || "Failed"}
                  </span>
                ),
                description:
                  res?.response?.data?.message ||
                  "Error creating KRI, please try again or contact support.",
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
                "Error creating KRI, please try again or contact support.",
            });
          }
        )
        .catch((error) => {
          console.error("Error creating kri:", error);
          notification.error({
            message: (
              <span className="capitalize">
                {error?.response?.data?.status || "Failed"}
              </span>
            ),
            description:
              error?.response?.data?.message ||
              "Error creating KRI, please try again or contact support.",
          });
        });
    } catch (error) {
      console.error("Error creating kri", error);
    }
  };

  const PickerWithType = ({ type, onChange, className }) => {
    return (
      <RangePicker
        className={className}
        picker={type}
        onChange={onChange}
        presets={rangePresets}
      />
    );
  };

  console.log('Form values:', form.getFieldsValue())

  return (
    <Form
      form={form}
      className="w-full"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        className="w-full mb-2 pt-2"
        name="objective_title"
        label={
          <span className="block mb-2 text-base font-bold text-gray-700">
            Objective Title
          </span>
        }
        rules={[{ required: true, message: "Provide objective for this KRI" }]}
      >
        <Input
          name="objective"
          className="w-full px-3 py-3 mb-2 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title of what you want to achieve "
        />
      </Form.Item>

      <div className="mb-2 pt-2 md:flex md:justify-between">
        <Form.Item
          className="mb-2 w-1/2 md:mb-0 pr-4"
          name="viewer"
          label={
            <span className="block mb-2 text-base font-bold text-gray-700">
              Who can view this KRI
            </span>
          }
          rules={[{ required: true, message: "Select who can view this KRI" }]}
        >
          <Select
            className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder={kriType === 1 ? "Only me" : "Executive Management"}
            size="large"
            style={{ height: "43px" }}
          >
            {viewership.map((el, index) => (
              <Select.Option value={el.name} key={index}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>        

        <Form.Item
          className="w-1/2 pl-4"
          label={
            <span className="block mb-2 text-base font-bold text-gray-700">
              Target Date
            </span>
          }
          name="target_date"
          rules={[{ required: true, message: "Provide target date" }]}
        >
          <PickerWithType
            type={type}
            className="w-full px-3 py-2 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
            onChange={(value) => console.log(value)}
          />
        </Form.Item>
      </div>

      <div className="mb-2 pt-2 md:flex md:justify-between">
        <Form.Item 
          className="w-1/2 pr-4" 
          label={
            <span className="block mb-2 text-base font-bold text-gray-700">
              Comment
            </span>
          }
          name="comment"
        >
          <Input.TextArea
            rows={3}
            placeholder="Extra Notes"
            className="p-3 rounded text-gray-700 border border-primary/80 appearance-none focus:outline-none focus:shadow-outline"
          />
        </Form.Item>  
      </div>    

      {form.getFieldsValue()["viewer"] === 'personal' && (
        <div className="mb-2 pt-2 space-x-4 flex items-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
              fill="#5C5C5C"
            />
          </svg>
          <span>
            This KRI is only visible to you. <br />
            No other person in the team can view this.
          </span>
        </div>
      )}

      <div className="mb-2 pt-2 flex items-center justify-end">
        <Button
          type="primary"
          className="w-40 px-4 h-10 flex items-center justify-center font-bold text-white text-lg !bg-[#198754] rounded-lg focus:outline-none focus:shadow-outline"
          htmlType="submit"
          loading={loading}
        >
          Create
        </Button>
      </div>
    </Form>
  );
};

export default memo(AddEditKRIs);
