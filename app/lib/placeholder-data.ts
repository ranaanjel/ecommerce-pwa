
// fetching data from database of it can remain permanent here - is not required to be that dynamic.
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