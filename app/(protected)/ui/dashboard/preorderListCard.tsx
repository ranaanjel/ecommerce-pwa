import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PreorderCard } from "./preordercard";
import { Preorder } from "@/app/(protected)/lib/placeholder-data";
import { useEffect, useState } from "react";
import { localPreorder } from "@/app/(protected)/lib/utils";
import axios from "axios";
//this has to be the datacall

export default function PreOrder() {

    let [preorderList, setPreorderList] = useState<Preorder[]>([])

    if(localStorage.getItem(localPreorder)) {
        let data = JSON.parse(localStorage.getItem(localPreorder) as string);
        let result:Preorder[] = Array.from(Object.values(data));
        preorderList = (result)
    }else {
        localStorage.setItem(localPreorder, "{}");
    }

    useEffect(function () {
        let url =  "/query/v1/preorder-list";
        axios.get(url).then(m => {
            let data  = m.data.result;
            // console.log(data)
            //replacing the localstorage data with the data
            if(typeof localStorage == undefined) return;
            let localData = JSON.parse(localStorage.getItem(localPreorder) as string);
            for (let items of data) {
                let title = items.title.toLowerCase()
                //simply updating the local database with outside value.
                // in case the value is there it will change or if not will create it.
                 localData[title] = items
            }
            localStorage.setItem(localPreorder,JSON.stringify(localData))
            let result:Preorder[] = Array.from(Object.values(data));
            setPreorderList(result)
        }).catch(err=> console.log(err))

    },[])

    return <div className="text-black py-2 w-full">
        <nav className="flex justify-between items-center px-6">

        <div className="text-2xl font-medium"> Pre order List </div>
        <Link href="/dashboard/preorder-list" className="text-link">
            see all <ChevronRightIcon className="inline size-4"/>
        </Link>
        </nav>
        <div className="flex gap-2 h-88 overflow-x-scroll w-full overflow-y-hidden pl-6 pr-2">
           {
            preorderList.map((m, index)=> {
                let title = m.title;
                let description = m.description;
                let imageURL = m.imageURL;
                let buttonURL = m.buttonURL;
                let list = m.list;
                let bgTitle = m.bgTitle;
                let bgBody = m.bgBody;
                let iconURL = m.iconURL

                return  <PreorderCard bgBody={bgBody} iconURL={iconURL} bgTitle={bgTitle} key={index} title={title} description={description} imageURL={imageURL} buttonURL={buttonURL} list={list} />
            })
           }
        </div>
    </div>
}