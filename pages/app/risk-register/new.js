import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Select, Form, Input, DatePicker, notification } from 'antd'
import dayjs from 'dayjs';

import { useDispatch, useSelector } from "react-redux";
import { getKRIs } from "redux/features/krisSlice";

import api from "../../../services/config"
import AppLayout from "../../../src/components/Layouts/appLayout";

const { RangePicker } = DatePicker;

const viewership = [
  {
    name: "High",
    value: "high"
  },
  {
    name: "Medium",
    value: "medium"
  },
  {
    name: "Low",
    value: "low"
  }
];

const CreateRiskRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const { profile } = useSelector((state) => state.profile);
  const { list } = useSelector((state) => state.kris);

  const [loading, setloading] = useState(false);
  const [type, setType] = useState("date");

  const rangePresets = [
    {
      label: <div onClick={() => setType('date')}>Day</div>,
      value: dayjs()
    },
    {
      label: <div onClick={() => setType('week')}>Weekly</div>,
      value: dayjs()
    },
    {
      label: <div onClick={() => setType('month')}>Monthly</div>,
      value: dayjs()
    },
    {
      label: <div onClick={() => setType('quarter')}>Quarterly</div>,
      value: dayjs()
    },
    {
      label: <div onClick={() => setType('year')}>Annually</div>,
      value: dayjs()
    }
  ];

  const getUKRIs = () => {
    dispatch(getKRIs())
  }

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);
      
      const payload = {
        ...values,
        target_date: values?.target_date[1]
      };
      
      api.post('task/create-risk', payload)
      .then((res) => {
        setloading(false);

        if (res.data.status) {
          notification.success({ message: "Task Created Successfully" });
          router.push('/app/tasks');
        } else {
          notification.error({ 
            message: <span className="capitalize">{res?.response?.data?.status || 'Failed'}</span>,
            description: res?.response?.data?.message || 'Error creating Task, please try again or contact support.',
          })
        }
      }, (error) => {
        setloading(false);
        notification.error({ 
          message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
          description: error?.response?.data?.message || 'Error creating Task, please try again or contact support.',
        })
      })
      .catch((error) => {
        console.error('Error creating task:', error)
        notification.error({ 
          message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
          description: error?.response?.data?.message || 'Error creating Task, please try again or contact support.',
        })
      })
    } catch (error) {
      console.error('Error creating task', error);
    }
  }; 
  
  const PickerWithType = ({ type, onChange, className }) => {
    return <RangePicker className={className} picker={type} onChange={onChange} presets={rangePresets} />
  };  

  useEffect(() => {
    getUKRIs()
  }, [])

  return (
    <AppLayout>
      <div className="w-full lg:w-10/12 ml-0 py-5 px-8">
        <h3 className="text-3xl font-bold">Create Risk Register</h3>

        <Form 
          form={form}
          className="py-6 bg-white rounded"
          onFinish={onFinish}
          autoComplete="off"  
          layout="vertical"
        >
          <div className="mb-4 md:flex md:justify-between">
            <Form.Item 
              className="w-full sm:w-1/2 md:mb-0 pr-4 mb-4"
              name="risk_description"
              label={
                <span
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Risk Description
              </span>
              }
              rules={[ {required: true, message: 'Provide description for this risk register'}]}
            >
              <Input
                name="risk_description"
                className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Select Task to Assign to a team member or others"
              />
            </Form.Item>  

            <Form.Item className="mb-4 w-1/2 md:mb-0 pr-4" 
              name="linked_kri"
              label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                  Linked KRI
                </span>
              }
              rules={[ {required: true, message: 'Provide target audience'}]}
            >
              <Select 
                className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Select team member"
                size="large"
                style={{ height: '43px' }}
              >
                {list.map((el) => (
                  <Select.Option key={el.id} value={el.id}>{el.objective_title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <Form.Item 
              className="w-full sm:w-1/2 md:mb-0 pr-4 mb-4"
              name="risk"
              label={
                <span className="block mb-2 text-base font-bold text-gray-700">Risk Type</span>
              }
              rules={[ {required: true, message: 'Provide objective for this task'}]}
            >
              <Input
                name="risk"
                className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Risk Type"
              />
            </Form.Item>

            <Form.Item 
              className="mb-4 w-1/2 md:mb-0 pr-4"
              name="risk_level"
              label={<span className="block mb-2 text-base font-bold text-gray-700">Risk Level</span>}
              rules={[ {required: true, message: 'Select risk level'}]}
            >
              <Select 
                className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Select risk level"
                size="large"
                style={{ height: '43px' }}
              >
                {viewership.map((el, index) => (
                  <Select.Option key={index} value={el.name}>{el.name}</Select.Option>
                ))}
              </Select>              
            </Form.Item>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <Form.Item 
              className="w-full sm:w-1/2 md:mb-0 pr-4 mb-4"
              name="risk_response"
              label={
                <span
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Risk Response
              </span>
              }
              rules={[ {required: true, message: 'Provide risk response'}]}
            >
              <Input
                name="risk_response"
                className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Risk response"
              />
            </Form.Item>      
                  
            <Form.Item 
              className="w-full sm:w-1/2 md:mb-0 pr-4 mb-4"
              name="risk_treatment_option"
              label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                  Risk Treatment Option
                </span>
              }
              rules={[ {required: true, message: 'Provide treatment option'}]}
            >
              <Input
                name="risk_treatment_option"
                className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Risk response"
              />
            </Form.Item>                   
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <Form.Item 
              className="mb-4 w-1/2 md:mb-0 pr-4"
              name="status"
              label={<span className="block mb-2 text-base font-bold text-gray-700">Status</span>}
              rules={[ {required: true, message: 'Status'}]}
            >
              <Select 
                className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Select Priority"
                size="large"
                style={{ height: '43px' }}
              >
                <Select.Option key="open" value="open">Open</Select.Option>
                <Select.Option key="close" value="closed">Closed</Select.Option>
              </Select>              
            </Form.Item>  

            <Form.Item 
              className="mb-4 w-1/2 md:mb-0 pr-4"
              name="risk_owner"
              label={<span className="block mb-2 text-base font-bold text-gray-700">Risk Owner</span>}
              rules={[ {required: true, message: 'Select who owns this risk'}]}
            >
              <Select 
                className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Select Priority"
                size="large"
                style={{ height: '43px' }}
              >
                <Select.Option key="coo" value="coo">COO</Select.Option>
                <Select.Option key="project_manager" value="project_manager">Project Manager</Select.Option>
                <Select.Option key="risk_manager" value="risk_manager">Risk Manager</Select.Option>
              </Select>              
            </Form.Item>
          </div>

          <Form.Item className="w-1/2 pr-4" 
            label={<span className="block mb-2 text-base font-bold text-gray-700">Target Date</span>}
            name="target_date"
            rules={[ {required: true, message: 'Provide target date'}]}
          >
            <PickerWithType 
              type={type}
              className="w-full px-3 py-2 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
              onChange={(value) => console.log(value)}
            />
          </Form.Item>     

          <div className="mb-4 flex items-center justify-end">
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
      </div>
    </AppLayout>
  );
};

export default CreateRiskRegister;
