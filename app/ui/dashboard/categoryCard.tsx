import { categoryList } from "@/app/lib/placeholder-data"
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Categories() {


    return <div className="px-6 text-black">
        <div className="text-xl font-semibold">Shop by category</div>
        <div className="grid grid-cols-3 place-items-center text-center w-full gap-2 my-2">
            {
                categoryList.map((m,index) => {
                    let itemName = m.name;
                    let imageURL = m.imageURL
                    let buttonURL = m.buttonURL;
                    return <CategoryItem key={index} itemName={itemName} imageURL={imageURL} buttonURL={buttonURL} />
                })
            }
        </div>
    </div>
}

function CategoryItem({itemName, imageURL, buttonURL}:{itemName:string, imageURL:string, buttonURL:string}) {

    let router = useRouter();
    return <div onClick={function () {
        router.push(buttonURL)
    }} className="flex flex-col gap-1 items-center min-h-[94px]" >
        <div className="bg-[#cce8ff] w-[74px] h-[60px] rounded relative">
            <Image src={imageURL} alt={itemName} height={90} width={90} className="w-[100px] absolute bottom-0"/>
        </div>
        <div className="font-normal text-xs">{itemName}</div>
    </div>
}