
"use client"
import { useEffect } from "react";
import LocationPickerMap from "../ui/googleMap";
import { notFound } from "next/navigation";




export default function Page() {

    // useEffect(() => {
    //     alert(process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY);
    // })

    if(process.env.NODE_ENV == "production") {
        return notFound();
    }

    return <div>Test Page        
    {/* <LocationPickerMap/> */}
    </div>
}