import { NextRequest, NextResponse } from "next/server";
import { categoryInformationList } from "@/app/(protected)/lib/placeholder-data";
import axios from "axios";
import { auth } from "@/auth";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest, { params }: { params: Promise<any> }) {

    let searchParams = new URLSearchParams(request.nextUrl.toString().split("?")[1]);
    let offSet:number = Number(searchParams.get("offset")) || 0;

    let authValue= await auth();
    let url = process.env.BACKEND_URL!+"categoryDashboard";

    let dataValue = await axios.get(url,{
       headers:{
        "x-user-id":authValue?.user?.id
       } 
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if(success) {
        let data = (resultFromBackend.slice(offSet, offSet+2))

        if(data.length == 0 ) {
             return NextResponse.json({data:[]})
         }
        //  console.log(data[data.length-1].list, "-------------")
    return NextResponse.json({data})
         
    }


    return NextResponse.error()

}


