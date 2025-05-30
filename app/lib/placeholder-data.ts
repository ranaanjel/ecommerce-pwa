
// fetching data from database of it can remain permanent here - is not required to be that dynamic.
//getting all the data from the database -- here for the frontend checking



export const banner = [
    {
        title: "Need fresh veggies ?",
        text: "all king of veggies!! \n every essential.",
        buttonURL: "/category/vegetables",
        imageURL: "/banner/vegetable.png",
        gradientColor: "bg-linear-to-r from-[#86cb50] via-[#a4db76] via-70% to-[#cdf80d] to-90%"
    },
    {
        title: "dairy products",
        text: "milk, curd, cheese, cream &\n professional products",
        buttonURL: "/category/dairy",
        imageURL: "/banner/dairy.png",
        gradientColor: "bg-linear-to-r from-[#ffbb8a]  to-[#ffff17]"

    }, {
        title: "restock masala !",
        text: "cardamom, black pepper, peri peri & piri",
        buttonURL: "/category/masala",
        imageURL: "/banner/masala.png",
        gradientColor: "bg-linear-to-r from-[#ffbb00] to-[#ff6511]"

    }, {
        title: "get ration and oil",
        text: "maida, sugar, oil, ghee, atta & rice with\nconfectionary items",
        buttonURL: "/category/ration-oil",
        imageURL: "/banner/ration-oil.png",
        gradientColor: "bg-linear-to-r from-[#17e4f6] to-[#4033ff]"

    },
]


//fetching this data from the database
export interface PreorderItem {
    itemName: string;
    mrp: string;
    discountPrice: number;
    quantity: number;
    unit: string;
    totalPrice: number;
    totalDiscountPrice: number;
    imageURL: string;
}

export interface Preorder {
    title: string;
    description: string;
    imageURL: string;
    buttonURL: string;
    list: PreorderItem[];
    bgTitle: string,
    bgBody: string

}

//naming the card with title 
//default description in the creation as well

