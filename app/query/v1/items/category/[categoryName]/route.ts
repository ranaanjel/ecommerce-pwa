import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/lib/items-placeholder";
import { Itemlist } from "@/app/lib/placeholder-data";

export async function GET(request:NextRequest, {params}:{params:Promise<{categoryName:string}>}):Promise<NextResponse<{result:Itemlist[]}>> {   
    let category = (await params).categoryName ;
   
    //db call simple no fitler whatsso ever
    let data: Itemlist[] = [];
    console.log(category)
    let itemObj = AllItems.forEach(value => {
        
        if( value.category == category){
            data.push(value)
        }   
    })
    //TODO confused in case - to do the pagination i.e sending the value in offset
    // getting the limit from the database call
   
        return NextResponse.json({
        result: data

        })
    
}