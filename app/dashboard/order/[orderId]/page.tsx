import { BackButton } from "@/app/ui/dashboard/BackButton";
import { BottomBar } from "@/app/ui/dashboard/bottomBar";
import { TopBar } from "@/app/ui/dashboard/topBar";





export default async function OrderId({params}:{params:Promise<{orderId:string}>}) {

    let orderId = (await params).orderId;


    return <div className="bg-[#ebf6f6] h-screen overflow-hidden">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="flex gap-2 text-semibold text-xl capitalize">
                            Order Received
                            <span className="text-gray-500">#{orderId}</span>
                        </div>
                    </div>
                </div>
            </div>
        </TopBar>

        <BottomBar></BottomBar>
    </div>
}

//getting the address details 
// showing the ui and fetching the order details from the backend.

//making it a server component for able to use the database call easily.