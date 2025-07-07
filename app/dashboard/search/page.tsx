"use client"
import { CategoryType, Itemlist } from "@/app/lib/placeholder-data";
import { localRecentSearch } from "@/app/lib/utils";
import { BackButton } from "@/app/ui/dashboard/BackButton";
import { BottomBar } from "@/app/ui/dashboard/bottomBar";
import { Categories } from "@/app/ui/dashboard/categoryCard";
import { CrateComponent } from "@/app/ui/dashboard/crateComponent";
import { ItemCard } from "@/app/ui/dashboard/itemCard";
import { SearchBarComponent } from "@/app/ui/dashboard/searchBar";
import { TopBar } from "@/app/ui/dashboard/topBar";
import { FilterModal, filterProps } from "@/app/ui/filterModal";
import { SkeletonLoading } from "@/app/ui/skeletons";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { clear } from "console";
import { HistoryIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";


export default function SearchPage() {
    // const [searchValue, setSearchValue] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [searchProxy, setSearchProxy] = useState(true);
    let [list, setList] = useState<Itemlist[]>([])
    const [fetchDone, setFetchDone] = useState(false)
    const [crateLength, setCrateLength] = useState(0)

    let clearValue: number | ReturnType<typeof setTimeout> = 0
    let localObject: { "recentSearch": string[] };
    if (!localStorage.getItem(localRecentSearch)) {
        // eventually saving it in the user - in the history of the user account.
        localStorage.setItem(localRecentSearch, '{"recentSearch":[]}')
    }

    localObject = JSON.parse(localStorage.getItem(localRecentSearch) as string);

    function keyHandler(eobj: React.KeyboardEvent<HTMLInputElement>) {
        if (searchRef.current) {
            if (searchRef.current.value.trim().length > 0) {
                if (eobj.key == "Enter") {
                    let value = (searchRef.current.value);
                    // first on each keystroke search for the items but when enter removing the suggestion as well or clicking the suggestion will lead to the item place.
                    if (!localObject[localRecentSearch].includes(value)) {
                        if (localObject[localRecentSearch].length > 14) {
                            localObject[localRecentSearch].shift();
                        }
                        localObject[localRecentSearch].push(value);
                        localStorage.setItem(localRecentSearch, JSON.stringify(localObject))
                    }
                    setSearchProxy(false);
                }
            } else {
                return;
            }
        }

    }



    function searchHandle(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log("value input")
        if (searchRef.current) {
            let value = (searchRef.current.value).trim();

            if (value.length > 1) {
                setSearchEnabled(true);

                clearTimeout(clearValue)
                clearValue = setTimeout(function () {

                    //making call to the backend for the data 
                    let url = (window.location.origin);

                    let itemsUrl = url + "/query/v1/items?searchValue=" + value;

                    axios.get(itemsUrl).then(m => {
                        let { items, brandList, typeList, categoryList } = m.data.result;

                        let typeOption = typeList.map((m: string) => {
                            return { id: m, label: m, checked: false }
                        })
                        let brandOption = brandList.map((m: string) => {
                            return { id: m, label: m, checked: false }
                        })
                        let categoryOption = categoryList.map((m: string) => {
                            return { id: m, label: m, checked: false }
                        })
                        setList(items)

                        setCurrentFilter((prev) => {
                            return [prev[0], { id: "type", name: "Type", options: [...typeOption] }, { id: "brand", name: "Brand", options: [...brandOption] }, {
                                id: "category",
                                name: "Category",
                                options: [...categoryOption]
                            },]
                        })
                        setBeforeFilter((prev) => {
                            return [prev[0], { id: "type", name: "Type", options: [...typeOption] }, { id: "brand", name: "Brand", options: [...brandOption] }, {
                                id: "category",
                                name: "Category",
                                options: [...categoryOption]
                            },]
                        })
                        setFetchDone(true);

                    })
                    //once we receive it and then changing the filter and list on the chagne of the 
                    //values.
                }, 1000)

                setList([])
                setFetchDone(false)
                setSearchProxy(true)

            } else {
                setSearchEnabled(false);
                setSearchProxy(true);
                setList([])
            }
        }

    }
    let [currentFilter, setCurrentFilter] = useState<filterProps[]>([{
        id: "price",
        name: "Price",
        options: [{ id: "low to high", label: "Low to High", checked: false, radio: true }, { id: "high to low", label: "high to low", checked: false, radio: true }],
    }, {
        id: "category",
        name: "Category",
        options: []
    },
    {
        id: "type",
        name: "Type",
        options: [],
    },
    {
        id: "brand",
        name: "Brand",
        options: [],
    },])
    let [beforeFilter, setBeforeFilter] = useState(currentFilter);



     let modifiedItemList = [...list];
    currentFilter.forEach(m => {
        if (m.id == "price") {
            //sorting 
            // filter out the value
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }
            // console.log(data)
            let string = data[0].id;
            if (string == "low to high") {
                modifiedItemList.sort((a, b) => {
                    return a.discountValue - b.discountValue;
                })
            } else {

                modifiedItemList.sort((a, b) => {
                    return b.discountValue - a.discountValue;
                })
            }

        } else if (m.id == "brand") {
            //filtering
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }
            let newList:any= []
            data.forEach(m => {
                 for (let x of modifiedItemList ) {
                    if(x.brand == m.id) {
                        newList.push(x)
                    }
                 }
                
            })

            modifiedItemList = newList;


        } else if (m.id == "type") {
            //filtering
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }

            let newList:any= []
            //requires to send the type
            // console.log(typeCategory, modifiedItemList)
            data.forEach(m => {

                 for (let x of modifiedItemList ) {
                    
                    if (Object.values(x.type!).includes(m.id)) {
                        newList.push(x)
                    }
                    //@ts-ignore
                    // console.log(Object.values(x.type!), Object.values(x.type!).includes(m.id))
                 }
                
            })

            // console.log(modifiedItemList)

            modifiedItemList = newList;
        } else if (m.id == "category") {
            //filtering
            let data = m.options.filter(m => m.checked)
            if (data.length == 0) {
                return;
            }

            let newList:any= []
            data.forEach(m => {
                 for (let x of modifiedItemList ) {
                    
                    if (x.category == m.id) {
                        newList.push(x)
                    }
                 }
                
            })

            // console.log(modifiedItemList)

            modifiedItemList = newList;
        }
    })

    list = modifiedItemList; 


    return <div className="text-black relative h-screen overflow-hidden w-full bg-white">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative gap-3">
                <div className="flex flex-start items-center mb-2 flex-1">
                    <BackButton />
                    <div className="flex flex-col flex-1">
                        <SearchBarComponent onKeypressHandler={keyHandler}  refValue={searchRef} onClickHandler={searchHandle} />
                    </div>
                </div>
                <div className="flex items-center gap-2  mb-2">
                    <CrateComponent />
                </div>
            </div>
        </TopBar>
        <BottomBar />
        {
            searchEnabled ? <div className="h-screen bg-white">

                {
                    searchProxy ? <div>
                        <SearchList list={list}></SearchList>
                    </div> : <div className="h-screen">

                        {list.length !== 0 ? <div className="h-screen">
                            <FilterModal filterProps={currentFilter} setFilterProps={setCurrentFilter} beforeFilter={beforeFilter} setBeforeFilter={setBeforeFilter}></FilterModal>
                            <div className="grid grid-cols-2 gap-2 p-6 overflow-y-scroll h-[80%]  pb-21">
                                {
                                list.map((m, index) => {
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
                                    let conversion = m.conversionRate
                                    let outofstock = m.outOfStock
                                    let comingSoon = m.comingSoon
                                    let category = m.category ?? "all";
                                    return <ItemCard cardType="category" key={index} category={category} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} outOfStock={outofstock} comingSoon={comingSoon} />
                                })

                            }
                            </div>
                        </div> : <div> {
                            fetchDone ?
                                <ItemNotFound searchValue={searchRef}></ItemNotFound> : <div className="px-6">
                                    <SkeletonLoading />
                                </div>
                        }
                        </div>
                        }
                    </div>
                }
            </div> : <div className="p-4 bg-white">
                <RecentSearch searchInput={searchRef} />
                <CategoiesLine />
            </div>
        }

    </div>
}

