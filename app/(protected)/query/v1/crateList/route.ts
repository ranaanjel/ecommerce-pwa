import { NextRequest, NextResponse } from "next/server";
import { categoryTypeValue, brandValueCategoryWise } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";


export async function GET(request: NextRequest ) {

    //category wise getting all the brands and subcategories

    // const type = categoryTypeValue[data as allCategories];
    // const brand = brandValueCategoryWise[data as BrandCategories]

    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "currentCrate";

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

        return NextResponse.json({ result: data })

    }

    return NextResponse.error()


    // if(String(request.nextUrl).includes("brand")) {

    // return NextResponse.json({
    //     result:{type, brand}
    // })
    // }
    // console.log(type)
    // return NextResponse.json({
    //     result:type
    // })

}