export const preorderList: Preorder[] = [
    {
        title: "Daily Order",
        description: "getting your regular",
        imageURL: "/preorder-list/daily_order.png",
        buttonURL: "/dashboard/preorder-list/daily_order",
        list: [{
            itemName: "Cabbage (Loose)",
            mrp: "30",
            discountPrice: 25,
            quantity: 10,
            unit: "kg",
            totalPrice: 300,
            totalDiscountPrice: 250,
            imageURL: "/categories-item/vegetable/cabbage.png"
        },
        {
            itemName: "Paneer (Low Fat)",
            mrp: "250",
            discountPrice: 230,
            quantity: 1,
            unit: "kg",
            totalPrice: 250,
            totalDiscountPrice: 230,
            imageURL: "/categories-item/dairy/paneer.png"
        },
        {
            itemName: "Amul Cream Milk",
            mrp: "60",
            discountPrice: 55,
            quantity: 1,
            unit: "litre",
            totalPrice: 60,
            totalDiscountPrice: 55,
            imageURL: "/categories-item/dairy/cream-milk.png"
        },
        {
            itemName: "Green Capsicum",
            mrp: "80",
            discountPrice: 70,
            quantity: 1,
            unit: "kg",
            totalPrice: 80,
            totalDiscountPrice: 70,
            imageURL: "/categories-item/vegetable/green-capsicum.png"
        },
        {
            itemName: "Black Pepper",
            mrp: "900",
            discountPrice: 840,
            quantity: 0.25,
            unit: "kg",
            totalPrice: 225,
            totalDiscountPrice: 210,
            imageURL: "/categories-item/masala/black-pepper.png"
        },
        {
            itemName: "Dry Whole Red Chilli",
            mrp: "150",
            discountPrice: 140,
            quantity: 1,
            unit: "kg",
            totalPrice: 150,
            totalDiscountPrice: 140,
            imageURL: "/categories-item/masala/sabut-chilli.png"
        }],
        bgTitle: "bg-[#38b6ff]",
        bgBody: "bg-[#ebf6ff]"
    },
    {
        title: "Last Day Order",
        description: "your previous day order",
        imageURL: "/preorder-list/last_day_order.png",
        buttonURL: "/dashboard/preorder-list/last_day_order",
        list: [{
            itemName: "Amul Cream Milk",
            mrp: "60",
            discountPrice: 55,
            quantity: 1,
            unit: "litre",
            totalPrice: 60,
            totalDiscountPrice: 55,
            imageURL: "/categories-item/dairy/cream-milk.png"
        },
        {
            itemName: "Green Capsicum",
            mrp: "80",
            discountPrice: 70,
            quantity: 1,
            unit: "kg",
            totalPrice: 80,
            totalDiscountPrice: 70,
            imageURL: "/categories-item/vegetable/green-capsicum.png"
        },
        {
            itemName: "Black Pepper",
            mrp: "900",
            discountPrice: 840,
            quantity: 0.25,
            unit: "kg",
            totalPrice: 225,
            totalDiscountPrice: 210,
            imageURL: "/categories-item/masala/black-pepper.png"
        },
        {
            itemName: "Dry Whole Red Chilli",
            mrp: "150",
            discountPrice: 140,
            quantity: 1,
            unit: "kg",
            totalPrice: 150,
            totalDiscountPrice: 140,
            imageURL: "/categories-item/masala/red-chilli.png"
        }, {
            itemName: "Amul Cream Milk",
            mrp: "60",
            discountPrice: 55,
            quantity: 1,
            unit: "litre",
            totalPrice: 60,
            totalDiscountPrice: 55,
            imageURL: "/categories-item/dairy/cream-milk.png"
        },
        {
            itemName: "Green Capsicum",
            mrp: "80",
            discountPrice: 70,
            quantity: 1,
            unit: "kg",
            totalPrice: 80,
            totalDiscountPrice: 70,
            imageURL: "/categories-item/vegetable/green-capsicum.png"
        },
        {
            itemName: "Black Pepper",
            mrp: "900",
            discountPrice: 840,
            quantity: 0.25,
            unit: "kg",
            totalPrice: 225,
            totalDiscountPrice: 210,
            imageURL: "/categories-item/masala/black-pepper.png"
        },
        {
            itemName: "Dry Whole Red Chilli",
            mrp: "150",
            discountPrice: 140,
            quantity: 1,
            unit: "kg",
            totalPrice: 150,
            totalDiscountPrice: 140,
            imageURL: "/categories-item/masala/red-chilli.png"
        }],
        bgTitle: "bg-[#85c178]",
        bgBody: "bg-[#f3f9f1]"
    },
    {
        title: "Create one",
        description: "create a new one",
        imageURL: "/preorder-list/create_one.png",
        buttonURL: "/dashboard/preorder-list/create_one",
        list: [],
        bgTitle: "bg-[#5cb3cc]",
        bgBody: "bg-[#ffffff]"
    },
    {
        title: "Festival Time",
        description: "2x your supply in high demand",
        imageURL: "/preorder-list/festival_time.png",
        buttonURL: "/dashboard/preorder-list/festival_time",
        list: [{
            itemName: "Black Pepper",
            mrp: "900",
            discountPrice: 840,
            quantity: 0.25,
            unit: "kg",
            totalPrice: 225,
            totalDiscountPrice: 210,
            imageURL: "/categories-item/masala/black-pepper.png"
        },
        {
            itemName: "Dry Whole Red Chilli",
            mrp: "150",
            discountPrice: 140,
            quantity: 1,
            unit: "kg",
            totalPrice: 150,
            totalDiscountPrice: 140,
            imageURL: "/categories-item/masala/sabut-chilli.png"
        }, {
            itemName: "Amul Cream Milk",
            mrp: "60",
            discountPrice: 55,
            quantity: 1,
            unit: "litre",
            totalPrice: 60,
            totalDiscountPrice: 55,
            imageURL: "/categories-item/dairy/cream-milk.png"
        },
        {
            itemName: "Green Capsicum",
            mrp: "80",
            discountPrice: 70,
            quantity: 1,
            unit: "kg",
            totalPrice: 80,
            totalDiscountPrice: 70,
            imageURL: "/categories-item/vegetable/green-capsicum.png"
        },
        {
            itemName: "Black Pepper",
            mrp: "900",
            discountPrice: 840,
            quantity: 0.25,
            unit: "kg",
            totalPrice: 225,
            totalDiscountPrice: 210,
            imageURL: "/categories-item/masala/black-pepper.png"
        },
        {
            itemName: "Dry Whole Red Chilli",
            mrp: "150",
            discountPrice: 140,
            quantity: 1,
            unit: "kg",
            totalPrice: 150,
            totalDiscountPrice: 140,
            imageURL: "/categories-item/masala/red-chilli.png"
        }],
        bgTitle: "bg-[#efc282]",
        bgBody: "bg-[#fdf9f2]"
    }
];


