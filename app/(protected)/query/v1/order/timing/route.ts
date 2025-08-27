import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest): Promise<NextResponse<{ result: [number, number]}>> {

    // storing the data in the format of the 24 hr format

    return NextResponse.json({
        result: [13,2]
    });
}
//making sure end time is not 12 am 