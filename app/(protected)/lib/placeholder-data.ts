
// fetching data from database of it can remain permanent here - is not required to be that dynamic.
//getting all the data from the database -- here for the frontend checking

//making the url are enum for stricter url 

enum categoryURL {
  vegetable = "/category/vegetable",
  dairy = "/category/dairy",
  masalat_salt = "/category/masalat_salt",
  ration_pluses_oil = "/category/ration_pluses_oil",
  "packaging-material" = "/category/packaging-material",
  rice_flours = "/category/rice_flours",
  confectionay_sauces = "/category/confectionay_sauces",
  cleaning_consumables = "/category/cleaning_consumables",
}
export enum unit {
  gm = "gm",
  kg = "kg",
  pkt = "pkt",
  pc = "pc",
  pcs = "pcs",
  pkts = "pkts",
  bag = "bag",
  bags = "bags",
  ltr = "ltr",
  ltrs = "ltrs",
  carton = "carton",
  no = "no",
  none = ""
}

export const colorPalette = [
  ["bg-[#3674B5]", "bg-[#6FA1D3]/60"],
  ["bg-[#578FCA]", "bg-[#89B2DC]/60"],
  ["bg-[#FFB823]", "bg-[#FFD773]/60"],
  ["bg-[#7B4019]", "bg-[#A86F4D]/60"],
  ["bg-[#725CAD]", "bg-[#A495D3]/60"],
  ["bg-[#B33791]", "bg-[#D97DB5]/60"],
  ["bg-[#254D70]", "bg-[#5C7FA1]/60"],
  ["bg-[#16610E]", "bg-[#4C9D45]/60"],
  ["bg-[#5459AC]", "bg-[#8A90D1]/60"],
  ["bg-[#FF9898]", "bg-[#FFCCCC]/60"],
  ["bg-[#FE5D26]", "bg-[#FF9E71]/60"],
  ["bg-[#E9A319]", "bg-[#F6C85E]/60"]
]

export const createImagePreorder = [
"/preorder-list/create_one.png",
"/preorder-list/daily_order.png",
"/preorder-list/festival_time.png",
"/preorder-list/last_day_order.png",
"/preorder-list/masala.png",
"/preorder-list/packaging.png",
"/preorder-list/ration_stock.png",
"/preorder-list/cleaning.png",
"/preorder-list/pizza_burger.png",
"/preorder-list/vegetable.png",
"/preorder-list/masala2.png",
"/preorder-list/drinks.png",
]



//helpful in categorizing inside the crates

