import { Preorder, PreorderItem } from "@/app/lib/placeholder-data"
import Image from "next/image";
import Link from "next/link"

interface CardFooterProps {
  totalItems: number;
  buttonURL:string
}
export function PreorderCard({title, description, imageURL, buttonURL, list, bgBody, bgTitle}:Preorder) {

    let totalItem = list.length;
    let bodyClass = "relative mt-2 h-86 min-w-[52%] w-[52%] max-w-[52%] rounded-lg "+ bgBody
    let titleClass = bgTitle
    // console.log(titleClass, bodyClass)
    
    return <div className={bodyClass}>
      <CardHeader titleClass={titleClass} title={title} description={description} imageURL={imageURL}   />

    <div className="min-h-[38%]">
        {
           list.length > 0 ? list.slice(0,2).map((item, index) => {
                let imageURL = item.imageURL;
                let itemName = item.itemName;
                let mrp = item.mrp;
                let discountPrice = item.discountPrice;
                let totalDiscountPrice = item.totalDiscountPrice;
                let totalPrice = item.totalPrice;
                let quantity = item.quantity;
                let unit = item.unit;


                return <ProductItem key={itemName} unit={unit} quantity={quantity} totalDiscountPrice={totalDiscountPrice} totalPrice={totalPrice} discountPrice={discountPrice} mrp={mrp} itemName={itemName} imageURL={imageURL} />
            }) : <ProductItemSkeleton/>
        }
    </div>
      <CardFooter buttonURL={buttonURL} totalItems={totalItem} />

      <div className="flex w-full bg-zinc-300 min-h-2.5 rounded-b-lg" />
    </div>
}


function ProductItem({ imageURL,itemName, mrp, discountPrice, totalDiscountPrice, totalPrice, quantity, unit}: PreorderItem) {
  return (
    <section className="flex flex-row gap-2 px-3.5 py-2.5 leading-none  items-center justify-between">
      <div className="flex gap-2 ">
        <img
        src={imageURL}
        alt={itemName}
        className="object-contain shrink-0 aspect-square w-[25px]"
      />
        <div className="flex flex-col gap-2 text-xs text-black">
          <div className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis w-25  ">{itemName.toLocaleLowerCase()}</div>
            <span>{quantity}</span>
        </div>
      </div>
        <div className="flex flex-col gap-2 justify-between mt-1 text-xs font-medium text-black self-start">
          <span className="font-medium">{totalDiscountPrice}</span>
          <span className="line-through">{totalPrice}</span>
        </div>
    </section>
  );
}
function ProductItemSkeleton() {
  return (<div className="flex flex-col gap-2 px-3.5 py-2.5 items-center justify-between">
    <section className="flex overflow-hidden gap-2.5 items-start px-3.5 py-2.5 leading-none bg-opacity-10">
      <div
        className=" bg-gray-600 aspect-square w-[25px] h-[25px]"
      ></div>
      <div>
        <div className="flex gap-3 text-xs text-black">
          <div className="bg-gray-600/50 w-25 h-[10px]"></div>
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
        </div>
        <div className="flex gap-5 justify-between mt-1 text-xs font-medium text-black">
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
        </div>
      </div>
    </section>
     <section className="flex overflow-hidden gap-2.5 items-start px-3.5 py-2.5 leading-none bg-opacity-10">
      <div
        className=" bg-gray-600 aspect-square w-[25px] h-[25px]"
      ></div>
      <div>
        <div className="flex gap-3 text-xs text-black">
          <div className="bg-gray-600/50 w-25 h-[10px]"></div>
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
        </div>
        <div className="flex gap-5 justify-between mt-1 text-xs font-medium text-black">
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
          <div className="bg-gray-600/50 w-4 h-[10px]"></div>
        </div>
      </div>
    </section>
    <Link href={"/dashboard/preorder-list/create"} className="w-full h-full bg-gray-600/20 absolute top-0 rounded-lg backdrop-blur-[2px] flex justify-center items-center"> 

        <Image src="/plus.svg" alt="create one" height={50} width={50} className=""/>

    </Link>
    </div>
  );
}

interface CardHeaderProp {
    titleClass:string,
    title:string,
    description:string,
    imageURL:string
}

function CardHeader({titleClass, title, description,  imageURL}:CardHeaderProp) {
let bodyClass = "flex text-black relative px-3 py-4 h-[35%] w-full overflow-hidden rounded-t z-10 " + titleClass;
     return <div className={bodyClass}>
      <div className="relative justify-start z-5 flex flex-col w-[60%] ">
        <h2 className="self-start text-xl font-semibold leading-5">
            {title}
        </h2>
        <p className="mt-1.5 text-sm font-medium ">
            {description}
        </p>
      </div>
      <img
        src={imageURL}
        alt={title}
        className="absolute z-2 top-[50%] translate-y-[-50%] right-[-5px] object-contain w-[100px]"
      />
    </div>
}

function CardFooter({ totalItems , buttonURL}: CardFooterProps) {
  return (
    <div className="flex gap-5 justify-between px-4 py-5 font-bold leading-none border-t bg-opacity-10 border-gray-500 border-opacity-10">
      <div className="flex flex-col my-auto">
        <span className="text-xs text-blue-800">Total items</span>
        <span className="self-start text-[10px] font-normal text-blue-800">
          {totalItems > 0 ? totalItems : "-- "} items
        </span>
      </div>
      <Link href={buttonURL} className="px-2.5 py-2.5 text-xs text-white bg-blue-800 rounded-md">
        see all &gt;
      </Link>
    </div>
  );
}
