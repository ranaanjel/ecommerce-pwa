import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, response:NextResponse) {

    const {searchParams} = new URL(request.url);
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    
    
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=37.0122,72.0690&key=${ip-blocked-key}
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAP_KEY!}`
    const result = await axios.get(url);
    const data = result.data;



    if(data.status == "OK") {
        let formatted_address = data.results[0].formatted_address;
        let area = formatted_address.split(",").slice(1,3);
        console.log(data.results[0])
        return NextResponse.json({
            status:true,
            formatted_address,
            area
        })

    } else {
        return NextResponse.json({
            formatted_address:"no able to fetch the address",
            status:false
        })
    }

}

// export function POST(request:NextRequest, response:NextResponse) {

// }