function RecentSearch({ searchInput }: { searchInput: React.RefObject<HTMLInputElement | null> }) {
    let localObject;
    let [prevSearch, setPrevSearch] = useState<string[]>([])
    if (!localStorage.getItem(localRecentSearch)) {
        // eventually saving it in the user - in the history of the user account.
        localStorage.setItem(localRecentSearch, JSON.stringify({ "recentSearch": [] }))
    }

    localObject = JSON.parse(localStorage.getItem(localRecentSearch) as string);
    prevSearch = localObject[localRecentSearch];

    return <div>
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div>Recent Search</div>
                <HistoryIcon />
            </div>
            <div onClick={function () {

                localStorage.setItem(localRecentSearch, JSON.stringify({ "recentSearch": [] }))
                setPrevSearch([])
            }} className="text-red-500 font-thin cursor-pointer">
                clear all
            </div>
        </div>
        <div className="flex flex-wrap gap-4 py-2">
            {

                prevSearch.toReversed().map((m, index) => {

                    return <div key={index} onClick={function () {
                        if (searchInput.current) {
                            searchInput.current.value = m;

                            let keyboardeve = new KeyboardEvent("keydown", {
                                key: "Enter",
                                code: "Enter",
                                keyCode: 13,
                                which: 13,
                                bubbles: true,
                                cancelable: true
                            })
                            searchInput.current.dispatchEvent(keyboardeve)
                            searchInput.current.dispatchEvent(new Event("input", { bubbles: true }))

                        }
                    }} className=" px-2  rounded-lg bg-white text-gray-600 border border-gray-400/50">
                        {m}
                    </div>
                })
            }
        </div>
    </div>
}
function CategoiesLine() {
    return <div>
        <Categories type="line" />
    </div>
}

