import { Button, Modal, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import OtpInput from "react-otp-input";

// Redux
import api from "./../../../services/config";

const VerifyAuth = ({ 
  type="email",
  email,
  show = false,
  setshow=()=>{},
  handleVerifyComplete=()=>{}
}) => {
  // const router = useRouter();
  const [code, setcode] = useState("");
  const [load, setload] = useState(false);

  const handlePhoneOTPSend = () => {
    // Send OTP to phone
    setload(true);

    api.post('/user/resend-otp', { email })
    .then(() => {
      setload(false);
      notification.success({ message: "Otp sent successfully" });
      console.log('Phone otp sent successfully');
    }, (err) => {
      setload(false);
      console.error('Error sending OTP', err);    
      notification.error({ message: "Error Logging in" })
    })
  }

  const handleVerify = (code) => {
    setload(true);

    api.post('/user/confirm-sign-up', { email, code })
    .then(() => {
      setload(false)
      notification.success({ message: "Verification completed" });

      setshow(false)
      handleVerifyComplete()
    }, (error) => {
      setload(false) 
      notification.error({ message: error?.response?.data?.message || 'Error verify email, please try again' })
      handleVerifyComplete()
    })
  }

  const handleResend = () => {
    handlePhoneOTPSend()
  }

  return (
      <Modal
        className="w-full sm:w-1/2 md:w-64"
        open={show}
        closable={false}
        centered
        footer={null}
        onCancel={() => {
          setshow(false);
        }}
      >
      <section className="w-full mx-auto bg-white">
        <div className="pb-8 flex items-center space-x-4">
          <label htmlFor="title" className="text-3xl font-bold">
            Verify Email
          </label>
        </div>

        <div className="rounded-xl bg-default px-4 py-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" width="47" height="24" viewBox="0 0 47 24" fill="none">
            <path
              d="M12.5 15.4C11.5667 15.4 10.7667 15.0667 10.1 14.4C9.43333 13.7333 9.1 12.9333 9.1 12C9.1 11.0667 9.43333 10.2667 10.1 9.6C10.7667 8.93333 11.5667 8.6 12.5 8.6C13.4333 8.6 14.2333 8.93333 14.9 9.6C15.5667 10.2667 15.9 11.0667 15.9 12C15.9 12.9333 15.5667 13.7333 14.9 14.4C14.2333 15.0667 13.4333 15.4 12.5 15.4ZM12.5 24C9.16667 24 6.33333 22.8333 4 20.5C1.66667 18.1667 0.5 15.3333 0.5 12C0.5 8.66667 1.66667 5.83333 4 3.5C6.33333 1.16667 9.16667 0 12.5 0C14.9 0 17 0.566666 18.8 1.7C20.6 2.83333 22.0167 4.55 23.05 6.85H40.85L46.5 12.5L38.15 20.15L33.75 16.95L29.35 20.15L25.6 17.15H23.05C22.2167 19.15 20.9083 20.7917 19.125 22.075C17.3417 23.3583 15.1333 24 12.5 24ZM12.5 21C14.4333 21 16.2167 20.3583 17.85 19.075C19.4833 17.7917 20.5333 16.15 21 14.15H26.7L29.4 16.4L33.8 13.25L37.9 16.35L42.15 12.4L39.6 9.85H21C20.6 7.98333 19.6 6.375 18 5.025C16.4 3.675 14.5667 3 12.5 3C10 3 7.875 3.875 6.125 5.625C4.375 7.375 3.5 9.5 3.5 12C3.5 14.5 4.375 16.625 6.125 18.375C7.875 20.125 10 21 12.5 21Z"
              fill="#797979"
            />
          </svg>

          <p className="p-4 pt-6">
            Please enter the 4-digit security code that we've just sent to:{' '}
            <b>{email}</b>
          </p>
        </div>

        <div className="pt-8 pb-3">
          <label htmlFor="title" className="text-xl font-medium">
            Security code
          </label>
        </div>

        <div className="space-x-4 text-xl sm:space-x-8 lg:space-x-10">
          <div className="flex flex-row items-center justify-between w-full max-w-xs">
            <OtpInput
              value={code}
              onChange={(e)=>{ setcode(e)}}
              numInputs={6}
              shouldAutoFocus
              inputStyle="!w-[100%] text-2xl lg:text-4xl font-bold p-0 h-[80%] border-none text-black bg-transparent !ring-0 !outline-none"
              className="w-16 h-16 flex items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-default mr-4"
            />
          </div>

        </div>

        <div className="pt-12 pb-6 space-y-5">
          <button type="link" className="text-base font-medium hover:underline text-prime"
            onClick={() => handlePhoneOTPSend()}
          >
            Resend Code
          </button>

          <Button
            type="primary"
            className="bg-primary text-white h-12 flex w-full items-center justify-center rounded-lg p-3"
            onClick={() => { handleVerify(code, type) }}
          >
            {load && (
              <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Continue
          </Button>

          <button
            className="mt-5 text-prime hover:underline"
            onClick={() => { 
              setshow(false)
              handleVerifyComplete()
            }}
            type='button'
          >
            Back
          </button>        
        </div>
      </section>
    </Modal>
  )
}

export default VerifyAuth;
