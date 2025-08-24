
import InviteCode from "@/app/(protected)/ui/pre-auth/verification-invite"
import { notFound } from "next/navigation"

export default function Page() {

    if(true) {
        return notFound();
    }

    return <div>
        <InviteCode/>
    </div>
}