

import { Metadata } from "next"

export const metadata:Metadata = {
    title:"Quikcrats | Details",
    description:"Getting details about the users"
}

export default function Layout({children} :{
    children:React.ReactNode
}) {

    return <div>
        {children}
    </div>

}
