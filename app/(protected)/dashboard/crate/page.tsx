"use client"
import { CrateContext } from "@/app/(protected)/ui/rootLayoutClient";
import { UserAddress } from "@/app/(protected)/lib/user-placeholder";
import { editId, localCrate, localId, localOrderId } from "@/app/(protected)/lib/utils";
import { GenericButton, SwipeButton } from "@/app/(protected)/ui/button";
import { ConfirmModal } from "@/app/(protected)/ui/confirmModal";
import { BackButton } from "@/app/(protected)/ui/dashboard/BackButton";
import { BottomBar } from "@/app/(protected)/ui/dashboard/bottomBar";
import { TopBar } from "@/app/(protected)/ui/dashboard/topBar";
import { SkeletonLoading } from "@/app/(protected)/ui/skeletons";
import { Cross1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { CameraIcon, ChevronDown, ChevronRight, MapPinCheck, MapPinCheckIcon, MapPinPlus, MessageSquareTextIcon, MessageSquareWarningIcon, PhoneCallIcon, SquarePlus, Trash2Icon, UserRoundCheckIcon } from "lucide-react";
import Image from "next/image";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { crateItemInterface } from "../../lib/definitions";
import { CrateItemCard } from "@/app/(protected)/ui/dashboard/itemCard";
import { useSession } from "next-auth/react";
import { DeleteAddress, InfoValue, pincodeFind } from "@/actions/databaseCall";

// type crateItemEachInterface = { category: string, discountPrice: number, itemname: string, mrp: number, quant: number, unit: unit, skip: boolean, primarySize?: string, imageURL?: string, buttonURL?: string };

export default function Page() {

    // project - each item with id for faster information retrieving

    const { data } = useSession()
    const crateContext = useContext(CrateContext);
    const length = crateContext?.crateLength ?? 0;

    const [openConfirm, setConfirm] = useState(false);
    const [_, setList] = useState<Record<string, crateItemInterface>>({})
    const [userId, setUserId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [instructionModal, setInstructionModal] = useState(false)
    const [instruction, setInstruction] = useState<string[]>([])
    const [address, setAddress] = useState("");
    const [addressModal, setAddressModal] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState<boolean[]>([]);
    // const [accordingIndex, setAccordingIndex] = useState<number[]>([]);
    const [details, setDetails] = useState<UserAddress>({ restaurantName: "", restaurantType: [""], deliveryTiming: "", shopDetails: "", address, pincode: "", receiver: "manager", tag: "", instruction: [], default: false })
    const eachCategoryRef = useRef<HTMLDivElement[]>([])
    const [disable, setDisable] = useState(false); // in case of period
    const [crateList, setCrateList] = useState<[string, crateItemInterface][]>([]);
    const [startPeriod, setStartPeriod] = useState(0)
    const [endPeriod, setEndPeriod] = useState(0)
    const [isPending, startTransition] = useTransition();

    const setLength = useMemo(() => crateContext?.setCrateLength ?? (() => { }), [crateContext?.setCrateLength]);
    const [saving, setSaving] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [noTime, setNoTime] = useState(false);
    const [orderPlace, setOrderPlace] = useState(false);
    const [returnMessage, setReturnMessage] = useState("Placing your order");

    const [fetching, setFetching]  = useState(true);

    const [crateId, setCrateId] = useState("");
    const [type, setType] = useState("")

    const router = useRouter();
    const params = useSearchParams();
    let clearTime = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(function () {

        if (data) {
            let userId = data.user?.id;
            // console.log(localStorage.getItem(editId) != "",  localStorage.getItem(editId))
            if(typeof localStorage == undefined) return;

            
            if (localStorage.getItem(editId) != "" && localStorage.getItem(editId)) {
                console.log("going herer")
                setOrderId(localStorage.getItem(editId) ?? "")
                setType("edit");
            }
            const url =  "/query/v1/order/timing";
            axios.get(url).then(m => {
                let data = m.data.result;
                setStartPeriod(data[0])
                setEndPeriod(data[1])
            }).catch(err => console.log(err))

            setUserId(userId as string)

            if (params.get("type") == "edit") {

                //from /dashboard/order
                setType("edit")
                let address = params.get("address") || "";
                let instruction = params.get("instruction")?.split(",") || [];
                let receiverParam = params.get("receiver");
                let receiver: "staff" | "manager" = receiverParam === "manager" ? "manager" : "staff";
                let tag = params.get("tag") || "";

                setDetails(() => {
                    let value: UserAddress = { restaurantName: "", restaurantType: [""], deliveryTiming: "", shopDetails: "", address, pincode: "", receiver, tag, instruction, default: true }
                    return value;
                })
                setAddress(address)
                setInstruction(prev => {
                    if (!prev) {
                        return [...instruction]
                    }

                    return [...prev, ...instruction]
                })

                //order id for edit
                localStorage.setItem(editId, params.get("orderId") as string);

                if (localStorage.getItem(editId)) {
                    setOrderId(localStorage.getItem(editId) ?? "")
                    clearTimeout(clearTime.current);
                    clearTime.current = setTimeout(function () {
                        setOrderId("")
                        // localStorage.setItem(localOrderId, "") // not required crate since it is default true in db - unique value
                        localStorage.setItem(localCrate, "{}")
                        localStorage.setItem(editId, "")
                        location.reload();
                    }, 1000 * 60 * 10)
                } else {
                    router.push("/dashboard");
                }

            } else if (params.get("type") == "repeat") {
                // only -- creating a new crate and then making sure we are adding to the list
                let address = params.get("address") || "";
                let instruction = params.get("instruction")?.split(",") || [];
                let receiverParam = params.get("receiver");
                let receiver: "staff" | "manager" = receiverParam === "manager" ? "manager" : "staff";
                let tag = params.get("tag") || "";

                //nothing doing - simply returning data -- from order

                startTransition(async function () {
                     let url = "/query/v1/crateList"
                   try {
                     let fetchData = await axios.get(url);
                    localStorage.setItem(localCrate, JSON.stringify(fetchData.data.result))
                    setFetching(false)
                    
                   }catch(err) {
                    
                    console.log(err)
                   }
                })

                setDetails(() => {
                    let value: UserAddress = { restaurantName: "", restaurantType: [""], deliveryTiming: "", shopDetails: "", address, pincode: "", receiver, tag, instruction, default: true }
                    return value;
                })
                setAddress(address)
                setInstruction(prev => {
                    if (!prev) {
                        return [...instruction]
                    }

                    return [...prev, ...instruction]
                })

            } else {

                // console.log(url)
                //gettnig the defaults values address in case of no type 
                startTransition(async function () {

                    let dataReturn = await InfoValue("extra-all");
                    let url =  "/query/v1/crateList"
                   try {
                     let fetchData = await axios.get(url);
                    localStorage.setItem(localCrate, JSON.stringify(fetchData.data.result))
                    // console.log(fetchData.data.result)
                    setFetching(false)
                    // console.log(fetchData.data.result)
                   }catch(err) {
                    console.log(err)
                    setFetching(false)
                   }
                    let { restaurantName, restaurantType, deliveryTiming, shopDetails, address, pincode, receiver, tag, instruction, default: defaultValue, deliveryAvailable } = dataReturn;
                    setDetails(() => {
                        let value: UserAddress = { restaurantName, restaurantType, deliveryTiming, shopDetails, address, pincode, receiver, tag, instruction, default: defaultValue, deliveryAvailable }
                        return value;

                    })
                    setAddress(address)
                    setInstruction(prev => {
                        if (!prev) {
                            return [...(instruction)]
                        }
                        return Array.from(new Set([...prev, ...(instruction)]))
                    })
                })

            }

        }
        //fetching the address, user name, instruction , shop details.
        // data items 
        if (localStorage.getItem(localCrate)) {

            let localObject = JSON.parse(localStorage.getItem(localCrate) as string) ?? {};
            let lengthOriginal = Array.from(Object.keys(localObject)).length;

            let totalValue = 0;
            let fullDiscount = 0;

            let items: crateItemInterface = Array.from(Object.values(localObject));
            items = items.filter(m => !m.skip);
            let listValue: Record<string, crateItemInterface> = {
            }
            setLength(items.length);

            for (var eachItem of items) {
                let category = eachItem.category;
                let currentMRP = eachItem.mrp * eachItem.quant;
                fullDiscount += currentMRP - (eachItem.discountPrice * eachItem.quant);
                totalValue += eachItem.discountPrice * eachItem.quant;
                if (category in listValue) {
                    listValue[category].push(eachItem)
                } else {
                    listValue[category] = [eachItem];
                }
            }
            setList(() => {
                return listValue
            })
            setCrateList(() => {
                let value = Array.from(Object.entries(listValue))
                return value;
            })
            setTotalPrice(totalValue);
            setSaving(fullDiscount);
        }

    }, [params, router, setLength, data])

    return <div className="overflow-hidden h-screen bg-[#ebf6f6] text-black">
        <TopBar>
            <div className="select-none w-full flex justify-between items-center relative ">
                <div className="flex flex-start items-center mb-2">
                    <BackButton />
                    <div className="flex flex-col ">
                        <div className="text-semibold text-xl capitalize whitespace-nowrap overflow-ellipsis">
                            Your Crate
                            <span>{length > 0 ? (" (" + length + ")") : null}</span>
                        </div>
                    </div>
                </div>
                {
                    length > 0 && <div onClick={function () {
                        setConfirm(true)
                        setCrateId("");
                        setOrderId("");
                        
                       if(typeof localStorage == undefined) return;
                        localStorage.setItem(localCrate, "{}")
                        localStorage.setItem(editId, "")

                    }} className="flex items-center gap-2 cursor-pointer">
                        <div className="font-medium bg-logo h-[35px] w-[35px] flex justify-center items-center  rounded-full text-2xl">
                            <Trash2Icon className="text-white size-5" />
                        </div>
                    </div>
                }
            </div>
        </TopBar>
        {/* <BottomBar></BottomBar> */}

                {
                    fetching && <div className="flex justify-center items-center  w-full h-[80px] m-auto">
        <Image src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]" />
    </div>
                }

        {
          !fetching &&   length > 0 && <div>
                <div className="h-screen overflow-scroll bg-[#ebf6f6] pb-32 ">

                    {
                        startPeriod != endPeriod && <CountDownComponent setNoTime={setNoTime} setDisableButton={setDisable} startPeriod={startPeriod} endPeriod={endPeriod}></CountDownComponent>

                    }

                    {
                        orderId.length > 0 && orderId && <div className="flex justify-between items-center border-gray-200 border rounded bg-white py-2 px-4 mt-4 mx-6">
                            <div className="flex justify-center items-center w-[20%] ">
                                <MessageSquareWarningIcon className="size-8 text-yellow-400"></MessageSquareWarningIcon>
                            </div>
                            <div className="w-[80%] flex flex-col gap-1 items-start justify-start text-gray-600 ">
                                <div className="w-[95%] ">
                                    currently editing order : <span className="uppercase text-xs text-yellow-600">{" #" + orderId.slice(0, 16)}</span>
                                </div>
                                <div className="text-xs  w-[95%] text-justify  underline rounded-sm text-red-400 ">
                                    upon not completing modification in 10 mins it will discard automatically
                                </div>
                            </div>
                        </div>
                    }
                    {crateList.length > 0 ? <div className="p-6">
                        {disable ? <div className="bg-white h-16 w-full flex items-center px-4 border border-gray-200" >
                            No Delivery to {details.pincode}
                        </div> : <div className="bg-white h-16 w-full flex items-center px-4 border border-gray-200" >
                            Saved &nbsp; <span className="text-green-500">{" ₹ " + `${saving}` + " "}</span> &nbsp; with free delivery
                        </div>}
                        <div className="bg-white h-auto p-4 flex justify-between gap-4">
                            <div className="flex flex-col overflow-hidden">

                                <div className=""> Delivering to </div>
                                <div className="h-5  overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-600 underline">{address}</div>
                            </div>
                            <div className="flex text-primary" onClick={function () {
                                setAddressModal(true)
                            }}>
                                <div className="self-center">
                                    change
                                </div>
                                <div className="self-center">
                                    <ChevronDown></ChevronDown>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border-gray-200 py-2">

                            {crateList.map((m, index) => {

                                return <div className="px-4 border border-gray-100 py-2 " key={index}>

                                    <div onClick={function () {

                                        if (eachCategoryRef.current) {
                                            let height = (eachCategoryRef.current[index].style.height);
                                            // console.log(height)

                                            if (height == "auto" || isNaN(Number(height)) || height == "") {

                                                eachCategoryRef.current[index].style.height = String((eachCategoryRef.current[index].scrollHeight)) + "px";
                                                setAccordionOpen(prev => {
                                                    const updated = [...prev];
                                                    updated[index] = true;
                                                    return updated;
                                                })
                                                clearTimeout(clearTime.current)
                                                clearTime.current = setTimeout(function () {

                                                    eachCategoryRef.current[index].style.height = 0 + "px";

                                                }, 0)

                                                setAccordionOpen(prev => {
                                                    const updated = [...prev];
                                                    updated[index] = true;
                                                    return updated;
                                                })
                                            }

                                            if ((height == "0px")) {
                                                eachCategoryRef.current[index].style.height = String((eachCategoryRef.current[index].scrollHeight)) + "px";
                                                setAccordionOpen(prev => {
                                                    const updated = [...prev];
                                                    updated[index] = false;
                                                    return updated;
                                                })

                                                clearTimeout(clearTime.current);
                                                clearTime.current = setTimeout(function () {
                                                    eachCategoryRef.current[index].style.height = "auto";

                                                }, 500)

                                            }
                                        }

                                    }} className="flex text-logo justify-between ">
                                        <div>{m[0].replace(/-|_/g, " , ").split(" , ").toReversed().join(" , ").replace(" , ", " & ").split(" ").toReversed().join(" ")} <span>{" (" + m[1].length + ") "}</span></div>
                                        <div>
                                            {!accordionOpen[index] ? <ChevronDown></ChevronDown> : <ChevronRight></ChevronRight>}
                                        </div>
                                    </div>

                                    <div ref={function (ref) {

                                        if (ref) {
                                            eachCategoryRef.current[index] = ref;
                                        }

                                    }} className="h-auto overflow-y-scroll transition-all duration-300 ease-in-out  ">
                                        {m[1].map((value, index) => {
                                            let itemname = value.itemname;
                                            let quant = value.quant;
                                            let category = value.category;
                                            let unit = value.unit;
                                            let discountPrice = value.discountPrice;
                                            let skip = value.outOfStock;
                                            let mrp = value.mrp;
                                            let primarySize = value.primarySize;
                                            let imageURL = value.imageURL;
                                            let buttonURL = value.buttonURL;
                                            let offers = value.offers;
                                            let outOfStock = value.outOfStock;

                                            return <div key={index} >
                                                <CrateItemCard outOfStock={outOfStock} setCrateId={setCrateId} offers={offers} setSaving={setSaving} setTotalPrice={setTotalPrice} setCrateList={setCrateList} itemname={itemname} quant={quant} category={category} unit={unit} discountPrice={discountPrice} skip={skip} mrp={mrp} primarySize={primarySize} imageURL={imageURL} buttonURL={buttonURL}
                                                ></CrateItemCard>
                                            </div>

                                        })}
                                    </div>

                                </div>
                            })}
                        </div>

                        <div className="bg-white h-15 flex justify-between items-center border border-gray-200 px-4 ">
                            <div>Missed Something ?</div>
                            <GenericButton text="Add More Items" onclick={function () {
                                router.push("/dashboard/category")
                            }} ></GenericButton>
                        </div>
                        <div onClick={function () { setInstructionModal(true) }} className="mt-4 cursor-pointer border border-gray-200 bg-white h-16 items-center flex px-4 justify-between">
                            <div >
                                Delivery Instruction
                            </div>
                            <ChevronRight></ChevronRight>
                        </div>

                    </div> : <SkeletonLoading type="crate"></SkeletonLoading>
                    }

                </div>
                {/* //TODO making sure the instruction are updated in the user next when checking the instruction we default value. */}
                <CrateBottom type={type} setReturnMessage={setReturnMessage} crateId={crateId} setOrderPlace={setOrderPlace} disable={disable} totalPrice={totalPrice} userId={userId} orderId={orderId} instruction={instruction} details={details} saving={saving} crateList={crateList} num={length} />
            </div> 
        }
        {
            !fetching &&  length == 0 && <EmptyCrate></EmptyCrate>
        }
        {
            openConfirm && <ConfirmModal onclick={function () {
            if(typeof localStorage == undefined) return;
                if (localStorage.getItem(localCrate)) {
                    localStorage.setItem(localCrate, "{}")
                    localStorage.setItem(localOrderId, "")
                }

                window.location.reload();

            }} type="crate" setOpenModal={setConfirm}></ConfirmModal>
        }{
            instructionModal && <InstructionModal instructionValue={instruction} clickHandle={function () {
                setInstructionModal(false);
            }} setInstruction={setInstruction} setInstructionModal={setInstructionModal}></InstructionModal>
        }
        {
            addressModal && <AddressModal noTime={noTime} disableButton={setDisable} details={details} setInstruction={setInstruction} setAddressModal={setAddressModal} setDetails={setDetails} userId={userId} onclick={function () {
                setAddressModal(false);
            }} setAddress={setAddress} ></AddressModal>
        } {
            orderPlace && <OrderPlace returnMessage={returnMessage}>

            </OrderPlace>
        }

    </div>
}

function EmptyCrate() {
    const router = useRouter()
    return <div className=" h-screen bg-[#ebf6f6]">
        <div className="mx-8 my-4 h-56 gap-2 bg-white flex items-center justify-center flex-col">
            <div className="relative">
                <Image src="/empty_bag.png" alt="empty-bag" height="100" width="100"></Image>
                <SquarePlus className="text-logo absolute top-[50%] left-[50%] translate-x-[-50%]"></SquarePlus>

            </div>
            <div>
                Your crate is empty
            </div>
            < GenericButton onclick={function () {
                router.push("/dashboard")
            }} text="Browse Products">

            </GenericButton>
        </div>
        <BottomBar></BottomBar>
    </div>
}

function OrderPlace({ returnMessage }: { returnMessage: string }) {

    return <div className="flex-col absolute top-0 left-0 w-screen h-screen bg-white/50 z-10 flex justify-center items-center">
        <Image unoptimized src="/order.gif" height={80} width={60} alt="order-loading"></Image>
        <div className="text-sm font-thin bg-white w-1/2 p-10 text-center">
            {returnMessage}
        </div>
    </div>
}


function CrateBottom({ type, setReturnMessage, setOrderPlace, crateId, disable, num, totalPrice, userId, orderId, instruction, details, saving, crateList }: {
    type: string,
    crateId: string,
    num: number;
    totalPrice: number;
    userId: string;
    orderId: string;
    instruction: string[];
    details: UserAddress;
    saving: number;
    crateList: [string, crateItemInterface][];
    disable: boolean,
    setOrderPlace: React.Dispatch<SetStateAction<boolean>>
    setReturnMessage: React.Dispatch<SetStateAction<string>>
}) {

    return <div className="h-18 bg-white select-none shadow-sm w-full z-8 fixed bottom-0">
        <div className="h-16 flex justify-between py-2 px-4">
            <div className="h-16 flex flex-col  leading-2">
                <div className="text-lg font-semibold">
                    Total Value <span>{(" (" + num + ")")}</span>
                </div>
                <div className="text-md text-gray-500">
                    ₹ {totalPrice}
                </div>
            </div>

            {/* //swipe to confirm */}
            <SwipeButton type={type} setReturnMessage={setReturnMessage} crateId={crateId} setOrderPlace={setOrderPlace} disable={disable} totalPrice={totalPrice} orderId={orderId} instruction={instruction} details={details} saving={saving} from="Swipe To Confirm" to="Delivery Confirmed">
            </SwipeButton>

        </div>
        <div className="h-2 w-full bg-gray-300">

        </div>
    </div>

}

// function CrateItem() {


//     return <div>

//     </div>
// }

function InstructionModal({ instructionValue, clickHandle, setInstruction, setInstructionModal }: {
    setInstruction: React.Dispatch<SetStateAction<string[]>>, setInstructionModal: React.Dispatch<SetStateAction<boolean>>,
    clickHandle: () => void
    , instructionValue: string[]
}) {

    let instruction = ["Must hand over to staff", "Must call before delivery", "Send me the picture of delivered goods"];

    let [activeCheck, setActiveCheck] = useState<number[]>([]);
    instructionValue.forEach((m) => {
        activeCheck.push(instruction.findIndex((val) => val.toLocaleLowerCase() === m))
    })

    // console.log(instructionValue)
    return <div onClick={function (ev: React.MouseEvent<HTMLDivElement>) {
        if (String((ev.target as HTMLElement).className).includes("modal")) {
            setInstructionModal(false)
        }
    }} className="modal bg-gray-400/40 h-screen top-0 flex flex-col justify-end  absolute z-10 w-full">

        <div onClick={clickHandle} className="w-8 cursor-pointer h-8 absolute left-[48%] top-[32%] bg-gray-700 text-white z-6 flex justify-center items-center rounded-full border">
            <Cross1Icon />
        </div>

        <div className="bg-white h-90 w-full flex flex-col rounded-xl">

            <div className="h-85 w-full">
                <div className="h-15 flex gap-2 text-xl items-center px-6  w-full bg-[#ebf6f6]">
                    <MessageSquareTextIcon className="relative top-0.5"> </MessageSquareTextIcon>
                    Delivery Instruction
                </div>
                <div className="h-60 w-full flex flex-col gap-2 px-6 py-8">

                    {
                        instruction.map((m, index) => {

                            return <div onClick={function () {

                                setActiveCheck(prev => {
                                    if (!prev) {
                                        return [index]
                                    }
                                    if (prev.includes(index)) {

                                        return prev.filter(n => n != index)
                                    }

                                    return [...prev, index];

                                })
                                setInstruction(prev => {
                                    if (!prev) {
                                        return [m.toLocaleLowerCase()]
                                    }
                                    if (prev.includes(m.toLocaleLowerCase())) {
                                        return prev.filter(n => n != m.toLocaleLowerCase())
                                    }

                                    return [...prev, m.toLocaleLowerCase()];
                                })
                            }} className={"flex items-center text-sm px-6 h-15  cursor-pointer rounded-sm  border gap-3 " + `${activeCheck.includes(index) ? " bg-logo text-white" : "text-gray-600 border-gray-400 "}`} key={index}>
                                {
                                    index == 0 && <UserRoundCheckIcon></UserRoundCheckIcon> || index == 1 && <PhoneCallIcon></PhoneCallIcon> || index == 2 && <CameraIcon></CameraIcon>
                                }

                                {m}
                            </div>
                        })
                    }

                </div>
                <div className="h-10 text-logo w-full bg-[#ebf6f6] text-sm px-6 flex items-center justify-between">
                    <a href="tel:8287470325" className="">
                        Helpline no : +918287470325
                    </a>
                    <div>
                        8 am - 10 am
                    </div>
                </div>
            </div>

            <div className="h-5 w-full bg-gray-300">
            </div>
        </div>
    </div>

}
function AddressModal({ noTime, disableButton, userId, details, setDetails, onclick, setAddress, setAddressModal, setInstruction }: { onclick: () => void, setAddress: React.Dispatch<SetStateAction<string>>, setInstruction: React.Dispatch<SetStateAction<string[]>>, userId: string, setDetails: React.Dispatch<SetStateAction<UserAddress>>, setAddressModal: React.Dispatch<SetStateAction<boolean>>, details: UserAddress, disableButton: React.Dispatch<SetStateAction<boolean>>, noTime: boolean }) {

    let [list, setList] = useState<UserAddress[]>([])
    let [isPending, startTransition] = useTransition();
    //list of address
    const router = useRouter();

    let [restaurantName, setRestaurantName] = useState("")
    let [restaurantType, setRestaurantType] = useState([""])
    let [deliveryTiming, setDeliveryTiming] = useState("")

    useEffect(function () {
        //fetching the backend and get all the address

        startTransition(async function () {
            let restaurantData = await InfoValue("full");
            setRestaurantName(restaurantData.restaurantName);
            let dataType = restaurantData.restaurantType as string[]
            setRestaurantType(dataType);
            setDeliveryTiming(restaurantData.deliveryTiming);

            let returnData = await InfoValue("allAddress");
            setList(() => {

                return [...returnData]
            })
        })


    }, [userId])

    return <div onClick={function (ev: React.MouseEvent<HTMLDivElement>) {
        if (String((ev.target as HTMLElement).className).includes("modal")) {
            onclick();
        }
    }} className="modal bg-gray-400/40 h-screen top-0 flex flex-col justify-end  absolute z-10 w-full">

        <div onClick={onclick} className="w-8 cursor-pointer h-8 absolute left-[48%] top-[32%] bg-gray-700 text-white z-6 flex justify-center items-center rounded-full border">
            <Cross1Icon />
        </div>
        <div className="bg-white h-90 w-full flex flex-col rounded-xl">

            <div className="h-85 w-full">
                <div className="h-15 flex gap-2 text-xl items-center px-6  w-full bg-[#ebf6f6]">
                    <MapPinCheckIcon className="relative top-0.5"> </MapPinCheckIcon>
                    Delivery Address
                </div>
                <div className="h-60 overflow-y-scroll w-full flex flex-col gap-3 px-6 py-4">

                    {
                        list.map((m: UserAddress, index) => {
                            let shopDetails = m.shopDetails;
                            let address = m.address;
                            let pincode = m.pincode;
                            let receiver = m.receiver;
                            let tag = m.tag;
                            let instruction = m.instruction;
                            let defaultValue = m.default;
                            let additionalNo = m.additionalNo;
                            let deliveryAvailable = m.deliveryAvailable;

                            console.log(deliveryAvailable, address)

                            return <div onClick={function () {

                            }} className={"flex items-center px-6 h-auto rounded-sm  border gap-3 py-3 border-gray-200 text-gray-500 justify-between **"} key={index}>
                                <div onClick={async function () {
                                    let deliveryAvailable = await pincodeFind(pincode);

                                    // console.log(deliveryAvailable)
                                    setDetails(prev => {
                                        let value: UserAddress = { restaurantName, restaurantType, deliveryTiming, shopDetails, address, pincode, receiver, tag, instruction, default: defaultValue, deliveryAvailable }
                                        return value;
                                    })
                                    // console.log(address, deliveryAvailable)
                                    if (!deliveryAvailable) {
                                        disableButton(true)
                                    } else {
                                        if (!noTime) {
                                            disableButton(false)
                                        }
                                    }

                                    setInstruction([...instruction])
                                    setAddress(address)
                                    setAddressModal(false);
                                }} className="flex gap-3 items-center overflow-hidden cursor-pointer">
                                    <div>
                                        <MapPinCheck className=" size-6 h-6 w-6 object-contain"></MapPinCheck>
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <div className="font-bold">{tag}</div>
                                        <div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap  ">{address}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div onClick={function () {

                                        let useSearchParams = "restaurantName=" + restaurantName + "&restaurantType=" + restaurantType + "&deliveryTiming=" + deliveryTiming + "&shopDetails=" + shopDetails + "&pincode=" + pincode + "&tag=" + tag + "&receiver=" + receiver + "&instruction=" + instruction + "&default=" + defaultValue + "&address=" + address + "&type=" + "modified" + "&callback=" + window.location.pathname + "&additionalNo=" + additionalNo;
                                        router.push("/users/" + userId + "/address_details?" + useSearchParams)

                                    }}>
                                        <Pencil2Icon className="size-4 cursor-pointer"></Pencil2Icon>
                                    </div>
                                    <div className="" onClick={async function () {
                                        //deleteing 
                                        //TODO 
                                        // propogating to the database
                                        if (list.length > 1) {
                                            let dataDelete = await DeleteAddress(tag);
                                            if (dataDelete) {
                                                console.log("/dashboard/crate")
                                                onclick();
                                            }
                                        }

                                    }}>
                                        <Trash2Icon className="size-4 cursor-pointer"></Trash2Icon>
                                    </div>
                                </div>

                            </div>
                        })
                    }
                    <div className="flex items-center px-6 py-3  cursor-pointer rounded-sm border gap-3 text-gray-600 border-dashed border-gray-600" onClick={function () {

                        let restaurantName = details.restaurantName;
                        let restaurantType = details.restaurantType;
                        let deliveryTiming = details.deliveryTiming;
                        let useSearchParams = "&restaurantName=" + restaurantName + "&restaurantType=" + restaurantType + "&deliveryTiming=" + deliveryTiming + "&type=create"

                        router.push("/users/" + userId + "/address?callback=" + window.location.pathname + useSearchParams)
                    }}>
                        <MapPinPlus className="size-6"></MapPinPlus>
                        Add new address
                    </div>

                </div>
                <div className="h-10 text-logo w-full bg-[#ebf6f6] text-sm px-6 flex items-center justify-between">
                    <a href="tel:8287470325" className="">
                        Helpline no : +918287470325
                    </a>
                    <div>
                        8 am - 10 am
                    </div>
                </div>
            </div>

            <div className="h-5 w-full bg-gray-300">
            </div>
        </div>
    </div>
}

