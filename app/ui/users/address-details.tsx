"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

interface AddressDetailsProps {
  userId: string;
  address?: string;
}

export default function AddressDetails({
  userId,
  address,
}: AddressDetailsProps) {
  const router = useRouter();
  const [shopDetails, setShopDetails] = useState("");
  const [pincode, setPincode] = useState("");
  const [requiredFilled, setRequiredFilled] = useState(true);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [receiver, setReceiver] = useState<"staff" | "manager" | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSaveAddress = () => {
    // Here you would typically save the address details to your backend
    if(pincode.length != 6 || shopDetails.length == 0 || receiver == null ) {
        
        setRequiredFilled(false);
        return;
    }


    console.log({
      userId,
      shopDetails,
      deliveryInstructions,
      receiver,
    });
    //checking here if the address is where are delivering to or not and then providing the things.
    //pincode

    //coming soon if not available.
    // right for directing it to the coming soon page.

    // Navigate to the next page in the flow (e.g., dashboard or confirmation)
    router.push(`/not-available`);
  };

  const handleChangeAddress = () => {
    router.push(`/users/${userId}/address`);
  };

  return (
    <div className=" bg-white h-screen w-full font-dm-sans text-black">
      <div className="bg-white border-b border-gray-400 flex w-full px-8 py-5 gap-10 text-xl font-semibold ">
        <div onClick={handleBack} className="cursor-pointer">
          <ChevronLeftIcon className="w-8 h-8" />
        </div>
        <div className="mx-2">
          Add Address Details
        </div>
      </div>

      <div className="w-full relative">
        <Image
          src="/image3.png"
          alt="Map"
          width={480}
          height={375}
          className="object-cover w-full h-[300px]"
          priority
        />
      </div>

      <div className="rounded-[5px] bg-white  w-full pt-[25px]">
        <div className="flex w-full px-2 flex-col">
          <div className="self-start flex gap-1 text-xl text-black font-bold">
            <Image
              src="/location-pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="flex-shrink-0"
            />
            <div>
              {address?.split(",").slice(1,3).join(",")}
              <br />
            </div>
          </div>

          <div className="self-end flex gap-2 mt-2 items-center">
            <div className="text-[#B4B4B4] text-[13px] font-normal ml-8 w-[70%]">
              {address ||
                "Shop No. 11, DDA Market, near indraprastha world school A 2 Block, Paschim Vihar, Delhi, 110063"}
            </div>
            <div
              onClick={handleChangeAddress}
              className="rounded-[5px] bg-white border border-[#B4B4B4] py-1 px-2 overflow-hidden text-[14px] text-[#585858] font-medium whitespace-nowrap cursor-pointer"
            >
              change
            </div>
          </div>
        </div>

        <div className="border border-[rgba(180,180,180,0.33)] mt-[21px] w-[392px] max-w-full h-[2px]" />

        <div className="flex mt-2 w-full flex-col text-base text-black font-bold px-6">
          <div>Add address</div>
          <div className="text-[#5F5B5B] text-[14px] font-normal mt-3  mb-3">
            shop no & floor <span className="text-red-500">*</span> :
          </div>

          <input
            type="text"
            value={shopDetails}
            onChange={(e) => setShopDetails(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch w-full h-[43px] px-3"
            placeholder="Shop no & floor "
          />
           <div className="text-[#5F5B5B] text-[14px] mt-3  mb-3">
            Pincode <span className="text-red-500">*</span>: 
          </div>

          <input
            type="tel"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch  text-thin w-full h-[43px] px-3"
            placeholder="Enter Pincode"
          />

          <div className="mt-[13px]">Additional delivery instruction</div>

          <textarea
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch mt-[9px] w-full h-[83px] px-3 py-2 resize-none"
            placeholder="Add any special instructions for delivery"
          />

          <div className="mt-[13px]">Who will receive goods<span className="text-red-500">*</span></div>

          <div className="flex mt-4 w-[226px] max-w-full items-stretch gap-5 text-[#00429a] whitespace-nowrap justify-between">
            <div
              onClick={() => setReceiver("staff")}
              className={clsx(
                "rounded-[5px] bg-[#EBF6FF] px-[23px] py-[9px] cursor-pointer",
                { "ring-2 ring-[#00429a]": receiver === "staff" },
              )}
            >
              staff
            </div>

            <div
              onClick={() => setReceiver("manager")}
              className={clsx(
                "rounded-[5px] bg-[#EBF6FF] px-4 py-[9px] cursor-pointer",
                { "ring-2 ring-[#00429a]": receiver === "manager" },
              )}
            >
              manager
            </div>
          </div>

          <button
            onClick={handleSaveAddress}
            className="cursor-pointer rounded-[5px] bg-[#099FFF] shadow-[0px_4px_6px_rgba(0,0,0,0.14)] self-stretch mt-[26px] w-full px-[70px] py-[14px] text-2xl text-white font-bold"
          >
            save address
          </button>
          <div>
            {
                !requiredFilled ? <div className="font-thin mt-2 text-blue-600"><span className="text-red-500">*</span> required to fill</div> :""
            }
          </div>
        </div>

        <div className="bg-[#D9D9D9] flex min-h-[24px] mt-[27px] w-full" />
      </div>
    </div>
  );
}
