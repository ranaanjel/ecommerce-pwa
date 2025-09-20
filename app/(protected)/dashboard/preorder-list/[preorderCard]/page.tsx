"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { SkeletonPreOrderCard } from "@/app/(protected)/ui/skeletonPreOrderCard";
import { Itemlist, Preorder, unit } from "@/app/(protected)/lib/placeholder-data";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon, MagicWandIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ItemCard } from "@/app/(protected)/ui/dashboard/itemCard";
import { ConfirmModal } from "@/app/(protected)/ui/confirmModal";
import { localPreorder } from "@/app/(protected)/lib/utils";
import { Trash2Icon } from "lucide-react";
import { crateItemInterface, crateItemInterfaceEach } from "@/app/(protected)/lib/definitions";
import { Crate } from "@/actions/databaseCall";

export default function Page() {
    let [data, setData] = useState<Preorder>({
        title: "",
        description: "",
        imageURL: "",
        buttonURL: "",
        list: [],
        bgTitle: "",
        bgBody: "",
        iconURL:""
    })
    let params = String(useParams().preorderCard);
    let router = useRouter()

    // console.log(data)

    // if (localStorage.getItem(localPreorder)) {
    //     let dataResult = JSON.parse(localStorage.getItem(localPreorder) as string);
    //     params = params.replace(/_/g, " ")
    //     //console.log(dataResult[params], params)
    //     if (params in dataResult) {
    //         data = dataResult[params]
    //     }
    // } else {
        // localStorage.setItem(localPreorder, "{}");
    // }

    useEffect(function () {
        let url = window.location.origin + "/query/v1/preorder-list/" + params;

        localStorage.setItem(localPreorder, "{}");
        axios.get(url).then(m => {
            // console.log(m.data.result)
            // console.log(m.data.result)
            if (m.data.result == "non-found") { // rarely going to use for the fallback 
                    router.push("/not-found-404")
                //TODO - pushing the data to the database for future references
            }else {
                  setData(() => {
                let value: Preorder = m.data.result;
                let newdata = {
                    title: value.title,
                    description: value.description,
                    imageURL: value.imageURL,
                    iconURL:value.iconURL,
                    buttonURL: value.buttonURL,
                    list: value.list,
                    bgTitle: value.bgTitle,
                    bgBody: value.bgBody,
                    type: value.type
                };

                return newdata
            })
            }
          
        }).catch(err => {
            console.log("error")
        })
    }, [params, router])

    return <div>
        {
            data.title == "" ? <SketelonPage></SketelonPage> : null
        }
        {
            data.title ? <PreorderCardPage iconURL={data.iconURL} buttonURL={data.buttonURL} title={data.title} imageURL={data.imageURL} list={data.list} bgTitle={data.bgTitle} bgBody={data.bgBody} type={data.type} description={data.description} ></PreorderCardPage> : ""
        }
    </div>
}

function SketelonPage() {
    return <div>
        <div className="w-full h-36 bg-gray-200 animate-pulse"></div>
        <SkeletonPreOrderCard />
    </div>
}

