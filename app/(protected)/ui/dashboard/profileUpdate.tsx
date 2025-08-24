"use client"
import { DashIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { SetStateAction, useEffect, useState } from "react"
import { GenericButton } from "../button"
import axios from "axios"
import { useRouter } from "next/navigation"

export function ProfileUpdateBody({userId}:{userId:string}){

    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantType, setRestaurantType] = useState<string[]>([])
    const [deliveryStart, setDeliveryStart] = useState("10")
    const [deliveryEnd, setDeliveryEnd] = useState("11")
    const [representatitve, setRepresentative] = useState("")
    const [ role, setRole] = useState("") // designation 
    const [additionalNumber, setAdditionalNumber] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter()


    function updateHandle() {

        if(restaurantName.length == 0 || restaurantType.length == 0  || deliveryStart > deliveryEnd || representatitve.length == 0 || role.length == 0 ) {
            setError(true)
        }

        //updating the data at the backend 
        //TODO once the backend is done

        let url = location.origin + "/query/v1/user/profile/"+userId+"/update";
        
        router.back();
        setError(false)
    }
    useEffect(function() {
        //fetching the previous data of the user and then setting up the current value
        let url = location.origin + "/query/v1/user/profile/"+userId+"?update=true";
        axios.get(url).then(m => {
            let data = m.data.result;
            let resName = data.restaurantName;
            let resType = data.restaurantType;
            let representative = data.representative;
            let deliveryTiming = data.deliveryTiming;
            let role = data.role;
            let additionalNo = data.additionalNo;

            setRestaurantName(resName)
            setRestaurantType(resType)
            setRole(role)
            setDeliveryStart(deliveryTiming.split("-")[0])
            setDeliveryEnd(deliveryTiming.split("-")[1])
            setRepresentative(representative)
            setAdditionalNumber(additionalNo)


        }).catch(error => {
            console.log(error)
        })

    },[userId])

    return <div className="h-screen px-8 py-6 text-black overflow-scroll">
            <div className="flex justify-center m-auto rounded-full bg-primary w-[20%] ">
            {/* <UserCircle className="size-16 text-logo"></UserCircle> */}
            <Image src={"/usercircle.png"} alt="user" height={75} width={75} className=""></Image>
        </div>

    <div className="my-4 flex flex-col gap-4">
        {error && <div className="text-sm text-red-600">
           * are required to be filled 
            </div>}
        <InputValue inputValue={restaurantName} setInputValue={setRestaurantName} header="Restaurant Name" placeholder="Enter your Restaurant Name"></InputValue>
        <InputValue inputValue={representatitve} setInputValue={setRepresentative} header="Representative" placeholder="Representative Name"></InputValue>
        <div>
            <div>
                Respresentative Role <span className="text-red-600">*</span>
            </div>
            <div>
                <RadioBox setRole={setRole} tick={"owner" == role} text="owner" name="role"></RadioBox>
                <RadioBox  setRole={setRole} tick={"manager" == role} text="manager" name="role"></RadioBox>
                <RadioBox setRole={setRole} tick={"staff" == role} text="staff" name="role"></RadioBox>
            </div>
        </div>
         <div>
            <div>
                Restaurant Type <span className="text-red-600">*</span>
            </div>
            <div>
                <Checkbox setType={setRestaurantType} tick={restaurantType.includes("chinese")} text="chinese" name="chinese"></Checkbox>
                <Checkbox  setType={setRestaurantType} tick={restaurantType.includes("indian")} text="indian" name="indian"></Checkbox>
                <Checkbox setType={setRestaurantType} tick={restaurantType.includes("italian")} text="italian" name="italian"></Checkbox>
                <Checkbox setType={setRestaurantType} tick={restaurantType.filter(m => {
                    return (m != "italian" && m != "chinese" && m != "indian")
                }  ).length > 0} text="combination & others" name="combination & others"></Checkbox>
            </div>
        </div>
        <div>
            <div>
                Delivery Timing <span className="text-red-600">*</span>
            </div>
            <div className="flex gap-2 items-center ">

                <SelectTime defaultValue={deliveryStart} startTime={deliveryStart} endTime={deliveryEnd} showError={error} setTime={setDeliveryStart}></SelectTime>
                <DashIcon></DashIcon> 
                <SelectTime defaultValue={deliveryEnd} startTime={deliveryStart} endTime={deliveryEnd} showError={error} setTime={setDeliveryEnd}></SelectTime>
            </div>
        </div>

        <InputValueNum header="Additional Number" placeholder="Extra contact no : eg : 96321-XXXXX" inputValue={additionalNumber} setInputValue={setAdditionalNumber}></InputValueNum>

    </div>

    <div onClick={function() {
        updateHandle()
    }} className="text-center pb-21 pt-4">
                <GenericButton text="Update Profile"></GenericButton>
        </div>                

    </div>
}

