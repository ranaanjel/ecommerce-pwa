import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    let body = request.body;
    // console.log(body) //create a order collection - row in the db and getting the id of and sending
    //sending
    console.log("creating the new order in the db")

    return NextResponse.json({
        result : "order id sending"
    })
}