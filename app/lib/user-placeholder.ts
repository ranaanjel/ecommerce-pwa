// mongoDB - id
interface user {
    _id: string,
    orderHistory: string[], //time being string array - other wise in production require to have id of the orders related to the user
    preorderCard: string[], //id - preorder card model / collection
    address: UserAddress[],
    categoryPrice: string,//pricing as per the pincode
    cartValue: string, //id of the current cart in the database belonging to the user.
    profile: {
        username: string,
        phoneNo: string,
        createdAt: string,
    }

}
export interface UserAddress {
    restaurantName: string,
    restaurantType: string,
    deliveryTiming: string,
    shopDetails: string,
    address: string,
    receiver: "staff" | "manager",
    default: boolean,
    instruction: string[], //getting updated on each orders 
    pincode: string,
    tag: string
}

export const userAll: user[] = [
    {
        _id: "djdc12321-duqweam",
        //registration details -- in case of multiple  
        address: [{
            restaurantName: "Ijwifoods",
            restaurantType: "Chinese and Italian",
            deliveryTiming: "10-11",
            shopDetails: "shop 5",
            address: "shop 5, bhooto vali gali, near surya public school",
            receiver: "staff",
            default: true,
            instruction: ["delivery should be on time always", "must call before delivery"],
            pincode: "110041",
            tag: "address 1"
        }, {
            restaurantName: "Ijwifoods",
            restaurantType: "Chinese and Italian",
            deliveryTiming: "10-11",
            //above will remain the same - of the default until we allow multiple restaurant
            shopDetails: "shop 12",
            address: "shop 12, Nihal Vihar",
            receiver: "manager",
            default: false,
            instruction: ["delivery should be on time always","must hand over to staff", "must call before delivery"],
            pincode: "110041",
            tag: "address 2"
        },{
            restaurantName: "Ijwifoods",
            restaurantType: "Chinese and Italian",
            deliveryTiming: "10-11",
            //above will remain the same - of the default until we allow multiple restaurant
            shopDetails: "house no 572, first floor",
            address: "shop 12,A-6 paschim Vihar, khadak singh da dhaba",
            receiver: "manager",
            default: false,
            instruction: ["delivery should be on time always","must hand over to staff", "send me the picture of delivered goods"], 
            pincode: "110041",
            tag: "home"
        }],
        orderHistory: [],
        preorderCard: [],
        categoryPrice: "",
        cartValue: "",
        profile: {
            username: "",
            phoneNo: "",
            createdAt: Date.now().toString(),
        }
    }
]