function SearchList({ list }: { list: Itemlist[] }) {

    let router = useRouter()

    return <div className="flex flex-col gap-4">
        {
            list.length > 0 ? <div>

                {
                    list.slice(0, 6).map(((m, index) => {

                        return <div onClick={function () {
                            router.push(m.buttonURL)
                        }} key={index} className="flex px-10 my-2 gap-2 w-full h-14 ">
                            <div className="border-gray-200/40 flex justify-center items-center h-14 w-2/10">
                                <Image src={m.imageURL} alt={m.name} height={50} width={50} className="w-[50px] h-[50px] object-contain" />
                            </div>
                            <div className=" h-14 bg-sky-200/40 w-8/10 flex flex-start items-center">
                                <div className="px-2 text-gray-700 capitalize">
                                    {m.name}
                                </div>
                            </div>
                        </div>

                    }))
                }

            </div> : <SearchSkeleton />
        }
    </div>
}

function SearchSkeleton() {
    let array = (new Array(5)).fill(null)


    return <div>{
        array.map((m, index) => {
            return <div key={index} className="flex px-6 my-2 gap-2 w-full h-14 animate-pulse">
                <div className="h-14 bg-gray-200 w-2/10"></div>
                <div className="h-14 bg-gray-200 w-8/10"></div>
            </div>
        })
    }
    </div>
}

function ItemNotFound({ searchValue }: { searchValue: React.RefObject<HTMLInputElement | null> }) {

    let value = ""
    if (searchValue.current) {
        value = searchValue.current.value;
    }

    return <div className="px-4 flex flex-col gap-3">
        <div className="font-thin text-sm">
            Showing results for "<span className="font-semibold">{value}</span>"
        </div>
        <div className="my-2 w-4/5 text-4xl text-gray-200 font-extrabold ">
            did't find what you were looking for ? <Image src="/sorry.webp" width={75} height={75} alt="sorry" className="inline" />
        </div>
        <div className="text-sm text-gray-300">
            suggest something & we 'll look into it
        </div>
        <a href="tel:8287470325" className="border border-gray-300 text-logo py-2 px-4 self-start rounded-sm bg-white">Suggest a product</a>

    </div>
}