import { NextRequest, NextResponse } from "next/server";
import { categoryTypeValue, brandValueCategoryWise } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";


export async function GET(request: NextRequest, { params }: { params: Promise<{ typeValue: string }> }) {
   

    let data = (await params).typeValue;

    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "categorySubBrandImage" + "/" + data;
    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;

    if (success) {
        let data = (resultFromBackend)
        // console.log(data.subCategoryList, data.brandList, "---------------------")
        console.log(data)
        return NextResponse.json({ result: data })

    }

      return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );



}