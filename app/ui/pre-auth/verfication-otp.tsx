"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Pencil1Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { TermsCondition } from "../legal/terms_condition";

export default function VerificationOTP() {
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [whatsappError, setWhatsappError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [modal, setModal] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
  ]);
  const router = useRouter();
   
  let paramValue = useParams();
  let phoneNo = paramValue.phoneNo;

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input if current input is filled
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otpValues[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (!termsAgreed) {
      setShowTermsError(true);
      if (!whatsappConsent) {
      setWhatsappError(true);
      return;
    }
      return;
    }
     

    const otp = otpValues.join("");
    if (otp.length !== 4) {
      // Handle incomplete OTP
      setOtpError(true)
      return;
    }

    // // Handle verification logic here
    // console.log("Verifying OTP:", otp);
    // console.log("WhatsApp consent:", whatsappConsent);
    // console.log("Terms agreed:", termsAgreed);

    // Navigate to next page after verification
    // router.push("/dashboard"); // Uncomment when ready to navigate

    // first getting checking if the user exist with the number and on verfication sending the to the dashboard
    //TODO  -- exist or don't if don't then invitation code is required for the person
    // if exist the user but we don't have the information about the user then 
    // all information i.e -- only the name, restaurant and delivery, address as well 
    // router.push("/registration/<userid>")
    router.push("/login/invite-code")
  };

  const handleTermsChange = () => {
    setTermsAgreed(!termsAgreed);
    if (!termsAgreed) {
      setShowTermsError(false);
     
    }
  };

  function openModal() {
      setModal(true)
  }

  return (
    <div className="w-full max-h-screen select-none bg-white overflow-hidden">
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/market1.png" // Update with actual image path
            alt="market background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#15280B] via-[#283920] via-[#3A4732] to-transparent px-[31px] pt-[45px]">
          {/* Header Text */}
          <div className="text-white font-semibold text-[20px] mb-[3px]">
            Enter verification code
          </div>
          <div className="text-white/50 text-[14px] flex flex-col ">
            4 digit OTP has been sent to +91 {phoneNo}
            <div onClick={function () {
                router.push("/login")
            }} className="text-xs text-gray-600 cursor-pointer flex self-end mt-4">
            <Pencil1Icon className="size-4 "/> edit number* 
          </div>
          </div>
          

          {/* OTP Input Container */}
          <div className="mt-[30px] w-full bg-[rgba(22,41,12,0.33)] p-[30px]">
            <div className="flex gap-[15px] justify-center">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-[40px] h-[44px] bg-white rounded-[5px] relative"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="tel"
                    maxLength={1}
                    value={otpValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="caret-red-600 w-full h-full bg-transparent text-center text-black text-xl font-bold focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
          {
            otpError && <div className="text-red-800 text-sm">
              Required*
            </div>
          }

          {/* WhatsApp Consent Checkbox */}
          <div className="mt-[34px]">
            <div className="flex items-start gap-[17px]">
              <div
                className={clsx(`w-[24px] h-[24px]  rounded-[5px] flex items-center justify-center cursor-pointer`, {"bg-[#86CB50]":whatsappConsent},{"bg-white":!whatsappConsent} )}
                onClick={() => {setWhatsappConsent(!whatsappConsent)
                    setWhatsappError(false)
                }}
              >
                {whatsappConsent && (
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4.48148L4.04043 8.77793C4.82015 9.87976 6.445 9.90869 7.26337 8.83525L9.80652 5.5L14 0"
                      stroke="white"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                )}
              </div>
              <div className={clsx("text-[16px] leading-[21px] font-extralight", {"text-red-600":whatsappError, "text-white ": !whatsappError})}>
                <span>I agree to receive WhatsApp messages</span>
                <br />
                <span>for marketing &amp; other purposes.</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="mt-[19px] flex items-center gap-[17px]">
            <div
            className={clsx(`w-[24px] h-[24px]  rounded-[5px] flex items-center justify-center cursor-pointer`, {"bg-[#86CB50]":termsAgreed,"bg-white":!termsAgreed} )}
              onClick={handleTermsChange}
            >
              {termsAgreed && (
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.48148L4.04043 8.77793C4.82015 9.87976 6.445 9.90869 7.26337 8.83525L9.80652 5.5L14 0"
                    stroke="#ffffff"
                    strokeWidth="2" 
                    strokeLinejoin="round"
                      strokeLinecap="round"
                  ></path>
                </svg>
              )}
            </div>
            <div onClick={function () {
                openModal();
            }}
              className={`text-[16px] font-light underline ${showTermsError ? "text-red-600" : "text-white"}`}
            >
              I agree to terms &amp; condition {showTermsError && "*"}
            </div>
          </div>

          {/* Verify Button */}
          <div className="mt-[32px]">
            <button
              onClick={handleVerify}
              className=" text-white text-[24px] font-bold w-full h-[58px] bg-[#86CB50] cursor-pointer rounded-[5px] shadow-[0px_4px_4px_0px_#283920] flex items-center justify-center"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      {
        modal &&  <TermsCondition modal={setModal}/>
      }
    </div>
  );
}