"use client"

import { deliveryState, OrderCollection, OrderState } from "@/app/(protected)/lib/user-placeholder";
import { localCrate, localId, localOrderId } from "@/app/(protected)/lib/utils"
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { SkeletonLoading } from "../skeletons";
import { GenericButton } from "../button";
import {  BanIcon, ChevronDown, RotateCcwIcon, TriangleAlertIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { ConfirmModal } from "../confirmModal";
import { AlertModal } from "../alertModal";
import { crateItemInterfaceEach } from "@/app/(protected)/lib/definitions";

export function OrderPageBody() {
    const router = useRouter();
    const offset = useRef<number>(0);
    const [loading, setLoading] = useState(true);
    const [contentThere, setContentThere] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [currentOrderList, setCurrOrderList] = useState<OrderCollection[]>([])
    const [prevOrderList, setPrevOrderList] = useState<OrderCollection[]>([])
    const [userId, setUserId] = useState("")
    const orderIdRef = useRef("")
    const currentFunction = useRef<() => void>(() => {})
    const alertText = useRef("")

    async function loadMoreData() {
        let offsetValue = offset.current;


            let url = window.location.origin + "/query/v1/order/" + userId + "?offset=" + offset.current;
            axios.get(url).then(m => {
                let { currentOrderData, prevOrderData } = m.data.result;

                if(currentOrderData.length == 0 && prevOrderData.length == 0) {
                    setContentThere(false)
                    setLoading(false)
                    return;
                }

                setCurrOrderList(prev => {
                    if(!prev) {
                        return [...currentOrderData]
                    }
                    return [...prev, ...currentOrderData]
                })
                setPrevOrderList(prev => {
                    if(!prev) {
                        return [...prevOrderData]
                    }
                    return [...prev, ...prevOrderData]
                })
                setLoading(false)

            }).catch(err => console.log(err))

        offset.current += 4;

    }

    useEffect(function () {
        //fetching the data for the previous value all orders 30 days only. in pagination.
        // ability to add the stuffs from previous orders as well.
        if (localStorage.getItem(localId)) {
            let userId = localStorage.getItem(localId);
            let url = window.location.origin + "/query/v1/order/" + userId + "?offset=" + offset.current;
            axios.get(url).then(m => {
                let { currentOrderData, prevOrderData } = m.data.result;
                setUserId(userId?? "")
                setCurrOrderList(currentOrderData)
                setPrevOrderList(prevOrderData)
                setLoading(false)

            }).catch(err => console.log(err))
            offset.current = offset.current + 4;
        } else {
            router.push("/login")
        }

    }, [router])
    function editFunction() {
        // TODO time period 2 hours from creation time - then only allow

        let url = window.location.origin + "/query/v1/order/"+ userId +  "/"+orderIdRef.current + "/modify";

        axios.get(url).then(m => {
            let {success, data} = m.data.result;
            if(success) {
                alertText.current = "Modifying Order !"
                setOpenAlert(true)
                let localData: { [key: string]: crateItemInterfaceEach } = {};
                data.orderList.forEach((m:crateItemInterfaceEach) => {
                    localData[m.itemname.toLocaleLowerCase()] = m;
                })
                localStorage.setItem(localCrate, JSON.stringify(localData));
                localStorage.setItem(localOrderId, orderIdRef.current)
                //crate page should not create it 

                setTimeout(function () {
                    router.push("/dashboard/crate?type=edit&orderId="+orderIdRef.current+"&address="+data.address.address+"&instruction="+data.address.instruction+ "&tag="+data.address.tag + "&receiver="+data.address.receiver);
                },500)
            }else {

                setOpenAlert(true)
                alertText.current = "Try Again !"
            }

        })

    }
    function cancelFunction() {
        // TODO time period 2 hours from creation time - then only allow
        //put request to the backend regarding the modiification
        //of the
        let url = window.location.origin + "/query/v1/order/"+ userId +  "/"+orderIdRef.current + "/cancel";

        console.log(url)
        axios.put(url).then(m => {
            let result = m.data.result;
            console.log(result.success)
            if(result.success) {
                setOpenAlert(true)
                alertText.current = "Order is cancelled !"
                setTimeout(function () {
                    location.reload();
                },500)
            }else {

                setOpenAlert(true)
                alertText.current = "Try Again !"
            }

        })
    }
    function reorderFunction() {

        let url = window.location.origin + "/query/v1/order/"+ userId +  "/"+orderIdRef.current + "/repeat";

        axios.get(url).then(m => {
            
            let {success, data} = m.data.result;

            if(success) {
                alertText.current = "Repeating Order !"
                setOpenAlert(true)
                let localData: { [key: string]: crateItemInterfaceEach } = {};
                
                data.orderList.forEach((m:crateItemInterfaceEach) => {
                    localData[m.itemname.toLocaleLowerCase()] = m;
                })
                localStorage.setItem(localCrate, JSON.stringify(localData));
                //crate page should not create it 

                setTimeout(function () {
                    router.push("/dashboard/crate?type=repeat&orderId="+orderIdRef.current+"&address="+data.address.address+"&instruction="+data.address.instruction+ "&tag="+data.address.tag + "&receiver="+data.address.receiver);
                },500)
            }else {

                setOpenAlert(true)
                alertText.current = "Try Again !"
            }

        })

    }
    return <div className="h-screen overflow-scroll bg-[#ebf6f6] pb-36">
        {
            currentOrderList.length > 0 ? <div className="py-4 px-6">
                {
                    currentOrderList.map((m, index) => {

                        let orderId = m.orderId;
                        let orderCreated = m.createdOrder;
                        let deliveryDate = m.deliveryDate;
                        let deliveryTiming = m.deliveryTiming;
                        let deliveryStatus = m.deliveryStatus;
                        let orderStatus = m.orderStatus;
                        let orderValue = m.totalValue;


                        return <div className=" px-4 py-2 bg-white rounded" key={index}>
                            <div className="flex gap-2">
                                <div className="w-1/2 flex flex-col gap-2 text-sm text-gray-600">
                                    <div className="text-xl text-black">
                                        Current Order
                                        <div className="text-sm text-gray-600 uppercase"># {orderId}</div>
                                    </div>
                                     <div className={clsx(" text-xs py-1 px-2 rounded text-white self-start",{"bg-green-500":orderStatus == OrderState.orderPlace}, {"bg-yellow-600":orderStatus == OrderState.orderEdit})}
                                  >
                                    {orderStatus}
                                  </div>
                                   <div>
                                     <div className="">
                                        {orderCreated}
                                    </div>
                                    

                                    <div>
                                        Order Value :   {" ₹ " + orderValue}
                                    </div>
                                    <div>
                                        Delivery Date & Time :
                                        <div className="pl-2">
                                            <div>
                                        {/* //TODO  i.e making we are able to next day as of now, current day, day after tomorrow , after 2 days till week */}
                                        {
                                            " "} {deliveryDate}
                                    </div>
                                    <div>
                                        {deliveryTiming + " "} preferred slot
                                    </div>
                                        </div>
                                    </div>
                                    
                                   </div>
                                </div>
                                <div className="w-1/2 flex flex-col gap-4">
                                  <div className="flex w-full text-sm gap-2">
                                    
                                    <GenericButton  onclick={function () {setOpenConfirm(true) 

                                        orderIdRef.current = (orderId)
                                        currentFunction.current = editFunction ;

                                    } }     classValue="w-1/2 justify-between py-1 px-4 bg-yellow-600 items-center text-white flex gap-1" icon={<TriangleAlertIcon className="size-4"></TriangleAlertIcon>} text="Edit"></GenericButton>
                                    
                                    <GenericButton onclick={function () {setOpenConfirm(true)
                                        orderIdRef.current = orderId;
                                        currentFunction.current = cancelFunction ;
                                    }} classValue="w-1/2 items-center justify-between py-1 px-4 bg-red-600 gap-1 flex text-white" icon={<BanIcon className="size-4"></BanIcon>} text="Cancel"></GenericButton>
                                  </div>
                                  <div className="p-2 text-xs bg-gray-400/50 text-gray-700 rounded">
                                    Editing and Cancelling order period. After order available for next 2 hours.Please create new cart order if missed something.
                                  </div>
                                 

                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-xl">
                                    
                                Delivery Status
                                </div>
                                <DeliveryStatusComponent state={deliveryStatus}></DeliveryStatusComponent>
                            </div>
                        </div>
                    })
                }
            </div> : null
        }
        {
            prevOrderList.length > 0 ? <div className="py-4 pb-2 px-6 ">
                <div className="text-xl py-4">
                    Previous orders
                </div>

              {
                prevOrderList.map((m, index) => {
                    
                        let orderId = m.orderId;
                        let orderCreated = m.createdOrder;
                        let orderStatus = m.orderStatus;
                        let orderValue = m.totalValue;

                    return  <div className="flex text-xs bg-white px-4 py-4 gap-4 border-b justify-between items-center border-gray-200" key={index}>

                        <div >
                            <div className="flex items-center   text-lg gap-2">
                                {orderCreated.split(",")[0]}
                                <span className="text-gray-600 text-sm uppercase ">{" #"+orderId}</span>
                            </div>
                            <div>
                                Order value : {" ₹ " +orderValue}
                            </div>
                            <div className={clsx({"text-logo":OrderState.orderComplete == orderStatus}, {"text-red-600":OrderState.cancelOrder == orderStatus})}>
                                {orderStatus}
                            </div>
                        </div>
                        <div className="  w-1/3 justify-center flex ">
                            <GenericButton onclick={function () {
                               setOpenConfirm(true) 

                                        orderIdRef.current = (orderId)
                                        currentFunction.current = reorderFunction ;
                            }} classValue="self-center flex bg-logo text-white px-4 py-2 gap-2 items-center justify-center " text="Re-order" icon={<RotateCcwIcon className="size-4"></RotateCcwIcon>}></GenericButton>
                        </div>
                        
                    </div>
                })
              }


            </div> : null
        }

        {
            !loading && contentThere && <div onClick={function () {
                setLoading(true);
                loadMoreData();
            }} className="text-primary py-2 px-8 justify-center items-center flex flex-col mb-4 ">
                    <div>see more</div>
                    <div><ChevronDown></ChevronDown></div>
            </div>
        }
        {
            loading && <CategoryLoading></CategoryLoading>
        }
        {
            openConfirm && <ConfirmModal type="order" setOpenModal={setOpenConfirm} onclick={function (){
                currentFunction.current()
            }}></ConfirmModal>
        }
        {
            openAlert && <AlertModal setOpenModal={setOpenAlert} alertValue={alertText.current}></AlertModal>
        }
    </div>

}

function DeliveryStatusComponent({ state }: { state: string }) {
    let filledValueLevel = 0//0,1,2 -- start - middle  -- end;
    //only three state is there.

    switch (state.toLocaleLowerCase()) {
        case "order in transit":
            filledValueLevel = 1;
            break;
        case "order delivered":
            filledValueLevel = 2;
            break;
    }

    return <div className="flex h-32  w-full">
        <ProgressBar text="order received" position="start" filled={true}></ProgressBar>
        <ProgressBar text="order in transit" position="middle" filled={filledValueLevel == 1}></ProgressBar>
        <ProgressBar text="order delivered" position="end" filled={ filledValueLevel == 2 }></ProgressBar>

    </div>

}

function ProgressBar({filled, text, position}:{text:string, position:"start"| "middle"| "end", filled:boolean}) {
    
    if(position == "start") {

        return <div className="w-1/3 flex items-center relative">
            <div className="h-1/5 w-1/5 rounded-full bg-primary"></div>
            <div className="h-3 w-4/5 bg-primary border-r-0"></div>
            <div className=" text-xs absolute left-[-10px] text-logo top-[60%]">{text}</div>
        </div>
    }
    else if(position == "middle") {

        return <div className="w-1/3 flex items-center relative">
            <div className={"h-3 w-2/5 "+`${filled ? "bg-primary":"bg-gray-500/40 border border-l-0 border-gray-400"}`}></div>
            <div className={"h-1/5 w-1/5 rounded-full "+`${filled ? "bg-primary":"bg-gray-500/40 border border-gray-400"}`}></div>
            <div className={"h-3 w-2/5 "+`${filled ? "bg-primary":"bg-gray-500/40 border border-r-0 border-gray-400"}`}></div>
             <div className=" whitespace-nowrap text-xs absolute left-[50%] translate-x-[-50%] text-logo top-[60%]">{text}</div>
        </div>
    }
    return   <div className="w-1/3 flex items-center relative">
            <div className={"h-3 w-4/5   "+`${filled ? "bg-primary":"bg-gray-500/40 border-l-0 border border-gray-400"}`}></div>
              <div className={"h-1/5 w-1/5 rounded-full "+`${filled ? "bg-primary":"bg-gray-500/40 border border-gray-400"}`}></div>
               <div className=" text-xs absolute right-[-10px] text-logo top-[60%]">{text}</div>
        </div>
}

function CategoryLoading() {

        return <div className="flex justify-center items-center  w-[100px] h-[80px] m-auto">
                <Image src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]" />
        </div>
}
