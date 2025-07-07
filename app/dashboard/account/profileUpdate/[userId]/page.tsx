import { BackButton } from "@/app/ui/dashboard/BackButton";
import { ProfileUpdateBody } from "@/app/ui/dashboard/profileUpdate";
import { TopBar } from "@/app/ui/dashboard/topBar";


export default async function Page({params}:{params:Promise<{
    userId:string
}>}) {

    let userData = (await params).userId;


    return <div className="h-screen w-full overflow-hidden animate-slide relative bg-[#ebfefe] text-black">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2 w-full">
                    <BackButton />
                    <div className="flex w-[85%] justify-center">
                        <div className="text-semibold text-xl  ">
                            Profile Settings
                        </div>
                    </div>
                </div>
            </div> 
        </TopBar>

        <ProfileUpdateBody userId={userData}>
        </ProfileUpdateBody>
    </div>
}
