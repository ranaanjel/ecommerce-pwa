"use client"
import { SetStateAction, useEffect, useState } from "react"
import { SkeletonLoading } from "../skeletons";
import { localId } from "@/app/(protected)/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { BellRing, ChartSplineIcon, ChevronRight, ClipboardList, Construction, ContactRound, CreditCard, InfoIcon, ListIcon, LucideOctagon, PackagePlus, PowerIcon, ShoppingCart, TriangleAlertIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import { MapIcon } from "../svg/mapicon";
import { signOut, useSession } from "next-auth/react";

export function AccountBody() {

// ...existing code...

    let {data, status} = useSession() 

    // console.log(data)
    if(!data) {
        redirect("/login")
    }

    const [loading, setLoading] = useState(true);
    const [modalConstruction, setModalConstruction] = useState(false);
    const [resturantDetails, setRestaurantDetails] = useState({
        name:"",contact:"", representatitve:"" // if the respresentation is empty then simply the representative

    })
    const [userId, setUserId] = useState("")
    const router = useRouter();
    const [appVersion, setAppVersion] = useState("")
    const [currentRow, setCurrentRow] = useState("")

    useEffect(function () {
        //fetching the details about the restarant names, contact details.
        // console.log("localId ", localId, localStorage.getItem(localId))
        if(data) {
            let userIdentification = localStorage.getItem(localId) ?? "";
            setUserId(userIdentification)

            let url = window.location.origin  + "/query/v1/user/profile/"+ userIdentification+"?update=false";
            //axios call to the database backend or using the server action
            // fetching the app version as well
            setRestaurantDetails( () => {
                return {name:"Khadak singh da dhaba ", contact:"8287470325", representatitve:"representative"}
            })
            setLoading(false);
            setAppVersion("0.1.0")
        }else {
            router.push("/login")
        }
    },[router])

    return <div className="bg-[#ebfefe] h-screen overflow-scroll pb-32 select-none">
        {
            resturantDetails.name.length > 0 ? <div>

                <RestaurantInfo userDetails={{
                    name: data?.user?.name ?? "",
                    image: data?.user?.image ?? "",
                    id:data?.user?.id ?? ""
                }} restaurantDetails={resturantDetails}></RestaurantInfo>
                <OrderNStatement setCurrentRow={setCurrentRow} setModalConstruction={setModalConstruction}></OrderNStatement>
                <PaymentOptions setCurrentRow={setCurrentRow} setModalConstruction={setModalConstruction}></PaymentOptions>
                <Others userId={userId} setCurrentRow={setCurrentRow} setModalConstruction={setModalConstruction}></Others>
                <Logout appVersion={"App version "+appVersion}></Logout>

            </div>:null
        }


        {
            loading && <SkeletonLoading type="crate"></SkeletonLoading>
        }
        {
            modalConstruction && <UnderConstruction setOpenModal={setModalConstruction} alertValue={currentRow}></UnderConstruction>
        }

    </div>
}

function RestaurantInfo({restaurantDetails, userDetails}:{userDetails:{name:string, image:string, id:string},restaurantDetails:{name:string, contact:string, representatitve:string}}) {
    // getting  details regarding user here.

    return <div className="flex px-8 py-4 gap-4 items-center w-full">
        <div className=" rounded-full bg-logo/80 w-[20%] ">
            {/* <UserCircle className="size-16 text-logo"></UserCircle> */}
            <Image src={ userDetails.image || "/usercircle.png"} alt="user" height={75} width={75} className="rounded-full "></Image>
        </div>
        <div className="flex flex-col leading-4.5 w-[80%]">
            <div className="capitalize text-2xl overflow-ellipsis w-full overflow-hidden whitespace-nowrap ">
                {restaurantDetails.name}
            </div>
            <div className="text-md capitalize text-gray-700">
                { userDetails.name || restaurantDetails.representatitve}
            </div>
            <div className="text-sm text-gray-500">
                {restaurantDetails.contact}
            </div>
        </div>
    </div>

}


