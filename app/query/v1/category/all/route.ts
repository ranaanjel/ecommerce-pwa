import { NextRequest, NextResponse } from "next/server";
import { categoryInformationList } from "@/app/lib/placeholder-data";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest) {

    let result:string[] = []

    result = categoryInformationList.map(m => m.name)

    return NextResponse.json({result})
}