"use server"
import { auth } from "@/auth";
import { client } from "@/db";
import { ObjectId } from "mongodb";
import { URL } from "url";
import { nanoid } from "nanoid";
import { addDays } from "date-fns";

export async function UserDataInfo(userId: string) {
    let objectId = new ObjectId(userId);
    // checking if the object is present in the collection -- consumerProfile consumerAddress consumerData
    let db = (await client).db("cart");
    let consumerProfile = db.collection("consumerprofiles");
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");

    // check if the user is there 

    // since one data meaning -- all the data has to be there -- i.e frontend working
    // console.log(userId , "server actions")

    let profile = await consumerProfile.findOne({ _id: objectId }); //single
    let address = await consumerAddress.findOne({ userId: objectId, default: true }); // multiple
    let data = await consumerData.findOne({ userId: objectId }); //single


    if (!profile) {
        return "profile";
    } else if (!data) {
        return "data"
    } else if (!address) {
        return "address"
    } else if (address && data && address.tag == "") {
        let restaurantName = data.restaurantName;
        let restaurantType = data.restaurantType.join("-");
        let deliveryTiming = address.deliveryTiming;
        return "address-data,&restaurantName=" + restaurantName + "&restaurantType=" + restaurantType + "&deliveryTiming=" + deliveryTiming;
    } else {
        return false;
    }

}

