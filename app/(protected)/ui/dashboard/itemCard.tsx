"use client"
import { Crate } from "@/actions/databaseCall";
import { CrateContext } from "../rootLayoutClient";
import { crateItemInterface, crateItemInterfaceEach } from "@/app/(protected)/lib/definitions";
import { category, Itemlist, Preorder } from "@/app/(protected)/lib/placeholder-data";
import { localCrate, localPreorder } from "@/app/(protected)/lib/utils";
import axios from "axios";
import { BadgeIndianRupee, Check, Trash2Icon } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";


interface ExtraList extends Itemlist {
    cardType: "category" | "dashboard" | "item" | "preorder" | "preorder-search" | "similar",
    currentData?: RefObject<any[]>,
    setOpenModal?: Dispatch<SetStateAction<boolean>>,
    setItemDelete?: Dispatch<SetStateAction<string>>,
    preorderName?: string,
    setCurrentTotal?: Dispatch<SetStateAction<number>>,
    productInfo?: {
        "Type": category,
        "Shell Life": string,
        "Storage Temperature"?: string,
        "Container"?: string
    },
    disclaimer?: string,
    limitValueOrder?: number,
    preorderListItem?: { name: string }[];
    allData?:Preorder
}

export function ItemCard({ allData,setCurrentTotal, cardType, name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData, setOpenModal, setItemDelete, preorderName, preorderListItem }: ExtraList) {



    // let [, setQuantity] = useState(quantity)
    function reduceFn(state: number, action: { payload?: number }) {
        if (action.payload) {
            return action.payload;
        }
        return state;
    }

    const [quant, dispatch] = useReducer(reduceFn, quantity);
    const [crateId, setCrateId] = useState("")

    let [discountPrice, setDiscountPrice] = useState(discountValue)

    let wholeItem = {
        name, cardType, brand, mrp, imageURL, buttonURL, quantity,
        primarySize, category, secondarySize, discountPrice, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData:currentData?.current, preorderName, setOpenModal, setItemDelete,
        discountValue
    }

    const crateContext = useContext(CrateContext);
    const setTotalLength = useMemo(() => {
        return crateContext?.setCrateLength ?? (() => { })
    }, [crateContext?.setCrateLength]);

    useEffect(function () {

        if (localStorage.getItem(localCrate)) {
            setTotalLength(Array.from(Object.keys(JSON.parse(localStorage.getItem(localCrate) as string))).length)
            let localItem = JSON.parse(localStorage.getItem(localCrate) as string);
            if (localItem[name]) {
                dispatch({ payload: localItem[name].quant })
            }

        } else {
            setTotalLength(0)
        }

    }, [crateContext?.crateLength, name, setTotalLength])



    if (cardType == "category") {



        return <div className={"bg-white relative h-76 w-[100%] rounded-lg flex flex-col "} aria-disabled={outOfStock || comingSoon}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-1/3 py-2 items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL ?? ""} className="text-xs capitalize">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

                    <div className="text-sm mt-1">
                        ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                    </div>
                    <div className="text-xs text-green-500">
                        {/* //saving  */}
                        {savingAmount && mrp && (mrp - discountPrice) != 0 ? "saving ₹ " + (mrp - discountPrice) * quant : ""}
                    </div>
                    <div className="text-xs text-logo mt-1">
                        {/* //offers */}
                        {
                            offers.slice(0, 2).map((m, index) => {
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
                                return <div key={index}>
                                    <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                        ₹ {m.price} for {m.quantity + " " + m.unit}
                                    </Link></div>
                            })
                        }
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* //button */}
                    <Button outOfStock={outOfStock as boolean}  setCrateId={setCrateId} offers={offers} originalDiscountValue={discountValue} setDiscountPrice={setDiscountPrice} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={quant} setItemQuantity={dispatch} discountPrice={discountPrice} category={category!} unit={unit} />
                </div>
            </div>
            <div className="bg-gray-400/50 w-full h-2 self-end block">
            </div>
            {outOfStock ? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center">
                <div className="bg-gray-600 p-2 rounded-sm text-white">
                    Out Of Stock
                </div>
            </div> : null}

            {comingSoon ? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center">
                <div className="bg-logo p-2 rounded-sm text-white">
                    Coming Soon
                </div>
            </div> : null}
        </div>


    }

    if (cardType == "dashboard") {

        // if (outOfStock || comingSoon) {
        //     return <div></div>
        // }
        let border = ""
        if (window.location.pathname.includes("/item/")) {

            border = " border border-gray-200"
        }


        return <div className={"bg-white relative mt-2 h-82 min-w-[52%] w-[52%] max-w-[52%] rounded-lg flex flex-col " + border}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full min-h-[150px] items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={name} className="w-[100px] h-[100px] object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL ?? ""} className="capitalize">{name}</Link>
                    <div className="text-xs text-gray-400">{brand.toLocaleLowerCase() == "generic" ? "" : brand}  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? quant * conversionRate + " " + secondaryUnit : ""} </div>
                    <div className="text-sm mt-1">
                        ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                    </div>
                    <div className="text-xs text-green-500">
                        {/* //saving  */}
                        {savingAmount && mrp && (mrp - discountPrice) != 0 ? "saving ₹ " + (mrp - discountPrice) * quant : ""}
                    </div>
                    <div className="text-xs text-logo mt-1">
                        {/* //offers */}
                        {
                            offers.slice(0, 2).map((m, index) => {
                                return <div key={index}>
                                    <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                        ₹ {m.price} for {m.quantity + " " + m.unit}
                                    </Link></div>
                            })
                        }
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* //button */}
                    <Button outOfStock={outOfStock as boolean} setCrateId={setCrateId} offers={offers} originalDiscountValue={discountValue} setDiscountPrice={setDiscountPrice} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={quant} setItemQuantity={dispatch} discountPrice={discountPrice} category={category!} unit={unit} />
                </div>
            </div>
            <div className="bg-gray-400/50 w-full h-2 self-end block">

            </div>
            {outOfStock ? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center">
                <div className="bg-gray-600 p-2 rounded-sm text-white cursor-not-allowed">
                    Out Of Stock
                </div>
            </div> : null}

            {comingSoon ? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center">
                <div className="bg-logo p-2 rounded-sm text-white">
                    Coming Soon
                </div>
            </div> : null}
        </div>
    }


    if (cardType == "preorder-search") {

        let checkInList = false;

        if (!localStorage.getItem(localPreorder)) {
            localStorage.setItem(localPreorder, "{}")
        }

        let localObject = JSON.parse(localStorage.getItem(localPreorder) as string) ?? {};

        if (!preorderName) {
            //console.log("must provide the preorder name")
            return;
        }

        // if (preorderName in localObject) {
        //     localObject[preorderName].list.forEach((m: Itemlist) => {
        //         if (m.name == name) {
        //             checkInList = true;
        //         }

        //     })
        // }
        if (preorderListItem) {
            preorderListItem.forEach((m) => {
                if (m.name == name) {
                    checkInList = true;
                }
            })
        }

        return <div className="bg-white relative h-76 w-[100%] rounded-lg flex flex-col border border-gray-200/80" aria-disabled={outOfStock || comingSoon}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-1/3 py-2 items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL ?? ""} className="text-xs capitalize">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

                    <div className="text-sm mt-1">
                        ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                    </div>
                    <div className="text-xs text-green-500">
                        {/* //saving  */}
                        {savingAmount && mrp && (mrp - discountPrice) != 0 ? "saving ₹ " + (mrp - discountPrice) * quant : ""}
                    </div>
                    <div className="text-xs text-logo mt-1">
                        {/* //offers */}
                        {
                            offers.slice(0, 2).map((m, index) => {
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
                                return <div key={index}>
                                    <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                        ₹ {m.price} for {m.quantity + " " + m.unit}
                                    </Link></div>
                            })
                        }
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* //button */}
                    <Button outOfStock={outOfStock as boolean} listData={allData} setCrateId={setCrateId} offers={offers} originalDiscountValue={discountValue} setDiscountPrice={setDiscountPrice} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} setCurrentTotal={setCurrentTotal} preorderName={preorderName} fullItem={wholeItem} inList={checkInList} type="preorder-list" primarySize={quant} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={dispatch} discountPrice={discountPrice} category={category!} unit={unit} />
                </div>
            </div>
            <div className="bg-gray-400/50 w-full h-2 self-end block">
            </div>
            {outOfStock ? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center">
                <div className="bg-gray-600 p-2 rounded-sm text-white">
                    Out Of Stock
                </div>
            </div> : null}

            {comingSoon ? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center">
                <div className="bg-logo p-2 rounded-sm text-white">
                    Coming Soon
                </div>
            </div> : null}
            {
                checkInList ? <AlreadyInList /> : ""
            }
        </div>


    }

    if (cardType == "preorder") {


        return <div className="bg-white relative h-76 w-[100%] rounded-lg flex flex-col " aria-disabled={outOfStock || comingSoon}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-1/3 py-2 items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL ?? ""} className="text-xs capitalize">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

                    <div className="text-sm mt-1">
                        ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                    </div>
                    <div className="text-xs text-green-500">
                        {/* //saving  */}
                        {savingAmount && mrp && (mrp - discountPrice) != 0 ? "saving ₹ " + (mrp - discountPrice) * quant : ""}
                    </div>
                    <div className="text-xs text-logo mt-1">
                        {/* //offers */}
                        {
                            offers.slice(0, 2).map((m, index) => {
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
                                return <div key={index}>
                                    <Link href={buttonURL ?? "" + "?quantity=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                        ₹ {m.price} for {m.quantity + " " + m.unit}
                                    </Link></div>
                            })
                        }
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* //button */}
                    <Button outOfStock={outOfStock as boolean} setCrateId={setCrateId} offers={offers} setDiscountPrice={setDiscountPrice} originalDiscountValue={discountValue} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} currentPreorderData={currentData} toShow={(outOfStock ?? false) || (comingSoon ?? false)} currentQuantity={currentQuantity || 0} primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={dispatch} discountPrice={discountPrice} category={category!} unit={unit} />
                </div>
            </div>
            <div className="bg-gray-400/50 w-full h-2 self-end block">
            </div>
            {outOfStock ? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center rounded-lg">
                <div className="bg-gray-600 p-2 rounded-sm text-white">
                    Out Of Stock
                </div>
            </div> : null}

            {comingSoon ? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center rounded-lg">
                <div className="bg-logo p-2 rounded-sm text-white">
                    Coming Soon
                </div>
            </div> : null}
            <div onClick={function () {
                setOpenModal?.(m => !m)
                setItemDelete?.(name)

            }} className="absolute right-0 p-2 z-5 ">
                <Trash2Icon className="text-gray-500 size-4 active:text-red-600 hover:text-red-600 cursor-pointer" />
            </div>
        </div>


    }



    return <div>
        items ...
    </div>

}

