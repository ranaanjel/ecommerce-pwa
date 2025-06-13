"use client"

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function BackButton() {
    let router = useRouter()
    return <div onClick={function () {
                        router.back();
                    }} className="font-medium text-[var(--navy-blue)]  ">
                        <ChevronLeftIcon className="size-7" />
                    </div>

}