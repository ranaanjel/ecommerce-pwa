import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface bannerProps {
    title: string,
    text: string,
    buttonURL: string,
    imageURL: string,
    gradientColor: string
    index?: string,
    bannerRefs: any
}

export default function Banner({ title, text, buttonURL, imageURL, gradientColor, index, bannerRefs }: bannerProps) {

    let cssClass = "relative h-52 min-w-[94%] w-[94%] snap-always snap-center text-white rounded-lg py-6 px-4 overflow-hidden flex-col flex gap-3 items-start justify-between " + gradientColor;


    if (index == "0") {
        cssClass += " ml-2"
    }

    return <div ref={function (ref) {
        if (bannerRefs.current) {
            bannerRefs.current[index!] = ref;
        }
    }} className={cssClass}>
        <div>
            <h2 className="text-2xl font-bold text-shadow-md">{title}</h2>
            <p className="text-shadow-2xs w-3/5 text-md">{text}</p>
        </div>
        <Link href={buttonURL}>
            <button className="bg-logo py-1.5 px-3 rounded-md text-sm">
                shop here <ChevronRightIcon className="inline size-3" />
            </button>
        </Link>

        <Image className="absolute right-0 scale-120 bottom-[5%]" src={imageURL} alt="banner-image" height={100} width={200} />
    </div>
}