function OrderNStatement({setModalConstruction, setCurrentRow}:{setModalConstruction:React.Dispatch<SetStateAction<boolean>>, setCurrentRow:React.Dispatch<SetStateAction<string>>}) {
    const router = useRouter();
    return <div className="px-8 py-4">
            <ItemHeader text="orders & statement" line={true}></ItemHeader>
            <div className="bg-white rounded w-full mt-4 text-gray-700">
                <ItemRow onclick={function() {
                    router.push("/dashboard/order")
                }} icon={<ShoppingCart></ShoppingCart>} text="Your orders" borderUp={false}></ItemRow>
                <ItemRow onclick={function () {
                    setModalConstruction(true)
                    setCurrentRow("Food cost summary")
                }} icon={<ChartSplineIcon></ChartSplineIcon>} text="Food cost summary" borderUp={true}></ItemRow>
                <ItemRow onclick={function() {
                    setModalConstruction(true)
                    setCurrentRow("Account Statement")
                }} icon={<ClipboardList></ClipboardList>} text="Account statement" borderUp={true}></ItemRow>
                <ItemRow onclick={function () {
                    setModalConstruction(true)
                    setCurrentRow("Need help")
                }} icon={<InfoIcon></InfoIcon>} text="Need help" borderUp={true}></ItemRow>
            </div>
    </div>
}
function PaymentOptions({setModalConstruction, setCurrentRow}:{setModalConstruction:React.Dispatch<SetStateAction<boolean>>,setCurrentRow:React.Dispatch<SetStateAction<string>>}) {
    const router = useRouter();
    return <div className="px-8 py-4">

            <ItemHeader text="payment options" line={true}></ItemHeader>
            <div className="bg-white rounded w-full mt-4 text-gray-700">
                <ItemRow onclick={function () {
                    setModalConstruction(true)
                    setCurrentRow("Manage payment options")
                }}icon={<CreditCard></CreditCard>} text="Manage payment options" borderUp={false}></ItemRow>
                <ItemRow onclick={function () {
                    setModalConstruction(true)
                    setCurrentRow("Update to new version")
                }}icon={<TriangleAlertIcon></TriangleAlertIcon>} text="Update to new version" borderUp={true}></ItemRow>
            </div>
    </div>
}
function Others({setModalConstruction,setCurrentRow, userId}:{userId:string, setModalConstruction:React.Dispatch<SetStateAction<boolean>>,setCurrentRow:React.Dispatch<SetStateAction<string>>}) {
    const router = useRouter();
    return <div className="px-8 py-4">
            <ItemHeader text="others" line={true}></ItemHeader>
            <div className="bg-white rounded w-full mt-4 text-gray-700">
                <ItemRow onclick={function () {
                    //Todo setting the profiles -- ability to change the username, timing, restaurant, contact details- additional add -not deleting previous.

                    router.push("/dashboard/account/profileUpdate/"+ userId)  
                }}icon={<UserCircle></UserCircle>} text="Profile settings" borderUp={false}></ItemRow>
                <ItemRow onclick={function() {
                    router.push("/dashboard/preorder-list")
                }} icon={<ListIcon></ListIcon>} text="Pre-order list" borderUp={true}></ItemRow>
                <ItemRow onclick={function() {
                    setModalConstruction(true)
                    setCurrentRow("Contact us")
                }} icon={<ContactRound></ContactRound>} text="Contact us" borderUp={true}></ItemRow>
                <ItemRow onclick={function () {
                    setModalConstruction(true)
                    setCurrentRow("Request new product")
                }} icon={<PackagePlus></PackagePlus>} text="Request new product" borderUp={true}></ItemRow>
                <ItemRow onclick={function () {
                    //notification page
                      setModalConstruction(true)
                    setCurrentRow("Notifications")
                    // router.push("/dashboard/account/notification/"+ userId)
                }} icon={<BellRing ></BellRing>} text="Notifications" borderUp={true}></ItemRow>
                <ItemRow onclick={function () {
                    //updating or creating address
                    router.push("/dashboard/account/address/"+ userId)
                }} icon={<MapIcon></MapIcon>} text="Manage Addresses" borderUp={true}></ItemRow>
            </div>
    </div>
}
function Logout({appVersion}:{appVersion:string}) {
    const router = useRouter();

    //deleting the session token for managing the request from the users
    
    return <div className="px-8 py-4 gap-2 flex flex-col pb-6">
            <div className="bg-white rounded w-full mt-2  text-red-700">
                <ItemRow onclick={function() {
                    signOut({redirect:true, redirectTo:"/login"})
                }} icon={<PowerIcon></PowerIcon>} text="logout" borderUp={false}></ItemRow>
            </div>
        <div>
           <ItemHeader text={appVersion} line={false}></ItemHeader> 
        </div>

    </div>
}
function ItemHeader({text, line}:{text:string, line:boolean}) {

    if(!line) {
            return <div className="w-full text-xs flex text-gray-400 items-center gap-4 justify-center">
        <span className="capitalize">{text}</span>
    </div>
    }

    return <div className="w-full text-sm flex text-gray-500 items-center gap-4 justify-center">
        <hr className="border w-[10%] border-gray-400"></hr>
        <span className="uppercase">{text}</span>
        <hr className="border w-[10%] border-gray-400"></hr>
    </div>
}
function ItemRow({icon, text, borderUp, onclick}:{onclick? : () => void; icon:React.ReactElement, text:string, borderUp:boolean}) {
    let classValue = ""
    if(borderUp) {
        classValue = "border-t border-gray-200"
    }

    return <div onClick={onclick} className={"px-6 py-4 flex cursor-pointer  " + classValue}>
        <div className="w-[15%]">
            {icon}
        </div >
        <div className="w-[80%]">
            {text}
        </div>
        <div className="text-gray-400 w-[5%]">
            {<ChevronRight></ChevronRight>}
        </div>
    </div>

}

function UnderConstruction({ setOpenModal,alertValue}: {
    setOpenModal: React.Dispatch<SetStateAction<boolean>>,
    alertValue:string ,
}) {
    //modal poping up to tell the the feature is under contruction
   return <div onClick={function (eobj: React.MouseEvent<HTMLDivElement>) {
        let classValue = (eobj.target as HTMLElement).className;
        if (classValue.includes("confirmModal")) {
            setOpenModal(m => !m)
        }

    }} className="confirmModal top-0 h-screen overflow-hidden bg-gray-400/50 w-screen absolute flex justify-center items-center z-10">
        <div className="text-yellow-800  p-4 rounded-md gap-2 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-start"> 
                <div className="bg-yellow-400 text-4xl text-black px-4 rounded font-bold flex gap-2 items-center">
                under construction <Construction></Construction>
            </div>
            <div className="text-lg text-white bg-amber-600 px-4 rounded">
                {alertValue + ""}
            </div>
            </div>
            <div>
                <Image src={"/construction.webp"} height={100} width={100} alt="construction"></Image>
            </div>
            
        </div>
    </div>
}