export const categoryList = [
    {
        name: "vegetables",
        imageURL: "/categories/vegetables.png",
        buttonURL: "/category/vegetable"
    },
    {
        name: "ration, pulses & oil",
        imageURL: "/categories/ration_pulses_oil.png",
        buttonURL: "/category/ration_pulses_oil"
    }, {
        name: "dairy product",
        imageURL: "/categories/dairy.png",
        buttonURL: "/category/dairy"
    }, {
        name: "packaging materials",
        imageURL: "/categories/packaging_materials.png",
        buttonURL: "/category/packageing_materials"
    },
    {
        name: "masala & salt",
        imageURL: "/categories/masala_salt.png",
        buttonURL: "/category/masala_salt"
    },
    {
        name: "rice & flours",
        imageURL: "/categories/rice_flours.png",
        buttonURL: "/category/rice_flours"
    },

    {
        name: "cleaning & consumables",
        imageURL: "/categories/cleaning_consumables.png",
        buttonURL: "/category/cleaning_consumables"
    },
    {
        name: "confectionary & sauces",
        imageURL: "/categories/confectionary_sauces.png",
        buttonURL: "/category/confectionary_sauces"
    }
]
export enum unit {
    gm = "gm",
    kg = "kg",
    pkt = "pkt",
    pc = "pc",
    pcs = "pcs",
    pkts="pkts",
    bag = "bag",
    bags = "bags",
    ltr = "ltr",
    ltrs= "ltrs",
    carton = "carton",
    no = "no",
    none = ""
    
}
export interface Itemlist {
    name:string,
    imageURL:string,
    buttonURL:string,
    quantity:number,
    primarySize:number,
    secondarySize:number,
    mrp:number,
    discountValue:number,
    savingAmount:number,
    offers:Offer[]
    unit:unit,
    secondaryUnit:unit,
    brand:string,
    conversionRate?:number,
    category?:string
}
interface Offer {
    price : number,
    quantity: number|string,
    unit : unit,
    type?: "loose" | "bag" | "carton",
}
export interface CategoryItemInformation {
    name:string, 
    imageURL:string,
    buttonURL:string,
    list:Itemlist[],
    bgcolor:string,
    shortDescription:string;
}

// quantity to default primary size equal   -- i.e minimum quanity to order == minimum quantity to set 
//white creating the database having to define the conversion rate between the primary to secondary

