import React, { useEffect } from "react";
import { Affix, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "redux/features/userSlice";

import ExportEntity from "./ExportEntity";
import DateFilter from "./DateFilter";

const AuthHead = ({ offsetTop=64, showFilter=true }) => {
    const dispatch = useDispatch();

    const { defaultView } = useSelector((state) => state.general);
    const { profile } = useSelector((state) => state.profile);
    const { users } = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(getUsers())
    }, [])
    
    return (
        <Affix offsetTop={offsetTop}>
        <div className="h-12 px-8 flex items-center justify-between bg-gray-2 dark:bg-dark">
            <div className="flex items-center h-full">
                <div className="bg-gray-4 h-full px-2 flex justify-center items-center">
                    <svg
                        width="40"
                        height="38"
                        viewBox="0 0 40 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M14.1508 25.683C14.4427 25.0606 14.7077 24.3794 14.8739 23.921C14.18 23.1224 13.5467 22.2793 12.9787 21.3979L11.061 18.5257C10.4524 17.7633 10.0753 16.861 9.96969 15.9143C9.95541 15.5919 10.0215 15.2708 10.1628 14.9765C10.3068 14.6837 10.5355 14.4346 10.823 14.2574C10.9628 14.168 11.1136 14.0946 11.2721 14.0387C11.1381 12.3274 11.1081 10.6103 11.1823 8.89574C11.2289 8.49742 11.3116 8.10353 11.4293 7.71827C11.9653 6.0992 13.1196 4.72184 14.6718 3.84947C15.5138 3.35056 16.4292 2.96947 17.3889 2.71826C18.0041 2.55426 16.8724 0.733395 17.5011 0.670317C20.5505 0.375951 25.4817 2.98319 27.6104 5.13627C28.7701 6.35827 29.4359 7.92207 29.4922 9.55596L29.3709 14.2238C29.6198 14.2819 29.8463 14.404 30.0249 14.5765C30.2035 14.7489 30.327 14.9647 30.3814 15.1994C30.5386 15.7713 30.3814 16.5661 29.8514 17.6552C29.8456 17.6767 29.8348 17.6968 29.82 17.7141L27.6329 21.0783C26.8898 22.3324 25.9848 23.4961 24.9383 24.5434C25.0416 24.6779 25.1404 24.8083 25.2347 24.9387C28.9398 30.0312 33.9383 27.4113 39.7496 31.3979L39.579 31.6124V37.0035H0.0400391V31.4652H0.147823C0.194355 31.3532 0.284114 31.2616 0.399321 31.2087C4.1628 29.1649 12.8394 28.4711 14.1508 25.683Z"
                        fill="white"
                        />
                    </svg>
                </div>
                <div className="pl-10 leading-snug">
                <div className="leading-tight">
                    <h3 className="font-bold text-base mb-0">
                        {profile.first_name || profile.last_name ? 
                            <>{profile.first_name} {profile.last_name}</>
                        :
                            <></>
                        }
                    </h3>
                    <p className="text-black/60 dark:text-gray-100 leading-snug font-semibold p-0 m-0 text-center">
                        {profile.org_name || ''}
                    </p>
                </div>
                </div>
            </div>

            <div className="flex items-center">
                <span className="text-[#878787] font-bold">Team Members</span>
                <div className="flex items-center space-x-1">
                    {users.slice(0,4).map((el, index) => (
                        <Popover key={el?.id || index} content={<div className="cursor-pointer font-bold">{el?.first_name} {el?.last_name}</div>} trigger="hover">
                            <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.1508 25.683C14.4427 25.0606 14.7077 24.3794 14.8739 23.921C14.18 23.1224 13.5467 22.2793 12.9787 21.3979L11.061 18.5257C10.4524 17.7633 10.0753 16.861 9.96969 15.9143C9.95541 15.5919 10.0215 15.2708 10.1628 14.9765C10.3068 14.6837 10.5355 14.4346 10.823 14.2574C10.9628 14.168 11.1136 14.0946 11.2721 14.0387C11.1381 12.3274 11.1081 10.6103 11.1823 8.89574C11.2289 8.49742 11.3116 8.10353 11.4293 7.71827C11.9653 6.0992 13.1196 4.72184 14.6718 3.84947C15.5138 3.35056 16.4292 2.96947 17.3889 2.71826C18.0041 2.55426 16.8724 0.733395 17.5011 0.670317C20.5505 0.375951 25.4817 2.98319 27.6104 5.13627C28.7701 6.35827 29.4359 7.92207 29.4922 9.55596L29.3709 14.2238C29.6198 14.2819 29.8463 14.404 30.0249 14.5765C30.2035 14.7489 30.327 14.9647 30.3814 15.1994C30.5386 15.7713 30.3814 16.5661 29.8514 17.6552C29.8456 17.6767 29.8348 17.6968 29.82 17.7141L27.6329 21.0783C26.8898 22.3324 25.9848 23.4961 24.9383 24.5434C25.0416 24.6779 25.1404 24.8083 25.2347 24.9387C28.9398 30.0312 33.9383 27.4113 39.7496 31.3979L39.579 31.6124V37.0035H0.0400391V31.4652H0.147823C0.194355 31.3532 0.284114 31.2616 0.399321 31.2087C4.1628 29.1649 12.8394 28.4711 14.1508 25.683Z"
                                    fill="white"
                                />
                            </svg>
                        </Popover>
                    ))}
                </div>
            </div>

            <div className="space-x-5 flex items-center">
                {(showFilter && defaultView) && (
                    <DateFilter />
                )}
                <ExportEntity />
            </div>
        </div>
        </Affix>
    );
};

export default AuthHead;