export const banner = [
  {
    title: "Need fresh veggies ?",
    text: "all king of veggies!! \n every essential.",
    buttonURL: "/category/vegetable",
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
    buttonURL: "/category/masala_salt",
    imageURL: "/banner/masala.png",
    gradientColor: "bg-linear-to-r from-[#ffbb00] to-[#ff6511]"

  }, {
    title: "get ration and oil",
    text: "maida, sugar, oil, ghee, atta & rice with\nconfectionary items",
    buttonURL: "/category/ration_pulses_oil",
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
} // not using it any more -- having single type for the item card -- 
// -- for small or big interface

export interface Preorder {
  title: string;
  description: string;
  imageURL: string;
  buttonURL: string;
  list: Itemlist[];
  bgTitle: string,
  bgBody: string,
  type?: "page" | "dashboard"
}

//naming the card with title 
//default description in the creation as well

//not doing this way all the data to be seprated i.e brand, items, category, preorder
// joining them when required.

export const preorderList: Preorder[] = [
  {
    title: "Daily Order",
    description: "getting your regular",
    imageURL: "/preorder-list/daily_order.png",
    buttonURL: "/dashboard/preorder-list/daily_order",
    list: [{
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
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "tomato , potato & onion" },
      outOfStock: true,
      currentQuantity: 2,
      category:"vegetable"
    }, {
      // difference between the secondary and primary size i.e conversion
      name: "Button Mushroom",
      imageURL: "/categories-item/vegetable/button_mushroom.png",
      buttonURL: "/item/button_mushroom",
      quantity: 1,
      primarySize: 1,
      secondarySize: 200,
      mrp: 60,
      discountValue: 42,
      savingAmount: 18,
      offers: [{ price: 35, quantity: 5, unit: unit.kg }, { price: 250, quantity: "1", unit: unit.bag, type: "bag" }],
      unit: unit.pkt,
      brand: "generic",
      secondaryUnit: unit.gm,
      conversionRate: 200,
      type: { all: "all", vegetable: "exotic vegetables" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "purple cabbage",
      imageURL: "/categories-item/vegetable/purple_cabbage.png",
      buttonURL: "/item/purple_cabbage",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "exotic vegetables" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "ginger",
      imageURL: "/categories-item/vegetable/ginger.png",
      buttonURL: "/item/ginger",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: false,
      comingSoon: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "red carrot",
      imageURL: "/categories-item/vegetable/red_carrot.png",
      buttonURL: "/item/red_carrot",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: true,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "English Cucumber",
      imageURL: "/categories-item/vegetable/english_cucumber.png",
      buttonURL: "/item/english_cucumber",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    }, {
      name: "Basmati Rice",
      imageURL: "/categories-item/ration-oil/basmati_rice.png",
      buttonURL: "/item/basmati_rice",
      quantity: 2.5,
      primarySize: 2.5,
      secondarySize: 0,
      mrp: 44,
      discountValue: 10,
      savingAmount: 34,
      offers: [{ price: 33, quantity: 20, unit: unit.kg, superSaver: true }],
      unit: unit.kg,
      brand: "India Gate",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "vanaspati & others" },
      outOfStock: false,
      currentQuantity: 2.5,
      category:"ration_pulses_oil"
    },
    {
      name: "Tur Dal",
      imageURL: "/categories-item/ration-oil/tur_dal.png",
      buttonURL: "/item/tur_dal",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 150,
      discountValue: 140,
      savingAmount: 10,
      offers: [{ price: 138, quantity: 5, unit: unit.kg }],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "toor, kabuli & channa dal" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
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
      brand: "Fortune",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "sunflower oil" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
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
      offers: [{ price: 10, quantity: 45.5, unit: unit.gm }],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "vanaspati & others" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
    },
    {
      name: "Vibhor Soyabean Oil",
      imageURL: "/categories-item/ration-oil/vibhor.png",
      buttonURL: "/item/vibhor_soyabean_oil",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 120,
      discountValue: 114,
      savingAmount: 0,
      offers: [{ price: 113, quantity: 10, unit: unit.ltr }],
      unit: unit.ltr,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "soyabean oil" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
    },
    ],
    bgTitle: "bg-[#38b6ff]",
    bgBody: "bg-[#ebf6ff]"
  },
  {
    title: "Last Day Order",
    description: "your previous day order",
    imageURL: "/preorder-list/last_day_order.png",
    buttonURL: "/dashboard/preorder-list/last_day_order",
    list: [{
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
      brand: "amul",
      secondaryUnit: unit.none,
      type: { all: "all", dairy: "milk & milk powder" },
      outOfStock: false,
      currentQuantity: 2,
      category:"dairy"
    },
    {
      name: "Amul Butter",
      imageURL: "/categories-item/dairy/amul_butter.png",
      buttonURL: "/item/amul_butter",
      quantity: 1,
      primarySize: 1,
      secondarySize: 500,
      mrp: 5500,
      discountValue: 500,
      savingAmount: 500,
      offers: [{ price: 5000, quantity: 500, unit: unit.gm }],
      unit: unit.pkt,
      brand: "amul",
      secondaryUnit: unit.gm,
      type: { all: "all", dairy: "butter" },
      outOfStock: false,
      currentQuantity: 2,
      category:"dairy"

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
      offers: [{ price: 100, quantity: 250, unit: unit.gm }],
      unit: unit.gm,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", dairy: "paneer" },
      outOfStock: false,
      currentQuantity: 2,
      category:"dairy"

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
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", dairy: "curd" },
      outOfStock: false,
      currentQuantity: 2,
      category:"dairy"


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
      brand: "amul",
      secondaryUnit: unit.none,
      type: { all: "all", dairy: "cheese" },
      outOfStock: false,
      currentQuantity: 2,
      category:"dairy"


    }, {
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
      brand: "kbm",
      secondaryUnit: unit.none,
      type: { all: "all", masala: "chilli, turmeric & coriander powder" },
      outOfStock: false
      ,
      currentQuantity: 2,
      category:"masala"

    },
    {
      name: "Red Chili Powder",
      imageURL: "/categories-item/masala/chilli_powder.png",
      buttonURL: "/item/chili_powder",
      quantity: 100,
      primarySize: 100,
      secondarySize: 0,
      mrp: 500,
      discountValue: 100,
      savingAmount: 400,
      offers: [{ price: 80, quantity: 1000, unit: unit.kg }],
      unit: unit.kg,
      brand: "kbm",
      secondaryUnit: unit.none,
      type: { all: "all", masala: "chilli, turmeric & coriander powder" },
      outOfStock: false,
      currentQuantity: 2,
      category:"masala"


    },
    {
      name: "Coriander Powder",
      imageURL: "/categories-item/masala/coriander_powder.png",
      buttonURL: "/item/coriander_powder",
      quantity: 1,
      primarySize: 1,
      secondarySize: 250,
      mrp: 450,
      discountValue: 250,
      savingAmount: 0,
      offers: [{ price: 240, quantity: 10, unit: unit.pkt }],
      unit: unit.pkt,
      brand: "kbm",
      secondaryUnit: unit.gm,
      type: { all: "all", masala: "chilli, turmeric & coriander powder" },
      outOfStock: false,
      currentQuantity: 5,
      conversionRate:1,
      category:"masala"


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
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", masala: "whole spices" },
      outOfStock: false,
      currentQuantity: 2,
      category:"masala"


    },
    {
      name: "Iodized Salt",
      imageURL: "/categories-item/masala/iodized_salt.png",
      buttonURL: "/item/iodized_salt",
      quantity: 1,
      primarySize: 1,
      secondarySize: 1,
      mrp: 400,
      discountValue: 200,
      savingAmount: 200,
      offers: [{ price: 180, quantity: 10, unit: unit.pkt }],
      unit: unit.pkt,
      brand: "generic",
      secondaryUnit: unit.kg,
      type: { all: "all", masala: "salt & sugar" },
      outOfStock: false,
      currentQuantity: 2,
      conversionRate:1,
      category:"masala"

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
      name: "Ketchup Bottle",
      imageURL: "/categories-item/confectionary-sauces/ketchup.png",
      buttonURL: "/item/ketchup",
      quantity: 1,
      primarySize: 1,
      secondarySize: 1,
      mrp: 120,
      discountValue: 110,
      savingAmount: 2000,
      offers: [{ price: 100, quantity: 5, unit: unit.kg }],
      unit: unit.kg,
      brand: "kissan",
      secondaryUnit: unit.ltr,
      type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
      outOfStock: false,
      currentQuantity: 2,
      category:"confectionary_sauces"

    },
    {
      name: "Chocolate Bar",
      imageURL: "/categories-item/confectionary-sauces/chocolate_bar.png",
      buttonURL: "/item/chocolate_bar",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 5000,
      discountValue: 50,
      savingAmount: 500,
      offers: [{ price: 4500, quantity: 1, unit: unit.pc }],
      unit: unit.pc,
      brand: "amul",
      secondaryUnit: unit.none,
      type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
      outOfStock: false,
      currentQuantity: 2,
      category:"confectionary_sauces"

    },
    {
      name: "Mayonnaise",
      imageURL: "/categories-item/confectionary-sauces/mayo.png",
      buttonURL: "/item/mayo",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 900,
      discountValue: 100,
      savingAmount: 1500,
      offers: [{ price: 7500, quantity: 250, unit: unit.gm }],
      unit: unit.gm,
      brand: "freshy+",
      secondaryUnit: unit.none,
      type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
      outOfStock: false,
      currentQuantity: 2,
      category:"confectionary_sauces"

    },
    {
      name: "Jam Jar",
      imageURL: "/categories-item/confectionary-sauces/jam.png",
      buttonURL: "/item/jam",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 130,
      discountValue: 30,
      savingAmount: 3000,
      offers: [{ price: 10000, quantity: 500, unit: unit.gm }],
      unit: unit.gm,
      brand: "yumsie",
      secondaryUnit: unit.none,
      type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
      outOfStock: false,
      currentQuantity: 2,
      category:"confectionary_sauces"

    },
    {
      name: "Chewing Gum Pack",
      imageURL: "/categories-item/confectionary-sauces/chewing_gum.png",
      buttonURL: "/item/chewing_gum",
      quantity: 1,
      primarySize: 10,
      secondarySize: 0,
      mrp: 40,
      discountValue: 20,
      savingAmount: 200,
      offers: [{ price: 1800, quantity: 10, unit: unit.pcs }],
      unit: unit.pcs,
      brand: "freshy+",
      secondaryUnit: unit.none,
      type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
      outOfStock: false,
      currentQuantity: 2,
      category:"confectionary_sauces"

    }, {
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
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "tomato , potato & onion" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"

    }, {
      // difference between the secondary and primary size i.e conversion
      name: "Button Mushroom",
      imageURL: "/categories-item/vegetable/button_mushroom.png",
      buttonURL: "/item/button_mushroom",
      quantity: 0.5,
      primarySize: 0.5,
      secondarySize: 0,
      mrp: 60,
      discountValue: 42,
      savingAmount: 18,
      offers: [{ price: 35, quantity: 5, unit: unit.kg }, { price: 250, quantity: "1", unit: unit.bag, type: "bag" }],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      conversionRate: 200,
      type: { all: "all", vegetable: "exotic vegetables" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "purple cabbage",
      imageURL: "/categories-item/vegetable/purple_cabbage.png",
      buttonURL: "/item/purple_cabbage",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "exotic vegetables" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "ginger",
      imageURL: "/categories-item/vegetable/ginger.png",
      buttonURL: "/item/ginger",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: false,
      comingSoon: false,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "red carrot",
      imageURL: "/categories-item/vegetable/red_carrot.png",
      buttonURL: "/item/red_carrot",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: true,
      currentQuantity: 2,
      category:"vegetable"
    },
    {
      name: "English Cucumber",
      imageURL: "/categories-item/vegetable/english_cucumber.png",
      buttonURL: "/item/english_cucumber",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 20,
      discountValue: 9,
      savingAmount: 11,
      offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", vegetable: "indian vegetable" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    }, {
      name: "Basmati Rice",
      imageURL: "/categories-item/ration-oil/basmati_rice.png",
      buttonURL: "/item/basmati_rice",
      quantity: 2.5,
      primarySize: 2.5,
      secondarySize: 0,
      mrp: 44,
      discountValue: 10,
      savingAmount: 34,
      offers: [{ price: 33, quantity: 20, unit: unit.kg, superSaver: true }],
      unit: unit.kg,
      brand: "India Gate",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "vanaspati & others" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
    },
    {
      name: "Tur Dal",
      imageURL: "/categories-item/ration-oil/tur_dal.png",
      buttonURL: "/item/tur_dal",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 150,
      discountValue: 140,
      savingAmount: 10,
      offers: [{ price: 138, quantity: 5, unit: unit.kg }],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "toor, kabuli & channa dal" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
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
      brand: "Fortune",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "sunflower oil" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
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
      offers: [{ price: 10, quantity: 45.5, unit: unit.gm }],
      unit: unit.kg,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "vanaspati & others" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
    },
    {
      name: "Vibhor Soyabean Oil",
      imageURL: "/categories-item/ration-oil/vibhor.png",
      buttonURL: "/item/vibhor_soyabean_oil",
      quantity: 1,
      primarySize: 1,
      secondarySize: 0,
      mrp: 120,
      discountValue: 114,
      savingAmount: 0,
      offers: [{ price: 113, quantity: 10, unit: unit.ltr }],
      unit: unit.ltr,
      brand: "generic",
      secondaryUnit: unit.none,
      type: { all: "all", ration_pluses_oil: "soyabean oil" },
      outOfStock: false,
      currentQuantity: 2,
      category:"ration_pulses_oil"
    }],
    bgTitle: "bg-[#efc282]",
    bgBody: "bg-[#fdf9f2]"
  }
];

export const upcomingCategoryList = [
  {
    name: "beverages & drinks",
    imageURL: "/categories/drinks.png",
    buttonURL: "/category/drink"
  },
  {
    name: "bread & pizza base",
    imageURL: "/categories/pizza_bread.png",
    buttonurl: "/category/pizza_bread"
  },
  {
    name: "frozen foods",
    imageURL: "/categories/frozen_foods.png",
    buttonurl: "/category/frozen_foods"
  },

]
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
    buttonURL: "/category/packaging-materials"
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

//making the type are strict for no other values to give -- write now loosely adding the types.

let vegetableType: vegetableCategoryType[] = ["indian vegetable", "tomato , potato & onion", "leafy vegetables", "exotic vegetables", "staff vegetables"]
let dairyType: dairyCategoryType[] = ["milk & milk powder", "cheese", "curd", "margarine", "cream", "paneer", "ghee", "butter"]
let rationPulsesOilTypes: rationPulsesOilCategoryTypes[] = ["sunflower oil", "mustard oil", "soyabean oil", "palm oil", "vanaspati & others", "rajma, urad & other dal", "toor, kabuli & channa dal", "millets & seeds", "cotton seed oil"]
let masalaType: masalaCategoryType[] = ["salt & sugar", "grounded spices", "chilli, turmeric & coriander powder", "whole spices", "magaz", "mouth freshner and papad"]
let packagingMaterialsType: packagingMaterialsCategoryType[] = ["cutlery & tissues", "reusable containers", "tapes, silverfoil & kitchen wraps", "carry bags", "trays", "disposable tableware", "foldable pouches"]
let cleaningConsumbalesType: cleaningConsumbalesCategoryType[] = ["consumables", "dishwash & detergents", "cleaning tools", "air freshner", "floor & glass cleaner", "handwash & sanitizer", "toilet & bathroom cleaner", "degreaser & oven-grill cleaner"]
let confectionarySaucesType: confectionarySaucesCategoryType[] = ["vinegar, chilli & soy sauces", "oregano, chilli flakes & seasoning", "instant noodles", "chutney & pickles", "pasta, conflakes & breadcrumbs", "cheese blend & other sauces"]
let riceFloursType: (riceFlourCategoryType)[] = ["rice", "staff rice and flours", "flours", "maida", "corn starch"]

type riceFlourCategoryType = "rice" | "staff rice and flours" | "flours" | "maida" | "corn starch";
type vegetableCategoryType = "indian vegetable" | "tomato , potato & onion" | "leafy vegetables" | "exotic vegetables" | "staff vegetables";
type dairyCategoryType = "milk & milk powder" | "cheese" | "curd" | "margarine" | "cream" | "paneer" | "ghee" | "butter";
type rationPulsesOilCategoryTypes = "sunflower oil" | "mustard oil" | "soyabean oil" | "palm oil" | "vanaspati & others" | "rajma, urad & other dal" | "toor, kabuli & channa dal" | "millets & seeds" | "cotton seed oil"
type masalaCategoryType = "salt & sugar" | "grounded spices" | "chilli, turmeric & coriander powder" | "whole spices" | "magaz" | "mouth freshner and papad"
type packagingMaterialsCategoryType = "cutlery & tissues" | "reusable containers" | "tapes, silverfoil & kitchen wraps" | "carry bags" | "trays" | "disposable tableware" | "foldable pouches"
type cleaningConsumbalesCategoryType = "consumables" | "dishwash & detergents" | "cleaning tools" | "air freshner" | "floor & glass cleaner" | "handwash & sanitizer" | "toilet & bathroom cleaner" | "degreaser & oven-grill cleaner";
type confectionarySaucesCategoryType = "vinegar, chilli & soy sauces" | "oregano, chilli flakes & seasoning" | "instant noodles" | "chutney & pickles" | "pasta, conflakes & breadcrumbs" | "cheese blend & other sauces";

type allType = riceFlourCategoryType[] | vegetableCategoryType[] | dairyCategoryType[] | rationPulsesOilCategoryTypes[] | masalaCategoryType[] | packagingMaterialsCategoryType[] | cleaningConsumbalesCategoryType[] | confectionarySaucesCategoryType[];

export interface CategoryType {
  all: "all",
  vegetable?: vegetableCategoryType,
  dairy?: dairyCategoryType,
  ration_pluses_oil?: rationPulsesOilCategoryTypes,
  masala?: masalaCategoryType,
  "packaging-materials"?: packagingMaterialsCategoryType,
  cleaning_consumables?: cleaningConsumbalesCategoryType,
  confectionary_sauces?: confectionarySaucesCategoryType,
  rice_flours?: riceFlourCategoryType,
}
export type category = "all" | "vegetable" | "dairy" | "ration_pluses_oil" | "masala" | "packaging-materials" | "cleaning_consumables" | "confectionary_sauces" | "rice_flours";
type upcomingCategory = "beverages_drink" | "bread_pizza_base" | "frozen food"


//ability to add and delete types from the backend using the admin website application and adding the images from their as well
//new categories and properties as well

export interface Itemlist {
  name: string, //unique
  imageURL: string,
  buttonURL: string,
  quantity: number,
  primarySize: number,
  secondarySize: number,
  mrp: number,
  discountValue: number,
  savingAmount: number,
  offers: Offer[],
  unit: unit,
  secondaryUnit: unit,
  brand: allBrand,
  conversionRate?: number,
  category?: category | string,
  type?: CategoryType, // type within category not the category itself
  outOfStock?: boolean, // only showing in case of the categories search and dashboard search , preorder card (but removing from the add to cart in case of coming soon or outofstock)-- not showing in the search values -- card caraousel, preorder card - small listing
  comingSoon?: boolean, // same goes as above - outofstock
  currentQuantity?: number; // incase of preorder card having it
  regexDescription?:string ; //includes the name, category, type, brand, alias names
  maxOrder?:number; // as per the item and primary size to be setting
}
interface Offer {
  price: number,
  quantity: number | string,
  unit: unit,
  type?: "loose" | "bag" | "carton",
  superSaver?: boolean,
}
export interface CategoryItemInformation {
  name: string,
  imageURL: string,
  buttonURL: string,
  list: Itemlist[],
  bgcolor: string,
  shortDescription: string,
  type: allType,
}

// quantity to default primary size equal   -- i.e minimum quanity to order == minimum quantity to set 
//white creating the database having to define the conversion rate between the primary to secondary

const vegetableList: Itemlist[] = [
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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: false,
    category:"vegetable"
  },
  {
    name: "Potato",
    imageURL: "/categories-item/vegetable/potato.png",
    buttonURL: "/item/potato",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    secondaryUnit: unit.none,
    mrp: 25,
    discountValue: 17,
    savingAmount: 0,
    offers: [{ price: 14, quantity: 25, unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: false,
    category:"vegetable"
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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: false,
    category:"vegetable"


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
    offers: [{ price: 35, quantity: 5, unit: unit.kg }, { price: 32, quantity: "10", unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    conversionRate: 2,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    category:"vegetable"


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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "leafy vegetables" },
    outOfStock: false,
    category:"vegetable"


  },
  {
    name: "Garlic Peeled",
    imageURL: "/categories-item/vegetable/garlic_peeled.png",
    buttonURL: "/item/garlic_peeled",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    category:"vegetable"
  },
  {
    name: "orange carrot",
    imageURL: "/categories-item/vegetable/orange_carrot.png",
    buttonURL: "/item/orange_carrot",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg, superSaver: true },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    category:"vegetable"
  },
  {
    name: "Indian Cucumber",
    imageURL: "/categories-item/vegetable/indian_cucumber.png",
    buttonURL: "/item/indian_cucumber",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    category:"vegetable"
  }, {
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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: true,
    category:"vegetable"

  },
  {
    name: "Pahari aloo",
    imageURL: "/categories-item/vegetable/pahari_potato.png",
    buttonURL: "/item/pahari_potato",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    secondaryUnit: unit.none,
    mrp: 25,
    discountValue: 17,
    savingAmount: 0,
    offers: [{ price: 14, quantity: 25, unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: false,
    comingSoon: true,
    category:"vegetable"
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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "tomato , potato & onion" },
    outOfStock: true,
    category:"vegetable"
  },
  {
      // difference between the secondary and primary size i.e conversion
      name: "Button Mushroom",
      imageURL: "/categories-item/vegetable/button_mushroom.png",
      buttonURL: "/item/button_mushroom",
      quantity: 1,
      primarySize: 1,
      secondarySize: 200,
      mrp: 60,
      discountValue: 42,
      savingAmount: 18,
      offers: [{ price: 35, quantity: 5, unit: unit.kg }, { price: 250, quantity: "1", unit: unit.bag, type: "bag" }],
      unit: unit.pkt,
      brand: "generic",
      secondaryUnit: unit.gm,
      conversionRate: 200,
      type: { all: "all", vegetable: "exotic vegetables" },
      outOfStock: false,
      currentQuantity: 2,
      category:"vegetable"
    },
  {
    name: "purple cabbage",
    imageURL: "/categories-item/vegetable/purple_cabbage.png",
    buttonURL: "/item/purple_cabbage",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "exotic vegetables" },
    outOfStock: false,
    category:"vegetable"
  },
  {
    name: "ginger",
    imageURL: "/categories-item/vegetable/ginger.png",
    buttonURL: "/item/ginger",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    comingSoon: false,
    category:"vegetable"
  },
  {
    name: "red carrot",
    imageURL: "/categories-item/vegetable/red_carrot.png",
    buttonURL: "/item/red_carrot",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: true,
    category:"vegetable"
  },
  {
    name: "English Cucumber",
    imageURL: "/categories-item/vegetable/english_cucumber.png",
    buttonURL: "/item/english_cucumber",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 20,
    discountValue: 9,
    savingAmount: 11,
    offers: [{ price: 24, quantity: 8, unit: unit.kg }, { price: 50, quantity: 7, unit: unit.kg },],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", vegetable: "indian vegetable" },
    outOfStock: false,
    category:"vegetable"
  },
]

const rationOilList: Itemlist[] = [
  {
    name: "Basmati Rice",
    imageURL: "/categories-item/ration-oil/basmati_rice.png",
    buttonURL: "/item/basmati_rice",
    quantity: 2.5,
    primarySize: 2.5,
    secondarySize: 0,
    mrp: 44,
    discountValue: 10,
    savingAmount: 34,
    offers: [{ price: 33, quantity: 20, unit: unit.kg, superSaver: true }],
    unit: unit.kg,
    brand: "India Gate",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "vanaspati & others" },
    outOfStock: false,
    category:"ration_pulses_oil"
  },
  {
    name: "Tur Dal",
    imageURL: "/categories-item/ration-oil/tur_dal.png",
    buttonURL: "/item/tur_dal",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 150,
    discountValue: 140,
    savingAmount: 10,
    offers: [{ price: 138, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "toor, kabuli & channa dal" },
    outOfStock: false,
    category:"ration_pulses_oil"
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
    brand: "Fortune",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "sunflower oil" },
    outOfStock: false,
    category:"ration_pulses_oil"
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
    offers: [{ price: 10, quantity: 45.5, unit: unit.gm }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "vanaspati & others" },
    outOfStock: false,
    category:"ration_pulses_oil"
  },
  {
    name: "Vibhor Soyabean Oil",
    imageURL: "/categories-item/ration-oil/vibhor.png",
    buttonURL: "/item/vibhor_soyabean_oil",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 120,
    discountValue: 114,
    savingAmount: 0,
    offers: [{ price: 113, quantity: 10, unit: unit.ltr }],
    unit: unit.ltr,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "soyabean oil" },
    outOfStock: false,
    category:"ration_pulses_oil"
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
    savingAmount: 0,
    offers: [{ price: 70, quantity: 50, unit: unit.gm }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", ration_pluses_oil: "vanaspati & others" },
    outOfStock: false,
    category:"ration_pulses_oil"
  }
];
const dairyList: Itemlist[] = [
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
    brand: "amul",
    secondaryUnit: unit.none,
    type: { all: "all", dairy: "milk & milk powder" },
    outOfStock: false,
    category:"dairy"
  },
  {
    name: "Amul Butter",
    imageURL: "/categories-item/dairy/amul_butter.png",
    buttonURL: "/item/amul_butter",
    quantity: 1,
    primarySize: 1,
    secondarySize: 500,
    mrp: 5500,
    discountValue: 500,
    savingAmount: 500,
    offers: [{ price: 5000, quantity: 500, unit: unit.gm }],
    unit: unit.pkt,
    brand: "amul",
    secondaryUnit: unit.gm,
    type: { all: "all", dairy: "butter" },
    outOfStock: false,
    category:"dairy"

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
    offers: [{ price: 100, quantity: 250, unit: unit.gm }],
    unit: unit.gm,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", dairy: "paneer" },
    outOfStock: false,
    category:"dairy"

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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", dairy: "curd" },
    outOfStock: false,
    category:"dairy"


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
    brand: "amul",
    secondaryUnit: unit.none,
    type: { all: "all", dairy: "cheese" },
    outOfStock: false,
    category:"dairy"


  }
]
  ;
