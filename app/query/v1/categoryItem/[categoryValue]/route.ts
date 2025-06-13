import { NextRequest, NextResponse } from "next/server";

import { categoryItemInfo } from "@/app/lib/placeholder-data";

type CategoryKey = keyof typeof categoryItemInfo;

export async function GET(request:NextRequest, {params}:{params:Promise<{categoryValue:string}>}) {

    let data = (await params).categoryValue as CategoryKey;
    let offset = Number(request.nextUrl.searchParams.get("offset")) as number ;

    console.log(data, offset)

    let datalist =  categoryItemInfo[data].list

    let returnValue = datalist.slice(offset, offset+8)
    console.log(returnValue, offset, offset+8)

    return NextResponse.json({
        result:returnValue
    })
}