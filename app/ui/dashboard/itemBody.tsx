"use client"

import { SetStateAction, useEffect, useState } from "react"
import { SkeletonLoading } from "../skeletons"
import { hardItemList } from "@/app/lib/items-placeholder";
import { ItemCard, ItemCardComponent } from "./itemCard";
import axios from "axios";

export function ItemComponentBody({itemname}:{itemname:string}) {
    const [item, setItem] = useState<hardItemList[]>([]);
    const [loading, setLoading] = useState(true);
    // getting the information regarding the item -- i.e all
    useEffect(function() {
        //getting the information regarding it and similar type 5 items - and see all caraousel 

        axios.get("/query/v1/items/info/"+ itemname).then(m => {
            let data = m.data.result;
            setItem([data])
            setLoading(false)
        })


    },[])

    return <div className="h-screen overflow-y-scroll">

         {loading ? <SkeletonLoading type="item" /> : ""}
            {item && item.map((m: hardItemList, index: number) => {
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
                let disclaimer = m.disclaimer || "";
                let productInfo = m.productInformation || {type:category, shellLife:"", storageTemperature:"", container:""};
                let limit = m.maxOrder ;

                
                return <ItemCardComponent limitValueOrder={limit} disclaimer={disclaimer} productInfo={productInfo} cardType="item" key={index} category={category} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} outOfStock={outofstock} comingSoon={comingSoon} setOpenModal={function (value: SetStateAction<boolean>): void {
                                    throw new Error("Function not implemented.");
                                } } setItemDelete={function (value: SetStateAction<string>): void {
                                    throw new Error("Function not implemented.");
                                } } />
            })}

    </div>
}