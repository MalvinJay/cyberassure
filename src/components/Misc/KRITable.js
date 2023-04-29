import React, {useState } from "react";
import { Form, Input, Select, Table } from "antd";
import { base64BinaryBuffer } from "../../../services/utils";

const { Option } = Select;

const KRITable = ({
  bordered = true,
  customClass = "kri-update",
  columns = [],
  dataSource = [],
  kri_id,
  setInfo,
  loading=false,
  addRecord=true
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      form.validateFields();

      const payload = {
        ...values,
        kri_id,
        // upload_evidence: uploadedEvidence
      };

      setInfo(payload)
    } catch (error) {
      console.error('Error creating kri', error);
    }
  };   

  const handleFileUpload = (e) => {
    const file = e?.target?.files;
    // console.log('Uploaded File:', file[0]);
    
    if (file[0]) {
      setInfo({ upload_evidence: file[0].name })
      // base64BinaryBuffer(file[0], 'base64', (binaryStr) => {
      //   setInfo({ upload_evidence: binaryStr })
      // })
    }
  }

  return (
    <div className={customClass}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={bordered}
        pagination={false}
        className="!text-lg"
      />

      {addRecord && (
        <Form
          form={form}
          className="key__results flex items-start py-4 mb-0 border-x border-b border-black !text-black bg-gray-2"
          onBlur={() => {
            setInfo(form.getFieldsValue())
          }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item  className="w-full sm:w-[30%] pl-2 mb-0" name="key_result" label=""
            rules={[ {required: true, message: 'Provide key results name'}]}
          >
            <Input placeholder="key result" className="w-full px-2 py-1 placeholder-text-black bg-transparent border border-black" type="text" />
          </Form.Item>
          <Form.Item className="w-full sm:w-[30%] pl-2 mb-0" name="description" label=""
            rules={[ {required: true, message: 'Provide key results description'}]}
          >
            <Input placeholder="description" className="w-full px-2 py-1 bg-transparent border border-black" type="text" />
          </Form.Item>
          <Form.Item className="w-full sm:w-[20%] pl-2 mb-0" name="status" label=""
            rules={[ {required: true, message: 'Please select status'}]}
          >
            <Select
              name="status"
              placeholder="status"
              className="w-full border border-black rounded-md"
              bordered={false}
              suffixIcon={
                <svg className="w-4" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 13L0.205772 0.25H15.7942L8 13Z" fill="#0883C7"/>
                </svg>
              }
            >
              <Option value="at-risk" name="risk">At Risk</Option>
              <Option value="on-track" name="track">On Track</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item className="w-full sm:w-[30%] pl-2 mb-0" name="comment" label="">
            <Input placeholder="comment" className="w-full px-2 py-1 bg-transparent border border-black" type="text" />
          </Form.Item>*/}
          <div className="relative w-full sm:w-[20%] px-2 mb-0 cursor-pointer" name="upload_evidence" label="">
            <input placeholder="upload evidence" className="absolute inset-0 w-full h-full cursor-pointer" 
              type="file" 
              style={{ opacity: 0, appearance: 'none' }}
              onChange={(e) => { handleFileUpload(e)}}
            />
            <div type="primary" className="w-full py-1 text-base font-bold text-center !bg-[#CDCDCD] rounded-md hover:bg-opacity-90">
              Upload file
            </div>
          </div>
        </Form>
      )}

      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]'>
          <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center">
          </div>
        </div>
      )}
    </div>
  );
};

export default KRITable;
