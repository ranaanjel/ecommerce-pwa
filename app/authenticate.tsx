"use client"
import { SessionProvider, useSession } from "next-auth/react";
import { redirect} from "next/navigation";


export function AuthenticateComponent({children}:{children:React.ReactNode}) {

    console.log("--- auth from root layout", process.env.NODE_ENV)
    
    const {data : session, status } = useSession();
    if(!session) {
        redirect("/login")
    }
    return <div>{children}</div>
}

export function SessionProviderComponent({children}:{children:React.ReactNode}) {    
    return <div><SessionProvider>{children}</SessionProvider></div>
}