export async function registerUser(userId: string, query: string, onPage: string) {

    let { searchParams } = new URL("http://example.com?" + query);

    // console.log(searchParams.getAll)

    let objectId = new ObjectId(userId);
    // checking if the object is present in the collection -- consumerProfile consumerAddress consumerData
    let db = (await client).db("cart");
    let consumerProfile = db.collection("consumerprofiles");
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");

    // check if the user is there 

    // since one data meaning -- all the data has to be there -- i.e frontend working
    // console.log(userId , "server actions")

    let profile = await consumerProfile.findOne({ _id: objectId });
    let address = await consumerAddress.findOne({ userId: objectId });
    let data = await consumerData.findOne({ userId: objectId });
    let sessionValue = await auth()

    let phoneNo = sessionValue?.user && "phone" in sessionValue.user ? sessionValue.user.phone : "";
    let name = sessionValue?.user?.name?.toLowerCase();

    // console.log(phoneNo, name, !phoneNo && !name)
    if (!phoneNo && !name) {
        return false;
    }

    if (!profile) {
        await consumerProfile.insertOne({
            _id: objectId,
            name,
            phoneNo,
            email: sessionValue?.user?.email,
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: sessionValue?.user?.image

        });
    }

    if (!address && !data && onPage == "registration") {
        //creating now 
        let restaurantName = searchParams.get("restaurantName")?.toLocaleLowerCase();
        let restaurantType = searchParams.get("restaurantType")?.toLocaleLowerCase();
        let deliveryTiming = searchParams.get("deliveryTiming");

        // console.log(restaurantName, restaurantType)

        await consumerAddress.insertOne({
            userId: objectId,
            deliveryTiming,
            "address": "",
            "shopDetails": "",
            "receiver": "",
            "default": false,
            "instruction": [],
            "pincode": "",
            "tag": "",
            "additionalNo": "",
            "deliveryAvailable": false, // using the for the crate - not able to confirm the delivery.
        })
        let categoryPricingObjectId = await db.collection("categoryPricing").findOne({
            default:true
        })
        let defaultPreOrderCard = (await db.collection("defaultpreorderlists").find({}).toArray()).map(m => m.id)
        //creating the default preorder for the user and assigning them here.
        await consumerData.insertOne({
            "userId": objectId,
            "restaurantName": restaurantName,
            "representativeName": "representative",
            "representativeDesignation": "owner",
            "restaurantType": [restaurantType],
            "categoryPricingId": categoryPricingObjectId?._id, // from the default set by admin. 
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "orderHistoryId":[],
            "preorderCardId":defaultPreOrderCard,
            "currentCartId":"",
        })

    } else if (!address || !data && onPage == "address") {
        return false;
    } else if (address && data && onPage == "address") {

        //modifying the value
        let address = searchParams.get("address");
        let shopDetails = searchParams.get("shopDetails");
        let receiver = searchParams.get("receiver");
        let defaultValue = true;
        let instruction = searchParams.get("instruction")?.split(",");
        let pincode = searchParams.get("pincode");
        let tag = searchParams.get("tag");
        let additionalNo = searchParams.get("additionalNo");

        //checking the pincode; 
        //backend url --
        let requestURL = process.env.BACKEND_URL! + "/api/v1/user/" + pincode
        // console.log(requestURL)
        let deliveryPossible = await (await fetch(requestURL)).json();


        await consumerAddress.updateOne({ userId: objectId }, {
            $set: {
                additionalNo,
                address,
                default: defaultValue,
                instruction,
                pincode,
                receiver,
                shopDetails,
                tag,
                deliveryAvailable: deliveryPossible.delivery
            }
        })


        if (!deliveryPossible.delivery) {
            return false;
        }


    }




    return true;
}
export async function InfoValue(type: string) {

    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let consumerProfile = db.collection("consumerprofiles");
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");

    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);

    let returnAddress = await consumerAddress.findOne({
        userId: objectId, default: true
    })
    let returnProfile = await consumerProfile.findOne({
        _id: objectId
    });
    let returnData = await consumerData.findOne({
        userId: objectId
    })
    // console.log(userId)

    if (type == "address") {

        if (returnAddress) {


            return returnAddress.address;
        }
        return false
    } else if (type == "restaurant") {
        if (returnProfile && returnData) {


            return {
                name: returnData.restaurantName, contact: returnProfile.phoneNo, representative: returnData.representativeName
            }
        }
        else {
            return false
        }
    } else if (type == "version") {
        let url = backendURL + "/api/v1/user/version"
        let version = (await (await fetch(url)).json()).version;
        return version || "0.1.0";
    } else if (type == "full") {

        if (returnProfile && returnData && returnAddress) {

            let restaurantName = returnData.restaurantName;
            let restaurantType = returnData.restaurantType;
            let representativeName = returnData.representativeName;
            let representative = returnData.representativeDesignation;
            let deliveryTiming = returnAddress.deliveryTiming;
            let phone = returnProfile.phoneNo;

            return { restaurantName, restaurantType, representativeName, role: representative, deliveryTiming, phone };

        }
        else {
            return false
        }


    } else if (type == "allAddress") {
        if (returnAddress) {
            let data = await consumerAddress.find(
                { userId: objectId }).toArray();
            // console.log(data)
            let returnAddress = data.map((m: any) => ({
                ...m,
                _id: m._id.toString(),
                userId: m.userId?.toString?.() ?? m.userId
            }));

            return returnAddress;
        } else {
            return false;
        }
    } else if (type == "totalAddress") {
        if (returnAddress) {
            let data = await consumerAddress.find(
                { userId: objectId }).toArray();

            return data.length;
        } {

            return false
        }

    } else if (type == "extra-all") {
        //returning the default address 

        if (returnData && returnAddress) {
            let restaurantName = (returnData.restaurantName);
            let restaurantType = returnData.restaurantType.join(", ");
            let respresentativeName = returnData.representativeName;
            let representativeDesignation = returnData.representativeDesignation;

            let deliveryTiming = returnAddress.deliveryTiming;
            let additionalNo = returnAddress.additionalNo
            let shopDetails = returnAddress.shopDetails
            let pincode = returnAddress.pincode;
            let tag = returnAddress.tag
            let receiver = returnAddress.receiver;
            let instruction = returnAddress.instruction
            let address = returnAddress.address;
            let defaultValue = true;
            let deliveryAvailable = returnAddress.deliveryAvailable;

            return { restaurantName, restaurantType, deliveryTiming, additionalNo, shopDetails, pincode, tag, receiver, instruction, address, default: defaultValue, deliveryAvailable }
        } else {
            return false;
        }
    }
    return true;
}

