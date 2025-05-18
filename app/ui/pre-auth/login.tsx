"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter()


  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      setIsError(true);
      return;
    }
    let phoneNo = phoneNumber.replace("+91","");

    if(phoneNo.length != 10 ) {
      setIsError(true);
      return;
    }
    setIsError(false);
    // Handle login/signup logic here
    console.log("Continuing with phone number:", phoneNumber);
    router.push(`/login/${phoneNo}/verification`)
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div className="relative w-full h-screen rounded-[10px] bg-white">
        {/* Background Image */}
        <div className="relative w-full h-[620px]">
          <Image
            src="/images/vegetable-background.png"
            alt="Fresh vegetables and produce"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay for text */}
          <div className="absolute left-[35px] top-[492px] w-[330px] h-[107px]">
            <svg
              width="330"
              height="107"
              viewBox="0 0 330 107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 40C0 17.9086 17.9086 0 40 0H290C312.091 0 330 17.9086 330 40V67C330 89.0914 312.091 107 290 107H40C17.9086 107 0 89.0914 0 67V40Z"
                fill="white"
                fillOpacity="0.53"
              ></path>
            </svg>
          </div>
        </div>

        {/* Bottom Sheet */}
        <div className="absolute bottom-0 left-0 right-0 h-[348px] bg-white rounded-t-[43px] flex flex-col items-center">
          {/* Title */}
          <h1 className="w-full max-w-[361px] text-center mt-[35px] text-black font-bold text-[20px]">
            All in one solution for restaurant delivered to your doorstep
          </h1>

          {/* Form Section */}
          <div className="mt-[40px] w-full px-[27px]">
            <label className="text-[#5F5B5B] text-[16px] font-semibold mb-[4px] block">
              Login / Signup :
            </label>

            {/* Phone Input */}
            <div className="flex items-center w-full h-[44px] rounded-[5px] border border-[#E1E1E1] bg-white px-[9px] gap-[9px]">
              <Image
                src="/images/indian-flag.png"
                alt="India flag"
                width={24}
                height={16}
              />
              <span className="text-black text-[13px]">+91</span>
              <input
              name="number"
              autoComplete="tel"
              autoFocus
                type="tel"
                placeholder="Enter mobile number"
                className="flex-1 text-[#000000] text-[13px] border-none focus:outline-none"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (isError) setIsError(false);
                }}
              />
            </div>

            {/* Error Message */}
            {isError && (
              <div className="text-[#F00] text-[14px] mt-[8px]">Required*</div>
            )}

            {/* Continue Button */}
            <button
              className="w-full h-[58px] bg-[#099FFF] rounded-[5px] text-white text-[20px] font-bold mt-[42px]"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[17px] bg-gray-600">
        </div>
      </div>
    </div>
  );
}
