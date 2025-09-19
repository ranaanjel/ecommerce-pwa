"use client"

import { Itemlist, Preorder } from "@/app/(protected)/lib/placeholder-data";
import { localPreorder } from "@/app/(protected)/lib/utils";
import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { CrateComponent } from "@/app/(protected)/ui/dashboard/crateComponent";
import { Footer } from "@/app/(protected)/ui/dashboard/footer";
import { ItemCard } from "@/app/(protected)/ui/dashboard/itemCard";
import { SearchBarComponent } from "@/app/(protected)/ui/dashboard/searchBar";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";
import { CategoryLoading } from "@/app/(protected)/ui/loadingComponent";
import { SelectComponent } from "@/app/(protected)/ui/seletComponent";
import { SkeletonLoading } from "@/app/(protected)/ui/skeletons";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"

import React, { SetStateAction, useCallback, useEffect, useRef, useState, useTransition } from "react";

export default function AddList() {

    let params = useParams().preorderCard;
    const [crateLength, setCrateLength] = useState(0)
    let title = (params as string).replace(/_/g, " ");
    const router = useRouter()
    let [preorderData, setPreorderData] = useState<Preorder>({
        title: "",
        buttonURL: "",
        imageURL: "",
        list: [],
        description: "",
        bgBody: "",
        bgTitle: "",
        iconURL: ""
    })
    let [listDataOriginal, setDataOriginal] = useState<string[]>([])

    if (localStorage.getItem(localPreorder) != "null" && localStorage.getItem(localPreorder) != "{}"  && localStorage.getItem(localPreorder) != null) {
        let localData = JSON.parse(localStorage.getItem(localPreorder) as string);
        if (title in localData) {
            preorderData = localData[title];
        }
    } else {
        localStorage.setItem(localPreorder, "{}")
    }
    let [currentTotal, setCurrentTotal] = useState(preorderData.list.length)

    useEffect(function () {
        // i don't have to check the localstorage for it since 
        // incase of not in the localstorage 
        let url = window.location.origin + "/query/v1/preorder-list/" + params;

        axios.get(url).then(m => {
            let data = m.data.result;
            if (data == "non-found") {
                if (preorderData.title == "") {
                    router.push("/not-found-404")
                } else {
                    // checking if the data in the database if not then propogating the data to the databse.
                    // most probably it will be there but just in case.
                    //TODO; database check
                }
            } else {
                setPreorderData(data)
                if(preorderData.title == "") {

                    setCurrentTotal(data.list.length)
                }
                setDataOriginal(data.list.map((m:any) => m.name))

            }
        }).catch(err => console.log(err))

    }, [params, preorderData.title, router])


    return <div className="text-black bg-[ebf6f6] overflow-hidden h-screen">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2 gap-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="text-semibold text-xl capitalize whitespace-nowrap overflow-ellipsis">
                            Add to List
                        </div>
                        <div className="text-xs capitalize text-logo">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">

                    <CrateComponent />
                </div>
            </div>
        </TopBar>

        {/* //search bar first */}
        <AllItems allData={preorderData} setCurrentTotal={setCurrentTotal} title={title.toLowerCase()} listData={preorderData.list.map(m => ({ name: m.name }))} />
        <div className="h-21 border-t border-gray-200 bg-white fixed bottom-0 p-4 shadow-xs  w-full">
            {/* //add to cart fixed on the page */}
            <div className="flex justify-between items-center px-8 py-4 text-white bg-logo rounded-sm cursor-pointer text-xl" onClick={async function () {
                //adding to the local stroage of the preorder-item --> list values
                //updating the database as well from here.

                //checking the difference

                if (localStorage.getItem(localPreorder) != "null" && localStorage.getItem(localPreorder) != "{}") {

                    let localData = JSON.parse(localStorage.getItem(localPreorder) as string);

                    if (title in localData) {
                        preorderData = localData[title];
                        // checking the data and seeing the difference for to update the preorder list in the database.

                        let listLocal = preorderData.list.map(m => m.name);
                        let dataChange = listLocal.filter(m => !(listDataOriginal.includes(m)));

                       
                        let url = window.location.origin + "/query/v1/preorder-list/additems/"+(params as string).replace(/_/g," ");

                      try {
                         let returnValue = await axios.post(url, {
                            data:dataChange
                        })
                        // there is no error 
                        // router.push("/dashboard/preorder-list/" + params)
                         router.push("/dashboard/preorder-list/" + params)

                         console.log(returnValue)
                      }catch (err) {
                        console.log(err, "error occured while putting the data")
                      } 
                        // making the current quantity and other things

                    }
                } else {
                    // --- there is no change at all 
                    router.push("/dashboard/preorder-list/" + params)
                }
            }}>
                <div>
                    {currentTotal} items |
                </div>
                <div >
                    Return to list
                </div>
            </div>
        </div>
    </div>
}

