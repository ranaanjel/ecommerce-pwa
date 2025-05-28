import { NextRequest, NextResponse } from "next/server";
import { categoryInformationList } from "@/app/lib/placeholder-data";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest, { params }: { params: Promise<any> }) {

    console.log("request recevied")
    let searchParams = new URLSearchParams(request.nextUrl.toString().split("?")[1]);
    console.log(request.url, searchParams)
    let offSet:number = Number(searchParams.get("offset")) || 0;
    console.log(offSet)

    console.log(categoryInformationList.slice(offSet, offSet+2))

    return NextResponse.json({})
}


