import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import axios from "axios";
import { auth } from "@/auth";
export async function GET(request:NextRequest, {params}:{params:Promise<{itemName:string}>}):Promise<NextResponse<{result:number}>|Response> {

   
    let itemname = (await params).itemName ;


    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "iteminfo" + "/" + itemname;

    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;

    if (success) {
        let data = (resultFromBackend)
        console.log(data.maxOrder)
        return NextResponse.json({result: data.maxOrder || 100}) // an  list of item object
    }
      return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );

}