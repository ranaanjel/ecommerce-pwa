"use client"

import { useEffect, useRef, useState } from "react";
import CaraouselBanner from "../dashboard/carouselBanner";
import { TypeBar } from "./typeBar";
import { CategoryItems } from "./categoryItems";
import { FilterModal, filterProps } from "../filterModal";
import axios from "axios";



export function CategoryBody({ categoryType }: { categoryType: string }) {
  
    // let [currentType, setCurrentType] = useState([])
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(function () {
        // console.log(categoryType)
            let url =  "/query/v1/type/" + categoryType + "?brand=true"
           
            axios.get(url).then(m => {
                let {type, brand} = m.data.result;
                // console.log(brand, type)

                let typeOption = type.map((m:string) => {
                    return {id:m, label:m, checked:false}
                })
                let brandOption = brand.map((m:string) => {
                    return {id:m, label:m, checked:false}
                })

                setOriginalFilter((prev) => {
                    return [prev[0], {id:"type", name:"Type", options:[...typeOption]}, {id:"brand", name:"Brand", options:[...brandOption]}]
                })
                setBeforeFilter((prev) => {
                    return [prev[0], {id:"type", name:"Type", options:[...typeOption]}, {id:"brand", name:"Brand", options:[...brandOption]}]
                })
                
               // console.log(originalFilter, typeOption, brandOption)

            })
    }, [categoryType])

    let [originalFilter, setOriginalFilter] = useState<filterProps[]>([
        {
            id: "price",
            name: "Price",
            options: [{ id: "low to high", label: "Low to High", checked: false, radio: true }, { id: "high to low", label: "high to low", checked: false, radio: true }],
        },
        {
            id: "type",
            name: "Type",
            options: [],
        },
        {
            id: "brand",
            name: "Brand",
            options: [],
        },
    ])
    let [beforeFilter, setBeforeFilter] = useState<filterProps[]>(originalFilter)

    return <div className="h-full w-full bg-[#EBF6FF] flex pb-5 ">
        <div className="w-[16%] bg-gray-400/30">
            {/* //fixed  */}
            <TypeBar type={categoryType} setType={setOriginalFilter}></TypeBar>
        </div>
        <div className="w-[85%] h-screen overflow-y-scroll scroll-smooth" >
            {/* //items */}
            <div className=" py-2">
                <CaraouselBanner />
            </div>
            <div>
                {/* //filter value -- filter -> price, brand , type */}
                <FilterModal filterProps={originalFilter} setFilterProps={setOriginalFilter} beforeFilter={beforeFilter} setBeforeFilter={setBeforeFilter} />
            </div>
            <div>
                <CategoryItems typeCategory={categoryType} filterValue={originalFilter} footerRef={footerRef} category={categoryType}  />
            </div>
            <div className="h-24 bg-logo w-full" ref={footerRef}>

            </div>
        </div>
    </div>
}

