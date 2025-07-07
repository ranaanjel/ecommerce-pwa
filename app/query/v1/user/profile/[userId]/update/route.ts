import { NextRequest, NextResponse } from "next/server";
import { user, UserAddress, userAll } from "@/app/lib/user-placeholder";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {

    let userId = (await params).userId;

    let result: UserAddress | UserAddress[] = [];

    //getting the restaruant details - name, representative / username, phoneno


    return NextResponse.json({
        result: "updated the profile of the user"
    })
}