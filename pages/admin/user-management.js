import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space, Table } from 'antd';

import AdminLayout from "@/components/Layouts/adminLayout";
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from 'redux/features/userSlice';

import SearchUsers from '@/components/Admin/UserManagement/SearchUsers';
import UsersFilter from '@/components/Admin/UserManagement/UsersFilter';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { departments } = useSelector((state) => state.departments); 
  const { organization } = useSelector((state) => state.organization); 
  const { roles } = useSelector((state) => state.general); 
  
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false)
  
  // Static list, move to contants
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      width: 90,
      fixed: 'left',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      fixed: 'left',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      width: 250,
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 90,
      key: 'gender',
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      width: 160,
      key: 'organization',
    },   
    {
      title: 'Role',
      width: 100,
      dataIndex: 'role',
      key: 'role',
    },     
    {
      title: 'Department',
      dataIndex: 'department',
      width: 200,
      key: 'department',
    },     
    {
      title: 'Head of Dept.',
      dataIndex: 'head_of_dept',
      key: 'head_of_dept',
    },   
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
  
          <svg className='w-5' viewBox="0 0 53 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_306_18178)">
              <path d="M12.1357 23.8363C12.1357 23.8832 12.1357 23.9301 12.1357 23.9728L14.0297 22.0703C14.2935 21.8048 14.6071 21.5938 14.9524 21.4495C15.2978 21.3052 15.6682 21.2303 16.0425 21.2291C16.4169 21.2279 16.7877 21.3004 17.134 21.4426C17.4803 21.5847 17.7952 21.7937 18.0607 22.0575C18.3262 22.3214 18.5372 22.6349 18.6815 22.9803C18.8259 23.3257 18.9008 23.6961 18.902 24.0704C18.9031 24.4447 18.8306 24.8156 18.6884 25.1619C18.5463 25.5081 18.3373 25.823 18.0735 26.0885L11.5769 32.6363C11.0528 33.1619 10.3444 33.4627 9.60214 33.4746C8.85989 33.4866 8.1422 33.2088 7.60138 32.7003L0.972591 26.8734C0.471614 26.3592 0.183186 25.6749 0.16498 24.9572C0.146773 24.2396 0.40013 23.5415 0.874391 23.0025C1.34865 22.4636 2.00886 22.1235 2.72302 22.0504C3.43717 21.9772 4.15263 22.1763 4.72635 22.6078L6.4326 24.1178C6.21608 19.4673 7.40522 14.8594 9.8451 10.8944C12.2658 6.96306 15.8411 3.8749 20.0826 2.05171C21.5951 1.40337 23.1664 0.901986 24.7748 0.554478C29.9254 -0.605974 35.3203 0.0877981 40.0097 2.51366C44.6992 4.93952 48.3825 8.94194 50.4113 13.8163C51.0591 15.3274 51.555 16.8992 51.8914 18.5085C52.7104 22.3237 52.5178 26.2867 51.3326 30.0044C50.1289 33.7052 47.993 37.0339 45.1304 39.6703C42.3967 42.2505 39.1031 44.163 35.5071 45.2583C32.6177 46.124 29.5741 46.3476 26.5892 45.9137C23.6043 45.4797 20.7503 44.3985 18.2271 42.7458C17.593 42.3346 17.1482 41.6883 16.9906 40.9491C16.833 40.21 16.9755 39.4385 17.3867 38.8044C17.798 38.1703 18.4443 37.7255 19.1834 37.5679C19.9226 37.4103 20.6941 37.5528 21.3282 37.9641C22.0746 38.4603 22.8641 38.8886 23.6871 39.2437C24.4728 39.5789 25.2864 39.8444 26.1185 40.0372C28.6863 40.6403 31.3672 40.5609 33.8947 39.8068C36.6527 38.9556 39.1758 37.4765 41.2657 35.4857C43.4231 33.5041 45.0295 30.9967 45.9281 28.2086C46.8164 25.4398 46.9635 22.4865 46.3546 19.6432C46.0909 18.4007 45.708 17.1865 45.2114 16.0174C43.7005 12.3627 40.9427 9.36196 37.4283 7.5485C33.9138 5.73504 29.8703 5.22627 26.0161 6.11259C24.7691 6.3777 23.5517 6.76637 22.3818 7.27285C19.2055 8.62023 16.5268 10.9218 14.7165 13.859C12.8721 16.8494 11.9727 20.3266 12.1357 23.8363ZM25.9479 14.5031C25.9479 13.8119 26.2225 13.1489 26.7112 12.6602C27.2 12.1714 27.8629 11.8968 28.5542 11.8968C29.2454 11.8968 29.9083 12.1714 30.3971 12.6602C30.8859 13.1489 31.1605 13.8119 31.1605 14.5031V22.6078L37.512 26.1355C38.115 26.4715 38.5598 27.0332 38.7486 27.6972C38.9374 28.3612 38.8547 29.0729 38.5187 29.6759C38.1827 30.2789 37.6209 30.7237 36.9569 30.9125C36.293 31.1013 35.5812 31.0186 34.9782 30.6826L27.4835 26.5151C27.0259 26.309 26.6377 25.9751 26.3652 25.5536C26.0928 25.1321 25.9479 24.641 25.9479 24.1392V14.5031Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_306_18178">
                <rect width="52.4161" height="46.12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </Space>
      ),
    },
  ];

  const filterTypes = [
    {
      name: "Manager",
      options: [
        {
          name: "Manager 1",
          value: "manager_1"
        }
      ]
    },
    {
      name: "Department",
      options: departments
    },
    {
      name: "Job Title",
      options: [
        {
          name: "Software Engineer",
          value: "software_engineer"
        },
        {
          name: "Product Manager",
          value: "product_manager"
        },
        {
          name: "Chief Executive Officer",
          value: "ceo"
        }
      ]
    },
    {
      name: "Role",
      options: roles
    }
  ]
  
  const handleEdit = (info={}) => {
    // Redirect to new user page
  };

  const fetchUsers = () => {
    dispatch(getUsers(true))
  };

  useEffect(() => {
    const list = users.map((el) => {
      return {
        ...el,
        name: el.first_name + ' ' + el.last_name,
        status: el.is_active ? 'Active' : 'Inactive',
        gender: el.gender || 'N/A',
        phone: el.phone || "N/A",
        head_of_dept: el?.head_of_dept || 'N/A',
        job_title: el.job_title || 'N/A',
        role: roles?.find((it) => it?.id === el?.id)?.name ?? "N/A",
        department: departments?.find((it) => it?.id === el?.dept_id)?.name ?? "N/A",
        organization: organization?.find((it) => it?.id === el?.org_id)?.name ?? "N/A",
        key: el?.name
      }
    });

    setdata(list);
  }, [users])

  useEffect(() => {
    if (users.length <= 0) fetchUsers()
  }, [])

  return (
    <>
      <AdminLayout title="User Management">
        <div className="w-full relative px-6">
          <div className="flex justify-between items-center py-6">
            <Link href="/admin/user-management/new">
              <button className="h-10 text-white bg-primary rounded-lg border-0 py-2 px-4 focus:outline-none hover:bg-primary/90 text-lg space-x-4 inline-flex items-center">
                <span>Add User</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="white" />
                </svg>
              </button>
            </Link>
            <SearchUsers />
          </div>

          <UsersFilter filterTypes={filterTypes} />

          <div className="grid grid-cols-6 gap-y-5 gap-x-3 pt-5 pb-10">
            {roles.map((el) => (
              <div key={el.id} className='flex items-center justify-center h-20 w-full rounded-lg bg-gray-2 text-center font-semibold'
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
              >
                <div className='p-2'>
                  <div className='font-bold text-lg'>{users?.filter((item) => item?.role_id === el?.id)?.length}</div>
                  <div className='text-base'>{el.name}</div>
                </div>
              </div>
            ))}
          </div>

          <Table 
            className='overflow-auto' 
            columns={columns} 
            dataSource={data} 
            scroll={{
              x: 1600,
            }}
          />
        </div>
      </AdminLayout>     
    </>
  )
}

export default UserManagement