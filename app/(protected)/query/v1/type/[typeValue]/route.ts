import { NextRequest, NextResponse } from "next/server";
import { categoryTypeValue, brandValueCategoryWise } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";


export async function GET(request: NextRequest, { params }: { params: Promise<{ typeValue: string }> }) {
    type allCategories = "all" | "vegetable" | "masala_salt" | "packaging-materials" | "cleaning_consumables" | "rice_flours" | "confectionary_sauces" | "dairy" | "ration_pulses_oil";
    type BrandCategories = Exclude<allCategories, "all">;

    //category wise getting all the brands and subcategories
    let data = (await params).typeValue;

    // const type = categoryTypeValue[data as allCategories];
    // const brand = brandValueCategoryWise[data as BrandCategories]

    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "categorySubBrand" + "/" + data;

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

        if (String(request.nextUrl).includes("brand")) {
            return NextResponse.json({ result: { type: data.subCategoryList, brand: data.brandList } })
        }
        return NextResponse.json({ result: data.subCategoryList })

    }

      return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );


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