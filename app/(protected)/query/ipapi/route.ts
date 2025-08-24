import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {

    try {

    let data = await axios.get("https://ipapi.co/json")



    return NextResponse.json({
        lat : data.data.latitude,
        lng : data.data.longitude
    })
    } catch (err) {
        console.log(err, "error occurred");
        
    }

}