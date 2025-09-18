import { NextRequest, NextResponse } from "next/server";
import { orderAll, OrderCollection, UserAddress, userAll } from "@/app/(protected)/lib/user-placeholder";
import { crateItemInterface } from "@/app/(protected)/lib/definitions";

export async function GET(
    request: NextRequest,
    {params}:  {
        params: Promise<{userId:string, orderId:string}>
}
)
// : Promise<NextResponse<{ result: {success:boolean, data:{address:UserAddress,orderList:crateItemInterface}} }>> 
{

    // let { userId, orderId } = await params;

    // // fetching the order of the said user

    // // getting the order of the said user -- in case of separate just getting that
    // //fetching the latest price for the value
    // //TODO latest price

    // let orderListColl:OrderCollection | undefined = orderAll.find(function (value) {
    //     return value.orderId == orderId;
    // }) 
  
    // let address = userAll.find(value => value._id == userId)?.address.find(value => value.tag == orderListColl?.addressId);

    // if (!address) {
    //     return NextResponse.json({
    //         result: {
    //             success: false,
    //             data: {
    //                 address: {} as UserAddress, // or provide a default UserAddress object if available
    //                 orderList: []
    //             }
    //         }
    //     }, { status: 404 });
    // }
   


    // // sending the data back 
    

    // return NextResponse.json({
    //     result: {
    //         success: true,
    //         data: {
    //             address,
    //             orderList: orderListColl?.orderList ?? []
    //         }
    //     }
    // });
    return NextResponse.json({
        message:"no more usage of this endpoint"
    })
}