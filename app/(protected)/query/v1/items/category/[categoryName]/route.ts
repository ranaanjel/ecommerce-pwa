import { NextRequest, NextResponse } from "next/server";
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import { Itemlist } from "@/app/(protected)/lib/placeholder-data";
import axios from "axios";
import { auth } from "@/auth";

export async function GET(request:NextRequest, {params}:{params:Promise<{categoryName:string}>}):Promise<NextResponse<{result:Itemlist[]}> | Response> {   
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
    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "itemsAll" + "/" + category;

    let dataValue = await axios.get(url, {
        headers: {
            "x-user-id": authValue?.user?.id
        }
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;
    // console.log(success, resultFromBackend)

    if (success) {
        let data = (resultFromBackend)
        
        let randomValueData = [];
        let randomNumberSelect:number[] = [];
        while (randomValueData.length <= 8) {  
            let length = data.length;
            let randomValue = Math.floor(Math.random()*length);
            let newData = data[randomValue]             

            if(!(randomValue in randomNumberSelect)) {
                randomNumberSelect.push(randomValue);
                randomValueData.push(newData)
            }
        }
      
        if (data.length == 0) {
            return NextResponse.json({result:data})
        }
        return NextResponse.json({result: randomValueData})
    }

    return NextResponse.error()
        // return NextResponse.json({
        // result: data

        // })
    
}