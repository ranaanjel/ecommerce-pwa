import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PreorderCard } from "./preordercard";
import { preorderList } from "@/app/lib/placeholder-data";

export default function PreOrder() {
    return <div className="text-black py-2 w-full">
        <nav className="flex justify-between items-center px-6">

        <div className="text-2xl font-medium"> Pre order List </div>
        <Link href="/dashboard/preorder-list" className="text-link">
            see all <ChevronRightIcon className="inline size-4"/>
        </Link>
        </nav>
        <div className="flex gap-2 h-88 overflow-x-scroll w-full overflow-y-hidden pl-6 pr-2">
           {
            preorderList.map((m, index)=> {
                let title = m.title;
                let description = m.description;
                let imageURL = m.imageURL;
                let buttonURL = m.buttonURL;
                let list = m.list;
                let bgTitle = m.bgTitle;
                let bgBody = m.bgBody;
                return  <PreorderCard bgBody={bgBody} bgTitle={bgTitle} key={index} title={title} description={description} imageURL={imageURL} buttonURL={buttonURL} list={list} />
            })
           }
        </div>
    </div>
}