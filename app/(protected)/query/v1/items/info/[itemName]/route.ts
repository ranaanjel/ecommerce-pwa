import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import { Itemlist } from "@/app/(protected)/lib/placeholder-data";
import { auth } from "@/auth";
import axios from "axios";

export async function GET(request:NextRequest, {params}:{params:Promise<{itemName:string}>}):Promise<NextResponse<{result:Itemlist}> | Response>  {   
    let itemname = (await params).itemName ;
    
    // let itemObj = AllItems.find(value => {
    //     return value.name.toLocaleLowerCase().includes(itemname.toLocaleLowerCase());

    // })

    //TODO confused in case - to do the pagination i.e sending the value in offset
    // getting the limit from the database call
    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "iteminfo" + "/" + itemname;

    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;

    if (success) {
        let data = (resultFromBackend) 
        return NextResponse.json({result: data}) // an  list of item object
    }

    return NextResponse.error()
        // return NextResponse.json({
        // result: data
        // })

    // if (itemObj) {
    //     return NextResponse.json({
    //     result: itemObj
    // });
        
    // }

    // return NextResponse.json(
    //         { result: {} as Itemlist }, // or provide a default valid hardItemList object
    //         { status: 404 }
    //     );
    
}