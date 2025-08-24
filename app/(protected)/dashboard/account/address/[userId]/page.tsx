import { AddressBody } from "@/app/(protected)/ui/dashboard/addressBody";
import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";


export default async function Page({params}:{params:Promise<{
    userId:string
}>}) {

    let userData = (await params).userId;

    return <div className="h-screen w-full overflow-hidden animate-slide relative bg-[#ebfefe] text-black select-none">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2 w-full">
                    <BackButton />
                    <div className="flex w-[85%] justify-center">
                        <div className="text-semibold text-xl  ">
                            Manage your addresses
                        </div>
                    </div>
                </div>
            </div> 
        </TopBar>

        <AddressBody userId={userData}></AddressBody>
    </div>
}