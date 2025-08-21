"use client"
import { Itemlist, Preorder } from "@/app/lib/placeholder-data"
import { localPreorder } from "@/app/lib/utils"
import { BackButton } from "@/app/ui/dashboard/BackButton"
import { BottomBar } from "@/app/ui/dashboard/bottomBar"
import { CrateComponent } from "@/app/ui/dashboard/crateComponent"
import { PreorderCard } from "@/app/ui/dashboard/preordercard"
import { TopBar } from "@/app/ui/dashboard/topBar"
import { SkeletonPreOrderCard } from "@/app/ui/skeletonPreOrderCard"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {


    let [list, setList] = useState<Preorder[]>([]);


    if(localStorage.getItem(localPreorder)) {
        let data = JSON.parse(localStorage.getItem(localPreorder) as string);
        let result:Preorder[] = Array.from(Object.values(data));
        list = (result)
    }else {
        localStorage.setItem(localPreorder, "{}");
    }

    useEffect(function () {
        let url = window.location.origin + "/query/v1/preorder-list";
        axios.get(url).then(m => {
            let data  = m.data.result;
            //replacing the localstorage data with the data
            let localData = JSON.parse(localStorage.getItem(localPreorder) as string);
            for (let items of data) {
                let title = items.title.toLowerCase()
                //simply updating the local database with outside value.
                // in case the value is there it will change or if not will create it.
                 localData[title] = items
            }
            localStorage.setItem(localPreorder,JSON.stringify(localData))
            let result:Preorder[] = Array.from(Object.values(data));
            setList(result)
        })

    },[])


    //about the preorder list - we must store the value of the preorder for the faster loading and better quality experience and fetching the data after 
    // in case of new updates.

    return <div className="text-black bg-[#ebf6f6]">
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


