import { NextRequest, NextResponse } from "next/server";
import { preorderList } from "@/app/lib/placeholder-data";

export async function GET(request:NextRequest, {params}:{params : Promise<{cardName:string}>}) {

    let cardType  = (await params).cardName;

    let value = cardType.replace(/_/g, " ");
    // doing the query to the database but now using the preorder list 

    let data = preorderList.find(m => {
        return m.title.toLocaleLowerCase() == value
    }) 
    // console.log(data, value)
    return NextResponse.json({
        result:data
    })
}