import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateFilter = ({
    setType=()=>{}
}) => {
  return (
    <div className="space-x-5 flex">
      <div className="inline-flex items-center">
        <span className="text-[#878787] font-bold">Month</span>
        <div className="flex items-center pl-2">
          <DatePicker
            picker="month"
            defaultValue={dayjs(new Date())}
            bordered={false}
            format="MMMM"
            className="p-0 cursor-pointer min-w-12 max-w-[5.55rem] !text-xl font-bold"
            allowClear={false}
            onChange={setType}
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
          />
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-[#878787] font-bold">Year</span>
        <div className="flex items-center pl-2">
          <DatePicker
            picker="year"
            defaultValue={dayjs(new Date())}
            bordered={false}
            format="YYYY"
            className="p-0 cursor-pointer w-14 !text-xl font-bold"
            allowClear={false}
            onChange={setType}
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
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
