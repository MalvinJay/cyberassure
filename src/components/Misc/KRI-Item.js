import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, notification } from "antd";
import { CaretDownOutlined, CaretUpOutlined, PlusCircleOutlined } from "@ant-design/icons";

import KRITable from "./KRITable";
import AddComment from "./AddComment";
import { formatDate, getQuater } from "../../../services/utils";
import api from "../../../services/config";
import { getKRByKRIId, getKRIs } from "redux/features/krisSlice";
import { useDispatch } from "react-redux";

const KRIItem = ({
  cta="update",
  id = "",
  objective_title = "",
  target_date = "",
  approval_status = "",
  kri_type_id,
  showTime = true,
  showAddkey = true,
  enableUpdate=false,
  showReveal=false,
  handleUpdateComplete = () => {},
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [Key_Results, setKey_Results] = useState(null);
  const [revealKRIs, setrevealKRIs] = useState(false);
  const [formData, setformData] = useState({
    upload_evidence: null,
  });

  const columns = [
    {
      title: "Key Results",
      dataIndex: "key_result",
      key: "key_result",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Upload Evidence",
      dataIndex: "upload_evidence",
      key: "upload_evidence",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const handleClick = (e) => {
    if (cta === "update") {
      if (router.pathname.includes('/app/KRIs/update')) return;
      router.push('/app/KRIs/update');
    } else {
      if (router.pathname.includes('/approve')) return;
      router.push(`/app/KRIs/approve?q=${id}&type=${kri_type_id}`);
    }
  };

  const handleRevealKIs = (e) => {
    e.stopPropagation();
    setrevealKRIs(!revealKRIs);
  };

  const setInfo = (formFields = {}) => {
    console.log("Incoming fields:", formFields);

    setformData((prev) => {
      return { ...prev, ...formFields };
    });
  };

  const fetchKeyResults = async () => {
    setloading(true);

    dispatch(getKRByKRIId(id))
      .then((res) => {
          setloading(false);
          setDataSource(res.payload);
        }, () => {
          setloading(false);
        }
      )
      .catch((error) => {
        notification.error({ message: "Error occured" });
        console.log("Error:", error);
        setloading(false);
      });
  };

  const addUpdateKeyResults = () => {
    try {
      setloading(true);
      let payload = { ...formData };
      payload.kri_id = id;
      payload.upload_evidence = payload.upload_evidence || "N/A";

      api
        .post("/key-result/create-key-result", payload)
        .then(
          (res) => {
            setloading(false);

            if (res.data.status) {
              notification.success({
                message: "Key Results Added Successfully",
              });
              fetchKeyResults();
              // handleUpdateComplete()
              router.reload()
            } else {
              notification.error({
                message: (
                  <span className="capitalize">
                    {res?.response?.data?.status || "Failed"}
                  </span>
                ),
                description:
                  res?.response?.data?.message ||
                  "Error adding key result, please try again or contact support.",
              });
            }
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
    } catch (error) {
      console.error("Error creating kri", error);
    }
  };

  useEffect(() => {
    if (revealKRIs) fetchKeyResults();
  }, [revealKRIs]);

  useEffect(() => {
    if (showReveal) setrevealKRIs(true)
  }, [showReveal])

  return (
    <section id={`kri-${id}`} className="hover:bg-slate-50 rounded-lg px-5">
      <div
        className="flex items-center justify-between py-3 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-start space-x-4 w-full md:w-1/2">
          <svg
            className="w-14 fill-white"
            viewBox="0 0 69 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_39_5036)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.7493 7.97543C42.3676 7.97543 48.3957 10.5104 52.913 14.6612L56.2242 12.7798L54.3591 16.1004C58.5597 20.6286 61.127 26.6917 61.127 33.3531C61.127 39.9257 58.6284 45.916 54.5289 50.4226L56.3886 53.6933L53.1206 51.8538C48.5803 56.1177 42.4687 58.7309 35.7493 58.7309C29.0986 58.7309 23.0463 56.173 18.5208 51.9858L15.1086 53.9278L17.033 50.4926C12.8957 45.9766 10.3716 39.9594 10.3716 33.3531C10.3716 26.6256 12.9901 20.51 17.2635 15.9684L15.4576 12.7946L18.657 14.5951C23.1662 10.4834 29.166 7.97543 35.7493 7.97543ZM34.783 0L37.7317 3.7101V1.13877C37.7317 0.774902 37.6805 0.532324 37.5767 0.404297C37.4352 0.230449 37.198 0.148242 36.8651 0.153633V0H38.8435V0.153633C38.5901 0.187324 38.4203 0.229102 38.3327 0.280312C38.2478 0.332871 38.1791 0.416426 38.1292 0.535019C38.0807 0.652266 38.0578 0.854414 38.0578 1.13877V6.1251H37.9082L33.8653 1.13203V4.95129C33.8653 5.29764 33.9434 5.53213 34.1011 5.65476C34.2601 5.77605 34.442 5.8367 34.6455 5.8367H34.7871V5.99033H32.6551V5.8367C32.9866 5.834 33.2157 5.76527 33.3451 5.63186C33.4758 5.49709 33.5405 5.27203 33.5405 4.95129V0.715605L33.4151 0.560625C33.2885 0.397559 33.1766 0.291094 33.0796 0.239883C32.9825 0.188672 32.8424 0.159023 32.6604 0.153633V0H34.783ZM37.4298 60.7645L37.4743 62.7617H37.2937C37.2088 62.2617 36.9999 61.8601 36.6643 61.5555C36.3288 61.251 35.9676 61.0987 35.5795 61.0987C35.2776 61.0987 35.0404 61.1782 34.8652 61.3399C34.69 61.4989 34.6024 61.6849 34.6024 61.8925C34.6024 62.0245 34.6334 62.1418 34.6954 62.2455C34.7803 62.383 34.9164 62.5205 35.1064 62.6552C35.2453 62.7523 35.5646 62.9248 36.0646 63.1727C36.7654 63.515 37.2384 63.8412 37.4824 64.1457C37.7249 64.4517 37.8449 64.802 37.8449 65.1956C37.8449 65.6955 37.6495 66.1254 37.26 66.4853C36.8692 66.8451 36.3746 67.0257 35.7735 67.0257C35.5849 67.0257 35.4056 67.0055 35.2385 66.9677C35.0701 66.93 34.8598 66.8586 34.6065 66.7508C34.465 66.6928 34.3491 66.6645 34.2574 66.6645C34.1806 66.6645 34.0997 66.6942 34.0148 66.7534C33.9286 66.8127 33.8599 66.903 33.8073 67.0257H33.6537V64.767H33.8073C33.9367 65.4004 34.186 65.8856 34.5553 66.2184C34.9259 66.5513 35.3234 66.7184 35.7506 66.7184C36.0808 66.7184 36.3436 66.6281 36.5404 66.4489C36.7358 66.2696 36.8328 66.0621 36.8328 65.8222C36.8328 65.6821 36.7964 65.546 36.7209 65.4125C36.6455 65.2805 36.5323 65.1551 36.3786 65.0352C36.225 64.9166 35.9541 64.7616 35.566 64.5702C35.0202 64.3034 34.6294 64.0743 34.3908 63.8856C34.155 63.6983 33.9731 63.4867 33.845 63.2549C33.717 63.0218 33.6537 62.7657 33.6537 62.4868C33.6537 62.0097 33.8275 61.6041 34.1793 61.2671C34.5283 60.9316 34.969 60.7645 35.5027 60.7645C35.6967 60.7645 35.8854 60.7874 36.0673 60.8332C36.2048 60.8696 36.3746 60.9343 36.5727 61.03C36.7721 61.1243 36.9096 61.1715 36.9905 61.1715C37.0673 61.1715 37.1266 61.1485 37.1711 61.1014C37.2142 61.0556 37.2573 60.9424 37.2937 60.7645H37.4298ZM65.8371 30.7023V33.1416H65.957C66.3384 33.1416 66.6133 33.0216 66.7845 32.7844C66.9556 32.5459 67.0648 32.1955 67.1119 31.7319H67.2831V34.8666H67.1119C67.0769 34.5256 67.0014 34.2453 66.8896 34.0283C66.775 33.81 66.643 33.6631 66.4934 33.5876C66.3424 33.5135 66.1241 33.4758 65.8371 33.4758V35.159C65.8371 35.4892 65.8519 35.6886 65.8802 35.7627C65.9071 35.8369 65.9597 35.8975 66.0365 35.9433C66.1133 35.9905 66.2373 36.0148 66.4071 36.0148H66.7656C67.3235 36.0148 67.7723 35.884 68.1105 35.6266C68.4475 35.3692 68.69 34.9771 68.8356 34.4461H69L68.7305 36.349H63.5609V36.1953H63.7576C63.9315 36.1953 64.0716 36.163 64.1767 36.101C64.2536 36.0592 64.3129 35.9892 64.3533 35.8881C64.3843 35.8167 64.4018 35.6307 64.4018 35.3275V31.3788C64.4018 31.1066 64.3937 30.9395 64.3789 30.8761C64.3506 30.7724 64.2967 30.6929 64.2158 30.6376C64.1053 30.5541 63.953 30.5123 63.7576 30.5123H63.5609V30.3587H68.5661V32.1295H68.3949C68.31 31.6955 68.1901 31.3856 68.0364 31.1969C67.8828 31.0082 67.6658 30.8708 67.3842 30.7818C67.2197 30.7293 66.9125 30.7023 66.461 30.7023H65.8371ZM8.87297 30.2899V30.4436C8.76246 30.453 8.66678 30.4853 8.58996 30.5392C8.51314 30.5945 8.44576 30.678 8.38512 30.7886C8.36895 30.8249 8.2773 31.054 8.11154 31.4759L6.23695 36.4164H6.07523L4.59416 32.5176L2.95271 36.4164H2.79639L0.820723 31.5271C0.619922 31.0311 0.481113 30.7306 0.401602 30.6268C0.32209 30.5231 0.188672 30.4624 0 30.4436V30.2899H2.59424V30.4436C2.38535 30.4503 2.24654 30.4813 2.17781 30.5406C2.10773 30.5985 2.0727 30.67 2.0727 30.7562C2.0727 30.8694 2.14547 31.1079 2.28967 31.4745L3.46348 34.3801L4.41357 32.085L4.17504 31.4664C4.04027 31.1187 3.93516 30.8856 3.86238 30.7697C3.78826 30.6538 3.70336 30.5689 3.60768 30.5204C3.51334 30.4692 3.37318 30.4436 3.18721 30.4436V30.2899H6.06311V30.4436C5.86096 30.4476 5.71541 30.4638 5.62646 30.4948C5.56447 30.5136 5.5173 30.55 5.48227 30.5985C5.44588 30.647 5.42971 30.7036 5.42971 30.7656C5.42971 30.8344 5.49439 31.0433 5.62646 31.395L6.71537 34.2291L7.68973 31.6645C7.79215 31.3977 7.85549 31.2144 7.87975 31.116C7.904 31.0177 7.91478 30.9274 7.91478 30.8452C7.91478 30.7225 7.87301 30.6282 7.7908 30.5568C7.70994 30.488 7.55092 30.4503 7.31912 30.4436V30.2899H8.87297ZM30.546 41.7625L22.8872 46.1195L27.3669 38.1616L29.7347 38.8125L13.2825 34.2898C13.521 40.1278 15.9846 45.3918 19.8483 49.2541C23.6352 53.0424 28.7711 55.4843 34.473 55.8037L30.546 41.7625ZM27.4073 28.0366L23.1042 20.4722L30.6646 24.7281L34.465 10.9039C28.7657 11.2246 23.6338 13.6666 19.8483 17.4521C16.0816 21.2188 13.645 26.317 13.3041 31.9812L29.9503 27.3264L27.4073 28.0366ZM40.7572 24.8791L48.5224 20.4615L44.2072 28.1296L41.4539 27.3722L58.1931 31.9731C57.8495 26.3116 55.4156 21.2175 51.6503 17.4521C47.8229 13.6248 42.6196 11.1707 36.8463 10.8945L40.7572 24.8791ZM44.2045 38.2007L48.6261 45.9726L40.7733 41.5523L36.8544 55.8132C42.625 55.5329 47.8243 53.0801 51.6503 49.2541C55.5154 45.3891 57.9789 40.1224 58.2161 34.2817L44.2045 38.2007ZM35.6078 33.1456L35.6603 33.2009L30.7117 38.4931L11.257 33.1456H35.6078ZM35.8908 33.1227L35.8369 33.0688L37.3853 31.4125L35.5943 33.1348L30.3021 28.1862L35.6496 8.73146V33.0742L37.4271 31.3694L40.7855 27.7765L60.2402 33.1227H35.8908ZM35.7264 33.5715L41.0186 38.5201L36.26 55.8334L35.6711 57.9748V33.6321L35.7264 33.5715Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_39_5036">
                <rect width="69" height="67.0257" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className="pt-3">
            <h2 className="font-bold text-lg mb-0">{objective_title}</h2>

            {showAddkey && (
              <Button
                type="text"
                className="p-4 mt-1 flex items-center space-x-2"
                onClick={(e) => handleRevealKIs(e)}
              >
                <PlusCircleOutlined />
                <span className="text-gray-500 font-semibold">
                  Add a new key result
                </span>
                {revealKRIs ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </Button>
            )}
          </div>
        </div>

        {showTime && (
          <div className="p-2 bg-gray-200">
            <div>
              {getQuater(target_date)} -{" "}
              {target_date ? new Date(new Date(target_date))?.getFullYear() : ""}
            </div>
            <p className="text-sm m-0 font-medium pt-1">
              {formatDate(target_date)}
            </p>
          </div>
        )}

        <div className="min-w-[10rem]">
          {kri_type_id === 2 && !router.pathname.includes('/approve') && (
            <div
              className={`${
              approval_status ? "visible" : "invisible"
              } ${approval_status === 'decline' ? 'bg-danger' : approval_status === 'pending' ? 'bg-orange-500' : 'bg-green-900'} text-white p-2 rounded-lg text-base capitalize`}
            >
              {approval_status} Approval
            </div>
          )}
        </div>
      </div>

      {revealKRIs && (
        <div className="pb-10 ant-aos-animate">
          <KRITable
            columns={columns}
            dataSource={dataSource}
            setInfo={setInfo}
            loading={loading}
            addRecord={enableUpdate}
          />

          {enableUpdate && (
            <div className="pt-2 flex justify-between items-start">
              <AddComment
                handleInputChange={(val) => {
                  setInfo({ comment: val });
                }}
              />

              <Button
                size="large"
                type="primary"
                shape="default"
                className="bg-primary text-white !px-10 font-bold text-sm rounded-none mt-3"
                loading={loading}
                onClick={() => addUpdateKeyResults()}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default KRIItem;