function PreorderCardPage({ title, description, imageURL, list, bgTitle, bgBody, type, buttonURL }: Preorder) {

    let currentPreorderData = useRef<any[]>([]);

    //adding more items - local storage using for that
    //three section  -- header , body, fixed times.
    const router = useRouter();
    if(!imageURL.includes("_page.png") && !imageURL.startsWith("https://")) {
        imageURL = imageURL.replace(".png", "_page.png");
    }
    const [items, setItems] = useState(list) // current item list of preorder card
    const [openModal, setOpenModal] = useState(false);
    const [itemDelete, setItemDelete] = useState("");
    const [wholeListDelete, setWholeListDelete ] = useState(false)

    // console.log(itemDelete, items)

    return <div className="select-none h-screen overflow-hidden relative">
        <div className={"overflow-hidden relative  p-4 pt-8 h-36 " + bgTitle}>
            <div className="flex relative z-2 justify-between text-white">
                <div className="bg-logo" onClick={function () {
                    router.back()
                }}>
                    <ChevronLeftIcon className="size-7" />
                </div>
                <div onClick={function () {
                    router.push("/dashboard/search")
                }}>
                    < MagnifyingGlassIcon className="size-7" />
                </div>
            </div>
            <div className="absolute z-1 flex justify-center items-center w-full h-full top-0 left-0 flex-1">
                <Image src={imageURL} alt={title} width={200} className="w-[250px] h-42 object-contain" height={200} />
            </div>
            <div className="custor-pointer h-auto w-auto" onClick={function () {
                setItemDelete(title.toLocaleLowerCase())
                setWholeListDelete(true)
                setOpenModal(true)
            }}> 
                <Trash2Icon className="z-10 cursor-pointer size-6 text-yellow-500 absolute right-4  bottom-4" />
            </div>
        </div>
        <div className={bgBody + " p-4 h-[80%] pb-18 overflow-scroll"}>

            <div className="flex justify-between">
                <div>
                    <div className="font-bold text-2xl capitalize">{title}</div>
                    <div className="font-normal text-sm text-gray-500">{description}</div>
                </div>
                <div className="bg-logo flex justify-center items-center px-2 rounded-sm text-white" onClick={function () { // redirecting to the page for adding the more items // making sure we are adding the item list to the localstorage
                    router.push(buttonURL+"/add-to-list")

                }}>
                    Add more items
                </div>
            </div>

            {
                items.length > 0 ? <div className="grid grid-cols-2 gap-2 pt-4">
                    {
                        items.map((m: Itemlist, index) => {
                            let name = m.name;
                            let imageURL = m.imageURL;
                            let buttonURL = m.buttonURL;
                            let quantity = m.quantity;
                            let primarySize = m.primarySize;
                            let secondarySize = m.secondarySize;
                            let mrp = m.mrp;
                            let discountPrice = m.discountValue;
                            let savingAmount = m.savingAmount;
                            let offers = m.offers;
                            let unit = m.unit;
                            let brand = m.brand;
                            let secondaryUnit = m.secondaryUnit;
                            let conversion = m.conversionRate || 0;
                            let outofstock = m.outOfStock
                            let comingSoon = m.comingSoon
                            let category = m.category ?? "all";
                            let currentQuant = m.currentQuantity ?? 1;

                            return <ItemCard setItemDelete={setItemDelete} setOpenModal={setOpenModal} cardType="preorder" key={index} category={category} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} outOfStock={outofstock} comingSoon={comingSoon} currentQuantity={currentQuant} currentData={currentPreorderData} />

                        })
                    }
                </div> : null
            }

        </div>
        <div className="h-21 border-t border-gray-200 bg-white fixed bottom-0 p-4 shadow-xs z-10  w-full">
            {/* //add to cart fixed on the page */}
            <div className="flex justify-between items-center px-8 py-4 text-white bg-logo rounded-sm cursor-pointer text-xl" onClick={ async function () {
                // making the crate -- localstorage filled with the current list 

                let localstorageObject;

                if (!localStorage.getItem("crate")) {
                    localstorageObject = localStorage.setItem("crate", "{}");
                }

                localstorageObject = JSON.parse(localStorage.getItem("crate") as string);
                
                for (var items of currentPreorderData.current) {

                    if (!(items.itemname in localstorageObject)) {
                        localstorageObject[items.itemname] = items;
                        // console.log("creating", items, localstorageObject)
                    } else {
                        localstorageObject[items.itemname].quant = items.quant;
                        // console.log("changing", items.itemname)
                    }
                    if(items.skip || items.outofstock) {
                        delete localstorageObject[items.itemname]
                    }

                }
                //TODO --> adding only the values required --> skip, quant and itemId
                
                 let dataToPushListUpdate = Object.values(localstorageObject).map((m:any)=> {
                    return {name:m.itemname, currentQuantity:m.quant }
                 })
                 console.log(dataToPushListUpdate)
                 let url = window.location.origin + "/query/v1/preorder-list/updateitems/"+(title as string).replace(/_/g," ");
                      try {
                         let returnValue = await axios.post(url, {
                            data:dataToPushListUpdate
                        })
                        // there is no error 
                        // router.push("/dashboard/preorder-list/" + params)
                      }catch (err) {
                        console.log(err, "error occured while putting the data")
                      }
                      
                await Crate(Array.from(Object.values(localstorageObject))) 
                //updating the list at the backend end as well crate value for later on fetching.
               
               localStorage.setItem("crate", JSON.stringify(localstorageObject));
                // console.log(localStorage.getItem("crate"))
                // value and redirecting to the /dashboard/crates
                // console.log(currentPreorderData)
                 router.push("/dashboard/crate")
            }}>
                <div>
                    {items.length} items |
                </div>
                <div >
                    Add to crate
                </div>
            </div>
        </div>
        {openModal && <ConfirmModal type="preorder" preorderName={title.toLowerCase()} wholeList={wholeListDelete} itemDelete={itemDelete} setItems={setItems} setOpenModal={setOpenModal} />}
    </div>

}
//DONE
// ability to have the value in case of previous value -- all the preorder value must have it but not mandatory.
// checking the add to crate value
// ability to delete , modal creation
// delete the item - precard 

//TODO 
// propogating to the database as well. 
// so in the dashboard as per the /dashboard/precard - we get the updated values as well
//import -- add to list, delete items or the change in the values as well.