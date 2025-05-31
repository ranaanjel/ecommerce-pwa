"use client"

import { CategoryItemInformation, Itemlist } from "@/app/lib/placeholder-data";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useTransition, Suspense, lazy, SetStateAction, useRef } from "react"


export function EachCategory({ footerRef }: { footerRef: React.RefObject<HTMLElement | null> }) {

        const [offMargin, setOffMargin] = useState(0)
        const [isPending, startTransition] = useTransition();
        const [isLoading, SetLoading] = useState(false);
        const [itemList, setItemList] = useState<any[]>([])
        let dataOffset = 0;
        console.log("running twice")
        let deDounceClear: any;

        useEffect(function() {
                console.log("category component running")
                let observer = new IntersectionObserver((entry) => {
                        console.log(entry.length)
                        entry.forEach(m => {
                                if (m.isIntersecting) {
                                        console.log(offMargin)
                                        //debouncing
                                        clearTimeout(deDounceClear)
                                        deDounceClear = setTimeout(function() {
                                                fetchData()
                                        }, 800)
                                }
                        })
                }, { threshold: [0.5] })

                if (footerRef.current) {
                        observer.observe(footerRef.current)
                }

                return () => {
                        if (footerRef.current) {
                                observer.unobserve(footerRef.current);
                        }
                        //localStorage.clear();
                        //TODO : later not clearing up - setting a time for clear up and then on the reload using the data to fill the button value as well.
                };

        }, [])

        async function fetchData() {
                SetLoading(true)
                let url = window.location.origin;
                console.log("fetching the data")
                let result = (await axios(url + "/query/v1/category?offset=" + dataOffset)).data.data;

                if (result.length > 0) {
                        setOffMargin(prev => {
                                dataOffset = prev + 2;
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
                setTimeout(function() {
                        SetLoading(false)
                }, 700)

                console.log(result)
        }

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
                                                                                        <Image src={imageURL} width={40} height={40} className={bgcolor} alt={categoryName} />
                                                                                </div>
                                                                                <div className="flex flex-col">
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
                                                        <div className="flex gap-2 h-88 overflow-x-scroll w-full overflow-y-hidden pl-6 pr-2">
                                                                {/* card list */
                                                                        list.map((m: Itemlist, index: number) => {
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

                                                                                return <ItemCard key={index} category={categoryName} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} />
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
function ItemCard({ name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate }: Itemlist) {

        let [quant, setQuantity] = useState(quantity)

        return <div className="bg-white relative mt-2 h-82 min-w-[52%] w-[52%] max-w-[52%] rounded-lg flex flex-col">
                <div className="border-b border-gray-200 text-center flex justify-center w-full min-h-[150px] items-center ">
                        <Image src={imageURL} height={150} width={150} alt={name} className="w-[100px] h-[100px] object-contain" />
                </div>
                <div className="py-2 px-4 flex-1 flex flex-col justify-between">
                        <div>
                                <Link href={buttonURL}>{name}</Link>
                                <div className="text-xs text-gray-400">{brand.toLocaleLowerCase() == "unbranded" ? "" : brand}  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
                                <div className="text-sm mt-1">
                                        ₹  {discountValue * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                                </div>
                                <div className="text-xs text-green-500">
                                        {/* //saving  */}
                                        {savingAmount && mrp && (mrp - discountValue) != 0 ? "saving ₹ " + (mrp - discountValue) * quant : ""}
                                </div>
                                <div className="text-xs text-logo mt-1">
                                        {/* //offers */}
                                        {
                                                offers.slice(0, 2).map((m, index) => {
                                                        return <div key={index}>
                                                                <Link href={buttonURL + "?quantiy=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                                                        ₹ {m.price} for {m.quantity + " " + m.unit}
                                                                </Link></div>
                                                })
                                        }
                                </div>
                        </div>

                        <div className="flex justify-center">
                                {/* //button */}
                                <Button primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
                        </div>
                </div>
                <div className="bg-gray-400/50 w-full h-2 self-end block">

                </div>
        </div>
}

function Button({ quant, itemname, category, setItemQuantity, unit, discountPrice, mrp , primarySize}: { quant: number, itemname: string, category: string, primarySize:number, setItemQuantity: any, unit: string, discountPrice: number, mrp: number }) {
        //managing the cart value in the localstorage for multi page state management.
        let existingData;
        let [quantity, setQuantity]  = useState(0)
        const inputRef = useRef<HTMLInputElement>(null)

        if (localStorage.getItem("crate")) {
                existingData = JSON.parse(localStorage.getItem("crate") as string);
                if (itemname in existingData) {
                        quantity = existingData[itemname].quant;
                }
        } 
        
        

        let basicColor = "select-none text-primary w-[90%] bg-sky-300/40 text-sm justify-between items-center flex rounded-lg border-1 border-primary"
        let itemData = {
                 itemname,
                quant: quantity,
                category,
                unit,
                discountPrice,
                mrp
        }

        function saveInLocal(quantity:number) {
                let localstorageObject ; 
                if (!localStorage.getItem("crate"))  { 
                        localstorageObject = localStorage.setItem("crate", "{}");
                }
                localstorageObject = JSON.parse(localStorage.getItem("crate") as string);

                if(!(itemname in localstorageObject)) {
                    itemData.quant = quantity;
                    localstorageObject[itemname] = itemData;
                    console.log("creating", itemname, localstorageObject)
                } else {
                    localstorageObject[itemname].quant = quantity;
                    console.log("changing", itemname)
                }
                localStorage.setItem("crate", JSON.stringify(localstorageObject));
                console.log(localStorage)
        }

        function increase() {
                setQuantity(prev => {
                        //setItemQuantity(prev+quant)
                        return prev + quant
                })
                setItemQuantity(quant + quantity)
                saveInLocal(quant+quantity)
if(inputRef.current) {
                        inputRef.current.value = String(quantity+quant);
                }
        }
        function decrease() {
                setQuantity(prev => {
                        return prev - quant
                    }
                )
                if (quantity - quant > 0) {
                        setItemQuantity(quantity - quant)
                }
                saveInLocal(quantity-quant)
                if(inputRef.current) {
                        inputRef.current.value = String(quantity-quant);
                }
        }
        function changeValue(value:number) {
                setQuantity(prev => {
                        return value
                    }
                );
                if (value != 0) {
                        setItemQuantity(value);
                }
                saveInLocal(value);
        }

        //after a certain threshold changing the value as well -- i.e offers to check and imply

        if (quantity <= 0) {
                return <div onClick={increase} className={basicColor}>
                        <div className="flex-1 text-center p-1">
                                Add
                        </div>
                        <div className="plus w-1/10 mr-2">+</div>
                </div>
                }


        return <div className={basicColor}>
                <div onClick={decrease} className="w-3/10 p-1 text-center">-</div>
                <input ref={inputRef} defaultValue={quantity} type="phone" onChange={(obj) => {
                        let data = obj.target.value;
                        if(data.match(/[A-z]/)) {
                                data = "1"
                        }
                                
                        if(data == "") {
                                data = "0"
                        }
                        if((data).length > 3) {
                               data  = data.substring(0,3)
                        }

                        if(Number(data)%quant != 0 ) {
                                data = String(Number(data)- Number(data)%quant )
                        }

                        if(inputRef.current ) {
                                console.log(inputRef.current.value)
                                inputRef.current.value = data
                                changeValue(Number(data))
                        }
                }} className="w-4/10 text-center bg-white p-1" />
                <div onClick={increase} className="p-1 plus w-3/10 text-center">+</div>
        </div>

}
