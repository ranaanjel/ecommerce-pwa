"use client"

import { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function SearchBar() {
    //fetching the items;
    let itemList = ["peri peri", "cornflakes", "mushroom", "paneer", "cheese blend", "cabbage" ]
    let [items, setItems] = useState<string[]>(itemList);
    let inputRef = useRef<HTMLInputElement| null>(null)
    let router = useRouter()

    return <div className="px-8 py-4 w-full rounded-b-2xl bg-white border-none shadow-sm border-gray-400">
        <div className=" relative flex my-2 border-1 rounded-md border-gray-300  h-12 px-2 w-full items-center gap-2 overflow-hidden     ">
            <div className="text-red-600">
                <MagnifyingGlassIcon className="size-6"/>
            </div>
            <input ref={inputRef} onClick={function () {
                router.push("/dashboard/search")
            }} onChange={function (evOB) {
                let value = evOB.target.value;
                if(value == "") {
                    setItems(itemList)
                } else {
                    setItems([])
                }
                

            }} type="search" className="text-black w-full border-none p-2 item-stretch focus:outline-none focus-visible:outline-none" placeholder="Search for"/>
            <div className="absolute left-[40%] top-(--search-margin) animate-wiggle" >{
                   items.length > 0 && items.map(m => (<div onClick={function () {
                    console.log("hello")
                    if(inputRef.current) {

                        inputRef.current.value = m;
                        setItems([])
                    }
                   }} key={m} className="whitespace-nowrap text-gray-600 my-3 select-none">" {m} "</div>))
                }</div>
        </div>
    </div>
}