// user profile value - restaurant name, representative, additional phone no, restaurant type, delivery timing --> 5 things to update

function InputValue({header, placeholder, inputValue, setInputValue}:{setInputValue:React.Dispatch<SetStateAction<string>>, inputValue:string, header:string, placeholder:string}) {
return    <div className="flex flex-col gap-1">
        <label htmlFor={header} className="text-lg text-gray-800">{header} <span className="text-red-600">*</span></label>
        <input value={inputValue} onChange={function (e) {
            setInputValue(e.target.value)
        }} type="text" id={header} name={header} placeholder={placeholder} className=" border border-gray-200 bg-white py-2 px-4 rounded focus:outline-none " />
    </div>
}
function InputValueNum({header, placeholder, inputValue, setInputValue}:{setInputValue:React.Dispatch<SetStateAction<string>>, inputValue:string, header:string, placeholder:string}) {
return    <div className="flex flex-col gap-1 ">
        <label htmlFor={header} className="text-md text-gray-800">{header}</label>
        <input value={inputValue} onChange={function (e) {
            setInputValue(e.target.value)
        }} type="number" maxLength={10} id={header} name={header} placeholder={placeholder} className=" border border-gray-200 bg-white py-2 px-4 rounded focus:outline-none " />
    </div>
}
function Checkbox({setType, tick, text, name}:{tick:boolean, name:string, setType:React.Dispatch<SetStateAction<string[]>>, text:string}) {
    return <div className="flex gap-2">
        <input type="checkbox" name={name} id={name} checked={tick} onChange={function() {
            setType(prev => {
                if(!prev) {
                    return [prev]
                }

                if(prev.includes(text)) {

                    return [...prev.filter(m => m!=text)]
                }

                return [...prev, text]
            })
        }}/>
                <label htmlFor={name}>{text}</label>

    </div>
}
function RadioBox({setRole, tick, text, name}:{tick:boolean, name:string, setRole:React.Dispatch<SetStateAction<string>>, text:string}) {

    return <div className="flex gap-2">
        <input type="radio" name={name} checked={tick} onChange={function() {
            setRole(text)
        }} id={text} /> 
        <label htmlFor={text}>{text}</label>
    </div>
}
function SelectTime({setTime,defaultValue, startTime, endTime, showError}:{showError: boolean, setTime:React.Dispatch<SetStateAction<string>>, defaultValue:string, startTime:string, endTime:string}) {
    return  <div className="rounded-[3px] bg-white flex mt-2 px-3 py-2 items-center gap-1 text-center">
              <select
                value={defaultValue}
                onChange={(e) => setTime(e.target.value)}
                className={clsx("bg-transparent text-[#00429a] focus:outline-none appearance-none", {"text-red-500 border-red-500" : showError && parseInt(startTime) > parseInt(endTime)})}
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
             <ChevronDownIcon className="text-logo"/>
            </div>
}
