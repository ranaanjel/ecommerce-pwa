"use client"
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";
import { redirect } from "next/navigation";
import { UserDataInfo } from "@/actions/databaseCall";


export function UserInfo({ children }: { children: React.ReactNode }) {

    let { data } = useSession();
    let [isPending, startTransition] = useTransition();


    useEffect(function () {
        console.log("running the db data check")

        startTransition(async function () {
            let userId = data?.user?.id;
            if (userId != null) {
                let isUserInfo = await UserDataInfo(userId as string);
                if (isUserInfo == "profile" || isUserInfo == "data" || isUserInfo == "address") {
                    redirect("/registration/" + userId as string)
                }else if (isUserInfo == false) {
                console.log(isUserInfo)
                    return;
                }else if((isUserInfo as string).split(",")[0] == "address-data") {
                    redirect("/users/"+userId+"/address?"+(isUserInfo as string).split(",")[1])
                }
                console.log(isUserInfo)
            }
        })
    }, [data])

    return <div>
        {
            children
        }
    </div>
}