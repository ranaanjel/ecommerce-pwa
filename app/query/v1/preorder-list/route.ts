import { NextRequest, NextResponse } from "next/server";
import { preorderList } from "@/app/lib/placeholder-data";

export async function GET(request:NextRequest) {



    return NextResponse.json({
        result : preorderList
    })
}