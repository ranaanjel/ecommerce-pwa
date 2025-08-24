import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import { Itemlist } from "@/app/(protected)/lib/placeholder-data";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest) {

    let offset:number = Number(request.nextUrl.searchParams.get("offset"))
    let result:Itemlist[] = AllItems.slice(offset, offset+8)

    console.log(result)

    // await new Promise(function(res,rej) {
    //     setTimeout(res, 4000)
    // })

    return NextResponse.json({result})
}