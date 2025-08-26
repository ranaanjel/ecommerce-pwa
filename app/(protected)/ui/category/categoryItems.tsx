"use client"
import { Itemlist, category as CategoryType } from "@/app/(protected)/lib/placeholder-data";
import axios from "axios"
import Image from "next/image";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { ItemCard } from "../dashboard/itemCard";
import { filterProps } from "../filterModal";

export function CategoryItems({ category, footerRef, filterValue, typeCategory }: {typeCategory:string,  category: string, footerRef: React.RefObject<HTMLElement | null>, filterValue: filterProps[] }) {

    const [loading, setLoading] = useState(true);
    const [fetchLoad, setFetchLoad] = useState(false);
    let [list, setList] = useState<Itemlist[]>([]);

    let marginValue = useRef<number>(0);
    let debounceValue: React.RefObject<string | number | NodeJS.Timeout | undefined>= useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    let observerValue = useRef<IntersectionObserver|undefined>(undefined)
    let fetchData = useCallback( async function fetchData( footRef:HTMLElement) {
        setFetchLoad(true);
        console.log("fetching the dataa")
        let url = window.location.origin + "/query/v1/categoryItem/" + category + "?offset=" + marginValue.current;
        let data = await axios.get(url)
   
        console.log(data.data.result, observerValue.current) 
        if (data.data.result.length == 0 && observerValue.current !=undefined) {
            observerValue.current.unobserve(footRef as HTMLElement);
        }
        marginValue.current = marginValue.current + 8;

        setList((prev) => {
            if (!prev) {
                return [...data.data.result]
            }


            return [...prev, ...data.data.result]
        })
        setLoading(false);
        setFetchLoad(false);

        // console.log(data.data.result, marginValue )
    },[marginValue, category, footerRef, observerValue])
    useEffect(function () {
        fetchData( footerRef.current as HTMLElement);
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("intersecting")
                    clearTimeout(debounceValue.current)
                    debounceValue.current = setTimeout(function () {
                        fetchData(footerRef.current as HTMLElement);
                    }, 700)
                }
            })

        }, { threshold: [0] })

        observerValue.current = observer;

        if (footerRef.current) {
            observer.observe(footerRef.current)
        }
        let currentFooter = footerRef.current;

        return function () {
            if (currentFooter) observer.unobserve(currentFooter);
            observer.disconnect();
        }
    }, [fetchData, footerRef])


    //running on the scroll to the bottom;
    let modifiedItemList = [...list];
    filterValue.forEach(m => {
        if (m.id == "price") {
            //sorting 
            // filter out the value
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }
            // console.log(data)
            let string = data[0].id;
            if (string == "low to high") {
                modifiedItemList.sort((a, b) => {
                    return a.discountValue - b.discountValue;
                })
            } else {

                modifiedItemList.sort((a, b) => {
                    return b.discountValue - a.discountValue;
                })
            }

        } else if (m.id == "brand") {
            //filtering
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }
            let newList:any= []
            data.forEach(m => {
                 for (let x of modifiedItemList ) {
                    if(x.brand == m.id) {
                        newList.push(x)
                    }
                 }
                
            })

            modifiedItemList = newList;


        } else if (m.id == "type") {
            //filtering
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }

            let newList:any= []
            //requires to send the type
            // console.log(typeCategory, modifiedItemList)
            data.forEach(m => {

                 for (let x of modifiedItemList ) {
                    
                    if (Object.values(x.type!).includes(m.id)) {
                        newList.push(x)
                    }
                    //@ts-ignore
                    // console.log(Object.values(x.type!), Object.values(x.type!).includes(m.id))
                 }
                
            })

            // console.log(modifiedItemList)

            modifiedItemList = newList;
        }
    })

    list = modifiedItemList;


   

    return <div className="p-2 mb-6 min-h-screen" >
        {loading ? <SkeletonLoading /> : ""}
        <div className="grid grid-cols-2 gap-2">
            {list.map((m: Itemlist, index: number) => {
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
                let outofstock = m.outOfStock
                let comingSoon = m.comingSoon
                let category = m.category;
                return <ItemCard cardType="category" key={index} category={category} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} outOfStock={outofstock} comingSoon={comingSoon} setOpenModal={function (value: SetStateAction<boolean>): void {
                                    throw new Error("Function not implemented.");
                                } } setItemDelete={function (value: SetStateAction<string>): void {
                                    throw new Error("Function not implemented.");
                                } } />
            })}
        </div>
        {fetchLoad ? <CategoryLoading /> : ""}
    </div>

}


function CategoryLoading() {
    return <div className="flex justify-center items-center  w-[100px] h-[80px] m-auto">
        <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]" />
    </div>
}

function SkeletonLoading() {
    const [skeletonValue,] = useState([0, 0, 0, 0])

    return <div className="grid grid-cols-2 gap-2">
        {
            skeletonValue.map((_, index) => {

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

