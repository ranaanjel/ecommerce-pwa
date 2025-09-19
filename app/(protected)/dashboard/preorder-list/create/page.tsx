"use client"

import { localPreorder } from "@/app/(protected)/lib/utils"
import { AlertModal } from "@/app/(protected)/ui/alertModal"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { ChevronLeftIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function Page() {

    // let [list, setList] = useState([])
    const router = useRouter();
    let bgTitle = "bg-[#ff9602]";
    let imageURL = "/preorder-list/create_one_page.png"
    let title = "Create One"
    let description = "curate one yourself, faster checkout"
    let bgBody = " bg-linear-to-t from-[#ff9b0e] to-white ";

  
    const [openModal, setOpenModal] = useState(false);
    const [alertData, setAlertData] = useState("");

    const [titleValue, setTitle] = useState("")
    const [descriptionValue, setDescription] = useState("")
    const [bgTitleValue, setBgTitle] = useState("")
    const [bgBodyValue, setBgBody] = useState("")
    const [imageURLValue, setImageURL] = useState("")


    return <div>
        <div className="select-none h-screen overflow-hidden relative">
            <div className={"overflow-hidden relative  p-4 pt-8 h-36 " + bgTitle}>
                <div className="flex relative z-2 justify-between text-white">
                    <div className="bg-orange-600" onClick={function () {
                        router.back()
                    }}>
                        <ChevronLeftIcon className="size-7" />
                    </div>
                    <div onClick={function () {
                        router.push("/dashboard/search")
                    }}>
                        <MagnifyingGlassIcon className="size-7" />
                    </div>
                </div>
                <div className="absolute z-1 flex justify-center items-center w-full h-full top-0 left-0 flex-1">
                    <Image src={imageURL} alt={title} width={200} className="w-[250px] h-42 object-contain" height={200} />
                </div>
            </div>
            <div className={bgBody + " p-4 h-[90%] pb-18 overflow-scroll"}>

                <div className="flex justify-between">
                    <div>
                        <div className="font-bold text-2xl">{title}</div>
                        <div className="font-normal text-sm text-gray-500">{description}</div>
                    </div>
                </div>
                <div>
                    <GenericInput label="Title" type="text" placeholder="Enter the pre-order list. Eg : Ration_daily" setChangeValue={setTitle} />
                    <GenericInput label="Description" type="text" placeholder="Description Eg : daily ration requirement for the shop" setChangeValue={setDescription} />
                    <ChooseColor setBgBody={setBgBody} setBgTitle={setBgTitle} />
                    <ChooseImage setImageURL={setImageURL} />
                </div>

            </div>
            <div className="h-21 border-t border-gray-200 fixed bottom-0  shadow-xs bg-white/50 w-full">
                {/* //add to cart fixed on the page */}
                <div className="flex justify-center items-center px-8 py-4 text-white ">
                    <div className="w-2/3 bg-logo rounded-sm cursor-pointer text-xl text-center p-2" onClick={ async function () {

                        if (titleValue == "") {
                            setAlertData("Please Add Title");
                            setOpenModal(true)
                            return;
                        } else if (descriptionValue == "") {
                            setAlertData("Please Add description");
                            setOpenModal(true)

                            return;
                        } else if (imageURLValue == "") {
                            setAlertData("Please Select Image URL")
                            setOpenModal(true)

                            return;
                        } else if (bgBodyValue == "") {
                            setAlertData("Please Select bgTitle Color")
                            setOpenModal(true)

                            return;
                        } else if (bgTitleValue == "") {
                            setAlertData("Please Select bgBody Color")
                            setOpenModal(true)
                            return;
                        }else if (titleValue.match(/[^A-z\s]/)) {
                            setAlertData("Please no special character in the title")
                            setOpenModal(true)
                            return;
                        }
                        //propagating the value to datbaase as well
                        //to the localstroage as well.
                        //checking if the title exist in the local storage -- don't have to check for in the databse.
                        let urlTitle = titleValue.toLocaleLowerCase().replace(/\s/g, "_")
                        let dataToPush = {
                            title: titleValue.toLocaleLowerCase().trim(),
                            bgBody: bgBodyValue,
                            description: descriptionValue.toLocaleLowerCase().trim(),
                            bgTitle: bgTitleValue,
                            buttonURL:"/dashboard/preorder-list/"+urlTitle ,
                            iconURL: imageURLValue,
                            //page value depemds adding on the required places -- type - page / dashboard -- for component not for the database
                        }

                        // not choosing to add in the database 
                       
                        let url = window.location.origin + "/query/v1/preorder-list/createList/";

                      try {
                         let returnValue = await axios.post(url, {
                            data:dataToPush
                        })
                        if(returnValue.data.success) {
                            setAlertData("successfully added the new preorder list")
                            setOpenModal(true)
                        }else {
                            setAlertData(returnValue.data.message)
                            setOpenModal(true)
                        }
                        // there is no error 
                        // router.push("/dashboard/preorder-list/" + params)
                      }catch (err) {
                        console.log(err, "error occured while putting the data")
                      }

                        // if(data.title in localStorageObject) {
                        //     setAlertData("Title already exists")
                        //     setOpenModal(true)
                        //     return;
                        // }else {
                        //     localStorageObject[data.title] = data;
                        //     console.log(localStorageObject)
                        //     localStorage.setItem(localPreorder, JSON.stringify(localStorageObject))
                        // }
                        router.push(dataToPush.buttonURL + "/add-to-list")
                    }} >

                        Add Items To List
                    </div>
                </div>
            </div>
            {openModal && <AlertModal setOpenModal={setOpenModal} alertValue={alertData} />}
        </div>
    </div>
}


//whatever we create we will have to then propagate to the preorder
// database - to user's data.
// updating the localdatabase as well.

function GenericInput({ type = "text", label, placeholder, setChangeValue }: {
    label: string, placeholder: string, setChangeValue: Dispatch<SetStateAction<string>>,
    type: string
}) {



    return <div className="flex flex-col my-3 gap-1">
        <label className="text-xl font-medium " htmlFor={label}>{label}<span className="ml-2 text-red-700">*</span></label>
        <input maxLength={25} className="w-full px-3 py-2 bg-white text-black border-gray-200 border rounded-sm focus:outline-none focus:border-gray-400 focus:border text-sm" onChange={function (obj) {
            setChangeValue(obj.target.value)
        }} type={type} name={label} placeholder={placeholder} id={label} />
    </div>
}

function ChooseColor({ setBgBody, setBgTitle }: { setBgBody: Dispatch<SetStateAction<string>>, setBgTitle: Dispatch<SetStateAction<string>> }) {

    //getting the value from the backend the color pallates.
    // eg : [ ["color1-dark","color1-light" ] ]
    //pallate - each - first value containing the bgTitle, second containing the bgbody.
    const [palette, setPalatte] = useState<string[][]>([])

    useEffect(function () {
        let url = window.location.origin + "/query/v1/preorder-list/colorPallate";
        axios.get(url).then(m => {
            setPalatte(m.data.result)
        }).catch(err=> console.log(err))
    }, [])
    const [active, setActive] = useState(0)

    return <div className="mt-2">
        <div className="text-xl ">
            Select theme <span className="text-red-600">*</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
            {
                palette.map((m, index) => {

                    let bgTitle = " w-1/2 h-full " + m[0] + " ";
                    let bgBody = " w-1/2 h-full " + m[1] + " ";

                    // console.log(bgBody, bgTitle)

                    return <div onClick={function () {
                        setActive(index + 1)
                        setBgTitle(m[0]);
                        const match = m[1].match(/(?<=#)\w{6}/);
                        let color = match ? "from-[#" + match[0] + "]" : m[1];
                        let bgBody = "bg-linear-to-t " + color + " to-transparent"
                        setBgBody(bgBody)
                    }} key={index + 1} className={"h-8 flex border border-gray-200" + `${active == index + 1 ? "border-gray-600" : ""}`}>
                        <div className={bgTitle}></div>
                        <div className={bgBody}></div>
                    </div>
                })
            }
        </div>
    </div>

}

function ChooseImage({ setImageURL }: { setImageURL: Dispatch<SetStateAction<string>> }) {

    const [image, setImage] = useState<string[]>([])

    useEffect(function () {
        let url = window.location.origin + "/query/v1/preorder-list/createImage";
        axios.get(url).then(m => {
            setImage(m.data.result)
        }).catch(err=> console.log(err))
    }, [])
    const [active, setActive] = useState(0)

    return <div className="mt-2">
        <div className="text-xl ">
            Select Image<span className="text-red-600">*</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
            {
              image && image.length > 0 && image.map((m, index) => {

                    // console.log(bgBody, bgTitle)
                    if (!m.includes("_page.png") && !(m.startsWith("https://"))) {

                        m = m.replace(".png", "_page.png")
                    }

                    return <div onClick={function () {
                        setActive(index + 1)
                        setImageURL(m)
                    }} key={index + 1} className={"h-14 w-14 flex border border-gray-200 bg-white/50" + `${active == index + 1 ? "border-gray-400 bg-sky-400/30 " : ""}`}>
                        <Image src={m} width={50} height={50} className="h-full w-full object-contain" alt={"display-image"} />
                    </div>
                })
            }
        </div>
    </div>
}