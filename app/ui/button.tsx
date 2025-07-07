"use client"

import { ChevronsRight, PackageCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { localCrate, localOrderId } from "../lib/utils";
import { CrateContext } from "./rootLayoutClient";
import axios from "axios";
import { UserAddress } from "../lib/user-placeholder";
import { crateItemInterface } from "../lib/definitions";

export function GenericButton({icon,classValue, onclick, text, refValue} : {
    onclick? : () => void,
    text:string,
    icon?:React.ReactNode,
    classValue?:string,
    refValue?:React.RefObject<HTMLDivElement>

} ) {

    if(icon && classValue) {
        return <div ref={refValue} className={"rounded-sm " +classValue} onClick={onclick}>
        {text}
        <span>
            {icon}
        </span>
    </div>
    }

    return <div ref={refValue} className="bg-logo text-white py-2 px-4 rounded-sm cursor-pointer" onClick={onclick}>
        {text}
    </div>
}

export function SwipeButton(
    {
        from,
        to,
        gradient = "bg-linear-to-r from-cyan-500 to-blue-500",
         totalPrice,
    userId,
    orderId,
    instruction,
    details,
    saving, 
    crateList,
    disable
    }: {
        from: string,
        to: string,
        gradient?: string,
         totalPrice: number; 
    userId: string; 
    orderId: string; 
    instruction: string[]; 
    details: UserAddress; 
    saving: number; 
    crateList:[string, crateItemInterface][],
    disable:boolean
    }
) {


    let fromTextRef = useRef<HTMLDivElement | null>(null);
    let deliveryRef = useRef<SVGSVGElement | null>(null);
    let buttonRef = useRef<HTMLDivElement | null>(null);
    let swipeRef = useRef<HTMLDivElement | null>(null);
    let touchValue = useRef<{ touchStart: number, touchEnd: number }>({ touchStart: 0, touchEnd: 0 })
    let [delivered, setDelivered] = useState(false);
    let router = useRouter();
    let crateContext = useContext(CrateContext);
    let setCrateLength = crateContext?.setCrateLength || (() => {});

    function handleTouch(event: React.TouchEvent<HTMLDivElement>) {

        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            const buttonWidth = (buttonRef.current?.clientWidth ?? 0) / 2;


            let difference = Number(touch.clientX - touchValue.current.touchStart);

            let percentage = difference / buttonWidth;

            if (percentage > 1) {
                percentage = 1;
            }

            if (difference < 0) {
                return;
            }


            let opacity = 1 - percentage;

            touchValue.current.touchEnd = touchValue.current.touchStart + difference;


            // console.log(difference, targetValue.style.left, opacity);)

            requestAnimationFrame(function (timestamp) {
                if (swipeRef.current) {
                    swipeRef.current.style.left = difference + "px";
                }

                if (fromTextRef.current) {
                    fromTextRef.current.style.opacity = String(opacity)
                }
            })



        }

    }

   async function redirect() {

        //TODO : 
        //making sure the current order of the person is not more than 4 times -- checking the users current order when doing
        if((localStorage.getItem(localOrderId) ??  "").length   > 0) {
            let editOrder = localStorage.getItem(localOrderId);
            //modifying the value
            let url = window.location.origin +"/query/v1/userorder/m/"+editOrder;

            //getting all data from the props
            console.log(url)
            await axios.post(url, {
                data : "modified" // for faster work
            }) //giving the modified value of the information and then getting back the order id.
            // console.log(editOrder)
             let orderId = editOrder
            setTimeout(function () {
                router.push("/dashboard/order/"+orderId )
                setTimeout(function() {
                    setCrateLength(0)
                    localStorage.setItem(localCrate, "{}")
                    localStorage.setItem(localOrderId, "")
                }, 500)
            }, 200)

        }else {
        //fetching the order on db on completing the request from the db.
        
        // items checking and order collecting and calling 

        // getting the values all the items to order for then 
        //making the the address is default each time
        // pushing to server and waiting for the order id and and showing only redireting.
        // after creating the order in the db

        let url = window.location.origin +"/query/v1/userorder/create";
        axios.post(url, {
            list:[],
            userDetails:[], //includes the address of the current
            instruction:[] //instruction of the current
        }) //giving the current value of the information and then getting back the order id.

        let orderId = "33d02e"
        setTimeout(function () {
            router.push("/dashboard/order/"+orderId )
            setTimeout(function() {
                setCrateLength(0)
                localStorage.setItem(localCrate, "{}")
            }, 500)
        }, 200)
        }

    }


    function handleEnd(touch: any) {

        const buttonWidth = (buttonRef.current?.clientWidth ?? 0) / 2;

        let difference = Number(touchValue.current.touchEnd - touchValue.current.touchStart);

        let percentage = difference / buttonWidth;

        if (percentage > 1) {
            percentage = 1;
        }

        if (difference < 0) {
            return;
        }

        // console.log(difference, targetValue.style.left, opacity);)


        if (percentage == 1) {
            function tillEnd() {
                if (swipeRef.current) {
                    if (parseInt(swipeRef.current.style.left) < buttonWidth * 2 - 30) {
                        swipeRef.current.style.left = (parseInt(swipeRef.current.style.left) + 4) + "px";
                        requestAnimationFrame(tillEnd);
                    } else {
                        if (fromTextRef.current && deliveryRef.current) {
                            fromTextRef.current.textContent = to;
                            fromTextRef.current.style.opacity = "1";
                            deliveryRef.current.classList.remove("hide");
                            console.log(deliveryRef.current.style.display)
                        }
                        swipeRef.current.innerHTML = ""
                        swipeRef.current.classList.add("swipe")
                        setDelivered(true)
                        // TODO 
                        redirect()

                        // No need to removeEventListener here since React handles event binding
                    }
                }
            }
            requestAnimationFrame(tillEnd);
        } else {
            function goBack() {
                if (parseInt(swipeRef.current?.style.left!) > 10) {
                    if (swipeRef.current) {
                        swipeRef.current.style.left = (parseInt(swipeRef.current.style.left) - 4) + "px";
                    }
                    if (fromTextRef.current) {
                        fromTextRef.current.style.opacity = String(Number(fromTextRef.current.style.opacity) + 0.03);
                    }
                    requestAnimationFrame(goBack)
                }
            }
            requestAnimationFrame(goBack);
        }
    }

    function handleFirst(event: React.TouchEvent<HTMLDivElement>) {
        if (event.touches && event.touches.length > 0) {
            const firstTouch = event.touches[0];
            touchValue.current.touchStart = firstTouch.clientX;
        }
    }

    if(disable) {
        return <div className={"select-none w-3/5 h-12 rounded-lg overflow-hidden flex items-center justify-end pl-2 pr-6  relative bg-gray-400" }>
        <div ref={swipeRef} onTouchEnd={()=>{}} onTouchStart={()=> {}} onTouchMove={() => { }} className={"left-[5px] absolute cursor-pointer size-9 rounded-full  flex justify-center items-center animate-none bg-gray-600 transition origin-[center_right] ease-out duration-700"} >
            <ChevronsRight className="text-white"></ChevronsRight>
        </div>
        <div className="flex gap-6 relative z-10">
            <PackageCheckIcon ref={deliveryRef} className="hide  text-white" />
            <div className=" text-white" ref={fromTextRef}>
                {from}
            </div>
        </div>
    </div>
    }

    return <div ref={buttonRef} className={"select-none w-3/5 h-12 rounded-lg overflow-hidden flex items-center justify-end pl-2 pr-6  relative " + gradient}>
        <div ref={swipeRef} onTouchEnd={handleEnd} onTouchStart={handleFirst} onTouchMove={!delivered ? handleTouch : () => { }} className={"left-[5px] absolute cursor-pointer size-9 rounded-full  flex justify-center items-center animate-none bg-lime-600 transition origin-[center_right] ease-out duration-700"} >
            <ChevronsRight className="text-white"></ChevronsRight>
        </div>
        <div className="flex gap-6 relative z-10">
            <PackageCheckIcon ref={deliveryRef} className="hide  text-white" />
            <div className=" text-white" ref={fromTextRef}>
                {from}
            </div>
        </div>
    </div>
}
