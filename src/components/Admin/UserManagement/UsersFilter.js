import React from 'react'
import { Button, Select } from 'antd'
import ExportEntity from '@/components/Misc/ExportEntity';

const UsersFilter= ({ 
    filterTypes = [],
    handleClear = () => {}
}) => {
    return (
        <div className='w-full flex items-center justify-between'>
            <span className='font-medium text-lg'>Filter</span>

            <div className='inline-flex space-x-6'>
                {filterTypes?.map((el, index) => (
                    <Select
                        key={index}
                        className="!w-36 text-base leading-tight border border-gray-5 rounded-full"
                        placeholder={el.name}
                        style={{ height: "30px" }}
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
                        {el?.options?.map((el) => (
                            <Select.Option key={el.value} value={el.value}>
                                {el.name}
                            </Select.Option>
                        ))}
                    </Select>               
                ))}

                <Button type="text" className="text-gray-5 bg-slate-100 font-medium text-lg flex items-center"
                    onClick={() => handleClear()}
                >
                    Clear
                </Button>
            </div>

            <ExportEntity />
        </div>
    )
}

export default UsersFilter;