function Button({ outOfStock,listData,setCrateId, changeSaveValue, changeTotalValue, setDiscountPrice, originalDiscountValue, setCurrentTotal, fullItem, type, quant, itemname, category, setItemQuantity, unit, discountPrice, mrp, primarySize, currentQuantity = 0, toShow, currentPreorderData, inList, preorderName, skip, imageURL, buttonURL, maxOrder, offers }: { type?: "preorder-list" | "crateList", quant: number, itemname: string, category: string, primarySize: number, setItemQuantity: any, unit: string, discountPrice: number, mrp: number, currentQuantity?: number, toShow?: boolean, currentPreorderData?: RefObject<any[]>, inList?: boolean, fullItem?: Itemlist, preorderName?: string, setCurrentTotal?: React.Dispatch<SetStateAction<number>>, skip: boolean, imageURL: string, buttonURL: string, parentInputRef?: React.RefObject<HTMLInputElement | null>, maxOrder?: number, offers?: any, setDiscountPrice: React.Dispatch<SetStateAction<number>>, originalDiscountValue: number, changeSaveValue?: React.Dispatch<SetStateAction<number>>, changeTotalValue?: React.Dispatch<SetStateAction<number>>, setCrateId: React.Dispatch<SetStateAction<string>>, listData?:Preorder, outOfStock:boolean }) { 
    //managing the cart value in the localstorage for multi page state management?.
    let existingData = useRef<any>("");
    let [quantity, setQuantity] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null);
    const [preorderState, setPreorderState] = useState(inList);
    const [inputState, setInputState] = useState(0);

    if (localStorage.getItem(localCrate)) {
        let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
        length = Array.from(Object.keys(localObject)).length;

    }
    const crateContext = useContext(CrateContext);
    const setTotalLength = crateContext?.setCrateLength ?? (() => { });

    // console.log(quantity, quant, primarySize, itemname, "log-1")
    if (currentQuantity == 0) {
        if (inputRef.current && quantity > 0) {
            //changing the value on each render as per the quant value which is a state
            inputRef.current.value = String(quant);
            quantity = quant;

        } else if (quant > primarySize) {
            quantity = quant;
        }
    }


    useEffect(function () {

        if (localStorage.getItem("crate")) {
            existingData.current = JSON.parse(localStorage.getItem("crate") as string)

            if (itemname in existingData.current) {
                setQuantity(existingData.current[itemname].quant);
                setItemQuantity({ payload: (existingData.current[itemname].quant) });
            } //CHANGED TODO //TODO
            else if (currentQuantity != 0) {
                // console.log("itemname ", itemname)
                // console.log("current data ", currentQuantity)
                setItemQuantity({ payload: currentQuantity });
                setQuantity(currentQuantity);
            }
        }else {
                setItemQuantity({ payload: currentQuantity });
                setQuantity(currentQuantity);
        }

    }, [currentQuantity, itemname, setItemQuantity]);

    let basicColor = "select-none text-primary w-[90%] bg-sky-300/40 text-sm justify-between items-center flex rounded-lg border-2 border-primary"
    let itemData = {
        itemname,
        quant: toShow ? 0 : quantity,
        category,
        unit,
        discountPrice,
        mrp,
        skip,
        primarySize,
        buttonURL,
        imageURL,
        offers,
        outOfStock
    }

    // console.log(itemData)


    if (currentPreorderData) {
        currentPreorderData.current.push(itemData);
    }

    async function saveInLocal(quantity: number) {
        let localstorageObject;

        if (!localStorage.getItem("crate")) {
            localstorageObject = localStorage.setItem("crate", "{}");
        }

        localstorageObject = JSON.parse(localStorage.getItem("crate") as string);

        if (!(itemname in localstorageObject)) {
            itemData.quant = quantity;
            localstorageObject[itemname] = itemData;

            // //console.log("creating", itemname, localstorageObject)
        } else {
            localstorageObject[itemname].quant = quantity;
            localstorageObject[itemname].discountPrice = itemData.discountPrice;
            if (quantity == 0) {
                delete localstorageObject[itemname];
            }

            // //console.log("changing", itemname)
        }
        console.log(localstorageObject)
        let crateReturnId: string = await Crate(Array.from(Object.values(localstorageObject))) as string;

        setCrateId(crateReturnId)
        localStorage.setItem("crateId", crateReturnId)

        localStorage.setItem("crate", JSON.stringify(localstorageObject));

        if (localStorage.getItem(localCrate)) {
            let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
            let length = Array.from(Object.keys(localObject)).length;
            // console.log("length", length)
            //console.log(length)
            setTotalLength(length)
        }
    }

    function addingToList() {

        if (preorderState) {
            // list only can add 
            return;
        }
        
        if (!preorderName) {
            //console.log("must provide the preorder name")
            return;
        }

        // console.log(!(preorderName in JSON.parse(localStorage.getItem(localPreorder) as string)), preorderName)
         if (!(preorderName in JSON.parse(localStorage.getItem(localPreorder) as string))) {
            localStorage.setItem(localPreorder, JSON.stringify({[preorderName]:listData}));     
        } 

        let localObject = JSON.parse(localStorage.getItem(localPreorder) as string) ?? {};       

        if(preorderName in localObject) {
            localObject[preorderName].list.push(fullItem)
            setCurrentTotal?.(localObject[preorderName].list.length)
            setPreorderState(true)
            localStorage.setItem(localPreorder, JSON.stringify(localObject))
        } else return;
    }

    function changePrice(quantityValue: number) {
        //increase, decrease, changevalue
        //checking the offers and getting the prices.
        let currentPrice = originalDiscountValue;

        if (offers) {
            //@ts-ignore
            let listSortedOffer = Array.from(Object.values(offers)).sort((a, b) => (a.quantity - b.quantity))

            for (var x of listSortedOffer) {
                //@ts-ignore
                let currQuant = x.quantity;
                //
                if (quantityValue >= currQuant) {
                    //@ts-ignore
                    if (x.unit == unit) currentPrice = x.price
                } else {
                    break;
                }
            }
            // console.log(currentPrice, originalDiscountValue)
            setDiscountPrice(currentPrice)
            itemData.discountPrice = currentPrice;
        }


    }

    // console.log(quant, quantity, primarySize, itemname)

    async function increase() {

        quant = Number(quant);
        quantity = Number(quantity);


        if (quantity < 0) {
            quantity = 0;
        }

        let data = await limitSurpass(itemname, quantity, maxOrder || 100) || false;

        console.log(data, "adding --------", quant, quantity)
        if (data) {
            return
        }
        changePrice(quantity + primarySize)

        setQuantity(prev => {
            //setItemQuantity(prev+quant)
            // console.log("quantity - prev ------", prev)
            if (prev < 0) {
                prev = 0;
            }

            return prev + primarySize;
        })
        // console.log(quant, quantity, "-------------- additional", primarySize + quantity, primarySize)
        // //console.log(quantity)
        //quant is the primary value and quantity is the current quantity.
        setItemQuantity({ payload: primarySize + quantity });
        saveInLocal(primarySize + quantity)

        let sum = quantity + primarySize;

        if (inputRef.current) {
            inputRef.current.value = String(sum)
        }
    }
    function decrease() {

        let difference = quantity - primarySize;


        // console.log("decrease ----", primarySize + quantity, "quant" + quant, "quantity       " + quantity, "primarySize " + primarySize, "difference  ", difference)

        if (difference <= 0) {
            difference = 0;
            setQuantity(prev => {
                return 0;
            })
        } else {
            setQuantity(prev => {
                //console.log(" ---- decreasing the value", prev)
                return prev - primarySize;
            })
        }

        if (difference > 0) {
            setItemQuantity({ payload: difference })
        }

        changePrice(quantity - primarySize)
        saveInLocal(difference)
        let diff = quantity - primarySize;
        if (inputRef.current) {
            inputRef.current.value = String(diff);
        }



    }
    function changeValue(value: number) {

        changePrice(value)

        // console.log(value, "----- input")
        setQuantity(prev => {
            return value
        }
        );
        if (value != 0) {
            setItemQuantity({ payload: value });
        }
        saveInLocal(value);
    }

    //after a certain threshold changing the value as well -- i.e offers to check and imply
    if (type == "preorder-list") {
        return <div onClick={addingToList} className={"select-none px-4 py-2 text-center w-[90%]  text-sm rounded-lg border-1 " + `${preorderState ? "text-purple-600 border-purple-600 bg-purple-400/20" : "text-primary border-primary bg-sky-300/40"}`}>
            {preorderState ? <div >Already in list</div> : <div>Add to list</div>}
        </div>
    }

    // //console.log(quantity, itemname)
    // console.log(quantity, quant, primarySize, itemname, "log-2")

    if (quantity <= 0) {
        return <div onClick={increase} className={basicColor}>
            <div className="flex-1 text-center p-1">
                Add
            </div>
            <div className="plus w-1/10 mr-2">+</div>
        </div>
    }

    if (toShow) {
        return <div onClick={increase} className={basicColor}>
            <div className="flex-1 text-center p-1">
                Add
            </div>
            <div className="plus w-1/10 mr-2">+</div>
        </div>
    }

    let clearValue: number | undefined;


    return <div onClick={function () {

    }} className={basicColor}>
        <div onClick={function () {
            let value;
            if (inputRef.current) {
                value = inputRef.current.value;
            }
            if (type == "crateList" && Number(value) == Number(primarySize)) {
                // do nothing
                //console.log("end")
            } else {
                let saveMinus = (mrp - discountPrice) * primarySize;
                let priceMinus = discountPrice * primarySize
                decrease();
                if (changeSaveValue && changeTotalValue) {
                    changeSaveValue(prev => {
                        return Number(prev) - Number(saveMinus)
                    })
                    changeTotalValue(prev => {
                        return Number(prev) - Number(priceMinus)
                    })
                }
            }

        }} className="w-3/10 p-1 text-center select-none">-</div>
        <input ref={inputRef} defaultValue={quantity} type="phone" onChange={(obj) => {


            clearInterval(clearValue);
            clearValue = window.setTimeout(async function () {
                let data: number = Number(obj.target.value);

                data = (Math.abs(Number(data)))

                let limit = await limitSurpass(itemname, Number(data), maxOrder || 100)

                if (Number(data) <= 0) {
                    data = 0
                    if (inputRef.current) {
                        //console.log(inputRef.current.value)
                        inputRef.current.value = "1"
                        changeValue(1)
                        return;
                    }
                }

                if (limit && inputRef.current) {
                    inputRef.current.value = "1"
                    changeValue(1)
                    return;
                }
                if (String(data).match(/[A-z]/g)) {
                    data = 1
                }

                if (String(data) == "") {
                    data = 0
                }
                if (String(data).length > 4) {
                    data = Number(String(data).substring(0, 4))
                }

                if (Number(data) % quant != 0) {
                    data = (Number(data) - Number(data) % primarySize)
                }

                if (inputRef.current) {
                    //console.log(inputRef.current.value)
                    inputRef.current.value = String(data)
                    changeValue(Number(data))
                }

            }, 500);
        }} className="w-4/10 text-center bg-white p-1" />
        <div onClick={function () {
            let priceAdded = discountPrice * primarySize
            let saveAdded = (mrp - discountPrice) * primarySize;

            increase()
            if (changeSaveValue && changeTotalValue) {
                changeSaveValue(prev => {
                    return Number(prev) + Number(saveAdded)
                })
                changeTotalValue(prev => {
                    return Number(prev) + Number(priceAdded)
                })
            }
        }} className="p-1 plus w-3/10 text-center">+</div>
    </div>

}


