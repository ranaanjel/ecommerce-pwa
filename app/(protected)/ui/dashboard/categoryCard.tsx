import { categoryList, upcomingCategoryList } from "@/app/(protected)/lib/placeholder-data"
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export function Categories({ type, active }: { type: "page" | "dropdown" | "component" | "line", active?: string }) {

    //component - inside the dashboard
    //page for the /dashbaord/category
    //popover for the /category/[category]

    let [categoryListFetch, setCategoryListFetch] = useState<{name:string,imageURL:string, buttonURL:string }[]>([]);
    let [upcomingListFetch, setCategoryUpcoming] = useState<{name:string,imageURL:string, buttonURL:string }[]>([]);



     useEffect(function () {
        let url = (window.location.origin);

        let itemsUrl = url + "/query/v1/category/list" ;
        
        axios.get(itemsUrl).then(m => {
            let data = m.data.result;
            setCategoryListFetch(data.active)
            setCategoryUpcoming(data.upcoming)
        })

    }, [])

    if (type == "component") {
        return <div className="px-6 text-black">
            <div className="text-xl font-semibold">Shop by category</div>
            <div className="grid grid-cols-3 place-items-center text-center w-full gap-2 my-2">
                {
                  categoryListFetch && categoryListFetch.length > 0 && categoryListFetch.map((m, index) => {
                        let itemName = m.name;
                        let imageURL = m.imageURL
                        let buttonURL = m.buttonURL;
                        return <CategoryItem type="component" key={index} itemName={itemName} imageURL={imageURL} buttonURL={buttonURL} />
                    })
                }
            </div>
        </div>

    }
    if (type == "page") { //dashboard/category

        return <div className="px-2 text-black">
            <div className="grid grid-cols-3 place-items-center text-center w-full gap-1 my-2">
                {
                    categoryListFetch && categoryListFetch.length > 0 && categoryListFetch.map((m, index) => {
                        let itemName = m.name;
                        let imageURL = m.imageURL
                        let buttonURL = m.buttonURL;
                        return <CategoryItem type="page" key={index} itemName={itemName} imageURL={imageURL} buttonURL={buttonURL} />
                    })
                }
            </div>
            <div>
                <div className="flex text-xl px-4 mt-4 font-semibold">
                    Coming soon
                    < Image src="/PersonSimpleRun.svg" height={25} width={25} alt="coming soon" />

                </div>

                <div className="grid grid-cols-3 place-items-center text-center w-full gap-1 my-2">
                    {
                        categoryListFetch && categoryListFetch.length > 0 && upcomingListFetch.map((m, index) => {
                            let itemName = m.name;
                            let imageURL = m.imageURL
                            console.log(itemName)
                            return <UpcomingCategory type="page" key={index} itemName={itemName} imageURL={imageURL || "/default-image.png"} />
                        })
                    }
                </div>
            </div>
        </div>
    }

    if (type == "line") {
        return <div className=" text-black">
            <div className="flex justify-between">
                <div className="text-md font-semibold">Categories</div>
                <div className="text-md font-normal text-logo flex"><Link className="flex" href="/dashboard/category">see all <ChevronRight></ChevronRight></Link> </div>
            </div>
            <div className="flex pb-2 place-items-center text-center w-full gap-2 my-2 overflow-x-scroll lightScroll ">
                {
                  categoryListFetch && categoryListFetch.length > 0 && categoryListFetch.map((m, index) => {
                        let itemName = m.name;
                        let imageURL = m.imageURL
                        let buttonURL = m.buttonURL;
                        return <CategoryItem type="component" key={index} itemName={itemName} imageURL={imageURL} buttonURL={buttonURL} />
                    })
                }
            </div>
        </div>

    }

    return <div className="px-6 text-black">
        <div className="grid grid-cols-3 place-items-center text-center w-full gap-2 my-2">
            {
                categoryListFetch && categoryListFetch.length > 0 && categoryListFetch.map((m, index) => {
                    let itemName = m.name;
                    let imageURL = m.imageURL
                    let buttonURL = m.buttonURL;
                    return <CategoryItem active={active} type="dropdown" key={index} itemName={itemName} imageURL={imageURL} buttonURL={buttonURL} />
                })
            }
        </div>
    </div>


}

function CategoryItem({ active, itemName, imageURL, buttonURL, type }: { active?: string, type: "page" | "component" | "dropdown", itemName: string, imageURL: string, buttonURL: string }) {
    let router = useRouter();

    if (type == "component") {

        return <div onClick={function () {
            router.push(buttonURL)
        }} className="flex flex-col gap-1 items-center min-h-[94px]" >
            <div className="bg-[#cce8ff] w-[74px] h-[60px] rounded relative">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} alt={itemName} height={90} width={90} className="w-[100px] absolute bottom-0" />
            </div>
            <div className="font-normal text-xs w-[77px]">{itemName}</div>
        </div>
    }
    if (type == "page") {
        // console.log("inside the page")
        if (itemName.toLocaleLowerCase() == "vegetables") {

            console.log(imageURL)

            return <div onClick={function () {
                router.push(buttonURL)
            }} className="flex flex-col col-span-2 gap-1 items-center min-h-[124px] w-full" >
                <div className="bg-[#cce8ff] w-[248px] h-[80px] rounded relative ">
                    <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/categories/vegetables2.png"} alt={itemName} height={80} width={120} className="w-[160px] h-[80px] absolute bottom-0 left-[50%] translate-x-[-50%]" />
                </div>
                <div className="font-normal text-sm">{itemName}</div>
            </div>
        }

        return <div onClick={function () {
            router.push(buttonURL)
        }} className="flex flex-col gap-1 items-center min-h-[124px]" >
            <div className="bg-[#cce8ff] w-[104px] h-[80px] rounded relative">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} alt={itemName} height={120} width={120} className="w-[135px] absolute bottom-0" />
            </div>
            <div className="font-normal text-sm w-[104px]">{itemName}</div>
        </div>
    }

    let checkup = itemName.replace(/\s/g, "");
    let test = active?.replace(/\s/g, "");

    if (checkup.includes(test!)) {
        return <div onClick={function () {
            router.push(buttonURL)
        }} className="flex flex-col gap-1 items-center min-h-[94px]" >
            <div className="bg-[#cce8ff] w-[74px] h-[60px] rounded relative">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} alt={itemName} height={90} width={90} className="w-[100px] absolute bottom-0" />
            </div>
            <div className="font-normal text-xs w-[77px]">{itemName}</div>
        </div>
    }


    return <div onClick={function () {
        router.push(buttonURL)
    }} className="flex flex-col gap-1 items-center min-h-[94px]" >
        <div className="bg-[#cce8ff] w-[74px] h-[60px] rounded relative">
            <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} alt={itemName} height={90} width={90} className="w-[100px] absolute bottom-0" />
        </div>
        <div className="font-light text-xs w-[77px]">{itemName}</div>
    </div>
}

function UpcomingCategory({ itemName, imageURL, buttonURL, type }: { type?: "page" | "component" | "dropdown", itemName: string, imageURL: string, buttonURL?: string }) {
    let router = useRouter();
    return <div onClick={function () {
        console.log("upcoming")
    }} className="flex flex-col gap-1  min-h-[124px] items-center opacity-70" >
        <div className="bg-gray-400/40 w-[104px] h-[80px] rounded relative self-start">
            <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} alt={itemName} height={80} width={120} className="w-full h-full object-contain" />
        </div>
        <div className="font-normal text-sm w-[104px]">{itemName}</div>
    </div>
}