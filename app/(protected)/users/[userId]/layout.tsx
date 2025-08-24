

import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"

export const metadata:Metadata = {
    title:"Quikcrats | Details",
    description:"Getting details about the users"
}

export default function Layout({children} :{
    children:React.ReactNode
}) {

    return <div>
        <SessionProvider>
        {children}
</SessionProvider>
    </div>

}
