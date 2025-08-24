import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { MapIcon } from "../svg/mapicon";
import { SetStateAction } from "react";

export function FetchDataLocation({ children, setSearch }: { setSearch: React.Dispatch<SetStateAction<boolean>>, children: React.ReactElement }) {

    const router = useRouter();




    return <div className="absolute h-screen overflow-hidden top-0 bg-white z-100 w-full">
        <div className="w-full py-4 border-b border-[#B4B4B4] bg-white flex items-center px-6 gap-10">
            <div onClick={function () {
                setSearch(false)
            }} className="cursor-pointer bg-gray-700/5 rounded">
                <ChevronLeftIcon className="size-8" />
            </div>
        </div>
        <div className="px-6 py-4 flex flex-col gap-3">
            <div className="flex items-center">
                <div className="text-red-600">
                    <MapIcon />
                </div>
                <div className="text-2xl font-normal ml-2">Your location</div>
            </div>
            {children}
        </div>
    </div>
}