function AllItems({ title, setCurrentTotal, listData, allData }: { title: string, setCurrentTotal: React.Dispatch<SetStateAction<number>>, listData: { name: string }[], allData: Preorder }) {

    const searchRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState("")
    const [categoryValue, setCategoryValue] = useState<string[]>([])
    const [currentValue, setCurrentValue] = useState<string>("all")
    const [list, setList] = useState<Itemlist[]>([])
    const [_, startTransition] = useTransition();
    const footerRef = useRef<HTMLDivElement>(null)
    const lastURL = useRef("https://localhost:3000");
    const [offset, setOffset] = useState(0);
    let localOffset = useRef(offset);
    let url = window.location.origin;
    let debounceClear: React.RefObject<ReturnType<typeof setTimeout> | undefined> = useRef(undefined)
    let [fetching, setFetching] = useState(false);
    let [gettingValue, setGettingValue] = useState(true);
    let offsetRef = useRef(0);

    // we are getting items --> item name wise items?searchValue=*** / category wise - categoryItem/<category> 
    // / category/allItem All wise; done


    function categoryChange(category: string) {

        setList([])
        setOffset(0);
        offsetRef.current = 0;

        if (category == "all") {
            let fetchURL = url + "/query/v1/category/allItem?offset="
            lastURL.current = fetchURL;
            localOffset.current = 0;
        } else {
            // category = category.replace(/-|_|&|,|\s/g, "").toLowerCase();
            // if (category == "vegetables") {
            //     category = "vegetables"
            // } else if (category == "dairyproduct") {
            //     category = "dairy product"
            // }

            let fetchURL = url + "/query/v1/categoryItem/" + category.toLocaleLowerCase() + "?offset=";
            lastURL.current = fetchURL;
        }
        if (searchRef.current) {
            searchRef.current.value = ""
        }

        setGettingValue(true)
    }

    // interface ScrollingEvent extends React.UIEvent<HTMLDivElement> { }

    // function scollingFunction(evob: ScrollingEvent): void {

    // }

    let fetchData = useCallback(async function fetchData(observer: IntersectionObserver) {
        //getting the what was the last url we used for the fetch
        //using that again.
        setFetching(true)

        let list: Itemlist[] | any = []

        if (searchRef.current && searchRef.current.value.trim().length > 0) {


            let value = await axios(url + '/query/v1/items/?searchValue=' + searchRef.current.value.trim())
            list = value.data.result;
            list = list.items;

            //since i am not using the offset for the set and it does not make sense for it so we are just copying the same things

            if (!list) {
                setGettingValue(false)
                setList([])
                if (footerRef.current) {
                    setFetching(false)
                    observer.unobserve(footerRef.current)
                    return;
                }
                return
            }
            startTransition(() => {
                setList(() => {

                    return [...list]
                })
                setFetching(false)
            })
            if (footerRef.current) {
                setFetching(false)
                observer.unobserve(footerRef.current)
                return;
            }

            // setOffset(0);
            offsetRef.current = 0;

        } else {
            // console.log( localOffset.current, lastURL.current + localOffset.current, offsetRef.current,"-------------------")
            // console.log(lastURL.current + offsetRef.current)
            let value = await axios(lastURL.current + offsetRef.current)
            list = value.data.result;

            if (!list) {
                setGettingValue(false)
                setList([])
                if (list.length == 0 && footerRef.current) {
                    setFetching(false)
                    observer.unobserve(footerRef.current)
                    return;
                }
                return;
            }
            if (list.length == 0) {
                if (list.length == 0 && footerRef.current) {
                    setFetching(false)
                    observer.unobserve(footerRef.current)
                    return;
                }
                return;
            }
            startTransition(() => {
                setList(prev => {
                    // console.log(offset, localOffset)
                    if (!prev) {
                        return [prev]
                    }
                    if (list.length == 0) {
                        return [...prev]
                    }
                    return [...prev, ...list]
                })
                setFetching(false)
            })

            setOffset(m => {
                localOffset.current = m + 8;
                return m + 8
            })

            offsetRef.current = offsetRef.current + 8;

        }

        setGettingValue(false)



    }, [footerRef])

    useEffect(function () {
        //getting all the items initially 
        let url = window.location.origin;
        let allCategoriesValue = url + "/query/v1/category/all";

        axios(allCategoriesValue).then(m => {
            let result = m.data.result;
            setCategoryValue(result)
        })

        let fetchURL = url + "/query/v1/category/allItem?offset=";
        // axios.get(fetchURL+0).then(m => {
        //     setList(m.data.result)
        // })
        // setOffset(8)
        lastURL.current = fetchURL;

    }, [])

    useEffect(function () {
        let observer = new IntersectionObserver((entry) => {
            entry.forEach(m => {
                if (m.isIntersecting) {
                    //debouncing
                    clearTimeout(debounceClear.current)
                    debounceClear.current = setTimeout(function () {
                        fetchData(observer)
                    }, 800)
                }
            })
        }, { threshold: [0.2] })

        if (footerRef.current) {
            observer.observe(footerRef.current)
        }
        let currentFoot = footerRef.current;
        return () => {
            if (currentFoot) {

                observer.unobserve(currentFoot);
            }
            //localStorage.clear();
            //TODO : later not clearing up - setting a time for clear up and then on the reload using the data to fill the button value as well.
        };

    }, [currentValue, searchValue, fetchData])

    function InputHandler() {


        if (searchRef.current) {
            let value = searchRef.current.value.trim();

            if (value.trim() == "") {
                console.log("empty")
                // return;
            }
            console.log(value, value.length)
            clearTimeout(debounceClear.current);
            if (value.length > 0) {
                console.log("value is above the limit")
                debounceClear.current = setTimeout(function () {
                    console.log(searchRef.current?.value, "---- in the set time out")
                    let value = searchRef.current?.value.trim();
                    console.log(value)
                    let fetchURL = url + '/query/v1/items/?searchValue=' + value;
                    console.log(fetchURL);
                    lastURL.current = fetchURL
                    setList([])
                    setOffset(0)
                    setGettingValue(true);
                    offsetRef.current = 0;
                }, 500)

                return;

            } else {
                let fetchURL = url + '/query/v1/category/allItem/?offset=';
                lastURL.current = fetchURL
                setList([])
                offsetRef.current = 0;
                setOffset(0)
                setCurrentValue("all")
                setGettingValue(true);
                return;


            }

        }
        console.log(lastURL.current)

    }

    return <div className="h-screen bg-white overflow-scroll flex justify-between min-h-screen flex-col" >

        <div className="px-6 "  >
            <div className="flex gap-2 items-center">
                <SearchBarComponent onchangeHandler={setSearchValue} refValue={searchRef} onClickHandler={InputHandler} />
                <SelectComponent setCurrentItem={setCurrentValue} onclickFunction={categoryChange} name={currentValue} list={categoryValue}></SelectComponent>
            </div>
            <div className="" >
                {
                    list.length > 0 ? <div className="grid grid-cols-2 gap-4">
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
                                return <ItemCard allData={allData} preorderListItem={listData} setCurrentTotal={setCurrentTotal} preorderName={title} cardType="preorder-search" key={index} category={category} conversionRate={conversion} name={name} imageURL={imageURL} buttonURL={buttonURL} quantity={quantity} primarySize={primarySize} secondarySize={secondarySize} secondaryUnit={secondaryUnit} mrp={mrp} discountValue={discountPrice} savingAmount={savingAmount} offers={offers} unit={unit} brand={brand} outOfStock={outofstock} comingSoon={comingSoon} />
                            })
                        }

                    </div> : <div >{gettingValue ? <SkeletonLoading /> : <ItemNotFound searchValue={searchRef}></ItemNotFound>}</div>
                } {
                    fetching ? <CategoryLoading></CategoryLoading> : ""
                }
            </div>
        </div>
        <Footer ref={footerRef}></Footer>
    </div>
}

function ItemNotFound({ searchValue }: { searchValue: React.RefObject<HTMLInputElement | null> }) {

    let value = ""
    if (searchValue.current) {
        value = searchValue.current.value;
    }

    return <div className="px-4 flex flex-col gap-3 h-screen">
        <div className="font-thin text-sm">
            Showing results for &quot;<span className="font-semibold">{value}</span>&quot;
        </div>
        <div className="my-2 w-4/5 text-4xl text-gray-200 font-extrabold ">
            did&apos;t find what you were looking for ? <Image src="/sorry.webp" width={75} height={75} alt="sorry" className="inline" />
        </div>
        <div className="text-sm text-gray-300">
            suggest something & we&apos;ll look into it
        </div>
        <a href="tel:8287470325" className="border border-gray-300 text-logo py-2 px-4 self-start rounded-sm bg-white">Suggest a product</a>

    </div>
}