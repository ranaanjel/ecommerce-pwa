import { timePeriod } from "@/app/(protected)/lib/utils";
import { auth } from "@/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest): Promise<NextResponse<{ result: [number, number]}>|Response> {

    // storing the data in the format of the 24 hr format
    
    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "timingCart" 


    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let resultFromBackend = (dataValue.data.result);
    let success = dataValue.data.success;

    if (success) {
        let data = (resultFromBackend)
        console.log(data)
        return NextResponse.json({result: [data[0], data[1]]}) // an  list of item object
    }
    return NextResponse.error()

}
//making sure end time is not 12 am 