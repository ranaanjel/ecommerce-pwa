import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
export async function GET(request:NextRequest, {params}:{params:Promise<{itemName:string}>}):Promise<NextResponse<{result:number}>> {

   
    let itemname = (await params).itemName ;
    
    let itemObj = AllItems.find(value => {
        return value.name.toLocaleLowerCase() == itemname.toLocaleLowerCase();
    })

    //TODO confused in case - to do the pagination i.e sending the value in offset
    // getting the limit from the database call
    console.log(itemObj)

    return NextResponse.json({
        result: itemObj?.maxOrder || 100 // that is default in 100 in case of not defined.
    })
}