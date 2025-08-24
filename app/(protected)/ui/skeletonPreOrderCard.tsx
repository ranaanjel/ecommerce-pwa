
export function SkeletonPreOrderCard() {
 
    return <div className="grid grid-cols-2 gap-2 p-4">
        {
            [0,0,0,0].map((m, index) => {

                return <SkeletonCard key={index} />
            })
        }
    </div>
}

function SkeletonCard() {
    return <div className="animate-pulse bg-white h-74 w-[100%] flex flex-col gap-4 p-2">
        <div className="h-1/3 bg-gray-200 w-full">
        </div>
        <div className="flex justify-between ">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="flex justify-between flex-1">
            <div className="w-1/4 h-4 bg-gray-200">
            </div>
            <div className="w-2/4 h-4 bg-gray-200">
            </div>
        </div>
        <div className="w-full h-2 bg-gray-200">
        </div>
    </div>
}