const vegetableList:Itemlist[] =[
    {
      name: "Tomato",
      imageURL: "/categories-item/vegetable/tomato.png",
      buttonURL: "/item/tomato",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 30,
      discountValue: 18,
      savingAmount: 0,
      offers: [{ price: 15, quantity: 10, unit: unit.kg }],
      unit: unit.kg,
      brand:"",
      secondaryUnit:unit.none
    },
    {
      name: "Potato",
      imageURL: "/categories-item/vegetable/potato.png",
      buttonURL: "/item/potato",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      secondaryUnit:unit.none,
      mrp: 25,
      discountValue: 17,
      savingAmount: 0,
      offers: [{ price: 14, quantity: 25, unit: unit.kg }],
      unit: unit.kg,
      brand:""
    },
    {
      name: "Onion",
      imageURL: "/categories-item/vegetable/onion.png",
      buttonURL: "/item/onion",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 30,
      discountValue: 19,
      savingAmount: 500,
      offers: [{ price: 40, quantity: 100, unit: unit.kg }],
      unit: unit.kg,
      brand:"",
      secondaryUnit:unit.none
    },
    {
      // difference between the secondary and primary size i.e conversion
      name: "Carrot",
      imageURL: "/categories-item/vegetable/carrot.png",
      buttonURL: "/item/carrot",
      quantity: 0.5,
      primarySize: 0.5,
      secondarySize: 0,
      mrp: 60,
      discountValue: 42,
      savingAmount: 18,
      offers: [{ price: 35, quantity: 5, unit: unit.kg } ,{price: 250, quantity:"1", unit:unit.bag, type:"bag"}],
      unit: unit.kg, 
      brand:"",
      secondaryUnit:unit.none,
      conversionRate:2
    },
    {
      name: "Cabbage",
      imageURL: "/categories-item/vegetable/cabbage.png",
      buttonURL: "/item/cabbage",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand:"",
      secondaryUnit:unit.none
    }
  ]

const rationOilList : Itemlist[] =  [
    {
      name: "Basmati Rice",
      imageURL: "/categories-item/ration-oil/basmati_rice.png",
      buttonURL: "/item/basmati_rice",
      quantity: 2.5,
      primarySize: 2.5,
      secondarySize:0,
      mrp: 44,
      discountValue: 10,
      savingAmount: 34,
      offers: [{ price: 33, quantity: 20, unit: unit.kg }],
      unit: unit.kg,
      brand:"India Gate",
      secondaryUnit:unit.none
    },
    {
      name: "Tur Dal",
      imageURL: "/categories-item/ration-oil/tur_dal.png",
      buttonURL: "/item/tur_dal",
      quantity: 1,
      primarySize:1 ,
      secondarySize:0,
      mrp: 150,
      discountValue: 140,
      savingAmount: 10,
      offers: [{ price: 138, quantity: 5, unit: unit.kg }],
      unit: unit.kg,
      brand:"Unbranded",
      secondaryUnit:unit.none
    },
    {
      name: "Sunflower Oil",
      imageURL: "/categories-item/ration-oil/sunflower_oil.png",
      buttonURL: "/item/sunflower_oil",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 160,
      discountValue: 157,
      savingAmount: 0,
      offers: [{ price: 10, quantity: 155, unit: unit.ltr }],
      unit: unit.ltr,
      brand:"Fortune",
      secondaryUnit:unit.none
    },
    {
      name: "Sugar",
      imageURL: "/categories-item/ration-oil/sugar.png",
      buttonURL: "/item/sugar",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 60,
      discountValue: 46,
      savingAmount: 0,
      offers: [{ price: 10, quantity:45.5 , unit: unit.gm }],
      unit: unit.kg,
      brand:"unbranded",
      secondaryUnit:unit.none
    },
    {
      name: "Wheat Flour",
      imageURL: "/categories-item/ration-oil/wheat_flour.png",
      buttonURL: "/item/wheat_flour",
      quantity: 50,
      primarySize: 50,
      secondarySize: 0,
      mrp: 80,
      discountValue: 10,
      savingAmount:0 ,
      offers: [{ price: 70, quantity: 50, unit: unit.gm }],
      unit: unit.kg,
      brand:"unbranded",
      secondaryUnit:unit.none
    }
  ];
