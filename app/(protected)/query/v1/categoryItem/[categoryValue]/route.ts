import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import axios from "axios";


export async function GET(request:NextRequest, {params}:{params:Promise<{categoryValue:string}>}) {

    let data = (await params).categoryValue;
    let offset = Number(request.nextUrl.searchParams.get("offset")) as number ;

    // console.log(data)

     let authValue= await auth();
    let url = process.env.BACKEND_URL!+"itemsAll"+"/"+data;


    let dataValue = await axios.get(url,{
       headers:{
        "x-user-id":authValue?.user?.id
       } 
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    console.log(offset, success)
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
}