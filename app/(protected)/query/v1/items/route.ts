import { NextRequest, NextResponse } from "next/server";

//instead of searching the items 
// each items to be in description regex -- but for now using it normal way for searching.
//description will add the name as well the categories, different name as well.
import { auth } from "@/auth";
import axios from "axios";



export async function GET(request: NextRequest) {

    let value = request.nextUrl.searchParams;
    let searchItem = value.get("searchValue") ?? ""

    
    let brandList: string[] = []
    let typeList: string[] = []
    let categoryList: string[] = []

    let authValue = await auth();
    let url = process.env.BACKEND_URL! + "items" + "/" + searchItem;

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

        console.log(data)

        for (let list of data) {
            let brand = list.brand;
            let type = Array.from(Object.values(list.type!))[1] as string;
            let category = list.category;

            if (!brandList.includes(brand)) {
                brandList.push(brand)
            }
            if (!typeList.includes(type)) {
                typeList.push(type)
            }
            if (!categoryList.includes(category!)) {
                categoryList.push(category!)
            }
        }

        console.log({ items: data, brandList,categoryList,typeList })
      
        if (data.length == 0) {
            return NextResponse.json({result:{ items: data, brandList:[],categoryList: [],typeList: [] }})
        }
        return NextResponse.json({result:{ items: data, brandList, categoryList, typeList }})

    }

    return NextResponse.error()

    // return NextResponse.json({
    //     result: { items, brandList, categoryList, typeList }
    // })
}