function CountDownComponent({ setNoTime, startPeriod, endPeriod, setDisableButton }: { setNoTime: React.Dispatch<SetStateAction<boolean>>, startPeriod: number, endPeriod: number, setDisableButton?: React.Dispatch<SetStateAction<boolean>> }) {
    //rate updates before 5 pm
    //evening 5 pm to 2 am 

    const [currentTimeLeft, _] = useState<Date>(new Date());
    const [diffHour, setDiffHour] = useState("XX")
    const [diffMin, setDiffMin] = useState("XX")
    const [diffSec, setDiffSec] = useState("XX")
    const [noOrder, setNoOrder] = useState(true)
    const [tomorrow, setTomorrow] = useState("");
    let clearTime: React.RefObject<string | number | NodeJS.Timeout | undefined> = useRef(undefined);

    // based on the countdown making the swipe button disbale
    //count down to create and updating 

    let intervalCall = useCallback(function intervalCall() {
        let curr = new Date();
        let currentHour = (curr).getHours();
        let currentMin = curr.getMinutes();
        let currentSec = curr.getSeconds();

        if (endPeriod < startPeriod) {

            if (currentHour < startPeriod && currentHour >= endPeriod) {
                clearInterval(clearTime.current)
                setNoOrder(true)
                setNoTime(true)
                if (setDisableButton) { setDisableButton(true) }
                return;
            }
            // i.e in case of 24 hr , 1 am , 2 am so on i.e next day
            // let endPeriodTime = new Date(currentYear, currentMonth, currentDate+1, endPeriod);
            let hourDifference;
            if (currentHour < startPeriod) {
                hourDifference = endPeriod - currentHour - 1;
            } else {

                hourDifference = 24 - currentHour + endPeriod - 1;
            }
            let minDifference = 60 - currentMin;
            let secDifference = 60 - currentSec;
            setDiffHour(String(hourDifference).padStart(2, "0"))
            setDiffMin(String(minDifference).padStart(2, "0"))
            setDiffSec(String(secDifference).padStart(2, "0"))

        } else {

            if (currentHour < startPeriod) {
                setNoOrder(true)
                setNoTime(true)
                if (setDisableButton) { setDisableButton(true) }
                clearInterval(clearTime.current)
                return;
            }
            // let endPeriodTime = new Date(currentYear, currentMonth, currentDate, endPeriod);
            let hourDifference = endPeriod - currentHour - 1;
            let minDifference = 60 - currentMin;
            let secDifference = 60 - currentSec;

            setDiffHour(String(hourDifference).padStart(2, "0"))
            setDiffMin(String(minDifference).padStart(2, "0"))
            setDiffSec(String(secDifference).padStart(2, "0"))
        }
    }, [endPeriod, setDisableButton, startPeriod, setNoTime])

    useEffect(function () {
        //everything inside the setInterval

        let currentYear = currentTimeLeft.getFullYear();
        let currentMonth = currentTimeLeft.getMonth();
        let currentDate = currentTimeLeft.getDate();
        let tomDate = new Date(currentYear, currentMonth, currentDate + 1);
        // console.log(tomDate.toDateString())
        setTomorrow(tomDate.toDateString())

        clearTime.current = setInterval(function () {
            intervalCall();
        }, 1000)
        setNoOrder(false);
        // not introducing the grace period right now
        return function () {
            clearInterval(clearTime.current)
        }
    }, [currentTimeLeft, intervalCall])

    // console.log(startPeriod, endPeriod)

    if (startPeriod == endPeriod) {
        console.log("developer at issue")
        return null;
    }

    if (noOrder) {
        return <div className="flex items-center justify-between select-none bg-logo text-white rounded  py-2 px-4 my-2 mx-6 border border-gray-200"  >
            <div className="flex flex-col font-extralight">
                <div className="text-xl">
                    Order for tomorrow
                </div>
                <div>
                    <span className="text-sm">{tomorrow}</span>
                </div>
            </div>
            <div className="flex flex-col font-extralight">
                <div className="text-xl">
                    Timing between
                </div>
                <div>
                    <span className="text-sm">
                        {startPeriod >= 12 ? startPeriod - 12 + " pm" : startPeriod + " am"} : {endPeriod < startPeriod ? endPeriod + " am" : endPeriod == 24 ? "12 midnight" : endPeriod - 12 + " pm"}
                    </span>
                </div>
            </div>
        </div>
    }


    return <div className="flex items-center justify-between gap-2 select-none bg-logo text-white rounded  py-2 px-4 my-2 mx-6 border border-gray-200"  >
        <div className="flex flex-col font-extralight">
            <div className="text-sm">
                Order Tomorrow
            </div>
            <div className="text-xs">
                Time Left
            </div>
        </div>
        <div className="whitespace-nowrap min-w-[200px]  flex-1 w-[60%] text-center justify-center flex text-4xl font-thin">
            <div className="w-2/10">
                {diffHour}
            </div>
            <div className="w-1/10 ">
                :
            </div>
            <div className="w-2/10">
                {diffMin}
            </div>
            <div className="w-1/10">
                :
            </div>
            <div className="w-2/10">
                {diffSec}
            </div>
        </div>
    </div>
}

//DONE
//making sure localstorage adding is updating the cart component as well

//TODO
//ability to CRUD the items list in the cart
//cart is categorized by category as well - pushing each order for the database 
//to track and get done - three status -- order received, order in making (process - packaging, transit i.e delivery), complete order
// on the order - making that a history - ability to repeat the order
//window period of ordering showcasing
//swipe to finish the order - nice touch
//address confirm, items list over view and bill -- asking users to pay the bill on arrival or payonline.
//checking if the item is outofstock from the global item list
//making sure the item we render on the page says this
//in case of not quantity enough -- as a good company must provide them via
// purchasing them
//working on the crate list
//categorizing based on the crates
//limiting the order - no - 4 per user until they are resolved.
//limiting a user can order a item value -- maximum value of order any thing --  bulk order calling options.
//period order before 1 am all the orders - no more order taking once the period is passed.



// getting the userid from the localstorage and then getting the information about the users from the database everytime.
// name, restaurant name, addres, delivery timing, date, order at (time)