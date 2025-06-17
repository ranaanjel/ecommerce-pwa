import { Dispatch, SetStateAction } from "react"
import { Itemlist } from "../lib/placeholder-data";

export function AlertModal({ setOpenModal,alertValue}: {
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    alertValue:string ,
}) {
    
    
    return <div onClick={function (eobj: React.MouseEvent<HTMLDivElement>) {
        let classValue = (eobj.target as HTMLElement).className;
        if (classValue.includes("confirmModal")) {
            setOpenModal(m => !m)
        }

    }} className="confirmModal top-0 h-screen overflow-hidden bg-gray-400/50 w-screen absolute flex justify-center items-center z-10">
        <div className="text-white bg-logo p-4 rounded-md gap-2 flex flex-col">
            <div className="text-lg">
                {alertValue}
            </div>
            <div className="flex justify-center">
                <div onClick={function () {
                    setOpenModal(false)
                }} className="text-center rounded-sm border-white border py-2 px-4 cursor-pointer">
                    close
                </div>
            </div>
        </div>
    </div>
}