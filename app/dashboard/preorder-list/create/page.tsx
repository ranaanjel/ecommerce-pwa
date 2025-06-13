"use client"

import { BottomBar } from "@/app/ui/dashboard/bottomBar"
import { useState } from "react"

export default function Page() {

    let [list, setList] = useState([])

    return <div>
        create preorder list
        <BottomBar></BottomBar>
    </div>
}