const packagingList: Itemlist[] = [
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
    brand: "Biogreen",
    secondaryUnit: unit.none,
    type: { all: "all", "packaging-materials": "carry bags" },
    outOfStock: false,
    category:"packaging-materials"

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
    brand: "Ecopack",
    secondaryUnit: unit.none,
    type: { all: "all", "packaging-materials": "reusable containers" },
    outOfStock: false,
    category:"packaging-materials"

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
    brand: "Hotpack",
    secondaryUnit: unit.none,
    type: { all: "all", "packaging-materials": "tapes, silverfoil & kitchen wraps" },
    outOfStock: false,
    category:"packaging-materials"

  },
  {
    name: "Paper Napkins",
    imageURL: "/categories-item/packaging-material/paper_napkin.png",
    buttonURL: "/item/paper_napkins",
    quantity: 10,
    primarySize: 10,
    secondarySize: 10,
    mrp: 2000,
    discountValue: 400,
    savingAmount: 400,
    offers: [{ price: 1600, quantity: 1, unit: unit.pkt }],
    unit: unit.pkt,
    brand: "Packman Packaging",
    secondaryUnit: unit.pcs,
    type: { all: "all", "packaging-materials": "cutlery & tissues" },
    outOfStock: false,
    category:"packaging-materials"

  },
  {
    name: "Garbage Bags",
    imageURL: "/categories-item/packaging-material/garbage_bags.png",
    buttonURL: "/item/garbage_bags",
    quantity: 2,
    primarySize: 2,
    secondarySize: 50,
    mrp: 3000,
    discountValue: 300,
    savingAmount: 300,
    offers: [{ price: 2700, quantity: 30, unit: unit.pcs }],
    unit: unit.pkt,
    brand: "Pactiv",
    secondaryUnit: unit.pcs,
    type: { all: "all", "packaging-materials": "carry bags" },
    outOfStock: false,
    category:"packaging-materials"
    //it should not be here
  }
]
  ;