function AlreadyInList() {
    return <div className="absolute top-0 right-[10%]">
        <Image src={"/already.png"} width={10} height={50} alt="decoration" className="w-[15px] h-[70px]" ></Image>
        <Check className="absolute size-3 top-[10%] left-[15%] font-bold text-primary"></Check>
    </div>
}


interface extraCrateList extends crateItemInterfaceEach {
    setCrateList: React.Dispatch<SetStateAction<[string, crateItemInterface][]>>,
    setSaving: React.Dispatch<SetStateAction<number>>,
    setTotalPrice: React.Dispatch<SetStateAction<number>>,
    offers: any,
    setCrateId: React.Dispatch<SetStateAction<string>>,
    outOfStock:boolean
}

export function CrateItemCard({ setCrateId, setSaving, setTotalPrice, setCrateList, itemname, quant, category, unit, discountPrice, mrp, skip, primarySize, imageURL, buttonURL, offers, outOfStock }: extraCrateList) {


    function reduceFn(state: number, action: { payload?: number }) {
        if (action.payload) {
            return action.payload;
        }
        return state;
    }

    const [quantityValue, dispatch] = useReducer(reduceFn, quant);
    const [discountValue, setDiscountPrice] = useState<number>(discountPrice);


    const crateContext = useContext(CrateContext);
    const setLength = crateContext?.setCrateLength ?? (() => { });

    console.log(quantityValue, "quantity value")

    // useEffect(function () {
    //     console.log(quant, "---- quant")
    //     if (!skip) {
    //         //getting from localstorage
    //         let localItem = JSON.parse(localStorage.getItem(localCrate) as string);
    //         console.log(quant, localItem[itemname].quant, "------ in the crate")
    //         if (localItem[itemname]) {
    //             dispatch({ payload: localItem[itemname].quant })
    //         }
    //     }
    // }, [itemname, skip])

    if (skip) {
        return <div></div>
    }

    return <div onClick={function () {


    }} className="bg-white relative mt-2 w-full  flex items-start justify-between ">
        <div className=" flex  w-1/6 justify-center self-center items-center ">
            <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={itemname} className="w-[50px] h-[50px] object-contain" />
        </div>
        <div className="py-2 px-4 w-2/6 flex flex-col justify-between text-black ">
            <div className="text-sm w-full whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
                <Link href={buttonURL ?? ""}>{itemname}</Link>
            </div>
            <div className="text-xs text-gray-500">
                {primarySize + " " + unit}
            </div>
            <div className="text-xs text-gray-500">
                {"Total : " + quantityValue + " " + unit}
            </div>
        </div>
        <div className="flex py-2 w-1/6    text-sm whitespace-nowrap">
            ₹ {" " + Number(quantityValue) * Number(discountValue)}
        </div>
        <div className="flex w-2/6   py-2 flex-col gap-2 justify-end items-end">
            {/* //button */}
            <div className="  w-full flex flex-col justify-center gap-2 items-center">
                <Button outOfStock={outOfStock} offers={offers} setCrateId={setCrateId} originalDiscountValue={discountPrice} setDiscountPrice={setDiscountPrice} type={"crateList"} setItemQuantity={dispatch} skip={skip} primarySize={parseFloat(primarySize)} mrp={mrp} itemname={itemname} quant={Number(quantityValue)} discountPrice={discountValue} category={category!} unit={unit} imageURL={imageURL} buttonURL={buttonURL} changeSaveValue={setSaving} changeTotalValue={setTotalPrice} />
                <div onClick={ async function () {


                    setCrateList(prev => {
                        let list: crateItemInterface | undefined = prev.find(function (value) {
                            return value[0] == category;
                        })?.[1]

                        if (list) {
                            prev = prev.filter(value => value[0] != category);
                            list = list?.filter(value => value.itemname != itemname)
                            if (list.length > 0) {
                                prev.push([category, list])
                            }
                        }
                        let newValue = [...prev];

                        if (newValue.length == 0) {
                            window.location.reload();
                        }
                        // //console.log(newValue)
                        return newValue;
                    })

                    //removing from the localstorage and propagating to the db as well.
                    if (localStorage.getItem(localCrate)) {
                        let localObject = JSON.parse(localStorage.getItem(localCrate) as string);
                        delete (localObject[itemname]);
                        localStorage.setItem(localCrate, JSON.stringify(localObject))
                    }
                    //db call
                      let url =  "/query/v1/crateList/deleteUpdate/"+itemname
                   try {
                     let fetchData = await axios.get(url);
                    console.log(fetchData);
                   }catch(err) {
                    
                    console.log(err)
                   }


                }}>
                    <Trash2Icon onClick={function () {

                        setLength(prev => prev - 1)
                    }} className="text-red-500 size-4"></Trash2Icon>
                </div>
            </div>

        </div>

    </div>


}

