import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import { Itemlist } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest) {   

    let offset:number = Number(request.nextUrl.searchParams.get("offset"))
    let result:Itemlist[] = AllItems.slice(offset, offset+8)

    let authValue= await auth();
    let url = process.env.BACKEND_URL!+"allItems";

    let dataValue = await axios.get(url,{
       headers:{
        "x-user-id":authValue?.user?.id
       } 
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if(success) {
        let data = (resultFromBackend.slice(offset,offset+8))
        // i am returning the category list names only
        // console.log(data)
        if(data.length == 0 ) {
             return NextResponse.json({result:[]})
         }
    return NextResponse.json({result:data})
         
    }

    return NextResponse.error()

    // return NextResponse.json({result})
}