export async function UpdateUser(type: string, search: string) {

    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let consumerProfile = db.collection("consumerprofiles");
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");
    let { searchParams } = new URL("http://example.com/" + search)

    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);

    let returnAddress = await consumerAddress.findOne({
        userId: objectId, default: true
    })
    let returnProfile = await consumerProfile.findOne({
        _id: objectId
    });
    let returnData = await consumerData.findOne({
        userId: objectId
    })

    if (type == "restaurant") {
        let restaurantName = (searchParams.get("restaurantName"));
        let restaurantType: string[] = (searchParams.get("restaurantType"))?.split("--") as string[];
        let representativeName = (searchParams.get("representativeName"));
        //representativeName
        let representativeDesignation = (searchParams.get("role"));
        let deliveryTiming = (searchParams.get("deliveryTiming"));
        let phoneNo = (searchParams.get("number"));

        if (returnAddress && returnProfile && returnData) {

            await consumerData.updateOne({
                userId: objectId
            }, {
                $set: {
                    restaurantName, representativeDesignation, representativeName, restaurantType: Array.from(new Set([...restaurantType, ...returnData.restaurantType]))
                }
            })

            await consumerAddress.updateOne({
                userId: objectId, default: true
            }, {
                $set: {
                    deliveryTiming
                }
            })
            await consumerProfile.updateOne({
                _id: objectId
            }, {
                $set: {
                    phoneNo: phoneNo || ""
                }
            })

        } else {
            return false
        }

    } else if (type == "modify-address") {
        let deliveryTiming = (searchParams.get("deliveryTiming"));
        let additionalNo = (searchParams.get("additionalNo"));
        let shopDetails = (searchParams.get("shopDetails"));
        let pincode = (searchParams.get("pincode"));
        let tag = (searchParams.get("tag"));
        let receiver = (searchParams.get("receiver"));
        let instruction = (searchParams.get("instruction"))?.split(",");
        let address = (searchParams.get("address"));
        let defaultValue = (searchParams.get("default"));

        if (returnAddress) {

            let returnAddress = await consumerAddress.findOne({
                tag, userId: objectId
            })

            if (!returnAddress) {
                return "tag:not-exist"
            }

            let deliveryReturn = (await (await fetch(backendURL + "/api/v1/user/" + pincode)).json()).delivery;


            await consumerAddress.updateOne({
                tag, userId: objectId
            }, {
                $set: {
                    deliveryTiming, additionalNo, shopDetails,
                    pincode, receiver, instruction, address, default: defaultValue == "true" ? true : false, deliveryAvailable: deliveryReturn
                }
            })
        } else {
            return false;
        }
    }
    return true;
}

export async function InsertData(type: string, search: string) {
    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let consumerProfile = db.collection("consumerprofiles");
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");
    let { searchParams } = new URL("http://example.com/" + search)

    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);

    let returnAddress = await consumerAddress.findOne({
        userId: objectId, default: true
    })
    let returnProfile = await consumerProfile.findOne({
        _id: objectId
    });
    let returnData = await consumerData.findOne({
        userId: objectId
    })

    if (type == "new-address") {
        // "restaurantName=" + params.get("restaurantName") + "&restaurantType=" + params.get("restaurantType") + "&deliveryTiming=" + params.get("deliveryTiming") + "&shopDetails=" + shopDetails + "&pincode=" + pincode + "&tag=" + tag + "&receiver=" + receiver + "&instruction=" + deliveryInstructions + "&address=" + addressValue + "&type=" + "return" + "&default=" + params.get("default");
        let restaurantName = (searchParams.get("restaurantName"));
        let restaurantType: string[] = (searchParams.get("restaurantType"))?.split("--") as string[];
        let respresentativeName = (searchParams.get("representativeName"));
        let representativeDesignation = (searchParams.get("role"));

        let deliveryTiming = (searchParams.get("deliveryTiming"));
        let additionalNo = (searchParams.get("additionalNo"));
        let shopDetails = (searchParams.get("shopDetails"));
        let pincode = (searchParams.get("pincode"));
        let tag = (searchParams.get("tag"));
        let receiver = (searchParams.get("receiver"));
        let instruction = (searchParams.get("instruction"))?.split(",");
        let address = (searchParams.get("address"));
        let defaultValue = false;

        // checking if the tag is not repeated
        let returnAddress = await consumerAddress.findOne({
            tag, userId: objectId
        })

        console.log(additionalNo)

        if (returnAddress) {
            return "tag:already"
        }

        //
        let pincodeReturn = (await (await fetch(backendURL + "/api/v1/user/" + pincode)).json()).delivery;

        await consumerAddress.insertOne({
            userId: objectId,
            deliveryTiming,
            additionalNo,
            shopDetails,
            pincode,
            deliveryAvailable: pincodeReturn,
            receiver,
            default: defaultValue,
            address,
            instruction,
            tag,
        })

        //creating new value


    }




    return true;
}
export async function DeleteAddress(tag: string) {
    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let consumerAddress = db.collection("consumeraddresses");


    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);

    await consumerAddress.deleteOne({
        tag, userId: objectId
    })


    return true;
}

