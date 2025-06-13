
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { forwardRef, ForwardedRef } from "react";

export const Footer = forwardRef((prop, ref: ForwardedRef<HTMLDivElement>) => {

    return <div ref={ref} className="h-36 w-full bg-logo p-4 px-6 text-white mt-4">

        <div className="flex justify-between">
            <div>
                <div className="text-xs font-normal my-1">Company</div>
                <div className="text-md mb-2">Quikcrats Service Private Limited</div>
                <div className="text-[10px]">
                    Ground Floor, RZ E-121, Nihal Vihar, Nangloi <br/>New Delhi - 110041
                </div>
                <div className="text-[10px] flex items-center gap-1">
                    <ChatBubbleIcon className="size-3 text-white"/> +91 8287470325
                </div>
            </div>
            <div>
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/logo.png"} alt="company_logo" className="" height={60} width={60}/>
            </div>
        </div>
        <div className="text-end w-full text-xs">
            Copyright &copy; Quikcrats All Rights Reserverd
        </div>
    </div>
})