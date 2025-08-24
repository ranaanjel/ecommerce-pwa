"use client";
import Image from "next/image"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {localId} from "../../lib/utils"


//no verfication code required as of now -- simple credential and other things

export default function InviteCode() {
    const [inviteCode, setInviteCode] = useState<string>("")
    const [inviteError, setInviteError] = useState(false);
    const inputrefs = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    function verifyInviteCode() {
        if(inviteCode.length != 8 ) {
            setInviteError(true);
            return;
        }

        // db call to check the invite code and then claiming that as used for -- tying that invite code to phone 
        // on login we will check invite code given and used -- if not given then asking for them to come soon or call.
        // creating the user with the phone no and redirecting to the registration page.
        //getting this id from the backend
        //TODO -- only when the userid does not exist 
        // here will create the userId and save it to the localaddress.

        let userId = "djdc12321-duqweam" ;//uuid -- object id

        localStorage.setItem(localId, userId)

        
        router.push("/registration/"+ userId)
    }

    return <div className="w-full max-h-screen uselect-none bg-white overflow-hidden">
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/market1.png" // Update with actual image path
                    alt="market background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Gradient Overlay */}
            <div className="flex flex-col relative w-full h-full bg-gradient-to-b from-[#15280B] via-[#283920] via-[#3A4732] to-transparent px-[31px] pt-[45px]">
                {/* Header Text */}
                <div className="text-white font-semibold text-[20px] mb-[3px]">
                    Enter Invite code
                </div>
                <div className="text-white/50 text-[14px] flex flex-col ">
                    Enter 8 digit one time invite code to early users
                </div>
                   <input
                placeholder="∗∗∗∗∗∗∗∗"
                ref={inputrefs}
                type="text"
                maxLength={8}
                value={inputrefs.current?.value || ""}
                onChange={(e) => setInviteCode(e.target.value)}
                className="caret-red-600 w-1/2 mx-auto mt-10 rounded border-white bg-white p-2 text-black text-xl font-bold focus:outline-none"
            />

                 {
                inviteError && <div className="text-red-800 text-sm">
                    Required*
                </div>
            }


            <button
                onClick={function () {
                    verifyInviteCode()
                }}
                className="mt-10 text-white text-[20px] font-bold w-8/10 m-auto h-[58px] bg-[#86CB50] cursor-pointer rounded-[5px] shadow-[0px_4px_4px_0px_#283920] flex items-center justify-center"
            >
                Verify
            </button>

            </div>

         

           

        </div>
    </div>
}