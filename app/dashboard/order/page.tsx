
import { BackButton } from "@/app/ui/dashboard/BackButton";
import { BottomBar } from "@/app/ui/dashboard/bottomBar";
import { CrateComponent } from "@/app/ui/dashboard/crateComponent";
import { TopBar } from "@/app/ui/dashboard/topBar";
import { SkeletonLoading } from "@/app/ui/skeletons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const OrderPageBody = dynamic(() =>
  import("@/app/ui/dashboard/orderPage").then(mod => 
 mod.OrderPageBody
  )
)

export default function Page() {



    return <div className="h-screen overflow-hidden text-black">

        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative Text-black">
                <div className="flex flex-start items-center mb-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="flex gap-2 text-semibold text-xl capitalize">
                            Order Status
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={"/dashboard/search"} className="font-medium text-logo text-2xl">
                        <MagnifyingGlassIcon className="size-7" />
                    </Link>
                    <CrateComponent />
                </div>
            </div>
        </TopBar>

       <Suspense fallback={<SkeletonLoading type="crate"></SkeletonLoading>}>
         <OrderPageBody></OrderPageBody>
       </Suspense>



        <BottomBar></BottomBar>
    </div>
}