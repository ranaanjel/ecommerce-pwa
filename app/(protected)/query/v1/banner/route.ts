import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/auth";
//getting the itemlist for each category and information regarding that.

export async function GET(request: NextRequest) {

   try {let authValue= await auth();
    let url = process.env.BACKEND_URL!+"bannerList";

    let dataValue = await axios.get(url,{
       headers:{
        "x-user-id":authValue?.user?.id
       } 
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if(success) {
        let data = (resultFromBackend)

        if(data.length == 0 ) {
             return NextResponse.json({data:[]})
         }
        //  console.log(data[data.length-1].list, "-------------")
    return NextResponse.json({data})
         
    }
}catch(err) {
    console.log(err)
    return NextResponse.error()
}


}


