import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKRIs } from "redux/features/krisSlice";

import AppLayout from "@/components/Layouts/appLayout";
import AuthHead from "@/components/Misc/AuthHead";
import KRIItem from "@/components/Misc/KRI-Item";


const AllKRIs = () => {
  const dispatch = useDispatch();
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

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />

        <div className="pt-20 py-5 px-8">
          {loading ? 
            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]'>
              <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center">
              </div>
            </div>
          :
            <div className="appear">
              <span className="font-semibold text-xl bg-primary text-white rounded-lg p-2">
                Personal Key Risk Indicators
              </span>

              <div className="my-4">
                {list?.filter(el => el.kri_type_id === 1).length > 0 ? (
                  list?.filter(el => el.kri_type_id === 1)?.map((el, index) => <KRIItem key={index} {...el} handleUpdateComplete={fetchKRIs} />)
                ) : (
                  <div className="p-10 text-center">No personal KRIs available</div>
                )}
              </div>

              <span className="font-semibold text-xl bg-primary text-white rounded-lg p-2">
                Corporate Key Risk Indicators
              </span>

              <div className="pt-4">
                {list?.filter(el => el.kri_type_id === 2)?.length > 0 ? (
                  list?.filter(el => el.kri_type_id === 2)?.map((el, index) => <KRIItem key={index} {...el} />)
                ) : (
                  <div className="p-10 text-center">
                    No corporate KRIs available
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </section>
    </AppLayout>
  );
};

export default AllKRIs;
