"use client"

import { ChevronDownIcon, Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { BackButton } from "../dashboard/BackButton";
import Link from "next/link";
import { useState } from "react";
import { Categories } from "../dashboard/categoryCard";
import { CrateComponent } from "../dashboard/crateComponent";

export function CategoryAll({data, crateLength}:{data:string, crateLength:number}) {

    let [openModal, setOpenModal] = useState(false);

    return  <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="text-semibold text-xl capitalize whitespace-nowrap overflow-ellipsis">
                            {data}
                        </div>
                        <div onClick={function () {
                            setOpenModal(m => !m)
                        }} className="flex text-xs items-center text-logo">
                            change category <ChevronDownIcon/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={"/dashboard/search"} className="font-medium text-[var(--navy-blue)]  text-2xl">
                        <MagnifyingGlassIcon className="size-7" />
                    </Link>
                    <CrateComponent />
                </div>
                {openModal? <div className="absolute top-[100%] -left-6  h-screen overflow-hidden bg-gray-400/50 z-5 w-screen">
                    <div className="rounded-b-2xl w-screen bg-white p-2 border-t border-gray-200">
                        <Categories  active={data} type="dropdown"></Categories>
                    </div>
                    <div onClick={function() {setOpenModal(false)}} className="w-8 h-8 absolute left-[48%] top-[50%] bg-gray-700 text-white z-6 flex justify-center items-center rounded-full border">
                        <Cross1Icon/>
                    </div>

                </div>:""}
            </div>
}