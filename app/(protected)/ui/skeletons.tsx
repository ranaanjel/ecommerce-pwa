"use client"
import { useState } from "react"

export function SkeletonLoading({type}:{type?:"crate"|"item"|"banner"}) {

    if(type == "banner") {
       return <div className={"animate-pulse relative h-52 min-w-[100%] w-[100%] snap-always snap-center bg-gray-400/50 rounded-lg py-6 px-4 overflow-hidden flex-col flex gap-3 items-start justify-between"}>
    </div>
    }

    if(type == "crate" ){
        

    return <div className="flex flex-col gap-4 p-4">
        {
          [0, 0, 0].map((_, index) => {
                return <SkeletonCardHorizontal key={index} />
            })
        }
    </div>
    }

     if(type == "item" ){
        

    return <div className="">
        {
            [0].map((_, index) => {

                return <SkeletonCardItem key={index} />
            })
        }
    </div>
    }


    return <div className="grid grid-cols-2 gap-2">
        {
            [0,0,0,0].map((_, index) => {

                return <SkeletonCard key={index} />
            })
        }
    </div>
}


function SkeletonCardItem() {

    return <div className="animate-pulse bg-white h-screen w-[100%] flex flex-col gap-4 p-2">
        <div className="h-1/3 bg-gray-200 w-full">
        </div>
        <div className="flex justify-between ">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="flex justify-between flex-1">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="w-full h-2 bg-gray-200">
        </div>
    </div>
}

function SkeletonCard() {
    return <div className="animate-pulse bg-white h-74 w-[100%] flex flex-col gap-4 p-2">
        <div className="h-1/3 bg-gray-200 w-full">
        </div>
        <div className="flex justify-between ">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="flex justify-between flex-1">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="w-full h-2 bg-gray-200">
        </div>
    </div>
}

function SkeletonCardHorizontal() {
    return <div className="animate-pulse bg-white h-30 w-[100%] flex flex-col gap-4 p-8">
        <div className="w-full h-20 bg-gray-200"> </div>
        <div className="w-full h-5 bg-gray-200">
            </div>
    </div>
}
