import React, {useState } from "react";
import { Button, Form, Input, Select, Table, notification } from "antd";

const { Option } = Select;
const KRITable = ({
  bordered = true,
  customClass = "kri-update",
  columns = [],
  dataSource = [],
  kri_id
}) => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [uploadedEvidence, setuploadedEvidence] = useState(null)

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true); 
      
      const payload = {
        ...values,
        kri_id,
        upload_evidence: uploadedEvidence
      };
      
      api.post('/key-result/create-key-result', payload)
      .then((res) => {
        setloading(false);

        if (res.data.status) {
          notification.success({ message: "Key Results Created Successfully" });
          router.push('/app/KRIs/all');
        } else {
          notification.error({ 
            message: <span className="capitalize">{res?.response?.data?.status || 'Failed'}</span>,
            description: res?.response?.data?.message || 'Error creating KRI, please try again or contact support.',
          })
        }
      }, (error) => {
        setloading(false);
        notification.error({ 
          message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
          description: error?.response?.data?.message || 'Error creating KRI, please try again or contact support.',
        })
      })
      .catch((error) => {
        console.error('Error creating kri:', error)
        notification.error({ 
          message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
          description: error?.response?.data?.message || 'Error creating KRI, please try again or contact support.',
        })
      })
    } catch (error) {
      console.error('Error creating kri', error);
    }
  };   

  const handleFileUpload = (e) => {
    e.preventDefault();

    console.log('Uploaded File:', e)
  }

  return (
    <div className={customClass}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={bordered}
        pagination={false}
      />

      <Form
        form={form}
        className="key__results flex items-start py-2 mb-0 border-x border-b border-black bg-gray-2"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item  className="w-full sm:w-1/4 pl-2 mb-0" name="objective_title" label=""
          rules={[ {required: true, message: 'Provide key results name'}]}
        >
          <Input placeholder="key result" className="w-full px-2 py-1 bg-transparent border border-black" type="text" />
        </Form.Item>
        <Form.Item className="w-full sm:w-1/4 pl-2 mb-0" name="description" label=""
          rules={[ {required: true, message: 'Provide key results description'}]}
        >
          <Input placeholder="description" className="w-full px-2 py-1 bg-transparent border border-black" type="text" />
        </Form.Item>
        <Form.Item className="w-full sm:w-48 pl-2 mb-0" name="status" label=""
          rules={[ {required: true, message: 'Please select status'}]}
        >
          <Select
            name="status"
            placeholder="status"
            className="w-full border border-black rounded-md"
            bordered={false}
          >
            <Option value="risk" name="risk">At Risk</Option>
            <Option value="track" name="track">On Track</Option>
          </Select>
        </Form.Item>
        <Form.Item className="w-full sm:w-1/4 pl-2 mb-0" name="comment" label="">
          <Input placeholder="comment" className="w-full px-2 py-1 bg-transparent border border-black" type="text" />
        </Form.Item>        
        <Form.Item className="relative w-full sm:w-1/4 px-2 mb-0 cursor-pointer" name="upload_evidence" label="">
          <Input placeholder="upload evidence" className="absolute inset-0 w-full h-full cursor-pointer" 
            type="file" 
            style={{ opacity: 0, appearance: 'none' }}
            onChange={handleFileUpload}
          />
          <div type="primary" className="w-full py-1 text-base text-center !bg-[#CDCDCD] rounded-md hover:bg-opacity-90">
            Upload file
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default KRITable;
