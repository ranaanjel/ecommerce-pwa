import { NextRequest, NextResponse } from "next/server";
import { orderAll } from "@/app/(protected)/lib/user-placeholder";

export async function PUT(
    request: NextRequest,
    {params}:  {
        params: Promise<{userId:string, orderId:string}>
}
): Promise<NextResponse<{ result: {success:boolean} }>> {

    let { userId, orderId } = await params;

    // fetching the order of the said user

    // getting the order of the said user -- in case of separate just getting that
    //fetching the latest price for the value
    //TODO updating database value of the order - 
    //orderState -- cancel

    //using the userId and orderId to find the person

    let orderList = orderAll.filter(function (value) {
        return value.orderId == orderId;
    }) 

    // sending the data back 
    
    // in case of failure returning the false

    return NextResponse.json({
        result: {
            success: true
        }
    });
}