import { Dispatch, SetStateAction } from "react"
import { Itemlist } from "../lib/placeholder-data";
import { useRouter } from "next/navigation";
import { localPreorder } from "../lib/utils";

export function ConfirmModal({ setOpenModal, setItems, itemDelete, wholeList, preorderName }: {
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    setItems: Dispatch<SetStateAction<Itemlist[]>>,
    itemDelete: string,
    wholeList?: boolean,
    preorderName:string
}) {

    let router = useRouter()
    console.log(wholeList)

    if (wholeList) {
        return <div onClick={function (eobj: React.MouseEvent<HTMLDivElement>) {
            let classValue = (eobj.target as HTMLElement).className;
            if (classValue.includes("confirmModal")) {
                setOpenModal(m => !m)
            }
        }} className="confirmModal top-0 h-screen overflow-hidden bg-gray-400/50 w-screen absolute flex justify-center items-center z-10">
            <div className="text-white bg-logo px-4 py-8 rounded-md gap-2 flex flex-col ">
                <div className="text-md">
                    Are you sure to delete whole list?
                </div>
                <div className="flex justify-center gap-2 ">
                    <div onClick={function () {
                        //TODO
                        //propogating to database -- since it will only work that time -- and it will be able to fetch the data which is not getting corrected this time.
                        if (localStorage.getItem(localPreorder)) {
                            let localData = JSON.parse(localStorage.getItem(localPreorder) as string);

                            if (itemDelete in localData) {
                                delete localData[itemDelete];
                            }

                            //console.log(localData)
                            localStorage.setItem(localPreorder, JSON.stringify(localData))
                        }

                        setOpenModal(false)
                        router.push("/dashboard/preorder-list")

                    }} className="rounded-sm border-white border py-2 px-4 cursor-pointer">
                        Yes
                    </div>
                    <div onClick={() => {

                        console.log("closing")

                        setOpenModal(false)
                    }} className="bg-white rounded-sm text-logo px-4 py-2 cursor-pointer">
                        No
                    </div>
                </div>
            </div>
        </div>
    }



    return <div onClick={function (eobj: React.MouseEvent<HTMLDivElement>) {
        let classValue = (eobj.target as HTMLElement).className;
        if (classValue.includes("confirmModal")) {
            setOpenModal(m => !m)
        }


    }} className="confirmModal top-0 h-screen overflow-hidden bg-gray-400/50 w-screen absolute flex justify-center items-center z-10">
        <div className="text-white bg-logo p-4 rounded-md gap-2 flex flex-col">
            <div className="text-md">
                Are You Confirm ?
            </div>
            <div className="flex justify-between">
                <div onClick={function () {

                    setItems(prev => {
                        prev = prev.filter(m => {
                            return m.name != itemDelete;
                        })
                        // propogating the value to the database.
                        //TODO

                        if (!localStorage.getItem(localPreorder)) {
                            localStorage.setItem(localPreorder, "{}")
                        }

                        let localObject = JSON.parse(localStorage.getItem(localPreorder) as string) ?? {};

                        if (!preorderName) {
                            console.log("must provide the preorder name")
                        }

                        if (preorderName in localObject) {
                            console.log(localObject[preorderName].list, "before")
                            localObject[preorderName].list = prev
                            console.log(localObject[preorderName].list, "after");
                            localStorage.setItem(localPreorder, JSON.stringify(localObject))
                        } 

                        return prev
                    })

                    setOpenModal(false)

                }} className="rounded-sm border-white border py-2 px-4 cursor-pointer">
                    Yes
                </div>
                <div onClick={() => {

                    console.log("closing")

                    setOpenModal(false)
                }} className="bg-white rounded-sm text-logo px-4 py-2 cursor-pointer">
                    No
                </div>
            </div>
        </div>
    </div>
}