"use client"

import { CategoryItemInformation, Itemlist } from "@/app/(protected)/lib/placeholder-data";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useTransition, Suspense, lazy, SetStateAction, useRef, useCallback } from "react"
import { ItemCard } from "./itemCard";


export function EachCategory({ footerRef }: { footerRef: React.RefObject<HTMLElement | null> }) {

        const [offMargin, setOffMargin] = useState(0)
        const [isPending, startTransition] = useTransition();
        const [isLoading, SetLoading] = useState(false);
        const [itemList, setItemList] = useState<any[]>([])
        let dataOffset = useRef<number>(0);
        console.log("running twice")
        let deDounceClear:React.RefObject<any>=useRef(undefined)


        let fetchData = useCallback(async function () {
                SetLoading(true)
                let url = window.location.origin;
                console.log("fetching the data")
                let result = (await axios(url + "/query/v1/category?offset=" + dataOffset.current)).data.data;

                if (result.length > 0) {
                        setOffMargin(prev => {
                                dataOffset.current = prev + 2;
                                return prev + 2;
                        })
                        //calling the async function here and startTransition to be inside that.    
                        startTransition(() => {
                                setItemList(prev => {

                                        if (!prev) {
                                                return result;
                                        }

                                        return [...prev, ...result];
                                })

                        })
                }
                setTimeout(function () {
                        SetLoading(false)
                }, 700)

                console.log(result)
        },[dataOffset ])

        useEffect(function () {
                console.log("category component running")
                let observer = new IntersectionObserver((entry) => {
                        console.log(entry.length)
                        entry.forEach(m => {
                                if (m.isIntersecting) {
                                        console.log(offMargin)
                                        //debouncing
                                        clearTimeout(deDounceClear.current)
                                        deDounceClear.current = setTimeout(function () {
                                                fetchData()
                                        }, 800)
                                }
                        })
                }, { threshold: [0.5] })

                if (footerRef.current) {
                        observer.observe(footerRef.current)
                }
                let variableCurrent = footerRef.current;


                return () => {
                        if (variableCurrent) {
                                observer.unobserve(variableCurrent);
                        }
                        //localStorage.clear();
                        //TODO : later not clearing up - setting a time for clear up and then on the reload using the data to fill the button value as well.
                };

        }, [fetchData, footerRef, offMargin])

        

        return <div>
                <div className="adding_data">

                </div>
                <div>
                        {itemList.length > 0 ? <div>
                                {
                                        itemList.map((item: CategoryItemInformation, index) => {
                                                let categoryName = item.name;
                                                let imageURL = item.imageURL;
                                                let buttonURL = item.buttonURL;
                                                let bgcolor = item.bgcolor;
                                                let list = item.list;
                                                let shortDescription = item.shortDescription;

                                                return <div key={index}>
                                                        {/* {JSON.stringify(item)} */}
                                                        <div>
                                                                <div className="flex justify-between items-start py-2 px-7">
                                                                        <div className="flex flex-start gap-2 items-center justify-between">
                                                                                <div className="">
                                                                                        <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} width={40} height={40} className={bgcolor} alt={categoryName} />
                                                                                </div>
                                                                                <div className="flex flex-col text-black">
                                                                                        <div className="text-xl font-medium tracking-tight">{categoryName}</div>
                                                                                        <div className="text-xs text-gray-500 mt-[-4px]">{shortDescription}</div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="">
                                                                                <Link href={buttonURL} className="text-link">
                                                                                        see all <ChevronRightIcon className="inline size-4" />
                                                                                </Link>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="flex gap-2 h-88 overflow-x-scroll w-full overflow-y-hidden pl-6 pr-2 ">
                                                                {/* card list */
                                                                        list.slice(0,10).map((m: Itemlist, index: number) => {
                                                                                let name = m.name;
                                                                                let imageURL = m.imageURL;
                                                                                let buttonURL = m.buttonURL;
                                                                                let quantity = m.quantity;
                                                                                let primarySize = m.primarySize;
                                                                                let secondarySize = m.secondarySize;
                                                                                let mrp = m.mrp;
                                                                                let discountPrice = m.discountValue;
                                                                                let savingAmount = m.savingAmount;
                                                                                let offers = m.offers;
                                                                                let unit = m.unit;
                                                                                let brand = m.brand;
                                                                                let secondaryUnit = m.secondaryUnit;
                                                                                let conversion = m.conversionRate
                                                                                let outofstock = m.outOfStock;
                                                                                let comingsoon = m.comingSoon;
                                                                                let category = m.category;

                                                                                return <ItemCard   category={category} cardType="dashboard" outOfStock={outofstock} comingSoon={comingsoon} key={index} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} />
                                                                        })
                                                                }
                                                        </div>
                                                </div>
                                        })
                                }
                        </div> : ""}
                        {isPending || isLoading && <CategoryLoading />}
                        {/* {true && <CategoryLoading/>} */}

                </div>
        </div>
}

//loading loader when reaching the end 
//adding the value after 2 each time. fetching the data backend-- simulation.

function CategoryLoading() {

        return <div className="flex justify-center items-center  w-[100px] h-[80px] m-auto">
                <Image src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]" />
        </div>
}
