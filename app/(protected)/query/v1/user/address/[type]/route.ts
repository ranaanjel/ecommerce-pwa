import { NextRequest, NextResponse } from "next/server";
import { UserAddress, userAll } from "@/app/(protected)/lib/user-placeholder";

export async function GET(request:NextRequest, {params}:{params:Promise<{type:string}>}) {

//     let value = (await params).type;
//     let searchPrams = request.nextUrl.searchParams;
//     console.log(searchPrams)
//     let userId = searchPrams.get("userId")

//     let result:UserAddress | UserAddress[] = [];

//     if(value == "all") {


//     let user = userAll.find(function (value) {

//         return value._id == userId;

//     })
//    result = user?.address ?? [];


//    } else if(value =="default") {

//     let user = userAll.find(function (value) {
//         return value._id == userId;
//     })
//     let address = user?.address.find(function (value) {
//         return value.default;
//     })

//     result = address ?? [];
//     //user will going to have a address for sure.
//    } else {
//     return NextResponse.error()
//    }

//     return NextResponse.json({
//         result
//     })
return NextResponse.json({
        message:"no more usage of this endpoint"
    })
}