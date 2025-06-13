"use client"
import { Itemlist, Preorder } from "@/app/lib/placeholder-data"
import { BackButton } from "@/app/ui/dashboard/BackButton"
import { BottomBar } from "@/app/ui/dashboard/bottomBar"
import { CrateComponent } from "@/app/ui/dashboard/crateComponent"
import { PreorderCard } from "@/app/ui/dashboard/preordercard"
import { TopBar } from "@/app/ui/dashboard/topBar"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {


    let [list, setList] = useState([]);

    if(!localStorage.getItem("preorder-list")) {
        localStorage.setItem("preorder-list", "{}")
    }

    //about the preorder list - we must store the value of the preorder for the faster loading and better quality experience and fetching the data after 
    // in case of new updates.

    useEffect(function () {
        let url = window.location.origin + "/query/v1/preorder-list/" 
        axios.get(url).then(m =>  {
            setList(m.data.result)
            // this is latest preorder list for the users saving it in the localstorage.
            let data:Record<string, Preorder> = {};

            m.data.result.forEach((m:Preorder) => {
                data[m.title.toLocaleLowerCase()] = m;
            })
            localStorage.setItem("preorder-list", JSON.stringify(data))   
        })
    },[])

    return <div >
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="text-semibold text-xl capitalize whitespace-nowrap overflow-ellipsis">
                            Pre-order List
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={"/dashboard/search"} className="font-medium text-logo text-2xl">
                        <MagnifyingGlassIcon className="size-7" />
                    </Link>
                    <CrateComponent/>
                </div>
            </div>
        </TopBar>

        {
            list.length > 0 ? <div className="grid grid-cols-2 gap-1 p-4 pb-10 justify-start"> {
            list.map((m:Preorder, index)=> {
                let title = m.title;
                let description = m.description;
                let imageURL = m.imageURL;
                let buttonURL = m.buttonURL;
                let list = m.list;
                let bgTitle = m.bgTitle;
                let bgBody = m.bgBody;
                // in case the thing is out of stock and coming soon - making sure they are at the bottom end of the list 
                // that is fetching value
                return  <PreorderCard type="page"  bgBody={bgBody} bgTitle={bgTitle} key={index} title={title} description={description} imageURL={imageURL} buttonURL={buttonURL} list={list} />
            })
           }

            </div> : <SkeletonPreOrderCard/>
        }
        <div className="w-full h-24 bg-logo">

        </div>
        <BottomBar></BottomBar>
    </div>
}


export function SkeletonPreOrderCard() {
    const [list,] = useState([0,0,0,0])
 
    return <div className="grid grid-cols-2 gap-2 p-4">
        {
            list.map((_, index) => {

                return <SkeletonCard key={index} />
            })
        }
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
