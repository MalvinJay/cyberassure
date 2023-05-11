import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getKRByKRIId, getKRIs } from "redux/features/krisSlice";

import AppLayout from "components/Layouts/appLayout";
import AddComment from "components/Misc/AddComment";
import AuthHead from "components/Misc/AuthHead";
import KRIItem from "components/Misc/KRI-Item";
import api from "../../../services/config";

const KRIApproval = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list } = useSelector((state) => state.kris);
  const { departments } = useSelector((state) => state.departments);

  const [current, setcurrent] = useState(2);
  const [loading, setloading] = useState(false);
  const [comment, setcomment] = useState(null);
  const [Key_Results, setKey_Results] = useState(null);


  const fetchKeyResults = async (id) => {
    setloading(true);
    dispatch(getKRByKRIId(id))
      .then(
        (res) => {
          setloading(false);
          console.log("res.payload:", res.payload);

          setKey_Results(
            res.payload.map((el) => {
              return {
                id: el.kri_id,
                objective_title: el.key_result,
              };
            })
          );
        },
        () => {
          setloading(false);
        }
      )
      .catch((error) => {
        notification.error({ message: "Error occured" });
        console.log("Error:", error);
        setloading(false);
      });
  };

  const callToActionKRI = (type) => {
    const kri_id = router.query;

    const payload = {
      approval_status: type,
      approval_comment: comment,
    };

    setloading(true);
    api
      .put(`/kri/approve-kri/${kri_id.q}`, payload)
      .then(
        (res) => {
          setloading(false);

          if (res.data.status) {
            notification.success({
              message: type === 'decline' ? "KRI Declined!" : "KRI Approved"
            });
          } else {
            notification.error({
              message: (
                <span className="capitalize">
                  {res?.response?.data?.status || "Failed"}
                </span>
              ),
              description:
                res?.response?.data?.message || "Error approving kri",
            });
          }

          setTimeout(() => {
            router.back();
          }, 2000);
        },
        (error) => {
          setloading(false);
          notification.error({
            message: (
              <span className="capitalize">
                {error?.response?.data?.status || "Failed"}
              </span>
            ),
            description:
              error?.response?.data?.message ||
              "Error adding key result, please try again or contact support.",
          });
        }
      )
      .catch((error) => {
        console.error("Error adding key result:", error);
        notification.error({
          message: (
            <span className="capitalize">
              {error?.response?.data?.status || "Failed"}
            </span>
          ),
          description:
            error?.response?.data?.message ||
            "Error adding key result, please try again or contact support.",
        });
      });
  };

  useEffect(() => {
    // const kri_id = router.query;
    // fetchKeyResults(kri_id?.q);
    if (list.length <= 0) dispatch(getKRIs(true))

    console.log('KRIs to be approved:', list);
  }, [list]);

  return (
    <AppLayout>
      <section className="relative">
        <div className="w-full fixed z-10 overflow-y-hidden py-4 bg-white flex items-center">
          {departments.map((el) => (
            <div
              key={el.id}
              className={`w-auto uppercase text-white  px-4 py-2 text-sm font-semibold mr-4 shadow-inner cursor-pointer
                ${current === el.id ? "bg-[#03314A]" : "bg-primary"}`}
              style={{
                boxShadow: "inset 0px 2.7421px 2.7421px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => setcurrent(el.id)}
            >
              {el.name}
            </div>
          ))}
        </div>

        <div style={{ top: "8.2rem" }}>
          <AuthHead offsetTop={132} />
        </div>

        <div className="w-full py-20 px-8">
          <div
            className="w-full sm:w-1/2 lg:w-1/3 font-semibold text-xl bg-primary text-white p-2 mb-5 text-center"
            style={{
              boxShadow: "inset 0px 2.7421px 2.7421px rgba(0, 0, 0, 0.25)",
            }}
          >
            Approvals
          </div>

          <h2 className="font-semibold text-xl">Key Risk Indicators</h2>

          <div className="pt-4">
            {list ?
              <>
                {list?.filter(el => el.kri_type_id === 2 && el.approval_status !== 'approve')?.length > 0 ?
                  list?.filter(el => el.kri_type_id === 2 && el.approval_status !== 'approve')?.map((el, index) => (
                    <KRIItem
                      key={index}
                      {...el}
                      showTime={false}
                      showAddkey={false}
                    />
                  ))
                :
                  <div className="py-10">No key results available</div>
                }
              </>
            : (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]">
                <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center"></div>
              </div>
            )}
          </div>

          {router?.query?.type == 2 && (
            <section className="w-full flex items-end justify-between">
              <AddComment
                handleInputChange={(val) => {
                  setcomment(val);
                }}
              />

              <div className="w-full md:w-1/2 md:pl-10 space-x-6 flex justify-end">
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#198754] text-white w-auto md:w-2/5"
                  loading={loading}
                  disabled={list?.filter(el => el?.kri_type_id === 2 && el?.approval_status !== 'approve')?.length <= 0}
                  onClick={() => callToActionKRI("approve")}
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="bg-danger text-white w-auto md:w-2/5"
                  loading={loading}
                  disabled={list?.filter(el => el?.kri_type_id === 2 && el?.approval_status !== 'approve')?.length <= 0}
                  onClick={() => callToActionKRI("decline")}
                >
                  Decline
                </Button>
              </div>
            </section>
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]">
            <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center"></div>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default KRIApproval;
