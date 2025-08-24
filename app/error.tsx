"use client"

import { useEffect } from "react"
import { localId } from "./(protected)/lib/utils";

export default function Error() {

        // useEffect(function () {
        //         let data = localStorage.getItem(localId) ?? "";
        //         localStorage.clear();
        //         localStorage.setItem(localId, data)
        // },[])

        return <div>
                some error occured
        </div>
}
