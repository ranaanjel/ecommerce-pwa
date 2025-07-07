import { NextRequest, NextResponse } from "next/server";
import { user, UserAddress, userAll } from "@/app/lib/user-placeholder";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {

    let userId = (await params).userId;
    let searchPrams = request.nextUrl.searchParams;
    let type = searchPrams.get("update")

    let result: UserAddress | UserAddress[] = [];

    //getting the restaruant details - name, representative / username, phoneno


    if (type == "true") {

        let userSelect:user|undefined = userAll.find(value => value._id == userId);
        if(userSelect)  {
            let data = userSelect.profile;
        return NextResponse.json({
            result: { restaurantName: data.restaurantName, representative: data.representative, additionalNo:data.additionalNo, deliveryTiming:data.deliveryTiming, restaurantType:data.restaurantType, role:data.representativeDesignation }
        })
        }

        return NextResponse.json({
            message:"failed"
        })
    }

    return NextResponse.json({
        result: { name: "", representative: "", contact: " " }
    })
}