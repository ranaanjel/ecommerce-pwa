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
    else {
      // Handle the case when success is false
      return NextResponse.json(
        { error: "Backend request was not successful" },
        { status: 400 }
      );
    }
}catch(err) {
    console.log(err)
    //   return NextResponse.json(
   return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
}
}

// Type error: Type 'typeof import("/home/atomic-zeone/Desktop/development-file/quickcrats/code_base/pwa-commerce-mobile/app/(protected)/query/v1/banner/route")' does not satisfy the expected type 'RouteHandlerConfig<"/query/v1/banner">'.
//   The types returned by 'GET(...)' are incompatible between these types.
//     Type 'Promise<NextResponse<{ data: any; }> | NextResponse<{ error: string; }> | undefined>' is not assignable to type 'void | Response | Promise<Response> | Promise<void>'.
//       Type 'Promise<NextResponse<{ data: any; }> | NextResponse<{ error: string; }> | undefined>' is not assignable to type 'Promise<Response>'.
//         Type 'NextResponse<{ data: any; }> | NextResponse<{ error: string; }> | undefined' is not assignable to type 'Response'.
//           Type 'undefined' is not assignable to type 'Response'


