"use client"
import { BottomBar } from "@/app/(protected)/ui/dashboard/bottomBar";
import { Categories } from "@/app/(protected)/ui/dashboard/categoryCard";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {

    let router = useRouter()

    return <div className="min-h-screen  bg-[#e7f8ff] text-black">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center">
                <div onClick={function () {
                    router.back();
                }} className="font-medium text-[var(--navy-blue)]  text-2xl">
                    <ChevronLeftIcon className="size-7"/>
                </div>
                <div className="text-semibold flex justify-center items-center text-xl">
                    All Categories
                </div>
                <Link href={"/dashboard/search"} className="font-medium text-[var(--navy-blue)]  text-2xl">
                    <MagnifyingGlassIcon className="size-7"/>
                </Link>

            </div>
        </TopBar>
        <Categories type={"page"}/>

        <BottomBar></BottomBar>
    </div>
}