"use client"

import axios from "axios"
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react"
import { filterProps } from "../filterModal";


export function TypeBar({type, setType}:{type:string, setType:React.Dispatch<SetStateAction<filterProps[]>>}) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        let url = window.location.origin +"/query/v1/type/"+type;
        axios.get(url).then(data => {
           //console.log(data.data.result)
        //    console.log(data.data.result, type)
           setList(data.data.result)
           setLoading(false)
        })
    },[type])

    return <div className=" flex flex-col gap-6 flex-start py-4 items-center justify-start h-[92%] overflow-scroll typebar">
                <div className="flex flex-col items-center" onClick={function (){
                    setType(prev => {
                      let newValue =  prev.map(m => {
                            
                               let newValue =  m.options.map(n => {
                                    n.checked = false;
                                    return n;
                               })
                               m.options = newValue;
                               
                            return m;
                        })
                        return newValue;
                    })
                }}>
                    <div className="h-[50px] w-[50px] bg-[#ebf6ff]/60 rounded-full flex items-center justify-center">
                      <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/types/all.png"} height={40} width={40} alt="all" className="border w-[40px] h-[40px] object-contain  rounded-full"/>
                    </div>
                <div  className="text-center text-xs"> 
                    All
                </div>
                </div>
            
            {loading ? <SkeletonType/>:""}
            {list.map((typeValue, index) => {
                //changing the type of the filter value - to that type as well.
                return <div onClick={function () {
                    setType(prev => {
                      let newValue =  prev.map(m => {
                            if(m.id == "type" ) {
                               let newValue =  m.options.map(n => {
                                if(n.id ==  typeValue) {
                                    n.checked = true;
                                }else {
                                    n.checked = false;
                                }
                                return n;
                               })
                               m.options = newValue;
                            }

                            return m;
                        })
                        return newValue;
                    })
                }} key={index}className="text-xs flex flex-col items-center">
                    <div className="h-[50px] w-[50px] bg-[#ebf6ff]/60 rounded-full flex justify-start items-center">
                        <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/types/"+typeValue+".png"} alt={typeValue} width={50} height={50} className="rounded-full"/> 
                    </div> 
                    <div className="text-[11px] text-center text-xs p-0.5">
                    {typeValue}
                    </div>
                    </div>
            })}
    </div>
}

function SkeletonType() {

    const [skeleton, ] = useState([0,0,0,0,0])

    return <div className="gap-10 flex flex-col justify-start items-center">
        {
            skeleton.map((m,index) => {
                return <div key={index} className="h-[50px] w-[50px] bg-gray-500/50 rounded-full animate-pulse">
                      
                </div>
            })
        }

    </div>
}