const masalaList: Itemlist[] = [
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
    brand: "kbm",
    secondaryUnit: unit.none,
    type: { all: "all", masala: "chilli, turmeric & coriander powder" },
    outOfStock: false,
    category:"masala"

  },
  {
    name: "Red Chili Powder",
    imageURL: "/categories-item/masala/chilli_powder.png",
    buttonURL: "/item/chili_powder",
    quantity: 100,
    primarySize: 100,
    secondarySize: 0,
    mrp: 500,
    discountValue: 100,
    savingAmount: 400,
    offers: [{ price: 80, quantity: 1000, unit: unit.kg }],
    unit: unit.kg,
    brand: "kbm",
    secondaryUnit: unit.none,
    type: { all: "all", masala: "chilli, turmeric & coriander powder" },
    outOfStock: false,
    category:"masala"


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
    brand: "kbm",
    secondaryUnit: unit.none,
    type: { all: "all", masala: "chilli, turmeric & coriander powder" },
    outOfStock: false,
    category:"masala"


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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", masala: "whole spices" },
    outOfStock: false,
    category:"masala"


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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", masala: "salt & sugar" },
    outOfStock: false,
    category:"masala"

  }
]
  ;
const riceFlourList: Itemlist[] = [
  {
    name: "Basmati Rice",
    imageURL: "/categories-item/rice-flours/basmati_rice.png",
    buttonURL: "/item/basmati_rice",
    quantity: 5,
    primarySize: 5,
    secondarySize: 0,
    mrp: 500,
    discountValue: 5000,
    savingAmount: 5000,
    offers: [{ price: 45000, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
    brand: "India Gate",
    secondaryUnit: unit.none,
    type: { all: "all", "rice_flours": "rice" },
    outOfStock: false,
    category:"rice_flours"


  },
  {
    name: "Wheat Flour",
    imageURL: "/categories-item/rice-flours/wheat_flour.png",
    buttonURL: "/item/wheat_flour",
    quantity: 10,
    primarySize: 10,
    secondarySize: 0,
    mrp: 4000,
    discountValue: 2000,
    savingAmount: 2000,
    offers: [{ price: 1800, quantity: 10, unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", "rice_flours": "flours" },
    outOfStock: false,
    category:"rice_flours"

  },
  {
    name: "Multigrain Atta",
    imageURL: "/categories-item/rice-flours/multigrain_atta.png",
    buttonURL: "/item/multigrain_atta",
    quantity: 5,
    primarySize: 5,
    secondarySize: 0,
    mrp: 600,
    discountValue: 5000,
    savingAmount: 5000,
    offers: [{ price: 55000, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
    brand: "Aashirvaad",
    secondaryUnit: unit.none,
    type: { all: "all", "rice_flours": "flours" },
    outOfStock: false,
    category:"rice_flours"

  },
  {
    name: "Rice Flour",
    imageURL: "/categories-item/rice-flours/rice_flour.png",
    buttonURL: "/item/rice_flour",
    quantity: 2,
    primarySize: 2,
    secondarySize: 0,
    mrp: 1800,
    discountValue: 300,
    savingAmount: 1500,
    offers: [{ price: 150, quantity: 10, unit: unit.kg }],
    unit: unit.kg,
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", rice_flours: "flours" },
    outOfStock: false,
    category:"rice_flours"

  },
  {
    name: "Maida",
    imageURL: "/categories-item/rice-flours/maida.png",
    buttonURL: "/item/maida",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 100,
    discountValue: 1500,
    savingAmount: 1500,
    offers: [{ price: 8500, quantity: 1, unit: unit.kg }],
    unit: unit.kg,
    brand: "AS",
    secondaryUnit: unit.none,
    type: { all: "all", rice_flours: "maida" },
    outOfStock: false,
    category:"rice_flours"

  }
]
  ;
const cleaningList: Itemlist[] = [
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
    brand: "harpic",
    secondaryUnit: unit.none,
    type: { all: "all", cleaning_consumables: "toilet & bathroom cleaner" },
    outOfStock: false,
    category:"cleaning_consumables"

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
    brand: "vim",
    secondaryUnit: unit.none,
    type: { all: "all", cleaning_consumables: "dishwash & detergents" },
    outOfStock: false,
    category:"cleaning_consumables"

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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", cleaning_consumables: "floor & glass cleaner" },
    outOfStock: false,
    category:"cleaning_consumables"

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
    brand: "generic",
    secondaryUnit: unit.none,
    type: { all: "all", cleaning_consumables: "cleaning tools" },
    outOfStock: false,
    category:"cleaning_consumables"

  },
  {
    name: "Scrubber Pads",
    imageURL: "/categories-item/cleaning-consumables/scrubber_pad.png",
    buttonURL: "/item/scrubber_pad",
    quantity: 3,
    primarySize: 3,
    secondarySize: 0,
    mrp: 1500,
    discountValue: 30,
    savingAmount: 300,
    offers: [{ price: 1200, quantity: 3, unit: unit.pcs }],
    unit: unit.pcs,
    brand: "vim",
    secondaryUnit: unit.none,
    type: { all: "all", cleaning_consumables: "consumables" },
    outOfStock: false,
    category:"cleaning_consumables"

  }
]
  ;
const confectionaryList: Itemlist[] = [
  {
    name: "Ketchup Bottle",
    imageURL: "/categories-item/confectionary-sauces/ketchup.png",
    buttonURL: "/item/ketchup",
    quantity: 1,
    primarySize: 1,
    secondarySize: 1,
    mrp: 120,
    discountValue: 110,
    savingAmount: 2000,
    offers: [{ price: 100, quantity: 5, unit: unit.kg }],
    unit: unit.kg,
    brand: "kissan",
    secondaryUnit: unit.ltr,
    type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
    outOfStock: false,
    category:"confectionary_sauces"

  },
  {
    name: "Chocolate Bar",
    imageURL: "/categories-item/confectionary-sauces/chocolate_bar.png",
    buttonURL: "/item/chocolate_bar",
    quantity: 1,
    primarySize: 1,
    secondarySize: 0,
    mrp: 5000,
    discountValue: 50,
    savingAmount: 500,
    offers: [{ price: 4500, quantity: 1, unit: unit.pc }],
    unit: unit.pc,
    brand: "amul",
    secondaryUnit: unit.none,
    type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
    outOfStock: false,
    category:"confectionary_sauces"



  },
  {
    name: "Mayonnaise",
    imageURL: "/categories-item/confectionary-sauces/mayo.png",
    buttonURL: "/item/mayo",
    quantity: 250,
    primarySize: 250,
    secondarySize: 0,
    mrp: 900,
    discountValue: 100,
    savingAmount: 1500,
    offers: [{ price: 7500, quantity: 250, unit: unit.gm }],
    unit: unit.gm,
    brand: "freshy+",
    secondaryUnit: unit.none,
    type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
    outOfStock: false,
    category:"confectionary_sauces"



  },
  {
    name: "Jam Jar",
    imageURL: "/categories-item/confectionary-sauces/jam.png",
    buttonURL: "/item/jam",
    quantity: 50,
    primarySize: 500,
    secondarySize: 0,
    mrp: 130,
    discountValue: 30,
    savingAmount: 3000,
    offers: [{ price: 10000, quantity: 500, unit: unit.gm }],
    unit: unit.gm,
    brand: "yumsie",
    secondaryUnit: unit.none,
    type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
    outOfStock: false,
    category:"confectionary_sauces"



  },
  {
    name: "Chewing Gum Pack",
    imageURL: "/categories-item/confectionary-sauces/chewing_gum.png",
    buttonURL: "/item/chewing_gum",
    quantity: 1,
    primarySize: 10,
    secondarySize: 0,
    mrp: 40,
    discountValue: 20,
    savingAmount: 200,
    offers: [{ price: 1800, quantity: 10, unit: unit.pcs }],
    unit: unit.pcs,
    brand: "freshy+",
    secondaryUnit: unit.none,
    type: { all: "all", confectionary_sauces: "cheese blend & other sauces" },
    outOfStock: false,
    category:"confectionary_sauces"



  }
]
  ;
export const categoryInformationList: CategoryItemInformation[] = [
  {
    name: "vegetables",
    imageURL: "/categories/vegetables.png",
    buttonURL: "/category/vegetable",
    list: vegetableList,
    bgcolor: "bg-linear-to-t via-[#61f966] to-[#ffffff]"
    , shortDescription: "fresh quality",
    type: vegetableType
  },
  {
    name: "ration, pulses & oil",
    imageURL: "/categories/ration_pulses_oil.png",
    buttonURL: "/category/ration_pulses_oil",
    list: rationOilList,
    bgcolor: "bg-linear-to-t via-[#f9de06] to-[#ffffff]"
    , shortDescription: "all kind of pulses and oil",
    type: vegetableType
  }, {
    name: "dairy product",
    imageURL: "/categories/dairy.png",
    buttonURL: "/category/dairy",
    list: dairyList,
    bgcolor: "bg-linear-to-t via-[#099FFF] to-[#ffffff]"
    , shortDescription: "for professional kitchen",
    type: dairyType
  }, {
    name: "packaging materials",
    imageURL: "/categories/packaging_materials.png",
    buttonURL: "/category/packaging-material",
    list: packagingList,
    bgcolor: "bg-linear-to-t via-[#D4A995] to-[#ffffff]"
    , shortDescription: "pack food with ease",
    type: packagingMaterialsType
  },
  {
    name: "masala & salt",
    imageURL: "/categories/masala_salt.png",
    buttonURL: "/category/masala_salt",
    list: masalaList,
    bgcolor: "bg-linear-to-t via-[#E16221] to-[#ffffff]"
    , shortDescription: "spicy and fragrant",
    type: masalaType
  },
  {
    name: "rice & flours",
    imageURL: "/categories/rice_flours.png",
    buttonURL: "/category/rice_flours",
    list: riceFlourList,
    bgcolor: "bg-linear-to-t via-[#fcefbb] to-[#ffffff]"
    , shortDescription: "all types of rices and flours",
    type: riceFloursType
  },
  {
    name: "cleaning & consumables",
    imageURL: "/categories/cleaning_consumables.png",
    buttonURL: "/category/cleaning_consumables",
    list: cleaningList,
    bgcolor: "bg-linear-to-t via-[#FFD300] to-[#ffffff]"
    , shortDescription: "maintain total hygiene",
    type: cleaningConsumbalesType
  },
  {
    name: "confectionary & sauces",
    imageURL: "/categories/confectionary_sauces.png",
    buttonURL: "/category/confectionary_sauces",
    list: confectionaryList,
    bgcolor: "bg-linear-to-t via-[#543398] to-[#ffffff]"
    , shortDescription: "tangy, spicy and sweets",
    type: confectionarySaucesType
  }
]

//SELECT * FROM TABLE WHERE category = <categoryType>
export const categoryItemInfo = {
  "vegetable": {
    name: "vegetables",
    imageURL: "/categories/vegetables.png",
    buttonURL: "/category/vegetable",
    list: vegetableList,
    bgcolor: "bg-linear-to-t via-[#61f966] to-[#ffffff]"
    , shortDescription: "fresh quality",
    type: vegetableType
  },
  "rationpulsesoil": {
    name: "ration, pulses & oil",
    imageURL: "/categories/ration_pulses_oil.png",
    buttonURL: "/category/ration_pulses_oil",
    list: rationOilList,
    bgcolor: "bg-linear-to-t via-[#f9de06] to-[#ffffff]"
    , shortDescription: "all kind of pulses and oil",
    type: rationPulsesOilTypes
  }, "dairy": {
    name: "dairy product",
    imageURL: "/categories/dairy.png",
    buttonURL: "/category/dairy",
    list: dairyList,
    bgcolor: "bg-linear-to-t via-[#099FFF] to-[#ffffff]"
    , shortDescription: "for professional kitchen",
    type: dairyType
  }, "packagingmaterials": {
    name: "packaging materials",
    imageURL: "/categories/packaging_materials.png",
    buttonURL: "/category/packaging-material",
    list: packagingList,
    bgcolor: "bg-linear-to-t via-[#D4A995] to-[#ffffff]"
    , shortDescription: "pack food with ease",
    type: packagingMaterialsType
  }, "masalasalt": {
    name: "masala & salt",
    imageURL: "/categories/masala_salt.png",
    buttonURL: "/category/masala_salt",
    list: masalaList,
    bgcolor: "bg-linear-to-t via-[#E16221] to-[#ffffff]"
    , shortDescription: "spicy and fragrant",
    type: masalaType
  },
  "riceflours": {
    name: "rice & flours",
    imageURL: "/categories/rice_flours.png",
    buttonURL: "/category/rice_flours",
    list: riceFlourList,
    bgcolor: "bg-linear-to-t via-[#fcefbb] to-[#ffffff]"
    , shortDescription: "all types of rices and flours",
    type: riceFloursType
  },
  "cleaningconsumables": {
    name: "cleaning & consumables",
    imageURL: "/categories/cleaning_consumables.png",
    buttonURL: "/category/cleaning_consumables",
    list: cleaningList,
    bgcolor: "bg-linear-to-t via-[#FFD300] to-[#ffffff]"
    , shortDescription: "maintain total hygiene",
    type: cleaningConsumbalesType
  },
  "confectionarysauces": {
    name: "confectionary & sauces",
    imageURL: "/categories/confectionary_sauces.png",
    buttonURL: "/category/confectionary_sauces",
    list: confectionaryList,
    bgcolor: "bg-linear-to-t via-[#543398] to-[#ffffff]"
    , shortDescription: "tangy, spicy and sweets",
    type: confectionarySaucesType
  }
}

export const categoryTypeValue = {
  all: "all",
  vegetable: vegetableType,
  dairy: dairyType,
  "masala_salt": masalaType,
  "packaging-materials": packagingMaterialsType,
  "rice_flours": riceFloursType,
  "cleaning_consumables": cleaningConsumbalesType,
  "confectionary_sauces": confectionarySaucesType,
  "ration_pulses_oil": rationPulsesOilTypes,
}

export const brandValueCategoryWise = {
  vegetable: ["generic"],
  dairy: ["generic", "amul", "go", "good rich", "nutralite", "delight", "mother dairy", "ananda", "patanjali"],
  "masala_salt": ["generic", "mk", "mdh", "everest", "catch", "rajesh", "goldiee", "tata", "kbm"],
  "packaging-materials": ["generic", "Ecopack", "Hotpack", "Pactiv", "Paper Boat Packaging", "Biogreen", "Packman Packaging"],
  "rice_flours": ["generic", "India Gate", "Daawat", "Fortune", "Aashirvaa  d", "Tata Sampann", "Kohinoor", "Delhi mills", "Rajdhani", "AS"],
  "cleaning_consumables": ["generic", "harpic", "lifeboy", "vim", "NIP"],
  "confectionary_sauces": ["generic", "funfoods", "veeba", "golden crown", "rajdhani", "kissan", "tops", "yumsie", "freshy+", "amul"],
  "ration_pulses_oil": ["generic", "fortune", "aashirvaad", "wilmar", "raag gold", "mahakosh", "vibhor", "vanaspati"],
}

export type allBrand =
  "generic" |
  "amul" |
  "go" |
  "good rich" |
  "nutralite" |
  "delight" |
  "mother dairy" |
  "ananda" |
  "patanjali" |
  "mk" |
  "mdh" |
  "everest" |
  "catch" |
  "rajesh" |
  "goldiee" |
  "tata" |
  "Ecopack" |
  "Hotpack" |
  "Pactiv" |
  "Paper Boat Packaging" |
  "Biogreen" |
  "Packman Packaging" |
  "India Gate" |
  "Daawat" |
  "Fortune" |
  "Aashirvaad" |
  "Tata Sampann" |
  "Kohinoor" |
  "Delhi mills" |
  "Rajdhani" |
  "AS" |
  "harpic" |
  "lifeboy" |
  "vim" |
  "NIP" |
  "funfoods" |
  "veeba" |
  "golden crown" |
  "wilmar" |
  "raag gold" |
  "mahakosh" |
  "vibhor" | "kbm" | "kissan" | "freshy+" | "yumsie" | "tops"| "vanaspati";
