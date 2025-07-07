import { crateItemInterface } from "./definitions"
import { unit } from "./placeholder-data"

// mongoDB - id
export interface user {
  _id: string,
  orderHistory: string[], //time being string array - other wise in production require to have id of the orders related to the user
  preorderCard: string[], //id - preorder card model / collection
  address: UserAddress[],
  categoryPrice: string,//pricing as per the pincode
  cartValue: string, //id of the current cart in the database belonging to the user.
  profile: {
    //username: string, // not required phone no is enough
    phoneNo: string,
    createdAt: string,
    representative?: "representative" | string, // referencing from the profile
    representativeDesignation?: "owner" | "manager" | "staff",// referencing from the profile
    restaurantName?: string,// referencing from the profile
    restaurantType?: string[],// referencing from the profile
    deliveryTiming?: string,// referencing from the profile
    additionalNo?: string;// referencing from the profile
  }

}
//just getting the user name -- later update in the profile setting or via admin application

export interface UserAddress {
  representative?: string, // referencing from the profile
  representativeDesignation?: string,// referencing from the profile
  restaurantName: string,// referencing from the profile
  restaurantType: string[],// referencing from the profile
  deliveryTiming: string,// referencing from the profile
  shopDetails: string,
  address: string,
  receiver: "staff" | "manager",
  default: boolean,
  instruction: string[], //getting updated on each orders 
  pincode: string,
  tag: string,
  additionalNo?: string;// referencing from the profile
}

export const userAll: user[] = [
  {
    _id: "djdc12321-duqweam",
    //registration details -- in case of multiple  
    address: [{
      restaurantName: "Ijwifoods",
      restaurantType: ["Chinese and Italian"],
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
      restaurantType: ["Chinese and Italian"],
      deliveryTiming: "10-11",
      //above will remain the same - of the default until we allow multiple restaurant
      shopDetails: "shop 12",
      address: "shop 12, Nihal Vihar",
      receiver: "manager",
      default: false,
      instruction: ["delivery should be on time always", "must hand over to staff", "must call before delivery"],
      pincode: "110041",
      tag: "address 2"
    }, {
      restaurantName: "Ijwifoods",
      restaurantType: ["chinese and italian", "indian"],
      deliveryTiming: "10-11",
      //above will remain the same - of the default until we allow multiple restaurant
      shopDetails: "house no 572, first floor",
      address: "shop 12,A-6 paschim Vihar, khadak singh da dhaba",
      receiver: "manager",
      default: false,
      instruction: ["delivery should be on time always", "must hand over to staff", "send me the picture of delivered goods"],
      pincode: "110041",
      tag: "home"
    }],
    orderHistory: [],
    preorderCard: [],
    categoryPrice: "",
    cartValue: "",
    profile: {
      // username: "",
      phoneNo: "",
      createdAt: Date.now().toString(),
      representative: "representative", // referencing from the profile
      representativeDesignation: "owner",// referencing from the profile
      restaurantName: "ijwifoods",// referencing from the profile
      restaurantType: ["chinese", "italian"],// referencing from the profile
      deliveryTiming: "13-15",// referencing from the profile
      additionalNo: "",// referencing from the profile
    }
  }
]
export enum deliveryState {
  orderReceived = "Order Received",
  orderInTransit = "Order in transit",
  OrderDelivered = "Order Delivered",
  // triggering the order complete automatically after the 2 hours of delivery.
}
export enum OrderState {
  orderEdit = "Modified Order", //current only
  cancelOrder = "Cancel Order",
  orderPlace = "Order Placed", // current only
  orderComplete = "Order Complete"
}

export interface OrderCollection {
  deliveryTiming?: string,
  _id: string, //Schema.Types.ObjectId
  userId: string, //user id - ObjectId -- 
  addressId: string, //address tag name
  orderId: string, //unique --  8 first value of _id
  createdOrder: string,
  deliveryStatus: deliveryState,
  orderStatus: OrderState,
  deliveryDate: string,
  totalValue: string, //total mrp
  saving: string,
  orderList: crateItemInterface, //otherwise storing the value
  orderCreationTiming?: number // Date.now() - string format for sorting in case of the mongodb does not do based on the adding


}

//storing the orderList separate as well

