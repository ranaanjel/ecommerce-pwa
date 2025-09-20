import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import axios from "axios";

export async function DELETE(request: NextRequest,{params}:{params:Promise<{preorderCard:string}>}) {

    let authValue = await auth();
    let value = (await params).preorderCard;
    let url = process.env.BACKEND_URL! + "preorderList/deleteList/"+value;;

    let dataValue = await axios.delete(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if (success) {
        return NextResponse.json({ success:true })
    }

      return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );

    // return NextResponse.json({
    //     result: preorderList
    // })
}