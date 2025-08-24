import { createImagePreorder } from "@/app/(protected)/lib/placeholder-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {



    return NextResponse.json({
        result:createImagePreorder
    })
}