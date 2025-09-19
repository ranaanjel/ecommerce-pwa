import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import axios from "axios";

export async function GET(request: NextRequest, {params}:{params:Promise<{itemName:string}>} ) {

    //category wise getting all the brands and subcategories

    // const type = categoryTypeValue[data as allCategories];
    // const brand = brandValueCategoryWise[data as BrandCategories]

    let authValue = await auth();
    let item = (await params).itemName
    let url = process.env.BACKEND_URL! + "currentCrate/updateList/"+item;
    console.log(url)

    let dataValue = await axios.put(url, {}, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let success = dataValue.data.success;

    if (success) {
        // console.log(data.subCategoryList, data.brandList, "---------------------")
        return NextResponse.json({ success:true })
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