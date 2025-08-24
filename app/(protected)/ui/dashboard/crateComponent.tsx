"use client"
import { CrateContext } from "../rootLayoutClient";
import { localCrate } from "@/app/(protected)/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState} from "react";

export function CrateComponent() {


    // let [orderList, setOrderList] = useState()


  

    // let [currentLength, setCurrentLength] = useState(0);
    let crateContext = useContext(CrateContext);
    let crateLength = crateContext?.crateLength ?? 0;
    let setCrateLength = useMemo(()=> crateContext?.setCrateLength ?? (() => {}),[crateContext?.setCrateLength]);

    if (!localStorage.getItem(localCrate)) {
        localStorage.setItem(localCrate, "{}")
    }

    let localObject = JSON.parse(localStorage.getItem(localCrate) as string) || {};
    const crate = Array.from(Object.keys(localObject));

      useEffect(function () {
            //fetching the booking data
            //getting the latest data in  the order ids and other things with it
            setCrateLength(prev => {
                console.log(crate.length, prev) 
                return crate.length
            })

    }, [crate.length, setCrateLength])

    return <Link href={"/dashboard/crate"} className="p-2 bg-logo rounded-full relative">
        <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/crate.svg"} height={25} width={25} className="w-[18px] h-[18px]" alt="cart symbol" />
        {crateLength > 0 ? <div className="absolute top-[-20%] right-[-5%] text-sm text-white rounded-full bg-red-600 px-1 w-4 h-4 flex items-center justify-center">
            {crateLength}
        </div> : null}
    </Link>
}