const dairyList : Itemlist[] = [
    {
      name: "Toned Milk",
      imageURL: "/categories-item/dairy/tone_milk.png",
      buttonURL: "/item/toned_milk",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 60,
      discountValue: 60,
      savingAmount: 0,
      offers: [],
      unit: unit.ltr,
      brand:"Amul",
      secondaryUnit:unit.none
    },
    {
      name: "Amul Butter",
      imageURL: "/categories-item/dairy/amul_butter.png",
      buttonURL: "/item/amul_butter",
      quantity: 1,
      primarySize: 1,
      secondarySize:500,
      mrp: 5500,
      discountValue: 500,
      savingAmount: 500,
      offers: [{ price: 5000, quantity: 500, unit: unit.gm }],
      unit: unit.pkt,
      brand:"amul",
      secondaryUnit:unit.gm
    },
    {
      name: "Paneer",
      imageURL: "/categories-item/dairy/paneer2.png",
      buttonURL: "/item/paneer",
      quantity: 250,
      primarySize: 250,
      secondarySize: 0,
      mrp: 12000,
      discountValue: 2000,
      savingAmount: 2000,
      offers: [{ price: 10000, quantity: 250, unit: unit.gm }],
      unit: unit.gm,
      brand:"unbranded",
      secondaryUnit:unit.none
    },
    {
      name: "Curd",
      imageURL: "/categories-item/dairy/curd.png",
      buttonURL: "/item/curd",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 4000,
      discountValue: 500,
      savingAmount: 500,
      offers: [{ price: 3500, quantity: 1, unit: unit.ltr }],
      unit: unit.ltr,
      brand:"unbranded",
      secondaryUnit:unit.none

    },
    {
      name: "Cheese Slices",
      imageURL: "/categories-item/dairy/cheese_slice.png",
      buttonURL: "/item/cheese_slice",
      quantity: 10,
      primarySize: 10,
      secondarySize: 0,
      mrp: 12000,
      discountValue: 1000,
      savingAmount: 1000,
      offers: [{ price: 11000, quantity: 10, unit: unit.pcs }],
      unit: unit.pcs,
      brand:"amul",
      secondaryUnit:unit.none

    }
  ]
   ;
