
import { AccountBody } from "@/app/(protected)/ui/dashboard/accountBody";
import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { BottomBar } from "@/app/(protected)/ui/dashboard/bottomBar";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";

export default function Page() {


    return <div className="h-screen overflow-hidden select-none text-black">

        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2 w-full">
                    <BackButton />
                    <div className="flex w-[85%] justify-center">
                        <div className="text-semibold text-xl  ">
                            Settings
                        </div>
                    </div>
                </div>
            </div>
        </TopBar>
      
        <AccountBody></AccountBody>



        <BottomBar></BottomBar>
    </div>
}



// user address --> bunch of address and users --- default to via radio values.