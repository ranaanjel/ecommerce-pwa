"use client";

import { useState , useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ChevronDownIcon, ClockIcon } from "@radix-ui/react-icons";

interface RegistrationDetailsProps {
  userId: string;
}

export default function RegistrationDetails({
  userId,
}: RegistrationDetailsProps) {

  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantType, setRestaurantType] = useState<string | null>(null);
  const [otherType, setOtherType] = useState("");
  const [startTime, setStartTime] = useState("10");
  const [endTime, setEndTime] = useState("11");
  const [showError, setShowError] = useState(false);
  const otherRef = useRef<HTMLInputElement|null>(null)

  
  // useEffect for any additional initialization or validation
  useEffect(() => {
    // You could add validation here to check if the user exists
    // or if they're authorized to access this page
    console.log("Registration page loaded for user:", userId);
  }, [userId]);

  const handleSubmit = () => {
    if (
      !restaurantName ||
      !restaurantType ||
      (restaurantType === "others" && !otherType) ||
      startTime > endTime
    ) {

      setShowError(true);
      return;
    }
    // we have checked the user id.
    // Here you would typically save the data to your backend -- user details - preferences to save on the backend.
    console.log({
      userId,
      restaurantName,
      deliveryTime: ``,
    });

    // Navigate to the next page (dashboard or additional registration steps)
    let type = restaurantType === "others" ? otherType : restaurantType;
    let searchParameter = "restaurantName="+ restaurantName + "&restaurantType="+type+"&deliveryTiming="+`${startTime}-${endTime}`;
    // console.log(searchParameter)
    router.push("/users/"+userId+"/address?"+searchParameter);
  };

  return (
    <div className="rounded-[10px mx-auto max-w-[480px] w-full overflow-hidden font-dm-sans bg-gradient-to-t from-[#00429A] via-[#00429A] to-[#ffffff]">
      <div className="w-full px-4 overflow-hidden">
        <div className="flex items-center gap-5 justify-between">
          <div className="text-[#00429a] text-2xl font-bold">
            Enter your details :{" "}
          </div>
          <div className="text-red-600 text-sm font-normal">Required*</div>
        </div>
        <div className="rounded-[10px] bg-[#5D86BF] flex mt-3 w-full px-5 py-14 flex-col overflow-hidden items-start text-2xl text-white font-medium">
          <div className="font-semibold">Restaurant name :</div>
          <input
            type="text"
            placeholder="Enter your restaurant name"
            autoComplete="restaurant-name"
            name="restaurant-name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className={clsx(
              "rounded-[5px] bg-white border border-[#B4B4B4] w-full mt-3.5 px-3.5 py-3.5  text-black text-sm focus:outline-none",
              { "border-red-500": showError && !restaurantName },
            )}
          />

          <div className="font-semibold mt-6.5">Type : </div>

          <div
            className="text-xl mt-3.5 cursor-pointer"
            onClick={() => setRestaurantType("chinese")}
          >
            {restaurantType === "chinese" ? (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-[#86CB50] w-6 h-6 flex items-center justify-center">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>chinese</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-white w-6 h-6 flex items-center justify-center">
                </div>
                <span>chinese</span>
              </div>
            )}
          </div>

          <div
            className="text-xl mt-3.5 cursor-pointer"
            onClick={() => setRestaurantType("indian")}
          >
            {restaurantType === "indian" ? (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-[#86CB50] w-6 h-6 flex items-center justify-center">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>indian</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-white w-6 h-6 flex items-center justify-center">
                </div>
                <span>indian</span>
              </div>
            )}
          </div>

          <div
            className="text-xl mt-3.5 cursor-pointer"
            onClick={() => setRestaurantType("italian")}
          >
            {restaurantType === "italian" ? (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-[#86CB50] w-6 h-6 flex items-center justify-center">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>italian</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-white w-6 h-6 flex items-center justify-center">
                </div>
                <span>italian</span>
              </div>
            )}
          </div>
           <div
            className="text-xl mt-3.5 cursor-pointer"
            onClick={() => {setRestaurantType("others") 
              otherRef.current?.focus();
              console.log(otherRef.current)
            }}
          >
            {restaurantType === "others" ? (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-[#86CB50] w-6 h-6 flex items-center justify-center">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>combination / others</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-[5px] bg-white w-6 h-6 flex items-center justify-center">
                </div>
                <span>combination / others</span>
              </div>
            )}
          </div> 

          <input
            type="text"
            ref={otherRef}
            placeholder="mention in case of others *"
            value={otherType}
            onChange={(e) => setOtherType(e.target.value)}
            disabled={restaurantType !== "others"}
            className={clsx(
              "border-b border-[#09476d] w-full mt-4 px-1.5 pt-5 pb-1.5 overflow-hidden text-sm font-normal focus:outline-none bg-transparent",
              { "opacity-50": restaurantType !== "others" },
              {
                "border-red-500":
                  showError && restaurantType === "others" && !otherType,
              },
            )}
          />

          <div className="font-semibold mt-6">Delivery time : <div className="text-sm text-amber-300 gap-2 items-center hidden"> 24 hr<ClockIcon/></div  ></div>
          <div className=" flex mt-8 w-[220px] max-w-full items-start gap-5 text-2xl text-[#00429a] font-normal pl-2">
            <div className="rounded-[3px] bg-white flex mt-1.5 px-2.5 py-2 items-center justify-center gap-1 text-center">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            //     clsx(
            //   "rounded-[5px] bg-white border border-[#B4B4B4] w-full mt-3.5 px-3.5 py-3.5  text-black text-sm focus:outline-none",
            //   { "border-red-500": showError && !restaurantName },
            // )}
                className={clsx("bg-transparent text-[#00429a] focus:outline-none appearance-none", {"text-red-500 border-red-500" : showError && startTime > endTime})}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                  if(hour < 8 || hour > 15) {
                    return "";
                  }
                  let time = String(hour);
                  if(hour < 12) {
                    time += " am"
                  }else if(hour == 12) {

                    time += " noon"
                  }else {
                    time = String(Number(time) -12)
                    time += " pm"

                  }
                  return (
                  <option key={hour} value={hour}>
                    {time}
                  </option>
                )})}
              </select>
              <ChevronDownIcon />
            </div>
            <div className="text-white text-4xl self-center">-</div>
            <div className="rounded-[3px] bg-white flex mt-2 px-3 py-2 items-center gap-1 text-center">
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={clsx("bg-transparent text-[#00429a] focus:outline-none appearance-none", {"text-red-500 border-red-500" : showError && startTime > endTime})}
              >
               {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                  if(hour < 8 || hour > 15) {
                    return "";
                  }
                  let time = String(hour);
                  if(hour < 12) {
                    time += " am"
                  }else if(hour == 12) {

                    time += " noon"
                  }else {
                    time = String(Number(time) -12)
                    time += " pm"

                  }
                  return (
                  <option key={hour} value={hour}>
                    {time}
                  </option>
                )})}
              </select>
             <ChevronDownIcon/>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="rounded-[5px] bg-[#099FFF] shadow-[0px_4px_6px_rgba(0,0,0,0.14)] w-full mt-20 px-[70px] py-3.5 font-bold whitespace-nowrap text-center"
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}