//General idea only to keep data in the document as primitive as soon as the data-structure requires using the another table for it

//saving: string, restaurantName: string, address: string, createdOrder: string, orderTiming: string, deliveryDate: string, instruction: string[], fetch: boolean }>({ saving: "200", restaurantName: "Khadak singh da dhaba", address: "Shop No. 11, DDA Market, near INDRAPRASTHA WORLD SCHOOL A 2 Block, Paschim Vihar Delhi, 110063", createdOrder: "June 26, 2025 @ 10:02 pm", orderTiming: "10 am - 11 am", deliveryDate: "June 26, 2025", instruction: ["must call before delivery", "delivery on time"], 

export const orderAll: OrderCollection[] = [ //representing the orders and will have the 
  {
    _id: "a32b32fds0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 11,
    addressId: "address 1", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fd",
    createdOrder: "28 June 2025, @ 10:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.orderPlace, // if cancel or delivery then making prev orders
    deliveryDate: "29 June 2025",
    saving: "230",
    totalValue: "1078",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.pkt,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    },
    {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2.5,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"
    }
    ]
  },

  {
    _id: "a32b32fas0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 10,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fa",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.OrderDelivered,
    orderStatus: OrderState.orderComplete, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Toned Milk",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 60,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/toned_milk",
      "imageURL": "/categories-item/dairy/tone_milk.png"
    },
    {
      "itemname": "Amul Butter",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pkt,
      "discountPrice": 500,
      "mrp": 5500,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/amul_butter",
      "imageURL": "/categories-item/dairy/amul_butter.png"
    },
    {
      "itemname": "Paneer",
      "quant": 0.5,
      "category": "dairy",
      "unit": unit.kg,
      "discountPrice": 220,
      "mrp": 240,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/paneer",
      "imageURL": "/categories-item/dairy/paneer2.png"
    },
    {
      "itemname": "Curd",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/curd",
      "imageURL": "/categories-item/dairy/curd.png"
    },
    {
      "itemname": "Cheese Slices",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pcs,
      "discountPrice": 1000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/cheese_slice",
      "imageURL": "/categories-item/dairy/cheese_slice.png"
    },
    {
      "itemname": "Turmeric Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "200",
      "buttonURL": "/item/turmeric",
      "imageURL": "/categories-item/masala/turmeric_powder.png"
    }, {
      "itemname": "Red Chili Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.kg,
      "discountPrice": 100,
      "mrp": 500,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/chili_powder",
      "imageURL": "/categories-item/masala/chilli_powder.png"
    }, {
      "itemname": "Coriander Powder",
      "quant": 5,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 250,
      "mrp": 450,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/coriander_powder",
      "imageURL": "/categories-item/masala/coriander_powder.png"
    }, {
      "itemname": "Black Pepper",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 1000,
      "mrp": 9000,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/black_pepper",
      "imageURL": "/categories-item/masala/black-pepper.png"
    }, {
      "itemname": "Iodized Salt",
      "quant": 2,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 200,
      "mrp": 400,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/iodized_salt",
      "imageURL": "/categories-item/masala/iodized_salt.png"
    }
    ]
  },

  {
    _id: "a32b32fbs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 9,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fb",
    createdOrder: "23 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.cancelOrder, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "1330",
    totalValue: "3579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Ketchup Bottle",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.kg,
      "discountPrice": 110,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ketchup",
      "imageURL": "/categories-item/confectionary-sauces/ketchup.png"
    }, {
      "itemname": "Chocolate Bar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pc,
      "discountPrice": 50,
      "mrp": 5000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/chocolate_bar",
      "imageURL": "/categories-item/confectionary-sauces/chocolate_bar.png"
    }, {
      "itemname": "Mayonnaise",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 100,
      "mrp": 900,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/mayo",
      "imageURL": "/categories-item/confectionary-sauces/mayo.png"
    }, {
      "itemname": "Jam Jar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 30,
      "mrp": 130,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/jam",
      "imageURL": "/categories-item/confectionary-sauces/jam.png"
    }, {
      "itemname": "Chewing Gum Pack",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pcs,
      "discountPrice": 20,
      "mrp": 40,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/chewing_gum",
      "imageURL": "/categories-item/confectionary-sauces/chewing_gum.png"
    }, {
      "itemname": "Tomato",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 18,
      "mrp": 30,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tomato",
      "imageURL": "/categories-item/vegetable/tomato.png"
    }, {
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    }, {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"

    }]

  },

  {
    _id: "a32b32fcs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 8,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fc",
    createdOrder: "22 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.OrderDelivered,
    orderStatus: OrderState.orderComplete, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Toned Milk",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 60,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/toned_milk",
      "imageURL": "/categories-item/dairy/tone_milk.png"
    },
    {
      "itemname": "Amul Butter",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pkt,
      "discountPrice": 500,
      "mrp": 5500,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/amul_butter",
      "imageURL": "/categories-item/dairy/amul_butter.png"
    },
    {
      "itemname": "Paneer",
      "quant": 2,
      "category": "dairy",
      "unit": unit.gm,
      "discountPrice": 2000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "250",
      "buttonURL": "/item/paneer",
      "imageURL": "/categories-item/dairy/paneer2.png"
    },
    {
      "itemname": "Curd",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/curd",
      "imageURL": "/categories-item/dairy/curd.png"
    },
    {
      "itemname": "Cheese Slices",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pcs,
      "discountPrice": 1000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/cheese_slice",
      "imageURL": "/categories-item/dairy/cheese_slice.png"
    },
    {
      "itemname": "Turmeric Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "200",
      "buttonURL": "/item/turmeric",
      "imageURL": "/categories-item/masala/turmeric_powder.png"
    }, {
      "itemname": "Red Chili Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.kg,
      "discountPrice": 100,
      "mrp": 500,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/chili_powder",
      "imageURL": "/categories-item/masala/chilli_powder.png"
    }, {
      "itemname": "Coriander Powder",
      "quant": 5,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 250,
      "mrp": 450,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/coriander_powder",
      "imageURL": "/categories-item/masala/coriander_powder.png"
    }, {
      "itemname": "Black Pepper",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 1000,
      "mrp": 9000,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/black_pepper",
      "imageURL": "/categories-item/masala/black-pepper.png"
    }, {
      "itemname": "Iodized Salt",
      "quant": 2,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 200,
      "mrp": 400,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/iodized_salt",
      "imageURL": "/categories-item/masala/iodized_salt.png"
    }
    ]
  },

  {
    _id: "a32b32fes0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 7,
    addressId: "home", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fe",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.cancelOrder, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Ketchup Bottle",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.kg,
      "discountPrice": 110,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ketchup",
      "imageURL": "/categories-item/confectionary-sauces/ketchup.png"
    }, {
      "itemname": "Chocolate Bar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pc,
      "discountPrice": 50,
      "mrp": 5000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/chocolate_bar",
      "imageURL": "/categories-item/confectionary-sauces/chocolate_bar.png"
    }, {
      "itemname": "Mayonnaise",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 100,
      "mrp": 900,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/mayo",
      "imageURL": "/categories-item/confectionary-sauces/mayo.png"
    }, {
      "itemname": "Jam Jar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 30,
      "mrp": 130,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/jam",
      "imageURL": "/categories-item/confectionary-sauces/jam.png"
    }, {
      "itemname": "Chewing Gum Pack",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pcs,
      "discountPrice": 20,
      "mrp": 40,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/chewing_gum",
      "imageURL": "/categories-item/confectionary-sauces/chewing_gum.png"
    }, {
      "itemname": "Tomato",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 18,
      "mrp": 30,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tomato",
      "imageURL": "/categories-item/vegetable/tomato.png"
    }, {
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    }, {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"

    }]

  }

  ,
  {
    _id: "a32b32ffs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 8,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32ff",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.OrderDelivered,
    orderStatus: OrderState.orderComplete, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Toned Milk",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 60,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/toned_milk",
      "imageURL": "/categories-item/dairy/tone_milk.png"
    },
    {
      "itemname": "Amul Butter",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pkt,
      "discountPrice": 500,
      "mrp": 5500,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/amul_butter",
      "imageURL": "/categories-item/dairy/amul_butter.png"
    },
    {
      "itemname": "Paneer",
      "quant": 2,
      "category": "dairy",
      "unit": unit.gm,
      "discountPrice": 2000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "250",
      "buttonURL": "/item/paneer",
      "imageURL": "/categories-item/dairy/paneer2.png"
    },
    {
      "itemname": "Curd",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/curd",
      "imageURL": "/categories-item/dairy/curd.png"
    },
    {
      "itemname": "Cheese Slices",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pcs,
      "discountPrice": 1000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/cheese_slice",
      "imageURL": "/categories-item/dairy/cheese_slice.png"
    },
    {
      "itemname": "Turmeric Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "200",
      "buttonURL": "/item/turmeric",
      "imageURL": "/categories-item/masala/turmeric_powder.png"
    }, {
      "itemname": "Red Chili Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.kg,
      "discountPrice": 100,
      "mrp": 500,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/chili_powder",
      "imageURL": "/categories-item/masala/chilli_powder.png"
    }, {
      "itemname": "Coriander Powder",
      "quant": 5,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 250,
      "mrp": 450,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/coriander_powder",
      "imageURL": "/categories-item/masala/coriander_powder.png"
    }, {
      "itemname": "Black Pepper",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 1000,
      "mrp": 9000,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/black_pepper",
      "imageURL": "/categories-item/masala/black-pepper.png"
    }, {
      "itemname": "Iodized Salt",
      "quant": 2,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 200,
      "mrp": 400,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/iodized_salt",
      "imageURL": "/categories-item/masala/iodized_salt.png"
    }
    ]
  },

  {
    _id: "a32b32fgs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 5,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fg",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.cancelOrder, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Ketchup Bottle",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.kg,
      "discountPrice": 110,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ketchup",
      "imageURL": "/categories-item/confectionary-sauces/ketchup.png"
    }, {
      "itemname": "Chocolate Bar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pc,
      "discountPrice": 50,
      "mrp": 5000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/chocolate_bar",
      "imageURL": "/categories-item/confectionary-sauces/chocolate_bar.png"
    }, {
      "itemname": "Mayonnaise",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 100,
      "mrp": 900,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/mayo",
      "imageURL": "/categories-item/confectionary-sauces/mayo.png"
    }, {
      "itemname": "Jam Jar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 30,
      "mrp": 130,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/jam",
      "imageURL": "/categories-item/confectionary-sauces/jam.png"
    }, {
      "itemname": "Chewing Gum Pack",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pcs,
      "discountPrice": 20,
      "mrp": 40,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/chewing_gum",
      "imageURL": "/categories-item/confectionary-sauces/chewing_gum.png"
    }, {
      "itemname": "Tomato",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 18,
      "mrp": 30,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tomato",
      "imageURL": "/categories-item/vegetable/tomato.png"
    }, {
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    }, {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"

    }]

  }
  ,
  {
    _id: "a32b32fgs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 4,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fg",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.OrderDelivered,
    orderStatus: OrderState.orderComplete, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Toned Milk",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 60,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/toned_milk",
      "imageURL": "/categories-item/dairy/tone_milk.png"
    },
    {
      "itemname": "Amul Butter",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pkt,
      "discountPrice": 500,
      "mrp": 5500,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/amul_butter",
      "imageURL": "/categories-item/dairy/amul_butter.png"
    },
    {
      "itemname": "Paneer",
      "quant": 2,
      "category": "dairy",
      "unit": unit.gm,
      "discountPrice": 2000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "250",
      "buttonURL": "/item/paneer",
      "imageURL": "/categories-item/dairy/paneer2.png"
    },
    {
      "itemname": "Curd",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/curd",
      "imageURL": "/categories-item/dairy/curd.png"
    },
    {
      "itemname": "Cheese Slices",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pcs,
      "discountPrice": 1000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/cheese_slice",
      "imageURL": "/categories-item/dairy/cheese_slice.png"
    },
    {
      "itemname": "Turmeric Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "200",
      "buttonURL": "/item/turmeric",
      "imageURL": "/categories-item/masala/turmeric_powder.png"
    }, {
      "itemname": "Red Chili Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.kg,
      "discountPrice": 100,
      "mrp": 500,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/chili_powder",
      "imageURL": "/categories-item/masala/chilli_powder.png"
    }, {
      "itemname": "Coriander Powder",
      "quant": 5,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 250,
      "mrp": 450,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/coriander_powder",
      "imageURL": "/categories-item/masala/coriander_powder.png"
    }, {
      "itemname": "Black Pepper",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 1000,
      "mrp": 9000,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/black_pepper",
      "imageURL": "/categories-item/masala/black-pepper.png"
    }, {
      "itemname": "Iodized Salt",
      "quant": 2,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 200,
      "mrp": 400,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/iodized_salt",
      "imageURL": "/categories-item/masala/iodized_salt.png"
    }
    ]
  },

  {
    _id: "a32b32fhs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 3,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fh",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.cancelOrder, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Ketchup Bottle",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.kg,
      "discountPrice": 110,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ketchup",
      "imageURL": "/categories-item/confectionary-sauces/ketchup.png"
    }, {
      "itemname": "Chocolate Bar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pc,
      "discountPrice": 50,
      "mrp": 5000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/chocolate_bar",
      "imageURL": "/categories-item/confectionary-sauces/chocolate_bar.png"
    }, {
      "itemname": "Mayonnaise",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 100,
      "mrp": 900,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/mayo",
      "imageURL": "/categories-item/confectionary-sauces/mayo.png"
    }, {
      "itemname": "Jam Jar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 30,
      "mrp": 130,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/jam",
      "imageURL": "/categories-item/confectionary-sauces/jam.png"
    }, {
      "itemname": "Chewing Gum Pack",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pcs,
      "discountPrice": 20,
      "mrp": 40,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/chewing_gum",
      "imageURL": "/categories-item/confectionary-sauces/chewing_gum.png"
    }, {
      "itemname": "Tomato",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 18,
      "mrp": 30,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tomato",
      "imageURL": "/categories-item/vegetable/tomato.png"
    }, {
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    }, {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"

    }]

  }
  ,
  {
    _id: "a32b32fis0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 2,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fi",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.OrderDelivered,
    orderStatus: OrderState.orderComplete, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Toned Milk",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 60,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/toned_milk",
      "imageURL": "/categories-item/dairy/tone_milk.png"
    },
    {
      "itemname": "Amul Butter",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pkt,
      "discountPrice": 500,
      "mrp": 5500,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/amul_butter",
      "imageURL": "/categories-item/dairy/amul_butter.png"
    },
    {
      "itemname": "Paneer",
      "quant": 2,
      "category": "dairy",
      "unit": unit.gm,
      "discountPrice": 2000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "250",
      "buttonURL": "/item/paneer",
      "imageURL": "/categories-item/dairy/paneer2.png"
    },
    {
      "itemname": "Curd",
      "quant": 2,
      "category": "dairy",
      "unit": unit.ltr,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/curd",
      "imageURL": "/categories-item/dairy/curd.png"
    },
    {
      "itemname": "Cheese Slices",
      "quant": 2,
      "category": "dairy",
      "unit": unit.pcs,
      "discountPrice": 1000,
      "mrp": 12000,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/cheese_slice",
      "imageURL": "/categories-item/dairy/cheese_slice.png"
    },
    {
      "itemname": "Turmeric Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 500,
      "mrp": 4000,
      "skip": false,
      "primarySize": "200",
      "buttonURL": "/item/turmeric",
      "imageURL": "/categories-item/masala/turmeric_powder.png"
    }, {
      "itemname": "Red Chili Powder",
      "quant": 2,
      "category": "masala",
      "unit": unit.kg,
      "discountPrice": 100,
      "mrp": 500,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/chili_powder",
      "imageURL": "/categories-item/masala/chilli_powder.png"
    }, {
      "itemname": "Coriander Powder",
      "quant": 5,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 250,
      "mrp": 450,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/coriander_powder",
      "imageURL": "/categories-item/masala/coriander_powder.png"
    }, {
      "itemname": "Black Pepper",
      "quant": 2,
      "category": "masala",
      "unit": unit.gm,
      "discountPrice": 1000,
      "mrp": 9000,
      "skip": false,
      "primarySize": "100",
      "buttonURL": "/item/black_pepper",
      "imageURL": "/categories-item/masala/black-pepper.png"
    }, {
      "itemname": "Iodized Salt",
      "quant": 2,
      "category": "masala",
      "unit": unit.pkt,
      "discountPrice": 200,
      "mrp": 400,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/iodized_salt",
      "imageURL": "/categories-item/masala/iodized_salt.png"
    }
    ]
  },

  {
    _id: "a32b32fjs0snf,ma398dm3s038jslvmas12e803",
    userId: "djdc12321-duqweam", orderCreationTiming: 1,
    addressId: "address 2", // finding the address with the tag name -- then
    // getting the restaurantName, instructions, address, pincode, deliveryTiming
    orderId: "a32b32fj",
    createdOrder: "24 June 2025, @ 9:04 pm",
    deliveryStatus: deliveryState.orderReceived,
    orderStatus: OrderState.cancelOrder, // if cancel or delivery then making prev orders
    deliveryDate: "25 June 2025",
    saving: "330",
    totalValue: "1579",
    // now the mrp and discountPrice is written for the frontend test
    //making sure using the latest data for the reorder value
    //TODO
    orderList: [{
      "itemname": "Ketchup Bottle",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.kg,
      "discountPrice": 110,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ketchup",
      "imageURL": "/categories-item/confectionary-sauces/ketchup.png"
    }, {
      "itemname": "Chocolate Bar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pc,
      "discountPrice": 50,
      "mrp": 5000,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/chocolate_bar",
      "imageURL": "/categories-item/confectionary-sauces/chocolate_bar.png"
    }, {
      "itemname": "Mayonnaise",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 100,
      "mrp": 900,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/mayo",
      "imageURL": "/categories-item/confectionary-sauces/mayo.png"
    }, {
      "itemname": "Jam Jar",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.gm,
      "discountPrice": 30,
      "mrp": 130,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/jam",
      "imageURL": "/categories-item/confectionary-sauces/jam.png"
    }, {
      "itemname": "Chewing Gum Pack",
      "quant": 2,
      "category": "confectionary_sauces",
      "unit": unit.pcs,
      "discountPrice": 20,
      "mrp": 40,
      "skip": false,
      "primarySize": "10",
      "buttonURL": "/item/chewing_gum",
      "imageURL": "/categories-item/confectionary-sauces/chewing_gum.png"
    }, {
      "itemname": "Tomato",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 18,
      "mrp": 30,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tomato",
      "imageURL": "/categories-item/vegetable/tomato.png"
    }, {
      "itemname": "Button Mushroom",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 42,
      "mrp": 60,
      "skip": false,
      "primarySize": "0.5",
      "buttonURL": "/item/button_mushroom",
      "imageURL": "/categories-item/vegetable/button_mushroom.png"
    }, {
      "itemname": "purple cabbage",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/purple_cabbage",
      "imageURL": "/categories-item/vegetable/purple_cabbage.png"
    }, {
      "itemname": "ginger",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/ginger",
      "imageURL": "/categories-item/vegetable/ginger.png"
    }, {
      "itemname": "English Cucumber",
      "quant": 2,
      "category": "vegetable",
      "unit": unit.kg,
      "discountPrice": 9,
      "mrp": 20,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/english_cucumber",
      "imageURL": "/categories-item/vegetable/english_cucumber.png"
    }, {
      "itemname": "Basmati Rice",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 10,
      "mrp": 44,
      "skip": false,
      "primarySize": "2.5",
      "buttonURL": "/item/basmati_rice",
      "imageURL": "/categories-item/ration-oil/basmati_rice.png"
    }, {
      "itemname": "Tur Dal",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 140,
      "mrp": 150,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/tur_dal",
      "imageURL": "/categories-item/ration-oil/tur_dal.png"
    }, {
      "itemname": "Sunflower Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 157,
      "mrp": 160,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sunflower_oil",
      "imageURL": "/categories-item/ration-oil/sunflower_oil.png"
    }, {
      "itemname": "Sugar",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.kg,
      "discountPrice": 46,
      "mrp": 60,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/sugar",
      "imageURL": "/categories-item/ration-oil/sugar.png"
    }, {
      "itemname": "Vibhor Soyabean Oil",
      "quant": 2,
      "category": "ration_pulses_oil",
      "unit": unit.ltr,
      "discountPrice": 114,
      "mrp": 120,
      "skip": false,
      "primarySize": "1",
      "buttonURL": "/item/vibhor_soyabean_oil",
      "imageURL": "/categories-item/ration-oil/vibhor.png"

    }]

  }

]


//on repeat i should make the instruction and address repeat as well not the value.