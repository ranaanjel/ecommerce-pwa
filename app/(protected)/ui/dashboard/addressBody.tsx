
"use client"
import { DeleteAddress, InfoValue } from "@/actions/databaseCall"
import { UserAddress } from "@/app/(protected)/lib/user-placeholder"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { MapPinCheck, MapPinCheckIcon, MapPinPlus, PinIcon, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"


export function AddressBody({ userId }: { userId: string }) {


    let [list, setList] = useState<UserAddress[]>([])
    const [restaurantName, setName] = useState("");
    const [restaurantType, setType] = useState("");
    const [deliveryTiming, setTime] = useState("");
    const [_, startTransition] = useTransition();

    //list of address
    const router = useRouter()

    useEffect(function () {
        //fetching the backend and get all the address

        startTransition(async function () {
            let returnData = await InfoValue("full");
            let { deliveryTiming, restaurantName, restaurantType } = returnData;
            setName(restaurantName)
            setType(restaurantType.join(", "))
            setTime(deliveryTiming)

            let returnAddress = await InfoValue("allAddress");
            setList(prev => [...returnAddress]);

        })


    }, [userId])

    return <div onClick={() => { }} className="modal bg-[#ebf6f6] h-screen flex flex-col overflow-scroll ">

        <div>

            <div className="h-auto w-full">
                <div className="h-15 flex gap-2 text-xl items-center px-6  w-full ">
                    <PinIcon className="relative top-0.5 size-5 text-logo"> </PinIcon>

                    Delivery Address
                </div>
                <div className="h-auto w-full flex flex-col gap-3 px-6 ">
                    {
                        list.map((m: UserAddress, index) => {

                            let shopDetails = m.shopDetails;
                            let address = m.address;
                            let pincode = m.pincode;
                            let receiver = m.receiver;
                            let tag = m.tag;
                            let instruction = m.instruction;
                            let defaultValue = m.default;
                            let additionalNo = m.additionalNo

                            return <div onClick={function () {

                            }} className={"flex items-center px-6 h-auto rounded-sm  border gap-3 py-3 border-gray-200 text-gray-500 justify-between bg-white"} key={index}>
                                <div onClick={function () {

                                }} className="flex gap-3 items-center overflow-hidden cursor-pointer">
                                    <div>
                                        <MapPinCheck className=" size-6 h-6 w-6 object-contain"></MapPinCheck>

                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <div className="font-bold">{tag}</div>
                                        <div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap  ">{address}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div onClick={function () {

                                        let useSearchParams = "restaurantName=" + restaurantName + "&restaurantType=" + restaurantType + "&deliveryTiming=" + deliveryTiming + "&shopDetails=" + shopDetails + "&pincode=" + pincode + "&tag=" + tag + "&receiver=" + receiver + "&instruction=" + instruction + "&default=" + defaultValue + "&address=" + address + "&type=" + "modified" + "&callback=" + window.location.pathname + "&additionalNo=" + additionalNo;
                                        router.push("/users/" + userId + "/address_details?" + useSearchParams)


                                    }}>
                                        <Pencil2Icon className="size-4 cursor-pointer"></Pencil2Icon>
                                    </div>
                                    <div className="" onClick={async function () {
                                        // setList(prev => {
                                        //     if (prev.length == 1) {
                                        //         return prev
                                        //     }

                                        //     prev = prev.filter(m => m.tag != tag)
                                        //     return prev
                                        // })
                                        // setAddress(prev => {

                                        //     if (list.length == 1) {
                                        //         return prev;
                                        //     }

                                        //     let currentAddress =
                                        //         "";
                                        //     let i = 0;
                                        //     do {
                                        //         currentAddress = list[i].address;
                                        //         i++;
                                        //     } while (currentAddress == address)
                                        //     return currentAddress;
                                        // })
                                        //deleteing 
                                        //TODO 
                                        // propogating to the database

                                        if (list.length > 1) {

                                            let dataDelete = await DeleteAddress(tag)
                                            if (dataDelete) {
                                                router.push("/dashboard/account/");
                                            }
                                        }

                                    }}>
                                        <Trash2Icon className="size-4 cursor-pointer"></Trash2Icon>
                                    </div>
                                </div>

                            </div>
                        })
                    }
                    <div className="flex items-center px-6 py-5  bg-white cursor-pointer rounded-sm border gap-3 text-gray-600 border-dashed border-gray-600" onClick={function () {

                        let useSearchParams = "&restaurantName=" + restaurantName + "&restaurantType=" + restaurantType + "&deliveryTiming=" + deliveryTiming + "&type=create"

                        router.push("/users/" + userId + "/address?callback=" + window.location.pathname + useSearchParams)
                    }}>
                        <MapPinPlus className="size-6"></MapPinPlus>
                        Add new address
                    </div>

                </div>
                <div className="h-10 fixed bottom-5 text-logo w-full bg-white text-sm px-6 flex items-center justify-between">
                    <a href="tel:8287470325" className="">
                        Helpline no : +918287470325
                    </a>
                    <div>
                        8 am - 10 am
                    </div>
                </div>
                <div className="fixed bottom-0 h-5 w-full bg-gray-300">
                </div>

            </div>

        </div>
    </div>
}