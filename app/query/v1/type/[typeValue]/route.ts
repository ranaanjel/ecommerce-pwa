import { NextRequest, NextResponse } from "next/server";
import { categoryTypeValue , brandValueCategoryWise} from "@/app/lib/placeholder-data";


export async function GET(request:NextRequest, {params}:{params:Promise<{typeValue:string}>}){
    type allCategories = "all"|"vegetable"| "masala_salt"|"packaging-materials" | "cleaning_consumables" | "rice_flours" | "confectionary_sauces"| "dairy" | "ration_pulses_oil";
    type BrandCategories = Exclude<allCategories, "all">;

    let data= (await params).typeValue ;
    const type = categoryTypeValue[data as allCategories];
    const brand = brandValueCategoryWise[data as BrandCategories]
    if(String(request.nextUrl).includes("brand")) {
        
    return NextResponse.json({
        result:{type, brand}
    })
    }

    return NextResponse.json({
        result:type
    })
}