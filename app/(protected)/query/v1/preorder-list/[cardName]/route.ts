import { NextRequest, NextResponse } from "next/server";
import { preorderList } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";

export async function GET(request:NextRequest, {params}:{params : Promise<{cardName:string}>}) {

    let cardType  = (await params).cardName;

    let value = cardType.replace(/_/g, " ");


    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "preorderList/"+value;

    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });


    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if (success) {
        let data = (resultFromBackend)
        // console.log(data)
        //  console.log(data[data.length-1].list, "-------------")
        return NextResponse.json({ result : data })
    }else if(!success) {
        return NextResponse.json({
            result:"non-found"
        })
    }

    return NextResponse.error()

    // return NextResponse.json({
    //     result:data
    // })
}