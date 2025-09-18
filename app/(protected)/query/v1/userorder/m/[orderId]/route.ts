import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest, {params}:{params:Promise<{orderId:string}>}) {
    // console.log("hitting")
    // let orderID = (await params).orderId;

    // //TODO changing the status from OrderState.EditOrder 
    // //TODO changing the orderlist , addressTag, instruction related with order - address.
    // // console.log(orderID, "modified")
    // let data = (await request.body?.getReader().read());
    // console.log("modifying order")


    // return NextResponse.json({
    //     result:orderID

    // })
    return NextResponse.json({
        message:"no more usage of this endpoint"
    })
}
// export async function GET(request:NextRequest, {params}:{params:Promise<{orderId:string}>}) {
//     console.log("hitting")
//     let orderID = (await params).orderId;

//     //TODO changing the status from OrderState.EditOrder 
//     //TODO changing the orderlist , addressTag, instruction related with order - address.
//     console.log(orderID, "modified")


//     return NextResponse.json({
//         result:orderID
//     })
// }