export async function PlaceOrder(type: string, crateId: string, tag: string, instruction: string[], totalSave?: number, totalValue?: number) {

    //save and total value can't go negative
    //making sure the crateId when order is done - current to false and adding total value;

    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let consumerAddress = db.collection("consumeraddresses");
    let consumerData = db.collection("consumerdatas");

    let crate = db.collection("crates");
    let order = db.collection("orders");



    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);
    let returnAddress = await consumerAddress.findOne({
        tag, userId: objectId
    })
     let returnData = await consumerAddress.findOne({
         userId: objectId
    })
    // console.log(instruction)
    // creating a new order
    if (type == "new") {
        let currentCrate = await crate.findOne({
            customerId: objectId, current: true
        });
        if (currentCrate && returnAddress) {
             await crate.updateOne({
                _id: currentCrate._id
            }, {
                $set: {
                    current: false,
                    totalValue,
                    updatedAt:new Date()
                }
            })
            let orderId = "ORD-" + (new Date()).getFullYear()+"-" + nanoid();

            let currentTime = new Date();
            let deliveryDate: Date | null = null;
            let currentHour = currentTime.getHours();
            if (currentHour <= 23) {
                deliveryDate = addDays(currentTime, 1)
            } else {
                deliveryDate = new Date();
            }

            let orderObjectToPut = {
                userAddressId: returnAddress._id,
                "orderId": orderId,
                "userId": objectId,
                "createOrderTime": new Date(),
                "deliveryStatus": "order received",
                "orderStatus": "order placed",
                "deliveryDate": deliveryDate as Date,
                "totalValue": totalValue,
                "saving": totalSave,
                "orderList": currentCrate._id,
            }
                await consumerAddress.updateOne({
                    tag, userId:objectId, _id:returnAddress._id
                },{
                    $set : {
                        instruction  // hard code changing the instructions
                    }
                })
            let returnOrderData = await order.insertOne(orderObjectToPut)
            await consumerData.updateOne({
                userId: objectId, orderHistoryId: { $exists: true, $type: "array" }
            }, {
                $set: {
                    currentCartId: null,
                    orderHistoryId: Array.isArray(returnData?.orderHistoryId)? [...returnData.orderHistoryId, returnOrderData.insertedId ]:[returnOrderData.insertedId]
                }
            })
            return returnOrderData.insertedId.toString();

        }  
    }
    // editing the place order

    // cancel the order
 
}

export async function Crate(list: Record<string, any>) {
    // two types -- creating , existing -- if the crate id exists

    // temporary -- currently only storing 
    let db = (await client).db("cart");
    let backendURL = process.env.BACKEND_URL!;
    let crateData = db.collection("crates");
    let consumerData = db.collection("consumerdatas");


    let session = await auth();
    let userId = session?.user?.id;
    let objectId = new ObjectId(userId as string);

    //beware of clients side -- making logic in the frontend itself;

    let returnCrate = await crateData.findOne({
        customerId: objectId, current: true
    })

    // console.log(returnCrate, list)

    // filter the data --> items an array object --> itemId, quant, skip, id(optional)

    //data to add list
    if (!returnCrate) {
        // creating a new one 
        let objectTopPut = {
            customerId: objectId,
            current: true,
            items: list,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        let returnNewCrate = await crateData.insertOne(objectTopPut);
        await consumerData.updateOne({
            userId:objectId
        },{
            $set: {
                currentCartId:returnNewCrate.insertedId
            }
        })

        //returning the id
        return returnNewCrate.insertedId?.toString();
    } else {
        // already the current exist so simply updating the current one
        let objectToUpdate = {
            items: list,
            updatedAt: new Date()
        }
        await crateData.updateOne({
            current: true, customerId: objectId, _id: returnCrate._id
        }, { $set: objectToUpdate });
        //return the id

        return returnCrate?._id.toString();
    }
}