"use client"
import { GenericButton } from "@/app/(protected)/ui/button";
import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { BottomBar } from "@/app/(protected)/ui/dashboard/bottomBar";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";
import { SkeletonLoading } from "@/app/(protected)/ui/skeletons";
import { Dot, GripIcon, LayoutGrid, ScanBarcode, ScanBarcodeIcon, ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function OrderId() {

    let params = useParams();
    let orderId = params.orderId;

    let [orderSummary, setOrderSummary] = useState<{ saving: string, restaurantName: string, address: string, createdAt: string, orderTiming: string, deliveryDate: string, instruction: string[], fetch: boolean }>({ saving: "200", restaurantName: "Khadak singh da dhaba", address: "Shop No. 11, DDA Market, near INDRAPRASTHA WORLD SCHOOL A 2 Block, Paschim Vihar Delhi, 110063", createdAt: "June 26, 2025 @ 10:02 pm", orderTiming: "10 am - 11 am", deliveryDate: "June 26, 2025", instruction: ["must call before delivery", "delivery on time"], fetch: false })

    useEffect(function () {
        let url = window.location.origin + "/query/v1/";
        //fetchingt the data regarding the saving and otherthings.
        // simply getting the orderId and getting the data new set of data.

        //getting the data from the backend -- regarding the order

        setTimeout(function () {
            setOrderSummary(prev => {
                //simulating the fetching from realworld
                return { ...prev, fetch: true }
            })
        }, 1000)


    }, [])

    return <div className="bg-[#ebf6f6] h-screen overflow-hidden text-black">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2">
                    <BackButton  formationPage={true}  />
                    <div className="flex flex-col ">
                        <div className="flex gap-2 text-semibold text-xl capitalize">
                            Order Received
                            <span className="text-gray-500">#{orderId}</span>
                        </div>
                    </div>
                </div>
            </div>
        </TopBar>
        {
            orderSummary.fetch ? <div className="p-4 flex flex-col gap-4">

                <SavingComponent saving={orderSummary.saving}></SavingComponent>
                <div className="flex gap-2 font-medium text-lg px-4 text-logo">
                    <ShoppingBagIcon></ShoppingBagIcon> Your order has been initiated
                </div>
                <TrackComponent restaurantName={orderSummary.restaurantName} address={orderSummary.address} deliveryDate={orderSummary.deliveryDate} createdAt={orderSummary.createdAt} orderTiming={orderSummary.orderTiming}></TrackComponent>
                <InstructionComponent instruction={orderSummary.instruction}></InstructionComponent>
                <ExploreButton></ExploreButton>

            </div> : <SkeletonLoading type="crate"></SkeletonLoading>

        }

        <BottomBar></BottomBar>
    </div>
}

function SavingComponent({ saving }: { saving: string }) {

    return <div className="bg-white font-thin p-4 rounded shadow-xs">
        <span className="font-medium">Saved</span> <span className="font-bold text-green-500">{" ₹ " + saving + " "} </span> with free delivery
    </div>
}
function TrackComponent({ restaurantName, deliveryDate, orderTiming, createdAt, address }: { restaurantName: string, deliveryDate: string, orderTiming: string, createdAt: string, address: string }) {

    let router = useRouter();

    return <div className="bg-white p-4 w-full flex rounded shadow-xs">

        <div className="w-1/2 flex gap-2 flex-col">

            <div className="text-xl">
                Delivering to :
            </div>
            <div className="text-md capitalize">
                {restaurantName}
            </div>
            <div className="text-sm lowercase text-gray-700">
                {address}
            </div>

            <div className="flex flex-col lowercase">
                <span className="font-medium capitalize">Order initiated : </span><span className="text-sm text-gray-600">{createdAt}</span>
            </div>
            <div className="flex flex-col lowercase">
                <span className="font-medium capitalize">Delivery date & timing </span><span className="text-sm text-gray-600">{deliveryDate +" @ "+ orderTiming}</span>
            </div>



        </div>
        <div className="w-1/2 gap-4 flex flex-col items-center justify-center">
            <GenericButton onclick={function () {
                router.push("/dashboard/order")
            }} text="Track order"></GenericButton>
        <ScanBarcodeIcon className="text-logo"></ScanBarcodeIcon>
        </div>

    </div>
}

function InstructionComponent({instruction}:{instruction:string[]}) {

    return    <div className="bg-white p-4 w-full rounded shadow-xs">
        <div className="text-xl flex gap-2">
            Delivery Instructions
        </div>
        <div className="py-2">
               {
            instruction.map((m,index) => {


                return <div key={index} className="flex gap-2 text-gray-600 leading-4.5">
                    <Dot></Dot>{m}
                </div>
            })
        }

        </div>
    </div>
}

function ExploreButton() {
    let router = useRouter()
    return <div className="flex gap-4 justify-center">

        <div onClick={function () {
            router.push("/dashboard")
        }} className="flex w-1/2 gap-2 justify-center py-2 px-4 text-white bg-primary rounded cursor-pointer ">

            <ShoppingCart></ShoppingCart>
            <span>Explore more</span>

        </div>
         <div onClick={function () {
            router.push("/dashboard/category")
        }}  className="flex w-1/2 justify-center gap-2 py-2 px-4 text-white bg-primary rounded cursor-pointer">

            <LayoutGrid></LayoutGrid>
            <span>Categories</span>

        </div>

    </div>
}


//getting the address details 
// showing the ui and fetching the order details from the backend.

//making it a server component for able to use the database call easily.