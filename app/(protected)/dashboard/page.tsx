"use client"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { TopBar } from "../ui/dashboard/topBar";
import { FilledMapIcon } from "../ui/svg/filledMapIcon";
import { SearchBar } from "../ui/dashboard/searchBar";
import CaraouselBanner from "../ui/dashboard/carouselBanner";
import PreOrder from "../ui/dashboard/preorderListCard";
import { Categories } from "../ui/dashboard/categoryCard";
import { dm_sans } from "@/app/(protected)/ui/font";
import { BottomBar } from "../ui/dashboard/bottomBar";
import { EachCategory } from "../ui/dashboard/eachCategory";
import { Footer } from "../ui/dashboard/footer";
import { InfoValue } from "@/actions/databaseCall";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
    const [address, setAddress] = useState("");
    const [isPending, startTransition] = useTransition();

    let {data:dataSession, status} = useSession();
    const footerRef = useRef<HTMLDivElement | null>(null);
    const name = useCallback(async function() {
        let data = await InfoValue("address")
        return data;
    },[])

    //useEffect 
    useEffect(function () {
        //fetching the address from the backend and based on the user id i.e localstorage stored and then saving in the localstorage for the future reference.
        //basic details and other things in the localstorage.
        // getting address
        startTransition(async function () {
            let data  = await name();
            if(!data) {
                console.log(dataSession?.user?.id)
                // setTimeout(function () {
                    redirect("/registration/"+dataSession?.user?.id)
                // },1000)
            }
            
            data = data.length > 25 ? data.slice(0,25)+"..." : data;
            setAddress(data);
        }) 

    }, [name, dataSession])

    //having all time - cart logo / preorder list logo to quickly go to their page in case of adding the items from navigating the places.



    return <div className={"bg-[#e7f8ff] min-h-screen w-full pb-18 "+dm_sans.className}>
        <TopBar>
            <div className="w-full text-center">

                <div className="font-medium text-[var(--navy-blue)]  text-2xl">Delivering to</div>
                <div className=" text-gray-500  text-md lowercase flex justify-center items-center gap-1 mt-[-4px] ml-[-16px]">
                    <div className="text-red-600">
                        <FilledMapIcon />
                    </div>
                    {address}
                </div>
            </div>
        </TopBar>
        <SearchBar/>
        <div className="h-60 p-4">

            <CaraouselBanner/>
        </div>
        <PreOrder/>
        <Categories type="component"/>
        
        {/* each category to show with loading - not infinte but loading on scroll down - similar to infinite but limited -- adding the value in 2 */}
        <EachCategory footerRef={footerRef}/>
        <Footer ref={footerRef}/>
        {/*footer  */}
        <BottomBar/>
    </div>
}