/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from "react";
import Header from "./Header";
import Side from "./Side";
import 'antd/dist/reset.css';

import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "redux/features/profileSlice";
import { getDepartments } from "redux/features/departmentSlice";
import { getOrganization } from "redux/features/organizationSlice";
// import { useGetUserProfileQuery } from "redux/services/api/userData";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { shrink } = useSelector((state) => state.general);
  // const { departments } = useSelector((state) => state.departments);

  // const { data, isLoading, error } = useGetUserProfileQuery();
  // console.log('Fetching user info:', data);

  useEffect(() => {
    if (!profile.id) {
      dispatch(getProfile())
    }
  }, [profile])

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(getOrganization())
  }, [])
  
  return (
    <section className="w-full">
      <aside className={`w-full ${shrink ? 'md:w-[5%]' : 'md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] '} ml-[-100%] lg:ml-0 bg-default dark:bg-black fixed z-10 top-0 pb-3 flex flex-col h-screen border-r transition duration-700 ease-in-out`}>
        <Side />
      </aside>

      <div className={`w-full ${shrink ? 'md:w-[95%]' : 'lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'} ml-auto mb-6 transition duration-700 ease-in-out`}>
        <Header profile={profile} />

        <main className="w-full"> {/* 2xl:container mx-auto */}
          {children}
        </main>
      </div>
    </section>
  );
};

export default memo(AppLayout);