const packagingList : Itemlist[] =  [
  {
    name: "Plastic Bags Small",
    imageURL: "/categories-item/packaging-material/plastic_bags_small.png",
    buttonURL: "/item/plastic_bags_small",
    quantity: 100,
    primarySize: 100,
    secondarySize: 0,
    mrp: 1000,
    discountValue: 200,
    savingAmount: 200,
    offers: [{ price: 800, quantity: 100, unit: unit.pcs }],
    unit: unit.pcs,
      brand:""
,
      secondaryUnit:unit.none
  },
  {
    name: "Cardboard Box Large",
    imageURL: "/categories-item/packaging-material/cardboard_box_large.png",
    buttonURL: "/item/cardboard_box_large",
    quantity: 10,
    primarySize: 10,
    secondarySize: 0,
    mrp: 5000,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 4500, quantity: 10, unit: unit.pcs }],
    unit: unit.pcs,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Aluminum Foil",
    imageURL: "/categories-item/packaging-material/aluminium_foil.png",
    buttonURL: "/item/aluminum_foil",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 3000,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 2500, quantity: 1, unit: unit.pkt }],
    unit: unit.pkt,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Paper Napkins",
    imageURL: "/categories-item/packaging-material/paper_napkin.png",
    buttonURL: "/item/paper_napkins",
    quantity: 10,
    primarySize: 1,
    secondarySize: 10,
    mrp: 2000,
    discountValue: 400,
    savingAmount: 400,
    offers: [{ price: 1600, quantity: 1, unit: unit.pkt }],
    unit: unit.pkt,
      brand:"",
      secondaryUnit:unit.pcs

  },
  {
    name: "Garbage Bags",
    imageURL: "/categories-item/packaging-material/garbage_bags.png",
    buttonURL: "/item/garbage_bags",
    quantity: 2,
    primarySize: 1,
    secondarySize: 50,
    mrp: 3000,
    discountValue: 300,
    savingAmount: 300,
    offers: [{ price: 2700, quantity: 30, unit: unit.pcs }],
    unit: unit.pkt,
      brand:"",
      secondaryUnit:unit.pcs

  }
]
;
const masalaList : Itemlist[] = [
  {
    name: "Turmeric Powder",
    imageURL: "/categories-item/masala/turmeric_powder.png",
    buttonURL: "/item/turmeric",
    quantity: 200,
    primarySize: 200,
    secondarySize: 0,
    mrp: 4000,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 3500, quantity: 200, unit: unit.gm }],
    unit: unit.gm,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Red Chili Powder",
    imageURL: "/categories-item/masala/chilli_powder.png",
    buttonURL: "/item/chili_powder",
    quantity: 100,
    primarySize: 100,
    secondarySize: 0,
    mrp: 5000,
    discountValue: 1000,
    savingAmount: 1000,
    offers: [{ price: 4000, quantity: 100, unit: unit.gm }],
    unit: unit.gm,
      brand:"kbm",
      secondaryUnit:unit.none

  },
  {
    name: "Coriander Powder",
    imageURL: "/categories-item/masala/coriander_powder.png",
    buttonURL: "/item/coriander_powder",
    quantity: 200,
    primarySize: 200,
    secondarySize: 0,
    mrp: 4500,
    discountValue: 700,
    savingAmount: 700,
    offers: [{ price: 3800, quantity: 200, unit: unit.gm }],
    unit: unit.gm,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Black Pepper",
    imageURL: "/categories-item/masala/black-pepper.png",
    buttonURL: "/item/black_pepper",
    quantity: 100,
    primarySize: 100,
    secondarySize: 0,
    mrp: 9000,
    discountValue: 1000,
    savingAmount: 1000,
    offers: [{ price: 8000, quantity: 100, unit: unit.gm }],
    unit: unit.gm,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Iodized Salt",
    imageURL: "/categories-item/masala/iodized_salt.png",
    buttonURL: "/item/iodized_salt",
    quantity: 1000,
    primarySize: 1000,
    secondarySize: 0,
    mrp: 2000,
    discountValue: 200,
    savingAmount: 200,
    offers: [{ price: 1800, quantity: 1000, unit: unit.gm }],
    unit: unit.kg,
      brand:"unbranded",
      secondaryUnit:unit.none

  }
]
;
const riceFlourList : Itemlist[] = [
  {
    name: "Basmati Rice",
    imageURL: "/categories-item/rice-flours/basmati_rice.png",
    buttonURL: "/item/basmati_rice",
    quantity: 5,
    primarySize: 5,
    secondarySize: 0,
    mrp: 50000,
    discountValue: 5000,
    savingAmount: 5000,
    offers: [{ price: 45000, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
      brand:"India gate",
      secondaryUnit:unit.none

  },
  {
    name: "Wheat Flour",
    imageURL: "/categories-item/rice-flours/wheat_flour.png",
    buttonURL: "/item/wheat_flour",
    quantity: 10,
    primarySize: 10,
    secondarySize: 0,
    mrp: 40000,
    discountValue: 2000,
    savingAmount: 2000,
    offers: [{ price: 38000, quantity: 10, unit: unit.kg }],
    unit: unit.kg,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Multigrain Atta",
    imageURL: "/categories-item/rice-flours/multigrain_atta.png",
    buttonURL: "/item/multigrain_atta",
    quantity: 5,
    primarySize: 5,
    secondarySize: 0,
    mrp: 60000,
    discountValue: 5000,
    savingAmount: 5000,
    offers: [{ price: 55000, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
      brand:"ashirvadh",
      secondaryUnit:unit.none

  },
  {
    name: "Rice Flour",
    imageURL: "/categories-item/rice-flours/rice_flour.png",
    buttonURL: "/item/rice_flour",
    quantity: 2,
    primarySize: 2,
    secondarySize: 0,
    mrp: 18000,
    discountValue: 3000,
    savingAmount: 3000,
    offers: [{ price: 15000, quantity: 2, unit: unit.kg }],
    unit: unit.kg,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Maida",
    imageURL: "/categories-item/rice-flours/maida.png",
    buttonURL: "/item/maida",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 10000,
    discountValue: 1500,
    savingAmount: 1500,
    offers: [{ price: 8500, quantity: 1, unit: unit.kg }],
    unit: unit.kg,
      brand:"AS",
      secondaryUnit:unit.none

  }
]
;
const cleaningList : Itemlist[] = [
  {
    name: "Harpic Toilet Cleaner",
    imageURL: "/categories-item/cleaning-consumables/harpic.png",
    buttonURL: "/item/harpic",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 9500,
    discountValue: 1000,
    savingAmount: 1000,
    offers: [{ price: 8500, quantity: 1, unit: unit.ltr }],
    unit: unit.ltr,
      brand:"harpic",
      secondaryUnit:unit.none

  },
  {
    name: "Vim Dishwash Bar",
    imageURL: "/categories-item/cleaning-consumables/vim_bar.png",
    buttonURL: "/item/vim_bar",
    quantity: 5,
    primarySize: 5,
    secondarySize: 0,
    mrp: 2500,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 2000, quantity: 5, unit: unit.pcs }],
    unit: unit.pcs,
      brand:"vim",
      secondaryUnit:unit.none

  },
  {
    name: "Phenyl",
    imageURL: "/categories-item/cleaning-consumables/phenyl.png",
    buttonURL: "/item/phenyl",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 3000,
    discountValue: 300,
    savingAmount: 300,
    offers: [{ price: 2700, quantity: 1, unit: unit.ltr }],
    unit: unit.ltr,
      brand:"unbranded",
      secondaryUnit:unit.none

  },
  {
    name: "Broom Stick",
    imageURL: "/categories-item/cleaning-consumables/broom.png",
    buttonURL: "/item/broom",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 1200,
    discountValue: 200,
    savingAmount: 200,
    offers: [{ price: 1000, quantity: 1, unit: unit.pc }],
    unit: unit.pc,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Scrubber Pads",
    imageURL: "/categories-item/cleaning-consumables/scrubber_pad.png",
    buttonURL: "/item/scrubber_pad",
    quantity: 3,
    primarySize: 3,
    secondarySize: 0,
    mrp: 1500,
    discountValue: 300,
    savingAmount: 300,
    offers: [{ price: 1200, quantity: 3, unit: unit.pcs }],
    unit: unit.pcs,
      brand:"",
      secondaryUnit:unit.none

  }
]
;
const confectionaryList : Itemlist[] =[
  {
    name: "Ketchup Bottle",
    imageURL: "/categories-item/confectionary-sauces/ketchup.png",
    buttonURL: "/item/ketchup",
    quantity: 500,
    primarySize: 500,
    secondarySize: 1,
    mrp: 12000,
    discountValue: 2000,
    savingAmount: 2000,
    offers: [{ price: 10000, quantity: 500, unit: unit.gm }],
    unit: unit.gm,
      brand:"",
      secondaryUnit:unit.ltr

  },
  {
    name: "Chocolate Bar",
    imageURL: "/categories-item/confectionary-sauces/chocolate_bar.png",
    buttonURL: "/item/chocolate_bar",
    quantity: 1,
    primarySize: 1,
    secondarySize:0 ,
    mrp: 5000,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 4500, quantity: 1, unit: unit.pc }],
    unit: unit.pc,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Mayonnaise",
    imageURL: "/categories-item/confectionary-sauces/mayo.png",
    buttonURL: "/item/mayo",
    quantity: 250,
    primarySize: 250,
    secondarySize: 0,
    mrp: 9000,
    discountValue: 1500,
    savingAmount: 1500,
    offers: [{ price: 7500, quantity: 250, unit: unit.gm }],
    unit: unit.gm,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Jam Jar",
    imageURL: "/categories-item/confectionary-sauces/jam.png",
    buttonURL: "/item/jam",
    quantity: 500,
    primarySize: 500,
    secondarySize: 0,
    mrp: 13000,
    discountValue: 3000,
    savingAmount: 3000,
    offers: [{ price: 10000, quantity: 500, unit: unit.gm }],
    unit: unit.gm,
      brand:"",
      secondaryUnit:unit.none

  },
  {
    name: "Chewing Gum Pack",
    imageURL: "/categories-item/confectionary-sauces/chewing_gum.png",
    buttonURL: "/item/chewing_gum",
    quantity: 10,
    primarySize: 10,
    secondarySize: 0,
    mrp: 2000,
    discountValue: 200,
    savingAmount: 200,
    offers: [{ price: 1800, quantity: 10, unit: unit.pcs }],
    unit: unit.pcs,
      brand:"",
      secondaryUnit:unit.none

  }
]
 ;
