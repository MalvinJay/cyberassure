'use client';

import React, { memo } from 'react'
import { Table, Progress } from 'antd'
import { useRouter } from 'next/router';
// import { useRequest } from '../../../hooks/useRequest';

const SRHighlists = ({ kris=[] }) => {
    const router = useRouter();

    const columns = [
        {
          title: 'ID',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Key Risk Indicator',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (record) =>  <Progress className="w-32" percent={record} trailColor="#FFF" strokeColor={record > 70 ? '' : record > 50 ? '' : ''} />
        }
    ];

    const dataSource = [
        {
            key: '1',
            name: 'Number of Projects on time and within Budget',
            status: '0',
        },
        {
            key: '2',
            name: 'Percentage of expected project benefits achieved',
            status: '0',
        },
        {
            key: '3',
            name: 'Percentage of projects using enterprise architecture services',
            status: '0',
        },
        {
            key: '4',
            name: 'Level of stakeholder satisfaction expressed at project closure review',
            status: '0',
        },
        {
            key: '5',
            name: 'Percentage of projects undertaken without approved business cases',
            status: '0',
        },
        {
            key: '6',
            name: '	Number of vulnerabilities discovered',
            status: '0',
        },
        {
            key: '7',
            name: 'Frequency of programme/projects status reviews',
            status: '0',
        },
        {
            key: '8',
            name: 'Percentage of projects reviewed that meet target quality goals and objectives',
            status: '0',
        }
    ];

    // const { isLoading, data, error } = useRequest('kris', 'kri/get-kris');
    // console.log('Data:', data);
    // if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-full bg-gray-3 p-4">
            <h2 className="font-bold text-xl text-center">Security Risk  Highlights</h2>
            
            <div className="risk">
                <Table 
                    dataSource={
                        kris?.map((el) => {
                            return {
                                key: el.id,
                                name: el.objective_title,
                                status: el.approval_status === 'Pending' ? 30 : el.approval_status === 'approved' ? 70 : 0
                            }
                        })
                    } 
                    columns={columns} 
                    pagination={{
                        total: 10
                    }}
                    rowClassName="cursor-pointer"
                    onRow={(record) => {
                        return {
                          onClick: () => {
                            router.push(`/app/KRIs/update?q=${record.key}`)
                          }
                        };
                      }}
                />
            </div>
        </div>
    )
}

export default memo(SRHighlists);
