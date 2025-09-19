import { auth } from "@/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request:NextRequest) {
  try {  let authValue= await auth();
    let url = process.env.BACKEND_URL!+"categoryList";

    let dataValue = await axios.get(url,{
       headers:{
        "x-user-id":authValue?.user?.id
       } 
    });

    let resultFromBackend = (dataValue.data.result);

    let success = dataValue.data.success;


    if(success) {
        let data = (resultFromBackend)

    return NextResponse.json({result : {active:data.active, upcoming:data.upcoming}})
         
    }} catch(err) {

        console.log(err)
    return NextResponse.error()
    }


    
}