import React, { useEffect, memo } from "react";
import Header from "./Header";
import Side from "./Side";
import 'antd/dist/reset.css';
import { AuthProvider } from "../../../Context/auth";
import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "redux/features/profileSlice";
import { getDepartments } from "redux/features/departmentSlice";
import { getOrganization } from "redux/features/organizationSlice";
import { useRouter } from "next/router";
// import { useGetUserProfileQuery } from "redux/services/api/userData";

const AppLayout = ({ children }) => {
  const router = useRouter();
  // const { isAuthenticated, loading } = useAuth();
  const dispatch = useDispatch();
  
  const { profile } = useSelector((state) => state.profile);
  const { shrink } = useSelector((state) => state.general);

  useEffect(() => {
    const abortController = new AbortController();
    
    dispatch(getProfile())
    return () => { abortController.abort() }
  }, [profile, dispatch]);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(getDepartments(true))
    dispatch(getOrganization(true))

    return () => { abortController.abort() }
  }, [dispatch])

  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     router.push('/')
  //   }
  // }, [isAuthenticated, loading, router]);

  return (
    <AuthProvider>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
          {location.replace("/login?next=" +encodeURIComponent(location.pathname + location.search)
          )}
          else {document.documentElement.classList.add("render")}`,
          }}
        />
      </Head>

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
    </AuthProvider>
  );
};


export default memo(AppLayout);
