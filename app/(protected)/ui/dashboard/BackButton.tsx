"use client"

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function BackButton({formationPage}:{formationPage?:boolean}) {
    let router = useRouter()
    return <div onClick={function () {
            if(formationPage) {
                console.log(formationPage)
                router.push("/dashboard/order")
            }else {
            router.back();
            }
                
                    }} className="font-medium text-[var(--navy-blue)]  ">
                        <ChevronLeftIcon className="size-7" />
                    </div>

}