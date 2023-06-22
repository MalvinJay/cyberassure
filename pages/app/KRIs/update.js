import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKRIs } from "redux/features/krisSlice";

import AppLayout from "components/Layouts/appLayout";
import AuthHead from "components/Misc/AuthHead";
import KRIItem from "components/Misc/KRI-Item";
import DashboardFilter from "@/components/Misc/DashboardHead";
import { useRouter } from "next/router";

const KRIs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list } = useSelector((state) => state.kris);
  const [loading, setloading] = useState(true);

  const fetchKRIs = async () => {
    setloading(true);
    dispatch(getKRIs())
    .then(() => {
      setloading(false);
    }, () => {
      setloading(false);
    })
  };

  useEffect(() => {
    fetchKRIs();
  }, []);

  useEffect(() => {
    if (router.query.q) {
        const queryItem = document.getElementById(`kri-${router?.query?.q}`);
        if (queryItem) {
            queryItem.scrollTop = 180
        }
    }
  }, [router.query])
  

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />
        <DashboardFilter />

        <div className="w-full pt-16 py-5 px-8">
          {loading ? 
            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]'>
              <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center">
              </div>
            </div>
          :
            <div className="pt-4">
              {list?.filter(el => el.kri_type_id === 2)?.length > 0 ? (
                list?.filter(el => el.kri_type_id === 2)?.map((el, index) => 
                    <KRIItem 
                        key={index} 
                        {...el} 
                        showTime={false}
                        approval_status=""
                        enableUpdate={true}
                        showReveal={router?.query?.q === `${el?.id}`}
                    />
                )
              ) : (
                <div className="p-10 text-center">
                  No KRIs available
                </div>
              )}
            </div>
          }
        </div>
      </section>
    </AppLayout>
  );
};

export default KRIs;
