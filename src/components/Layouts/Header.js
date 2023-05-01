import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Dropdown } from "antd";
import Cookies from "js-cookie";

const Header = ({ 
  profile={}
}) => {
  const router = useRouter();

  const dropdownItems = [
    {
      key: '1',
      label: (
        <Link href="/app/profile" className="py-1 text-base">
          Profile
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link href="/admin/business-information" className="py-1 text-base">
          Settings
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <div className="py-1 text-base"
          onClick={() => {
            handleLogout()
          }}
        >
          Logout
        </div>
      )
    },
  ];

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    localStorage.clear();
    
    router.push('/')
  }

  const MenuOverlay = () => (
    <div className="relative">
      {dropdownItems.map((el, index) => (
        <div className="px-3 py-1 hover:bg-slate-50" key={index}>
          {el.label}
        </div>
      ))}
    </div>
  )

  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white px-6 lg:py-2.5">
      <div className="flex items-center justify-between space-x-4">
        <div className="hidden md:block w-4/5">
          <div className="relative flex items-center text-gray-2 focus-within:text-cyan-400">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7099 19.2899L16.9999 15.6099C18.44 13.8143 19.1374 11.5352 18.9487 9.2412C18.76 6.94721 17.6996 4.81269 15.9854 3.27655C14.2713 1.74041 12.0337 0.919414 9.73283 0.982375C7.43194 1.04534 5.24263 1.98747 3.61505 3.61505C1.98747 5.24263 1.04534 7.43194 0.982375 9.73283C0.919414 12.0337 1.74041 14.2713 3.27655 15.9854C4.81269 17.6996 6.94721 18.76 9.2412 18.9487C11.5352 19.1374 13.8143 18.44 15.6099 16.9999L19.2899 20.6799C19.3829 20.7736 19.4935 20.848 19.6153 20.8988C19.7372 20.9496 19.8679 20.9757 19.9999 20.9757C20.1319 20.9757 20.2626 20.9496 20.3845 20.8988C20.5063 20.848 20.6169 20.7736 20.7099 20.6799C20.8901 20.4934 20.9909 20.2442 20.9909 19.9849C20.9909 19.7256 20.8901 19.4764 20.7099 19.2899ZM9.9999 16.9999C8.61544 16.9999 7.26206 16.5894 6.11091 15.8202C4.95977 15.051 4.06256 13.9578 3.53275 12.6787C3.00293 11.3996 2.86431 9.99214 3.13441 8.63427C3.4045 7.27641 4.07119 6.02912 5.05016 5.05016C6.02912 4.07119 7.27641 3.4045 8.63427 3.13441C9.99214 2.86431 11.3996 3.00293 12.6787 3.53275C13.9578 4.06256 15.051 4.95977 15.8202 6.11091C16.5894 7.26206 16.9999 8.61544 16.9999 9.9999C16.9999 11.8564 16.2624 13.6369 14.9497 14.9497C13.6369 16.2624 11.8564 16.9999 9.9999 16.9999Z"
                fill="#CDCDCD"
              />
            </svg>

            <input
              id="leadingIcon"
              type="search"
              name="leadingIcon"
              placeholder="Search"
              className="w-full pl-2 pr-4 py-2.5 rounded-xl text-base text-black placeholder-gray-2 outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div className="absolute right-3 w-[15px] h-[15px] rounded-lg bg-danger text-white flex items-center justify-center">
              <span className="text-sm">1</span>
            </div>
            <svg
              className="w-8 mr-3"
              viewBox="0 0 21 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7502 13.9259V10.0834C17.7484 8.37136 17.1409 6.71515 16.0351 5.4081C14.9293 4.10105 13.3966 3.22751 11.7085 2.94216V1.62508C11.7085 1.30461 11.5812 0.997267 11.3546 0.770661C11.128 0.544054 10.8206 0.416748 10.5002 0.416748C10.1797 0.416748 9.87235 0.544054 9.64574 0.770661C9.41914 0.997267 9.29183 1.30461 9.29183 1.62508V2.94216C7.60371 3.22751 6.07105 4.10105 4.96525 5.4081C3.85946 6.71515 3.2519 8.37136 3.25016 10.0834V13.9259C2.54504 14.1752 1.93429 14.6365 1.50163 15.2465C1.06897 15.8566 0.835598 16.5855 0.833496 17.3334V19.7501C0.833496 20.0706 0.960803 20.3779 1.18741 20.6045C1.41402 20.8311 1.72136 20.9584 2.04183 20.9584H5.836C6.11425 21.9823 6.72171 22.8862 7.56463 23.5306C8.40756 24.1751 9.43912 24.5242 10.5002 24.5242C11.5612 24.5242 12.5928 24.1751 13.4357 23.5306C14.2786 22.8862 14.8861 21.9823 15.1643 20.9584H18.9585C19.279 20.9584 19.5863 20.8311 19.8129 20.6045C20.0395 20.3779 20.1668 20.0706 20.1668 19.7501V17.3334C20.1647 16.5855 19.9313 15.8566 19.4987 15.2465C19.066 14.6365 18.4553 14.1752 17.7502 13.9259V13.9259ZM5.66683 10.0834C5.66683 8.80154 6.17605 7.57216 7.08248 6.66573C7.98891 5.75931 9.21828 5.25008 10.5002 5.25008C11.782 5.25008 13.0114 5.75931 13.9178 6.66573C14.8243 7.57216 15.3335 8.80154 15.3335 10.0834V13.7084H5.66683V10.0834ZM10.5002 22.1667C10.0784 22.1642 9.66469 22.0513 9.30008 21.8394C8.93548 21.6274 8.6327 21.3237 8.42183 20.9584H12.5785C12.3676 21.3237 12.0648 21.6274 11.7002 21.8394C11.3356 22.0513 10.9219 22.1642 10.5002 22.1667ZM17.7502 18.5417H3.25016V17.3334C3.25016 17.0129 3.37747 16.7056 3.60408 16.479C3.83068 16.2524 4.13803 16.1251 4.4585 16.1251H16.5418C16.8623 16.1251 17.1696 16.2524 17.3962 16.479C17.6229 16.7056 17.7502 17.0129 17.7502 17.3334V18.5417Z"
                fill="black"
              />
            </svg>
          </div>

          <Dropdown
            href="/app/profile"
            menu={{ items: dropdownItems }}
            trigger="click"
            overlayClassName="p-0"
            placement="bottomRight"
          >
            <div className="flex items-center dropdown cursor-pointer">
              <Image
                className="rounded-full"
                src="/assets/images/user_avatar.svg"
                width={47}
                height={47}
                alt="user"
              />

              <div className="flex items-center justify-center">
                <p className="px-4 mb-0 font-medium">
                  {profile.first_name || profile.last_name ? 
                      <>{profile?.first_name} <br /> {profile?.last_name}</>
                  :
                      <></>
                  }
                </p>
                <svg
                  width="13"
                  height="9"
                  viewBox="0 0 13 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5417 0.897317C12.3153 0.672861 12.0091 0.546875 11.6898 0.546875C11.3706 0.546875 11.0644 0.672861 10.838 0.897317L6.50005 5.16347L2.22255 0.897317C1.99615 0.672861 1.6899 0.546875 1.37067 0.546875C1.05145 0.546875 0.745196 0.672861 0.5188 0.897317C0.405545 1.00935 0.315651 1.14264 0.254306 1.28949C0.19296 1.43635 0.161377 1.59387 0.161377 1.75296C0.161377 1.91205 0.19296 2.06957 0.254306 2.21642C0.315651 2.36328 0.405545 2.49657 0.5188 2.6086L5.64213 7.71834C5.75446 7.8313 5.88811 7.92095 6.03535 7.98213C6.1826 8.04332 6.34053 8.07482 6.50005 8.07482C6.65956 8.07482 6.8175 8.04332 6.96475 7.98213C7.11199 7.92095 7.24564 7.8313 7.35797 7.71834L12.5417 2.6086C12.655 2.49657 12.7449 2.36328 12.8062 2.21642C12.8676 2.06957 12.8991 1.91205 12.8991 1.75296C12.8991 1.59387 12.8676 1.43635 12.8062 1.28949C12.7449 1.14264 12.655 1.00935 12.5417 0.897317Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
