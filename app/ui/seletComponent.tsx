import { ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { SetStateAction, useState } from "react"

export function SelectComponent({setCurrentItem, name, list, onclickFunction }: { name: string, list: string[], onclickFunction: (value:string)=>void , setCurrentItem:React.Dispatch<SetStateAction<string>> }) {

    let [openModal, setOpenModal] = useState(false)



    return <div className="relative">

        <div onClick={function () {
            setOpenModal(m => !m)
        }}   id={name} className=" capitalize min-w-1/2 border rounded-sm self-center p-2.5 flex justify-between text-logo "><span className="overflow-ellipsis text-nowrap overflow-hidden w-24 ">{name}</span> <ChevronDown/>
        </div>
        <div>
            { openModal &&
                <div  className=" bg-white rounded-b-sm absolute z-10 top-[100%] border border-gray-400 left-0 w-full "><div className="capitalize w-full active:bg-primary text-logo p-2.5  border-b border-gray-400" onClick={function () {
                    setCurrentItem("all")
                    setOpenModal(false)
                    onclickFunction("all")
                }}> All</div>
                    <div>
                        {list.map((m, index) => {
                            return <div  key={index} onClick={function(evob: React.MouseEvent<HTMLDivElement>) {
                                setCurrentItem(m)
                                setOpenModal(false)
                                onclickFunction(m)
                            }} className="capitalize w-full text-logo active:bg-primary active:text-logo p-2.5 cursor-pointer border-b border-gray-400 text-xs">{m}</div>

                        })}</div>
                </div>
            }

        </div>

    </div>

}