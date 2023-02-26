import React from "react";
import { Table } from "antd";

const KRITable = ({
  bordered = true,
  customClass="kri-update",
  columns=[],
  dataSource=[]
}) => {

  return (
    <div className={customClass}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={bordered}
        pagination={false}
      />
    </div>
  );
};

export default KRITable;
