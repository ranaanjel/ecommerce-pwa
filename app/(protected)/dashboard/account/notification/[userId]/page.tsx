import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { NotificationBody } from "@/app/(protected)/ui/dashboard/notificationBody";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";


export default async function Page({params}:{params:Promise<{
    userId:string
}>}) {

    let userData = (await params).userId;


    return <div>
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2 w-full">
                    <BackButton />
                    <div className="flex w-[85%] justify-center">
                        <div className="text-semibold text-xl  ">
                            Notification Updates
                        </div>
                    </div>
                </div>
            </div> 
        </TopBar>
        <NotificationBody userId={userData}></NotificationBody>
    </div>
}