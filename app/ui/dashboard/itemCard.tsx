"use client"
import { Itemlist } from "@/app/lib/placeholder-data";
import {BadgeIndianRupee, Trash2Icon} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {  useRef, useState } from "react";


interface ExtraList extends Itemlist {
    cardType : "category" | "dashboard" | "item" | "preorder" | "preorder-search" ,
    currentData ?:any
}

export function ItemCard({ cardType, name, brand, mrp, imageURL, buttonURL, quantity, primarySize, category, secondarySize, discountValue, savingAmount, offers, unit, secondaryUnit, conversionRate , outOfStock,comingSoon, currentQuantity, currentData}: ExtraList) {

    let [quant, setQuantity] = useState(quantity)

    let [deleteConfirm, setDeleteConfirm] = useState(false);

    if(cardType == "category") {
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
                            if(m.superSaver) {
                                return <div key={index} className="relative">
                                    <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white"/> super saver</div>
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
                <Button primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
            </div>
        </div>
        <div className="bg-gray-400/50 w-full h-2 self-end block">
        </div>
        {outOfStock? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center">
            <div className="bg-gray-600 p-2 rounded-sm text-white">
                Out Of Stock
            </div>
        </div>:null}

        {comingSoon? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center">
            <div className="bg-logo p-2 rounded-sm text-white">
                Coming Soon 
            </div>
        </div>:null}
    </div>


    }

    if(cardType == "dashboard") {

        if(outOfStock || comingSoon) {
            
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
                                <Button primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
                        </div>
                </div>
                <div className="bg-gray-400/50 w-full h-2 self-end block">

                </div>
        </div>
    }


    if(cardType == "preorder-search") {
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
                            if(m.superSaver) {
                                return <div key={index} className="relative">
                                    <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white"/> super saver</div>
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
                <Button primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit} />
            </div>
        </div>
        <div className="bg-gray-400/50 w-full h-2 self-end block">
        </div>
        {outOfStock? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center">
            <div className="bg-gray-600 p-2 rounded-sm text-white">
                Out Of Stock
            </div>
        </div>:null}

        {comingSoon? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center">
            <div className="bg-logo p-2 rounded-sm text-white">
                Coming Soon 
            </div>
        </div>:null}
    </div>


    }
   
    
    if(cardType == "preorder") {

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
                            if(m.superSaver) {
                                return <div key={index} className="relative">
                                    <div className="bg-logo rounded-t-2xl text-[10px] text-white w-2/3 justify-center items-center gap-1 flex "><BadgeIndianRupee className="size-3 text-white"/> super saver</div>
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
                <Button currentPreorderData={currentData} toShow={(outOfStock ?? false) || (comingSoon ?? false)} currentQuantity={currentQuantity ?? 0} primarySize={primarySize} mrp={mrp} itemname={name} quant={primarySize} setItemQuantity={setQuantity} discountPrice={discountValue} category={category!} unit={unit}  />
            </div>
        </div>
        <div className="bg-gray-400/50 w-full h-2 self-end block">
        </div>
        {outOfStock? <div className="absolute w-full h-full bg-gray-400/30 flex justify-center items-center rounded-lg">
            <div className="bg-gray-600 p-2 rounded-sm text-white">
                Out Of Stock
            </div>
        </div>:null}

        {comingSoon? <div className="absolute w-full h-full bg-[#EBF6FF]/50 flex justify-center items-center rounded-lg">
            <div className="bg-logo p-2 rounded-sm text-white">
                Coming Soon 
            </div>
        </div>:null}
        <div className="absolute right-0 p-2 z-5 ">
            <Trash2Icon  className="text-gray-500 size-4 active:text-red-600 hover:text-red-600 cursor-pointer"/>
        </div>
    </div>


    }

    return <div>
        items
    </div>
   
}

function Button({ quant, itemname, category, setItemQuantity, unit, discountPrice, mrp, primarySize , currentQuantity=0, toShow, currentPreorderData}: { quant: number, itemname: string, category: string, primarySize: number, setItemQuantity: any, unit: string, discountPrice: number, mrp: number, currentQuantity?:number, toShow?:boolean , currentPreorderData?:any}) {
    //managing the cart value in the localstorage for multi page state management.
    let existingData;
    let [quantity, setQuantity] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    quantity = currentQuantity;

    if (localStorage.getItem("crate")) {
        existingData = JSON.parse(localStorage.getItem("crate") as string);
        
        if (itemname in existingData) {
            quantity = existingData[itemname].quant;
        }
    }



    let basicColor = "select-none text-primary w-[90%] bg-sky-300/40 text-sm justify-between items-center flex rounded-lg border-1 border-primary"
    let itemData = {
        itemname,
        quant: toShow? 0:quantity,
        category,
        unit,
        discountPrice,
        mrp
    }
    if(currentPreorderData) {
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
            console.log("creating", itemname, localstorageObject)
        } else {
            localstorageObject[itemname].quant = quantity;
            console.log("changing", itemname)
        }
        localStorage.setItem("crate", JSON.stringify(localstorageObject));
      //  console.log(localStorage)
    }

    function increase() {
        setQuantity(prev => {
            //setItemQuantity(prev+quant)
            return prev + quant
        })
        setItemQuantity(quant + quantity)
        saveInLocal(quant + quantity)
        if (inputRef.current) {
            inputRef.current.value = String(quantity + quant);
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
        saveInLocal(quantity - quant)
        if (inputRef.current) {
            inputRef.current.value = String(quantity - quant);
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

    if (quantity <= 0) {
        return <div onClick={increase} className={basicColor}>
            <div className="flex-1 text-center p-1">
                Add
            </div>
            <div className="plus w-1/10 mr-2">+</div>
        </div>
    }

    if(toShow) {
        return <div onClick={increase} className={basicColor}>
            <div className="flex-1 text-center p-1">
                Add
            </div>
            <div className="plus w-1/10 mr-2">+</div>
        </div>

    }

    let clearValue: number | undefined;


    return <div className={basicColor}>
        <div onClick={decrease} className="w-3/10 p-1 text-center">-</div>
        <input ref={inputRef} defaultValue={quantity} type="phone" onChange={(obj) => {

            clearInterval(clearValue);

            clearValue = window.setTimeout(function() {
                let data = obj.target.value;
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
                    console.log(inputRef.current.value)
                    inputRef.current.value = data
                    changeValue(Number(data))
                }
            }, 500);
        }} className="w-4/10 text-center bg-white p-1" />
        <div onClick={increase} className="p-1 plus w-3/10 text-center">+</div>
    </div>

}