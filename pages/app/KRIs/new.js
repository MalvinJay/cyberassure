import { Button, Select, DatePicker } from "antd";
import React from "react";
import AppLayout from "../../../src/components/Layouts/appLayout";

const { RangePicker } = DatePicker;

const CreateKRI = () => {
  const rangePresets = [
    {
      label: 'Datepicker',
      value: <RangePicker picker="week" />
    },
    {
      label: 'Weekly',
      value: <RangePicker picker="week" />
    },
    {
      label: 'Monthly',
      value: <RangePicker picker="month" />,
    },
    {
      label: 'Quarterly',
      value: <RangePicker picker="quarter" />,
    },
    {
      label: 'Annually',
      value: <RangePicker picker="year" />,
    }
  ];

  const viewership = [
    {
      name: "Executive Management",
      type: "corporate"
    },
    {
      name: "All Employees",
      type: "corporate"
    },
    {
      name: "Only Me",
      type: "personal"
    },
    {
      name: "Access List",
      type: "corporate"
    },
  ]

  return (
    <AppLayout>
      <div className="w-full lg:w-10/12 ml-0 py-5 px-8">
        <h3 className="text-3xl font-bold">Create KRI</h3>

        <form className="py-6 bg-white rounded">
          <div className="">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              for="email"
            >
              Objective Title
            </label>
            <input
              className="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Title of what uyou want to achieve "
            />
          </div>  

          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 w-1/2 md:mb-0 pr-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="firstName"
              >
                Who is this objective for
              </label>
              <Select 
                className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Title of what uyou want to achieve"
                size="large"
                style={{ height: '43px' }}
              >
                <Select.Option value="personal">My personal objective</Select.Option>
                <Select.Option value="corporate">Corporate Key Risk Indicator</Select.Option>
              </Select>
            </div>

            <div className="w-1/2 pl-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="lastName"
              >
                Target Date
              </label>
              <RangePicker
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                presets={rangePresets}
              />
            </div>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 w-1/2 md:mb-0 pr-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="firstName"
              >
                Who can view this KRI
              </label>
              <Select 
                className="w-full h-10 text-sm leading-tight text-gray-700 border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Only me"
                size="large"
                style={{ height: '43px' }}
              >
                {viewership.map((el, index) => (
                  <Select.Option key={index}>{el.name}</Select.Option>
                ))}
              </Select>              
            </div>
          </div>          

          <div className="mb-4 md:flex md:items-center space-x-10">
            <Button type="text" className="border-none flex items-center space-x-4 p-0 hover:px-2 text-lg">
              <span>Add extra detials </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="#3789B4"/>
              </svg>
            </Button>

            <div className="space-x-4 flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z" fill="#5C5C5C"/>
              </svg>
              <span>
                This KRI is only visible to you. <br /> 
                No other person in the team can view this.
              </span>
            </div>
          </div>

          <div className="mb-4 text-end">
            <button
              className="w-40 px-4 py-2 font-bold text-white bg-[#198754] rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateKRI;
