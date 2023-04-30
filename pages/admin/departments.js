import React, { useState, useEffect } from 'react'
import { Button, Select, Form, Input, Modal, Space, Table, notification, } from 'antd'

import AdminLayout from "@/components/Layouts/adminLayout";
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/config';
import { getDepartments } from 'redux/features/departmentSlice';


const BusinessInformation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { departments } = useSelector((state) => state.departments);
  
  const [editMode, setEditMode] = useState(false);
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false)
  
  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Department Head',
      dataIndex: 'head',
      key: 'head',
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
      key: 'proxy',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <svg className='w-5 cursor-pointer' viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleEdit(record)}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4109 0C31.4093 0 40.3267 8.91737 40.3267 19.9158C40.3267 30.9142 31.4093 39.8316 20.4109 39.8316C9.41249 39.8316 0.495117 30.9142 0.495117 19.9158C0.495117 8.91737 9.41249 0 20.4109 0ZM17.5325 27.2286C16.9425 27.4263 16.3396 27.6079 15.7496 27.8024C15.1597 28.0001 14.5697 28.1946 13.9668 28.3923C12.56 28.8461 11.7918 29.1022 11.6232 29.1476C11.4579 29.193 11.5616 28.5447 11.9117 27.1832L13.03 22.9077L21.4612 14.1427L25.9506 18.4636L17.5325 27.2286ZM25.9344 10.9692C25.7237 10.7715 25.4806 10.6678 25.2083 10.6807C24.936 10.6807 24.6929 10.7877 24.4984 10.9984L22.8971 12.6613L27.3866 16.9984L29.0041 15.3064C29.2019 15.1086 29.2764 14.8526 29.2764 14.5803C29.2764 14.308 29.1694 14.0519 28.975 13.8704L25.9344 10.9692Z" fill="black"/>
          </svg>
  
          <svg className='w-5 cursor-pointer' viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_306_18021)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25968 10.0056H25.7372C25.9178 9.99838 26.0986 10.0128 26.2758 10.0487C26.5685 10.1131 26.8373 10.2587 27.0512 10.4687C27.2997 10.7071 27.4561 11.0256 27.4928 11.368C27.4996 11.4975 27.4942 11.6273 27.4766 11.7558L25.5622 31.5865V31.6215V31.6969C25.5496 31.7788 25.5316 31.8597 25.5084 31.9392V31.9392V31.9554C25.4068 32.2682 25.2105 32.5418 24.9466 32.7381C24.6828 32.9345 24.3644 33.0439 24.0355 33.0513H4.91561C4.80196 33.0458 4.68918 33.0286 4.57904 33.0001C4.4708 32.9678 4.36615 32.9245 4.2667 32.8709V32.8709C4.03199 32.7359 3.83378 32.5456 3.68926 32.3166C3.54474 32.0876 3.45828 31.8269 3.43739 31.5569L1.55259 11.7692C1.53108 11.6212 1.52566 11.4714 1.53643 11.3222C1.5741 10.9846 1.72949 10.6709 1.97532 10.4364C2.19808 10.2199 2.47853 10.0722 2.78309 10.011C2.94217 9.98316 3.10364 9.97144 3.26506 9.97597L3.25968 10.0056ZM1.77338 2.36946H10.2469V1.61554C10.2456 1.59133 10.2456 1.56706 10.2469 1.54284C10.2638 1.13703 10.433 0.752487 10.7208 0.465814V0.465814C11.0228 0.167686 11.43 0.00036114 11.8544 0L17.0699 0H17.1506C17.565 0.0207413 17.9554 0.200063 18.2411 0.500817C18.5268 0.801571 18.6859 1.20071 18.6854 1.61554V1.61554V2.36946H27.3016H27.4066C27.7116 2.3944 27.9972 2.52898 28.2105 2.74828C28.4239 2.96758 28.5506 3.25675 28.5671 3.56227C28.5671 3.61073 28.5671 3.64843 28.5671 3.6969V6.35177C28.5671 6.53672 28.4937 6.7141 28.3629 6.84489C28.2321 6.97567 28.0547 7.04914 27.8698 7.04914H0.949454C0.765889 7.04916 0.589723 6.97679 0.459169 6.84775C0.328616 6.71871 0.254205 6.5434 0.252079 6.35985V3.64304C0.249307 3.61529 0.249307 3.58733 0.252079 3.55958V3.55958C0.270526 3.27604 0.383453 3.00687 0.572825 2.79505C0.762198 2.58322 1.01709 2.44097 1.2968 2.391C1.45475 2.37028 1.61419 2.36307 1.77338 2.36946V2.36946ZM13.1091 16.5593C13.1416 16.2431 13.2902 15.9501 13.5262 15.7371C13.7622 15.5242 14.0688 15.4063 14.3867 15.4063C14.7046 15.4063 15.0112 15.5242 15.2472 15.7371C15.4832 15.9501 15.6318 16.2431 15.6643 16.5593V26.5218C15.6318 26.838 15.4832 27.131 15.2472 27.344C15.0112 27.5569 14.7046 27.6748 14.3867 27.6748C14.0688 27.6748 13.7622 27.5569 13.5262 27.344C13.2902 27.131 13.1416 26.838 13.1091 26.5218V16.5593ZM19.4986 16.5054C19.5339 16.1827 19.695 15.8869 19.9471 15.6822C20.1991 15.4776 20.5217 15.3806 20.8448 15.4123C21.0036 15.4108 21.161 15.4408 21.3081 15.5005C21.4552 15.5602 21.589 15.6484 21.7019 15.76C21.8148 15.8716 21.9045 16.0045 21.9658 16.1509C22.0271 16.2973 22.0588 16.4544 22.0592 16.6131L21.5207 26.5756C21.486 26.8987 21.3251 27.1949 21.0728 27.3997C20.8206 27.6045 20.4977 27.7013 20.1744 27.6688C20.0157 27.6703 19.8582 27.6403 19.7111 27.5806C19.564 27.5209 19.4302 27.4327 19.3173 27.3211C19.2044 27.2095 19.1148 27.0766 19.0535 26.9302C18.9921 26.7838 18.9604 26.6267 18.96 26.4679L19.4986 16.5054ZM6.9835 16.6131C6.98349 16.4545 7.01491 16.2975 7.07593 16.1511C7.13695 16.0047 7.22637 15.8718 7.33903 15.7602C7.45169 15.6485 7.58534 15.5603 7.73229 15.5006C7.87923 15.4409 8.03655 15.4108 8.19515 15.4123C8.51828 15.3806 8.84087 15.4776 9.09292 15.6822C9.34496 15.8869 9.50613 16.1827 9.54144 16.5054L10.08 26.4679C10.0796 26.6267 10.0479 26.7838 9.98654 26.9302C9.92523 27.0766 9.83555 27.2095 9.72268 27.3211C9.60981 27.4327 9.47597 27.5209 9.32888 27.5806C9.18179 27.6403 9.02434 27.6703 8.8656 27.6688C8.54234 27.7013 8.21937 27.6045 7.96715 27.3997C7.71494 27.1949 7.55396 26.8987 7.51932 26.5756L6.98081 16.6131H6.9835Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_306_18021">
            <rect width="28.3151" height="33.0863" fill="white" transform="translate(0.251953)"/>
            </clipPath>
            </defs>
          </svg>
  
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      form.validateFields();
      setloading(true);  
      
      const payload = {
        ...values,
        alias: values?.name?.split(" ")?.map(el => { return el[0]?.toUpperCase()})?.join()?.replaceAll(",", "")
      };
      
      console.log('payload:', payload);

      // Check editMode
      const url = editMode ? `department/update-departmen/${payload?.id}` : 'department/create-department';

      if (!editMode) {
        api.post(url, payload)
        .then((res) => {
          setloading(false);
  
          if (res.data.status) {
            notification.success({ message: "Department Created Successfully" });
            fetchDepartments();
            setshow(false);
          } else {
            notification.error({ 
              message: <span className="capitalize">{res?.response?.data?.status || 'Failed'}</span>,
              description: res?.response?.data?.message || 'Error creating Department, please try again or contact support.',
            })
          }
        }, (error) => {
          setloading(false);
          notification.error({ 
            message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
            description: error?.response?.data?.message || 'Error creating Department, please try again or contact support.',
          })
        })
        .catch((error) => {
          console.error('Error creating task:', error)
          notification.error({ 
            message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
            description: error?.response?.data?.message || 'Error creating Department, please try again or contact support.',
          })
        })
      } else {
        api.put(url, payload)
        .then((res) => {
          setloading(false);
  
          if (res.data.status) {
            notification.success({ message: "Department Updated Successfully" });
            fetchDepartments();
            setshow(false);
          } else {
            notification.error({ 
              message: <span className="capitalize">{res?.response?.data?.status || 'Failed'}</span>,
              description: res?.response?.data?.message || 'Error Updating Department, please try again or contact support.',
            })
          }
        }, (error) => {
          setloading(false);
          notification.error({ 
            message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
            description: error?.response?.data?.message || 'Error updating Department, please try again or contact support.',
          })
        })
        .catch((error) => {
          console.error('Error updating task:', error)
          notification.error({ 
            message: <span className="capitalize">{error?.response?.data?.status || 'Failed'}</span>,
            description: error?.response?.data?.message || 'Error updating Department, please try again or contact support.',
          })
        })
      }
    } catch (error) {
      console.error('Error creating department', error);
    }
  }; 
  
  const handleEdit = (info={}) => {
    setEditMode(true);
    form.setFieldsValue(info);
    setshow(true);
  };

  const fetchDepartments = () => {
    dispatch(getDepartments(true))
  };

  useEffect(() => {
    const list = departments.map((el) => {
      return {
        key: el?.id,
        name: el?.name || 'N/A',
        head: el?.head || 'N/A',
        proxy: el?.proxy || 'N/A'
      }
    });

    setdata(list);
  }, [departments])

  useEffect(() => {
    if (departments.length <= 0) fetchDepartments()
  }, [])

  return (
    <>
      <AdminLayout title="Departments">
        <div className="w-full relative px-6">
          <div className="py-6">
            <button className="h-10 text-white bg-primary rounded-lg border-0 py-2 px-4 focus:outline-none hover:bg-primary/90 text-lg space-x-4 inline-flex items-center"
              onClick={() => setshow(true)}
            >
              <span>Create Department</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="white" />
              </svg>
            </button>
          </div>

          <Table columns={columns} dataSource={data} />
        </div>
      </AdminLayout>

      <Modal
        className="w-full sm:!w-1/2"
        open={show}
        closable={false}
        centered
        footer={null}
        onCancel={() => {
          setEditMode(false);
          setshow(false);
        }}
      >
        <section className="w-full mx-auto bg-white">
          <h3 className="text-3xl font-bold">{editMode ? 'Update':'Create'} Department</h3>

          <Form 
            form={form}
            className="py-6 bg-white rounded"
            onFinish={onFinish}
            autoComplete="off"  
            layout="vertical"
          >
            <Form.Item 
              className="w-full pr-4 "
              name="name"
              label={
                <span
                className="block text-base font-bold text-gray-700"
              >
                Name
              </span>
              }
              rules={[ {required: true, message: 'Provide objective for this task'}]}
            >
              <Input
                name="name"
                className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter name of Department "
              />
            </Form.Item>  

            <div className="mb-4 md:flex md:justify-between">
              <Form.Item className="mb-4 w-1/2 md:mb-0 pr-4" 
                name="head"
                label={
                  <span className="block text-base font-bold text-gray-700">
                    Department Head 
                  </span>
                }
                rules={[ {required: true, message: 'Enter name of department head '}]}
              >
                <Input
                  name="head"
                  className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter name of Department  Head"
                />
              </Form.Item>

              <Form.Item className="w-1/2 pl-4" 
                label={<span className="block text-base font-bold text-gray-700">Proxy/Backup</span>}
                name="proxy"
                rules={[ {required: true, message: 'Provide a proxy/backup'}]}
              >
                <Input
                  name="proxy"
                  className="w-full px-3 py-3 mb-3 text-base leading-tight text-gray-700 border border-primary/80 rounded appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Name of Employee as proxy/backup"
                />
              </Form.Item>
            </div>        

            <div className="mb-4 flex items-center justify-end">
              <Button
                type="primary"
                className="w-40 px-4 h-10 flex items-center justify-center font-bold text-white text-lg !bg-primary rounded-lg focus:outline-none focus:shadow-outline"
                htmlType="submit"
                loading={loading}
              >
                Create
              </Button>
            </div>
          </Form>
        </section>
      </Modal>      
    </>
  )
}

export default BusinessInformation