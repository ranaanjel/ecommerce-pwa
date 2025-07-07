import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/lib/items-placeholder";
import { Itemlist } from "@/app/lib/placeholder-data";

export async function GET(request:NextRequest, {params}:{params:Promise<{itemName:string}>}):Promise<NextResponse<{result:Itemlist}>> {   
    let itemname = (await params).itemName ;
    
    let itemObj = AllItems.find(value => {
        return value.name.toLocaleLowerCase().includes(itemname.toLocaleLowerCase());

    })
    //TODO confused in case - to do the pagination i.e sending the value in offset
    // getting the limit from the database call

    if (itemObj) {
        return NextResponse.json({
        result: itemObj
    });
        
    }

    return NextResponse.json(
            { result: {} as Itemlist }, // or provide a default valid hardItemList object
            { status: 404 }
        );
    
}