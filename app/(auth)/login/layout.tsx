

import { Metadata } from "next"

export const metadata:Metadata = {
    title:"Quikcrats | Authentication",
    description:"Authenticating the users"
}

export default function Layout({children} :{
    children:React.ReactNode
}) {

    return <div>
        {children}
    </div>

}