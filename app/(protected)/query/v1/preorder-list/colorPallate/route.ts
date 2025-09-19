import { colorPalette } from "@/app/(protected)/lib/placeholder-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
// looks totally good 

    return NextResponse.json({
        result:colorPalette
    })
}