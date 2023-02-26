import React from 'react'
import { Table } from 'antd'

const SRHighlists = () => {
    const columns = [
        {
          title: 'Key Results',
          dataIndex: 'results',
          key: 'results',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: 'Comment',
          dataIndex: 'comment',
          key: 'comment'
        },
        {
          title: 'Upload Evidence',
          dataIndex: 'evidence',
          key: 'evidence'
        }
    ];

    const dataSource = [
        {
            results: 'OBDX Project',
            description: 'New Ecobank Online Banking Portal',
            status: 'At Risk',
            comment: 'There is no budget to progress with project',
            evidence: 'upload file',
        },
        {
            results: 'OBDX Project',
            description: 'New Ecobank Online Banking Portal',
            status: 'At Risk',
            comment: 'There is no budget to progress with project',
            evidence: 'upload file',
        },
    ]

  return (
    <div className="kri-update">
        <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            pagination={false} 
        />
    </div>
  )
}

export default SRHighlists