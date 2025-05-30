"use client"

import { Lusitana, Indie_Flower } from "next/font/google"
import Image from "next/image"

const lusitana = Indie_Flower({
    subsets: ["latin"],
    weight: "400"
})

export default function ComingSoon() {


    return <div className="h-full flex flex-col justify-end overflow-hidden">
        <div className="absolute w-full z-0 top-0">
            <Image src="/comingsoon.png" alt="comingsoon" height="614" width="393" className="w-full object-fill"/>
        </div>
        <div className="p-8 relative z-5 w-full rounded-t-2xl h-2/5 bg-linear-to-t from-[#014BAE] to-[#38B6FF]">
            <div>
                <div className={"text-3xl text-white "+lusitana.className}>We love your interest</div>
                <div className={"font-extrabold text-2xl text-white "+lusitana.className} > coming soon 🚚 💨 </div>
                <button onClick={function() {
                  //  console.log("hello world")
                    alert("Exclusive to customer only ! \n contact no : 8287470325")
                }} className="relative z-10 cursor-pointer rounded-[5px] bg-[#099FFF] shadow-[0px_4px_6px_rgba(0,0,0,0.14)]  mt-[18px] w-full px-[70px] py-[14px] text-2xl text-white font-bold">Explore</button>
            
            </div>
        </div>
        <div className="relative z-6">
                <Image src={"/bridge.png"} alt="bridge" height={"208"} width={"216"} className="absolute right-0 mt-[-45%] "/>
                <Image src={"/bridge.png"} alt="bridge" height={"208"} width={"216"} className="absolute left-0 mt-[-45%] rotate-y-180"/>
            </div>
    </div>
}