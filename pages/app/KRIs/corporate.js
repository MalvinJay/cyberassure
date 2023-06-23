import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Drawer } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getKRIs } from "redux/features/krisSlice";

import AppLayout from "components/Layouts/appLayout";

const AuthHead = dynamic(() => import("@/components/Misc/AuthHead"))
const KRIItem = dynamic(() => import("@/components/Misc/KRI-Item"))
const AddEditKRIs = dynamic(() => import("@/components/KRIs/AddEditKRIs"))

const CorporateKRIs = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.kris);

  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchKRIs = useCallback(async () => {
    setloading(true);
    dispatch(getKRIs())
    .then(() => {
      setloading(false);
    }, () => {
      setloading(false);
    })
  }, [dispatch]);

  const onClose = () => {
    setOpen(false);
  }

  const onComplete = useCallback(() => {
    onClose();
    fetchKRIs(false);
  }, [])  

  useEffect(() => {
    fetchKRIs(false);
  }, [fetchKRIs]);

  return (
    <AppLayout>
      <section className="relative">
        <AuthHead />

        <div className="w-full py-5 px-8">
          <div className="flex justify-between items-center pb-10">
            <button className={`h-10 text-white bg-primary rounded-lg border-0 py-2 px-4 focus:outline-none hover:bg-primary/90 text-lg flex justify-between items-center`}
              onClick={() => setOpen(true)}
            >
              <span className="pr-2">Create Corporate KRI</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                  fill="white"
                />
              </svg>
            </button>

            {/* <h2 className="font-bold text-2xl ">Corporate Key Risk Indicators</h2> */}

            {/* <ExportEntity name="Import CSV" /> */}
            <div />
          </div>

          {loading ? 
            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]'>
              <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center">
              </div>
            </div>
          :
            <div>
              {list?.filter(el => el.kri_type_id === 2)?.length > 0 ? (
                list?.filter(el => el.kri_type_id === 2)?.map((el, index) => <KRIItem key={index} {...el} cta="approve" />)
              ) : (
                <div className="p-10 text-center">
                  No corporate KRIs available
                </div>
              )}
            </div>
          }
        </div>

        <Drawer width={670} title={<h3 className="text-3xl font-bold">Create KRI</h3>} placement="right" onClose={onClose} open={open}>
          <AddEditKRIs kriType={2} onComplete={onComplete} />
        </Drawer>        
      </section>
    </AppLayout>
  );
};

export default CorporateKRIs;
