import { NextRequest, NextResponse } from "next/server";

//instead of searching the items 
// each items to be in description regex -- but for now using it normal way for searching.
//description will add the name as well the categories, different name as well.
// getting the 10 value i.e filter value form the databse itself and sending the items back to them.
import { AllItems } from "@/app/(protected)/lib/items-placeholder";
import { Itemlist } from "@/app/(protected)/lib/placeholder-data";
export async function GET(request:NextRequest) {

    let value = request.nextUrl.searchParams;
    let searchItem = value.get("searchValue") ?? ""
    let items:Itemlist[] = [] ;
    let regexPattern = new RegExp(searchItem, "i");

    for (var eachItem of AllItems) {

        // console.log(eachItem.name.match(regexPattern), eachItem.name)
        // here simply searching for the values - since db will search for us.
        if(eachItem.name.match(regexPattern)) {
            items.push(eachItem)
        }

    }

    // once we have 10 items
    //TODO confused in case - to do the pagination i.e sending the value in offset
    // does not make sense to do the pagination here since it will lead to items will narrowed downed already.
    items = items.slice(0, 10); //only getting the items
    let brandList :string[]= []
    let typeList :string[]= []
    let categoryList :string[] = []

    for (var eachItem of items) {
        let brand = eachItem.brand;
        let type = Array.from(Object.values(eachItem.type!))[1]
        let category = eachItem.category;

        if(!brandList.includes(brand)) {
        brandList.push(brand)
        }
        if(!typeList.includes(type) ){
            typeList.push(type)
        }
        if(!categoryList.includes(category!)) {

        categoryList.push(category?.replace(/-|_/g," ")!)
        }
    }

    console.log(searchItem, "-----")

    return NextResponse.json({
        result: {items, brandList, categoryList, typeList}
    })
}