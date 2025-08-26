"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { InfoValue, InsertData, registerUser, UpdateUser } from "@/actions/databaseCall";

interface AddressDetailsProps {
  userId: string;
  address?: string;
}

export default function AddressDetails({
  userId,
  address,
}: AddressDetailsProps) {
  const router = useRouter();
  const [addressValue, setAddressValue] = useState(address)
  const [shopDetails, setShopDetails] = useState("");
  const [pincode, setPincode] = useState("");
  const [tag, setTag] = useState("");
  const [additionalNo, setAdditonalNo] = useState("");
  const [requiredFilled, setRequiredFilled] = useState(true);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [receiver, setReceiver] = useState<"staff" | "manager" | null>(null);
  let params = useSearchParams();
  let [error, setError] = useState(false);
  let [errorMessage, setErrorMessage
  ] = useState("");

  let [errorNu, setErrorNu] = useState(false);
  let [errorMessageNu, setErrorMessageNu
  ] = useState("");
  let [isPending, startTransition] = useTransition();

  const handleBack = () => {
    router.back();
  };

  const handleSaveAddress =  async () => {
    // Here you would typically save the address details to your backend



    if (pincode.length != 6 || shopDetails.length == 0 || receiver == null || tag.length == 0 || (!!additionalNo && additionalNo.length !=10 ) || (additionalNo.length == 10 && additionalNo.match(/[^0-9]/))) {


      setRequiredFilled(false);
      if(additionalNo) {
        setErrorNu(true);
        setErrorMessageNu("Please add proper number")
      }
      return;
    }

    let searchValue = "restaurantName=" + params.get("restaurantName") + "&restaurantType=" + params.get("restaurantType") + "&deliveryTiming=" + params.get("deliveryTiming") + "&shopDetails=" + shopDetails + "&pincode=" + pincode + "&tag=" + tag + "&receiver=" + receiver + "&instruction=" + deliveryInstructions + "&address=" + addressValue + "&type=" + "return" + "&default=" + params.get("default") + "&additionalNo=" + additionalNo;

    //checking here if the address is where are delivering to or not and then providing the things.
    //pincode
    
    if (params.get("callback")) {
 
      //checking on the tag if exist or not in the database.
      //either modify or new value is created -- the routine is the same.

      //TODO ; pushing to the database and then 
      // waiting for the database callback and then only going to their
      //error throwing in case of the value is not valid  -- not deliverying and other things from the backend.
       
      const callback = params.get("callback");

      if (!params.get("callback")?.includes("/dashboard/crate")) {
        //i.e from account/address/userid --> fetching the latest and newest value  

        if (params.get("type") == "create") {
          const callback = params.get("callback");
          
          let data = await InsertData("new-address", "?"+ searchValue); 
          console.log(data)
          if(data == "tag:already") {
            setError(true);
            setErrorMessage("Tag Already Exist")
            return;
          }

          if (data&&callback) {
            router.push(callback.split("/").slice(0, callback.split("/").length - 2).join("/"));
          }

          return;
        }else {
          // modify one from the account/address
          let data = await UpdateUser("modify-address","?"+searchValue);
          if(data == "tag:not-exist") {
            setError(true);
            setErrorMessage("No Such Exist in the data")
            return;
          }
          if(data) {
            router.push(params.get("callback")!)
          }
          return
        }
      }else {
        //crate
        if (params.get("type") == "create") {
          
          let data = await InsertData("new-address", "?"+ searchValue); 
          console.log(data)
          if(data == "tag:already") {
            setError(true);
            setErrorMessage("Tag Already Exist")
            return;
          }

          if (data&&callback) {
            router.push("/dashboard/crate");
          }

          return;
        }else {
          // modify one from the account/address
          let data = await UpdateUser("modify-address","?"+searchValue);
          if(data == "tag:not-exist") {
            setError(true);
            setErrorMessage("No Such Exist in the data")
            return;
          }
          if(data) {
            router.push("/dashboard/crate")
          }
          return
        }
    
      }
    }
    //coming soon if not available.
    // right for directing it to the coming soon page.
    // Navigate to the next page in the flow (e.g., dashboard or confirmation)

   let data  = await registerUser(userId, searchValue, "address")
    if(!data) {
      router.push("/not-available");
    }else {
      router.push("/dashboard")
    } 
  };


  const handleChangeAddress = () => {
    if (params.get("type") == "modified") {
      let searchValue = "restaurantName=" + params.get("restaurantName") + "&restaurantType=" + params.get("restaurantType") + "&deliveryTiming=" + params.get("deliveryTiming") + "&shopDetails=" + shopDetails + "&pincode=" + pincode + "&tag=" + tag + "&receiver=" + receiver + "&instruction=" + deliveryInstructions + "&address=" + addressValue + "&type=" + "modified" + "&default=" + params.get("default") +"&additionalNo="+additionalNo + "&callback=" + params.get("callback");

      router.push(`/users/${userId}/address?` + searchValue);
    } else if (params.get("type") == "create") {
      let searchValue = "restaurantName=" + params.get("restaurantName") + "&restaurantType=" + params.get("restaurantType") + "&deliveryTiming=" + params.get("deliveryTiming") +  "&type=create" + "&callback=" + params.get("callback");
      router.push(`/users/${userId}/address?` + searchValue);
    } else {
      let searchValue = "restaurantName=" + params.get("restaurantName") + "&restaurantType=" + params.get("restaurantType") + "&deliveryTiming=" + params.get("deliveryTiming") ;
      router.push(`/users/${userId}/address?`+searchValue);
    }

  };
  useEffect(function () {


    if (!params.get("restaurantName")) {
      router.push("/registration/" + userId)
    }

    //fetching the details about the noof address in the backend and setting the tag
    // by default
    // fetching only for the new address when being made
    //TODO

    // in the search params defining the creating or modifying value.
    if (params.get("type")) {
      if (params.get("type") == "modified") {

        setTag(decodeURI(params.get("tag") || ""));
        setPincode(decodeURI(params.get("pincode") || ""));
        setShopDetails(decodeURI(params.get("shopDetails") || ""));
        setDeliveryInstructions(decodeURI(params.get("instruction") || ""));
        setAdditonalNo(decodeURI(params.get("additionalNo") || ""))
        
        const receiverValue = decodeURI(params.get("receiver") || "");

        if (receiverValue === "staff" || receiverValue === "manager") {
          setReceiver(receiverValue);
        } else {
          setReceiver("staff");
        }
      
        setAddressValue(decodeURI(params.get("address") || "shop no 7"))
        //console.log(params.get("address"))
      } else {
        //create 

       startTransition(async function () {
        let returnData = await InfoValue("totalAddress");
         setTag("Address "+(Number(returnData)+1))//doing the fetch from the db
        setAddressValue(decodeURI(params.get("address") || "shop no 7"))
       })
        //making sure we are doing it TODO
        //TODO
      }

    } else {
      setTag("Address 1") // for the new user
    }


  }, [params, router, userId])

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
          <div className="self-start w-[80%] flex gap-1 text-xl text-black font-bold overflow-hidden">
            <Image
              src="/location-pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="flex-shrink-0"
            />
            <div className="w-full  overflow-hidden whitespace-nowrap overflow-ellipsis ">
              {addressValue?.split(",").slice(1, 3).join(",")}
              <br />
            </div>
          </div>

          <div className="flex gap-2 mt-2 items-center pr-2 justify-between">
            <div className="self-start text-[#B4B4B4] text-[13px] font-normal  ml-8 w-[70%]">
              {addressValue ||
                ""}
            </div>
            <div
              onClick={handleChangeAddress}
              className="rounded-[5px] bg-white border border-[#B4B4B4] py-1  px-2 overflow-hidden text-[14px] text-[#585858] font-medium  cursor-pointer"
            >
              change
            </div>
          </div>
        </div>

        <div className="border border-[rgba(180,180,180,0.33)] mt-[21px] w-[392px] mx-auto max-w-full h-[2px]" />

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
          <div className="text-[#5F5B5B] text-[14px] mt-3  mb-3">
            Tag <span className="text-red-500">* : 
              {error && <span>{errorMessage}</span>}</span> 
          </div>
          <input
            type="tel"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch  text-thin w-full h-[43px] px-3"
            placeholder="Eg : Address 1 , Shop or Home "
          />

           <div className="text-[#5F5B5B] text-[14px] mt-3  mb-3">
            Additional No <span className="text-red-500">* : 
              {errorNu && <span>{errorMessageNu}</span>}</span> 
          </div>
          <input
            type="tel"
            value={additionalNo}
            onChange={(e) => setAdditonalNo(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch  text-thin w-full h-[43px] px-3"
            placeholder="Eg : xxxxx-xxxxx "
          />

          <div className="mt-[13px]">Additional delivery instruction</div>

          <textarea
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            className="rounded-[5px] bg-[rgba(223,241,255,0.61)] self-stretch mt-[9px] w-full h-[83px] px-3 py-2 resize-none"
            placeholder="Add any special instructions for delivery. Eg Instruction 1, Instruction 2"
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
              !requiredFilled ? <div className="font-thin mt-2 text-blue-600"><span className="text-red-500">*</span> required to fill</div> : ""
            }
          </div>
        </div>

        <div className="bg-[#D9D9D9] flex min-h-[24px] mt-[27px] w-full" />
      </div>
    </div>
  );
}