export function ItemCardComponent({ productInfo, disclaimer, setCurrentTotal, cardType, name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData, limitValueOrder, setOpenModal, setItemDelete, preorderName }: ExtraList) {

    function reduceFn(state: number, action: { payload?: number }) {
        if (action.payload) {
            return action.payload;
        }
        return state;
    }

    const [quant, dispatch] = useReducer(reduceFn, quantity);
    // let [quant, setQuantity] = useState(quantity);
    let [discountPrice, setDiscountPrice] = useState(discountValue);
    let [list, setList] = useState([]);
    let [crateId, setCrateId] = useState("")

    let paramsValue = useSearchParams();

    let localData = useCallback(function (discountPrice: string, quantityChange: string) {
        let itemData = {
            itemname: name,
            quant: quantityChange,
            category,
            unit,
            discountPrice,
            mrp,
            skip: false,
            primarySize,
            buttonURL,
            imageURL,
            offers
        }

        let localObject = JSON.parse(localStorage.getItem(localCrate) as string) || {};
        localObject[name] = itemData;
        localStorage.setItem(localCrate, JSON.stringify(localObject))

    }, [buttonURL, category, imageURL, mrp, name, offers, primarySize, unit])

    useEffect(function () {
        let localItem = JSON.parse(localStorage.getItem(localCrate) as string);
        if (localItem[name]) {
            dispatch({ payload: localItem[name].quant });
        }
        //getting the category item list random list - 8 values.
        axios.get("/query/v1/items/category/" + category).then(m => {
            let data = m.data.result;
            setList(data);
        }).catch(err => console.log(err))

        let quantityFromOffers = (paramsValue.get("quantity"));
        //in casse the unit is different then conversion is required for the items
        let discountValueFromOffers = (paramsValue.get("price"));
        if (quantityFromOffers && unit == paramsValue.get("unit")) {
            dispatch({ payload: Number(quantityFromOffers) })
            setDiscountPrice(Number(discountValueFromOffers))
            localData(String(discountValueFromOffers), String(quantityFromOffers))
        }
    }, [unit, paramsValue, name, localData, category])



    return <div className="bg-white relative w-full rounded-lg flex flex-col ">
        <div className="border-b border-gray-200 text-center flex justify-center w-full h-64 py-2 items-start bg-white">
            <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL || "/blur.jpg"} height={150} width={150} alt={name} className=" border-black w-[400px] h-[200px] object-contain " />
        </div>
        <div className="py-6 px-8 flex-1 flex flex-col justify-between text-black">
            <div>
                <div className="text-xl font-medium capitalize">{name}</div>
                <div className="flex justify-between text-md items-center">
                    <div className=" text-gray-400 capitalize">
                        {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                    </div>
                    <div className="text-lg text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? quant * conversionRate + " " + secondaryUnit : ""} </div>
                </div>

                <div className="text-lg mt-4 justify-between flex">
                    <div>
                        ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                    </div>
                    {/* //button */}
                    <div className="flex w-1/2 justify-end">
                        <Button outOfStock={outOfStock as boolean} setCrateId={setCrateId} originalDiscountValue={discountValue} setDiscountPrice={setDiscountPrice} offers={offers} maxOrder={limitValueOrder} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={quant} setItemQuantity={dispatch} discountPrice={discountPrice} category={category!} unit={unit} />
                    </div>
                </div>
                <div className="text-md text-green-500">
                    {/* //saving  */}
                    {savingAmount && mrp && (mrp - discountPrice) != 0 ? "saving ₹ " + (mrp - discountPrice) * quant : ""}
                </div>
                <div className="text-md text-logo mt-4">
                    {/* //offers making sure there is only one super saver*/}
                    {
                        offers.map((m, index) => {

                            if (m.superSaver) {
                                return <div key={index} className="relative ">


                                    <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white " />
                                        super saver</div>

                                    <div onClick={function () {
                                        if (m.unit != unit) { return }
                                        dispatch({ payload: Number(m.quantity) })
                                        setDiscountPrice(m.price)
                                        localData(String(m.price), String(m.quantity))
                                        // changing the price value as well
                                    }} className="bg-[#ebf3f3]  rounded flex justify-between py-2 px-4">
                                        <div >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </div>
                                        <div  >
                                            Add {m.quantity + " " + m.unit}
                                        </div>
                                    </div>

                                </div>
                            }
                            return <div key={index} onClick={function () {
                                if (m.unit != unit) {
                                    //requires extra effor  
                                    return
                                }
                                dispatch({ payload: Number(m.quantity) })
                                setDiscountPrice(m.price)
                                localData(String(m.price), String(m.quantity))
                            }} className="bg-[#ebf3f3] my-1 rounded flex justify-between  py-2 px-4">
                                <div  >
                                    ₹ {m.price} for {m.quantity + " " + m.unit}
                                </div>
                                <div  >
                                    Add {m.quantity + " " + m.unit}
                                </div>
                            </div>
                        })
                    }
                </div>

                <div>
                    <div className="text-xl mt-4">
                        Product Information :
                    </div>
                    {productInfo && Array.from(Object.entries(productInfo)).map((m, index) => {
                        // console.log(m)
                        if (m[0] == "Type") {
                            m[1] = m[1].replace(/-|_/g,
                                " "
                            )
                        }
                        return <div key={index} className="flex text-sm">

                            <div>
                                {m[0]}
                            </div>
                            <div className="font-thin">
                                : {m[1]}
                            </div>

                        </div>
                    })
                    }
                </div>
                <div>
                    <div className="text-xl mt-4">
                        Disclaimer :
                    </div>
                    <div className="text-sm font-thin">
                        {disclaimer || "The product may not look similar to picture"}
                    </div>
                </div>

            </div>

        </div>

        {/* //carousel for similar items category */}
        {/* // TODO later on using the type to get the value */}

        <div className="">
            <div className="px-8 text-xl font-medium">
                Similar Products
            </div>
            <div className="flex gap-2 h-88 overflow-x-scroll w-full overflow-y-hidden pl-6 pr-2 bg-[#ebfefe] rounded-2xl">

                {/* card list */
                    list.slice(0, 10).map((m: Itemlist, index: number) => {
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
                        let maxOrder = m.maxOrder;

                        return <ItemCard maxOrder={maxOrder} category={category} cardType="dashboard" outOfStock={outofstock} comingSoon={comingsoon} key={index} conversionRate={conversion} name={name} imageURL={imageURL || "/blur.jpg"} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} />
                    })
                }
            </div>
        </div>


        <div className="fixed bottom-0 bg-gray-400/50 w-full h-2 self-end block">
        </div>
    </div>
}

//requires extra effort when we try to change the unit ---
//TODO
// requires the mrp, unit change, discount value (which is there) // i can do it but it will lead to error -- only the primary and secondary size
// instead having a separate item - for the different carton, bag and othe package thing

async function limitSurpass(item: string, currentValue: number, limitOrder?: number) {
    //checking if the item increase above the limit or not 

    //for faster sending with item value
    //crate button
    // general item list button
    if (limitOrder) {
        if (Number(limitOrder) <= Number(currentValue)) {
            return true;
        }
    } else {
        // console.log("fetch from backend in case of no maxorder")
        let limit = await axios.get("/query/v1/items/limit/" + item)
        console.log(limit)
        if (limit.data.result < currentValue) {
            return true;
        }
    }

    return false;
}

//TODO
//making sure getting the latest price from the db -- on the db call
// making the limit is passed instead of the call.