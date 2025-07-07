"use client"
import { CrateContext } from "../rootLayoutClient";
import { crateItemInterface, crateItemInterfaceEach } from "@/app/lib/definitions";
import { category, Itemlist } from "@/app/lib/placeholder-data";
import { localCrate, localPreorder } from "@/app/lib/utils";
import axios from "axios";
import { BadgeIndianRupee, Check, Trash2Icon } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";


interface ExtraList extends Itemlist {
    cardType: "category" | "dashboard" | "item" | "preorder" | "preorder-search",
    currentData?: any,
    setOpenModal?: Dispatch<SetStateAction<boolean>>,
    setItemDelete?: Dispatch<SetStateAction<string>>,
    preorderName?: string,
    setCurrentTotal?: Dispatch<SetStateAction<number>>,
    productInfo?: {
        type: category,
        shellLife: string,
        storageTemperature?: string,
        container?: string
    },
    disclaimer?:string,
    limitValueOrder?:number

}

export function ItemCard({ setCurrentTotal, cardType, name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData, setOpenModal, setItemDelete, preorderName }: ExtraList) {

    let wholeItem = {
        name, cardType, brand, mrp, imageURL, buttonURL, quantity,
        primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData, preorderName, setOpenModal, setItemDelete
    }

    let [quant, setQuantity] = useState(quantity)

    if (cardType == "category") {
        return <div className="bg-white relative h-76 w-[100%] rounded-lg flex flex-col " aria-disabled={outOfStock || comingSoon}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-1/3 py-2 items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL} className="text-xs">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

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
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL + "?quantiy=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
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
                    <Button imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
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

        if (outOfStock || comingSoon) {
            return <div></div>
        }

        return <div className="bg-white relative mt-2 h-82 min-w-[52%] w-[52%] max-w-[52%] rounded-lg flex flex-col">
            <div className="border-b border-gray-200 text-center flex justify-center w-full min-h-[150px] items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={name} className="w-[100px] h-[100px] object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL}>{name}</Link>
                    <div className="text-xs text-gray-400">{brand.toLocaleLowerCase() == "generic" ? "" : brand}  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
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
                    <Button imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
                </div>
            </div>
            <div className="bg-gray-400/50 w-full h-2 self-end block">

            </div>
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

        if (preorderName in localObject) {
            localObject[preorderName].list.forEach((m: Itemlist) => {

                if (m.name == name) {
                    checkInList = true;
                }

            })
        }

        return <div className="bg-white relative h-76 w-[100%] rounded-lg flex flex-col border border-gray-200/80" aria-disabled={outOfStock || comingSoon}>
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-1/3 py-2 items-center ">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL} className="text-xs">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

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
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL + "?quantiy=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
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
                    <Button imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} setCurrentTotal={setCurrentTotal} preorderName={preorderName} fullItem={wholeItem} inList={checkInList} type="preorder-list" primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
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
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="py-2 px-4 flex-1 flex flex-col justify-between text-black">
                <div>
                    <Link href={buttonURL} className="text-xs">{name}</Link>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-xs text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

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
                                if (m.superSaver) {
                                    return <div key={index} className="relative">
                                        <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white" /> super saver</div>
                                        <Link href={buttonURL + "?quantiy=" + m.quantity + "&price=" + m.price + "&unit=" + m.unit + `&type=${m.type ? m.type : ""}`} >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </Link></div>
                                }
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
                    <Button imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} currentPreorderData={currentData} toShow={(outOfStock ?? false) || (comingSoon ?? false)} currentQuantity={currentQuantity ?? 0} primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
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


    const crateContext = useContext(CrateContext);
    const setTotalLength = crateContext?.setCrateLength ?? (() => { });

    useEffect(function () {

        if (localStorage.getItem(localCrate)) {
            setTotalLength(Array.from(Object.keys(JSON.parse(localStorage.getItem(localCrate) as string))).length)
        }else {
        setTotalLength(0)
        }

    }, [])


    return <div>
        items
    </div>

}

