import { BackButton } from "@/app/ui/dashboard/BackButton";
import { CrateComponent } from "@/app/ui/dashboard/crateComponent";
import { ItemComponentBody } from "@/app/ui/dashboard/itemBody";
import { TopBar } from "@/app/ui/dashboard/topBar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ itemName: string }> }) {
    let value = (await params).itemName;

    value = value.replace(/_|-|,/g," ")


    return <div className="h-screen overflow-hidden text-black">

        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative">
                <div className="flex gap-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="text-semibold text-xl capitalize whitespace-nowrap overflow-ellipsis">
                            {value}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 ">
                    <Link href={"/dashboard/search"} className="font-medium text-logo text-2xl">
                        <MagnifyingGlassIcon className="size-7" />
                    </Link>
                    <CrateComponent />
                </div>
            </div>
        </TopBar>
        <ItemComponentBody itemname={value}>

        </ItemComponentBody>
    </div>



}