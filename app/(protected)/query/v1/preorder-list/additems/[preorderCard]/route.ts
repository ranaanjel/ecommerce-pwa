import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import axios from "axios";

export async function POST(request: NextRequest, {params}:{params:Promise<{preorderCard:string}>}) {

    let authValue = await auth();
    let data = await request.json();
    let preorderName = (await params).preorderCard;
    let url = process.env.BACKEND_URL! + "preorderList/addtolist/"+ preorderName;
    console.log(url)

    let dataValue = await axios.post(url,data ,{
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if (success) {
        // console.log(data[0].list)
        //  console.log(data[data.length-1].list, "-------------")
        return NextResponse.json({ success:true })
    }

    // return NextResponse.error({})
      return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );

    // return NextResponse.json({
    //     result: preorderList
    // })
}