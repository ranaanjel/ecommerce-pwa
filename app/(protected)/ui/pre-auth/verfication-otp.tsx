"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { Pencil1Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { TermsCondition } from "../legal/terms_condition";
import { signIn } from "next-auth/react";

export default function VerificationOTP() {
  const [password, setPassword] = useState<string>("")
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [whatsappError, setWhatsappError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [modal, setModal] = useState(false)
  const inputRefs = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
   
  let paramValue = useParams();
  let phoneNo = paramValue.phoneNo;

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current.focus();
    }
  }, []);

  const handleInputChange = ( value: string) => {
  
    setPassword(value);
    // Auto-focus next input if current input is filled
  };



  const handleVerify = async () => {
    if (!termsAgreed) {
      setShowTermsError(true);
      if (!whatsappConsent) {
      setWhatsappError(true);
      return;
    }
      return;
    }
     


    if (password.length == 0) {
      // Handle incomplete OTP
      setPasswordError(true)
      return;
    }

  let response = await  signIn("credentials", {
      redirect:false,phone:phoneNo, password
    })

    if(response.error) {
      setPasswordWrong(true);
      return;
    }else {
      redirect("/dashboard")
    }
    
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
        <div className="relative w-full h-full bg-gradient-to-b from-[#15280B] via-[#283920]  to-transparent px-[31px] pt-[45px]">
          {/* Header Text */}
          <div className="text-white font-semibold text-[20px] mb-[3px]">
            Enter/Create your passcode
          </div>
          <div className="text-white/50 text-[14px] flex flex-col ">
            Linked with +91 {phoneNo}
            <div onClick={function () {
                router.push("/login")
            }} className="text-xs text-gray-600 cursor-pointer flex self-end mt-4">
            <Pencil1Icon className="size-4 "/> edit number* 
          </div>
          </div>
          

          {/* OTP Input Container */}
          <div className="mt-[30px] w-full bg-[rgba(22,41,12,0.33)] p-[30px]">
            <div className="flex gap-[15px] justify-center">
               <input
                    ref={inputRefs}
                    type="password"
                    // value={password}
                    onChange={(e) => handleInputChange( e.target.value)}
                    // onKeyDown={(e) => handleKeyDown( e)}
                    className="caret-red-600 w-full h-full bg-white rounded-sm text-justify px-4 text-gray-500 text-xl p-2 focus:outline-none"
                  />
              {/* {[0, 1, 2, 3].map((index) => (
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
              ))} */}
            </div>
          </div>
          {
            passwordError && <div className="text-red-800 text-sm">
              Required*
            </div>
          }
          {
            passwordWrong && <div className="text-red-800 text-sm">
              Wrong Password*
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