import { unit } from "./placeholder-data";

export type crateItemInterface = {
    offers?: any; category: string, discountPrice: number, itemname: string, mrp: number, quant: number, unit: unit, skip: boolean, primarySize:string, imageURL:string, buttonURL:string
}[];
export type crateItemInterfaceEach = { category: string, discountPrice: number, itemname: string, mrp: number, quant: number, unit: unit, skip: boolean , primarySize:string, imageURL:string, buttonURL:string};