function Button({ parentInputRef, setCurrentTotal, fullItem, type, quant, itemname, category, setItemQuantity, unit, discountPrice, mrp, primarySize, currentQuantity = 0, toShow, currentPreorderData, inList, preorderName, skip, imageURL, buttonURL, maxOrder}: { type?: "preorder-list" | "crateList", quant: number, itemname: string, category: string, primarySize: number, setItemQuantity: any, unit: string, discountPrice: number, mrp: number, currentQuantity?: number, toShow?: boolean, currentPreorderData?: any, inList?: boolean, fullItem?: Itemlist, preorderName?: string, setCurrentTotal?: React.Dispatch<SetStateAction<number>>, skip: boolean, imageURL: string, buttonURL: string , parentInputRef?:React.RefObject<HTMLInputElement | null>, maxOrder?:number}) {
    //managing the cart value in the localstorage for multi page state management?.
    let existingData;
    let [quantity, setQuantity] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null);
    const [preorderState, setPreorderState] = useState(inList);
    let length;

    if (localStorage.getItem(localCrate)) {
        let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
        length = Array.from(Object.keys(localObject)).length;

    }
    const crateContext = useContext(CrateContext);
    const totalLength = crateContext?.crateLength ?? 0;
    const setTotalLength = crateContext?.setCrateLength ?? (() => { });


    if (localStorage.getItem("crate")) {
        existingData = JSON.parse(localStorage.getItem("crate") as string);
        if (itemname in existingData) {
            quantity = existingData[itemname].quant;
        }

    }

    useEffect(function () {

    
        if (currentQuantity != 0) {
            setItemQuantity(currentQuantity);
            setQuantity(currentQuantity);
        }

    }, [])

    let basicColor = "select-none text-primary w-[90%] bg-sky-300/40 text-sm justify-between items-center flex rounded-lg border-1 border-primary"
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
        imageURL
    }
    if (currentPreorderData) {
        currentPreorderData.push(itemData)

    }

    function saveInLocal(quantity: number) {
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
            if (quantity == 0) {
                delete localstorageObject[itemname];
            }
            // //console.log("changing", itemname)
        }
        localStorage.setItem("crate", JSON.stringify(localstorageObject));
        //  //console.log(localStorage)
    }

    function addingToList() {
        //saving the fullitem in the localstorage
        // //console.log(fullItem)
        if (preorderState) {
            return;
        }

        if (!localStorage.getItem(localPreorder)) {
            localStorage.setItem(localPreorder, "{}")
        }

        let localObject = JSON.parse(localStorage.getItem(localPreorder) as string) ?? {};

        if (!preorderName) {
            //console.log("must provide the preorder name")
            return;
        }

        if (preorderName in localObject) {
            // //console.log(localObject[preorderName].list, "before")
            localObject[preorderName].list.push(fullItem)
            // //console.log(localObject[preorderName].list, "after");

            setCurrentTotal?.(localObject[preorderName].list.length)
            setPreorderState(true)
            localStorage.setItem(localPreorder, JSON.stringify(localObject))
        } else return;
    }

   async function increase() {

        let data = await limitSurpass(itemname,quant+quantity, maxOrder || 100)  || false;

        if(data) {
            return
        }

        setQuantity(prev => {
            //setItemQuantity(prev+quant)
            //console.log("quantity - prev ------", prev)
            return prev + primarySize;
        })
        // //console.log(quantity)
        //quant is the primary value and quantity is the current quantity.
        setItemQuantity(primarySize + quantity)
        saveInLocal(primarySize + quantity)
        if (inputRef.current) {
            inputRef.current.value = String(quantity + primarySize);
        }


        if (localStorage.getItem(localCrate)) {
            let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
            let length = Array.from(Object.keys(localObject)).length;
            //console.log(length)
            setTotalLength(length)

        }
    }
    function decrease() {    
        
        let difference = quantity - primarySize;

        if(difference <= 0) {
            difference = 0;
            setQuantity(prev => {
                return 0;
            })
        }else {
             setQuantity(prev => {
                //console.log(" ---- decreasing the value", prev)
            return prev - primarySize;
        } ) }  

        if (difference > 0) {
            setItemQuantity(difference)
        }

        saveInLocal(difference)
         if (inputRef.current) {
                    inputRef.current.value = String(quantity - primarySize);
             }

        if (localStorage.getItem(localCrate)) {
            let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
            let length = Array.from(Object.keys(localObject)).length;

            //console.log(length)
            setTotalLength(length)
        }


    }
    function changeValue(value: number) {

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
    if (type == "preorder-list") {
        return <div onClick={addingToList} className={"select-none px-4 py-2 text-center w-[90%]  text-sm rounded-lg border-1 " + `${preorderState ? "text-purple-600 border-purple-600 bg-purple-400/20" : "text-primary border-primary bg-sky-300/40"}`}>
            {preorderState ? <div >Already in list</div> : <div>Add to list</div>}
        </div>
    }

    // //console.log(quantity, itemname)
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
            let value ;
            if (inputRef.current) {
                   value = inputRef.current.value ;
                }
            if(type == "crateList" && Number(value) == Number(primarySize) ) {
                // do nothing
                //console.log("end")
            }else {     
                decrease();
            }
            
        }} className="w-3/10 p-1 text-center select-none">-</div>
        <input ref={inputRef} defaultValue={quantity} type="phone" onChange={(obj) => {

            clearInterval(clearValue);
            clearValue = window.setTimeout(async function () {
                let data = obj.target.value;
                let limit = await limitSurpass(itemname, Number(data), maxOrder || 100)
                if (limit && inputRef.current) {
                     inputRef.current.value = "1"
                    changeValue(1)
                    return;
                }
                if (data.match(/[A-z]/)) {
                    data = "1"
                }

                if (data == "") {
                    data = "0"
                }
                if ((data).length > 4) {
                    data = data.substring(0, 4)
                }

                if (Number(data) % quant != 0) {
                    data = String(Number(data) - Number(data) % quant)
                }

                if (inputRef.current) {
                    //console.log(inputRef.current.value)
                    inputRef.current.value = data
                    changeValue(Number(data))
                }

            }, 500);
        }} className="w-4/10 text-center bg-white p-1" />
        <div onClick={function() {
            increase()
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
    setCrateList:React.Dispatch<SetStateAction<[string, crateItemInterface][]>>,
    setSaving:React.Dispatch<SetStateAction<number>>,
    setTotalPrice:React.Dispatch<SetStateAction<number>>,
}

export function CrateItemCard({ setSaving , setTotalPrice, setCrateList, itemname, quant, category, unit, discountPrice, mrp, skip, primarySize, imageURL, buttonURL }: extraCrateList) {


    // //console.log(primarySize, quant, itemname)

    const [quantityValue, setQuant] = useState(quant);

    if (skip) {
        return <div></div>
    }

    return <div onClick={function () {
        let save =0;
        let price = 0;

         if ( localStorage.getItem(localCrate)) {
            
            let localObject = JSON.parse(localStorage.getItem(localCrate) as string);
            Array.from(Object.values(localObject)).forEach((m, index) =>  {
                const item = m as crateItemInterfaceEach;
                let totalPrice = item.quant * item.discountPrice;
                let totalSaving = item.quant*item.mrp - totalPrice;

                save += totalSaving;
                price +=totalPrice;
            })

            setSaving(save) 
            setTotalPrice(price)
                    
        }


        
        
    }} className="bg-white relative mt-2 w-full px-4 flex items-start justify-between">
        <div className=" flex justify-center items-center ">
            <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={itemname} className="w-[50px] h-[50px] object-contain" />
        </div>
        <div className="py-2 px-4 w-2/5 flex flex-col justify-between text-black ">
            <div className="text-sm w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
                <Link href={buttonURL}>{itemname}</Link>
            </div>
            <div className="text-xs text-gray-500">
                {primarySize + " " + unit}
            </div>
            <div className="text-xs text-gray-500">
                {"Total : " + quantityValue + " " + unit}
            </div>
        </div>
        <div className="flex py-2  text-sm whitespace-nowrap">
            ₹ {" " + quantityValue * discountPrice}
        </div>
        <div className="flex w-2/5 py-2 flex-col gap-2 justify-end items-end">
            {/* //button */}
            <div className="  w-4/5 flex flex-col justify-center gap-2 items-center">
                <Button type={"crateList"}  setItemQuantity={setQuant} skip={skip} primarySize={parseFloat(primarySize)} mrp={mrp} itemname={itemname} quant={Number(primarySize)} discountPrice={discountPrice} category={category!} unit={unit} imageURL={imageURL} buttonURL={buttonURL} />
                <div onClick={function (){
                    setCrateList(prev=> {
                        let list:crateItemInterface | undefined = prev.find(function (value) {
                            return value[0] == category;
                        })?.[1] 

                        if(list) {
                        prev = prev.filter(value => value[0] != category);
                        list = list?.filter(value => value.itemname != itemname)
                        if(list.length > 0) {
                            prev.push([category, list])
                        }
                        }
                        let newValue = [...prev];

                        if(newValue.length == 0) {
                            window.location.reload();
                        }
                        // //console.log(newValue)
                        return newValue;
                    })

                    //removing from the localstorage and propagating to the db as well.
                    if(localStorage.getItem(localCrate)) {
                        let localObject = JSON.parse(localStorage.getItem(localCrate) as string);
                        delete (localObject[itemname]);
                        localStorage.setItem(localCrate, JSON.stringify(localObject))
                    }
                    //db call

                }}>
                    <Trash2Icon className="text-red-500 size-4"></Trash2Icon>
                </div>
            </div>

        </div>

    </div>


}

export function ItemCardComponent({ productInfo, disclaimer, setCurrentTotal, cardType, name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate, outOfStock, comingSoon, currentQuantity, currentData,limitValueOrder, setOpenModal, setItemDelete, preorderName }: ExtraList) {


    let [quant, setQuantity] = useState(quantity);
    let [discountPrice, setDiscountPrice] = useState(discountValue);


    const parentRefInput = useRef<HTMLInputElement>(null)
    return <div className="bg-white relative w-full rounded-lg flex flex-col ">
            <div className="border-b border-gray-200 text-center flex justify-center w-full h-64 py-2 items-start bg-[#ebfefe]">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={imageURL} height={150} width={150} alt={name} className=" border-black w-[200px] h-[200px] object-cover " />
            </div>
            <div className="py-6 px-8 flex-1 flex flex-col justify-between text-black">
                <div>
                    <div className="text-2xl font-medium">{name}</div>
                    <div className="flex justify-between items-center">
                        <div className="text-lg text-gray-400 capitalize">
                            {brand.toLocaleLowerCase() == "generic" ? "generic" : brand.toLocaleLowerCase()}
                        </div>
                        <div className="text-lg text-gray-400">  {quant + " " + unit} {secondarySize && conversionRate && secondaryUnit ? secondarySize * quant * conversionRate + " " + secondaryUnit : ""} </div>
                    </div>

                    <div className="text-lg mt-4 justify-between flex">
                        <div>
                            ₹  {discountPrice * quant}  <span className=" line-through text-gray-400 ">{mrp ? " " + mrp * quant : ""} </span>
                        </div>
                    {/* //button */}
                    <div className="flex w-1/2 justify-end">
                    <Button maxOrder={limitValueOrder} parentInputRef={parentRefInput} imageURL={imageURL} buttonURL={buttonURL} skip={outOfStock || comingSoon || false} primarySize={primarySize} mrp={mrp} itemname={name} quant={quant} setItemQuantity={setQuantity} discountPrice={discountPrice} category={category!} unit={unit} />
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

                                        <div onClick={function() {
                                    setQuantity(Number(m.quantity))
                                     if (parentRefInput.current) {
                                        parentRefInput.current.value = String(m.quantity);
                                    }
                                    setDiscountPrice(m.price)
                                    // changing the price value as well
                                }} className="bg-[#ebf3f3] border-primary/70  rounded flex justify-between border py-2 px-4">
                                            <div >
                                            ₹ {m.price} for {m.quantity + " " + m.unit}
                                        </div>
                                         <div  >
                                        Add {m.quantity + " " + m.unit}
                                    </div>
                                        </div>
                                        
                                    </div>
                                }
                                return <div key={index} onClick={function() {
                                    setQuantity(Number(m.quantity))
                                    if (parentRefInput.current) {
                                        parentRefInput.current.value = String(m.quantity);
                                    }
                                    setDiscountPrice(m.price)
                                }} className="bg-[#ebf3f3] border-primary/70 my-1 rounded flex justify-between border py-2 px-4">
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
                </div>
               
            </div>
            <div  className="fixed bottom-0 bg-gray-400/50 w-full h-2 self-end block">
            </div>
        </div>
}


async function limitSurpass(item:string, currentValue:number, limitOrder?:number) {
    //checking if the item increase above the limit or not 

    //for faster sending with item value
    //crate button
    // general item list button
    if(limitOrder) {
        if(limitOrder < currentValue) {
            return true;
        }
    } else {
         let limit = await axios.get("/query/v1/items/limit/"+ item)

    if(limit.data.result < currentValue) {
        return true;
    }
    }
   
    return false;
}

//TODO
//making sure getting the latest price from the db -- on the db call
// making the limit is passed instead of the call.