export const categoryInformationList:CategoryItemInformation[] = [
    {
        name: "vegetables",
        imageURL: "/categories/vegetables.png",
        buttonURL: "/category/vegetable",
        list : vegetableList, 
        bgcolor:"bg-linear-to-t via-[#61f966] to-[#ffffff]"
        ,shortDescription:"fresh quality"
    },
    {
        name: "ration, pulses & oil",
        imageURL: "/categories/ration_pulses_oil.png",
        buttonURL: "/category/ration_pulses_oil",
        list : rationOilList,
        bgcolor:"bg-linear-to-t via-[#f9de06] to-[#ffffff]"
        ,shortDescription:"all kind of pulses and oil"
    }, {
        name: "dairy product",
        imageURL: "/categories/dairy.png",
        buttonURL: "/category/dairy",
        list : dairyList,
        bgcolor:"bg-linear-to-t via-[#099FFF] to-[#ffffff]"
        ,shortDescription:"for professional kitchen"
    },  {
        name: "packaging materials",
        imageURL: "/categories/packaging_materials.png",
        buttonURL: "/category/packageing_materials",
        list : packagingList,
        bgcolor:"bg-linear-to-t via-[#D4A995] to-[#ffffff]"
        ,shortDescription:"pack food with ease"

    },
    {
        name: "masala & salt",
        imageURL: "/categories/masala_salt.png",
        buttonURL: "/category/masala_salt",
        list :masalaList,
        bgcolor:"bg-linear-to-t via-[#E16221] to-[#ffffff]"
        ,shortDescription:"spicy and fragrant"
    },
    {
        name: "rice & flours",
        imageURL: "/categories/rice_flours.png",
        buttonURL: "/category/rice_flours",
        list :riceFlourList,
        bgcolor:"bg-linear-to-t via-[#fcefbb] to-[#ffffff]"
        ,shortDescription:"all types of rices and flours"
    },
    {
        name: "cleaning & consumables",
        imageURL: "/categories/cleaning_consumables.png",
        buttonURL: "/category/cleaning_consumables",
        list : cleaningList,
        bgcolor:"bg-linear-to-t via-[#FFD300] to-[#ffffff]"
        ,shortDescription:"maintain total hygiene"
    },
    {
        name: "confectionary & sauces",
        imageURL: "/categories/confectionary_sauces.png",
        buttonURL: "/category/confectionary_sauces",
        list : confectionaryList,
        bgcolor:"bg-linear-to-t via-[#543398] to-[#ffffff]"
        ,shortDescription:"tangy, spicy and sweets"
    }
]