import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Select, Form, Input, DatePicker, notification } from 'antd'
import dayjs from 'dayjs';

import api from "../../../services/config"
import AppLayout from "../../../src/components/Layouts/appLayout";

import { useSelector } from "react-redux";

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

const CreateTask = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.profile);

  const [loading, setloading] = useState(false);
  const [type, setType] = useState("date");
  const [users, setusers] = useState([]);

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

  const getUsers = () => {
    api.get('/user/get-users')
    .then((response) => {
      setusers(response.data.message)
    }, (err) => {
      console.log('Error:', err);
    })
  }

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);  
      
      function formatDate(date) {
        if (date) return new Date(date)?.toDateString()?.slice(4,)
        else return ''
      }
      
      const payload = {
        ...values,
        assigned_by: profile?.id,
        target_date: values?.target_date[1]
      };
      
      api.post('/task/create-task', payload)
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
    console.log('Pathname:', router.query);
    getUsers()
  }, [])

  return (
    <AppLayout>
      <div className="w-full lg:w-10/12 ml-0 py-5 px-8">
        <h3 className="text-3xl font-bold">Create Task</h3>

        <Form 
          form={form}
          className="py-6 bg-white rounded"
          onFinish={onFinish}
          autoComplete="off"  
          layout="vertical"
        >
          <Form.Item 
            className="w-full sm:w-1/2 md:mb-0 pr-4 mb-4"
            name="task_name"
            label={
              <span
              className="block mb-2 text-base font-bold text-gray-700"
            >
              Task
            </span>
            }
            rules={[ {required: true, message: 'Provide objective for this task'}]}
          >
            <Input
              name="objective"
              className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Select Task to Assign to a team member or others"
            />
          </Form.Item>  

          <div className="mb-4 md:flex md:justify-between">
            <Form.Item className="mb-4 w-1/2 md:mb-0 pr-4" 
              name="assigned_to"
              label={
                <span className="block mb-2 text-base font-bold text-gray-700">
                  Who is this task for
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
                {users.map((el) => (
                  <Select.Option key={el.id} value={el.id}>{el.first_name} {el.last_name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="w-1/2 pl-4" 
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
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <Form.Item 
              className="mb-4 w-1/2 md:mb-0 pr-4"
              name="level_of_priority"
              label={
                <span
                  className="block mb-2 text-base font-bold text-gray-700"
                >
                  Level of Priority
                </span>
              }
              rules={[ {required: true, message: 'Select who can view this task'}]}
            >
              <Select 
                className="w-full h-10 text-base leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Select Priority"
                size="large"
                style={{ height: '43px' }}
              >
                {viewership.map((el, index) => (
                  <Select.Option key={index}>{el.name}</Select.Option>
                ))}
              </Select>              
            </Form.Item>
          </div>          

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

export default CreateTask;
