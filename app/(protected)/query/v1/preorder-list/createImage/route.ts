import { createImagePreorder } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {

     let authValue = await auth();

    let url = process.env.BACKEND_URL! + "preorderList/images/";

    let dataValue = await axios.get(url,{
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let success = dataValue.data.success;
    let data = dataValue.data.result

    if (success) {
        return NextResponse.json({ success:true, 
            result:data
         })
    }

    // return NextResponse.error({})
    return NextResponse.error()

    // return NextResponse.json({
    //     result:createImagePreorder
    // })
}