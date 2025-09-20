import { NextRequest, NextResponse } from "next/server";
// import { orderAll, OrderCollection, OrderState, userAll } from "@/app/(protected)/lib/user-placeholder";

export async function GET(
    request: NextRequest,
    {params}:  {
        params: Promise<{userId:string}>
}
) {

    let { userId } = await params;
    let offset = Number(request.nextUrl.searchParams.get("offset")) ?? 0;

    // fetching the order of the said user
    // let orderList = orderAll.filter(function (value) {
    //     return value.userId == userId;
    // })
    // type OrderWithDeliveryTiming = typeof orderAll[number] & { deliveryTiming?: string };
    
    // // let currentOrder = orderList.filter(m => (m.orderStatus == "Modified Order" || m.orderStatus == "Order Placed"))
    // let prevOrder = orderList.filter(m => !currentOrder.includes(m))

    // //sending the data in the four and using the button like see more to get the more data.

    // let allList = [...currentOrder, ...prevOrder];

    // let currentData = allList.slice(offset, offset +4)
    // console.log(currentData)

    // let prevOrderData:OrderCollection[] = []
    // let currentOrderData =   currentData.filter(m => {

    //     if(!(m.orderStatus == "Modified Order" || m.orderStatus == "Order Placed")) {
    //         prevOrderData.push(m)
    //         return false;
    //     }

    //  return   (m.orderStatus == "Modified Order" || m.orderStatus == "Order Placed")
    // })

    // currentOrderData = currentOrderData.map(m => {
    //     let addressTag = m.addressId;
        
    //     //find finding the user object and then address 
    //     // even though i will directly using the db find call to get the db and directly get the address.
    //     let address = userAll.find(value => value._id == userId)?.address.filter(m => m.tag == addressTag)[0]!;

    //     let newValue: OrderWithDeliveryTiming = { ...m, deliveryTiming: address.deliveryTiming };
        
    //     return newValue;
    // })

    // return NextResponse.json({
    //     result: {currentOrderData, prevOrderData}
    // });

    return NextResponse.json({
        message:"no more usage of this endpoint"
    })
}