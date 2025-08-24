import { NextRequest, NextResponse } from "next/server";
import { categoryInformationList } from "@/app/(protected)/lib/placeholder-data";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest, { params }: { params: Promise<any> }) {

    let searchParams = new URLSearchParams(request.nextUrl.toString().split("?")[1]);
    let offSet:number = Number(searchParams.get("offset")) || 0;

    let data = (categoryInformationList.slice(offSet, offSet+2))

    if(data.length == 0 ) {
        return NextResponse.json({data:[]})
    }

    return NextResponse.json({data})
}


