import { Itemlist, Preorder, PreorderItem } from "@/app/(protected)/lib/placeholder-data"
import Image from "next/image";
import Link from "next/link"

interface CardFooterProps {
  totalItems: number;
  buttonURL:string
}
export function PreorderCard({title, description, imageURL, buttonURL, list, bgBody, bgTitle, type, iconURL}:Preorder) {

    let totalItem = list.length;
    let bodyClass = "relative mt-2 h-86 min-w-[52%] w-[52%] max-w-[52%] rounded-lg "+ bgBody;
    let titleClass = bgTitle
    
    if (type == "page") {
      bodyClass = "relative h-86 rounded-lg "+ bgBody;

    }

    return <div className={bodyClass}>
    <CardHeader titleClass={titleClass} title={title} description={description} imageURL={type=="page"? imageURL : iconURL}   />
    <div className="min-h-[38%]">
        {
           list.length > 0 ? list.filter(m => !m.outOfStock).slice(0,2).map((item:Itemlist, index) => {
                let imageURL = item.imageURL;
                let itemName = item.name;
                

                let mrp = String(item.mrp);
                let quantity = item.currentQuantity ?? item.quantity;


                if(localStorage.getItem("crate")) {
                  let localCrate = JSON.parse(localStorage.getItem("crate")as string);
                  if (itemName in localCrate ) {
                    quantity = localCrate[itemName].quant;
                  }
                }

                let discountPrice = item.discountValue;
                let totalDiscountPrice = quantity* discountPrice;
                let totalPrice = quantity * (+mrp);
                let unit = item.unit;

                return <ProductItem key={itemName} unit={unit} quantity={quantity} totalDiscountPrice={totalDiscountPrice} totalPrice={totalPrice} discountPrice={discountPrice} mrp={mrp} itemName={itemName} imageURL={imageURL} />
            }) : <ProductItemSkeleton bgBody={bgBody} title={title}/>
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
        <Image
          width={100}
        height={100}
        placeholder="blur"
        blurDataURL="/blur.jpg"
        src={imageURL}
        alt={itemName}
        className="object-contain shrink-0 aspect-square w-[25px]"
      />
        <div className="flex flex-col gap-1 text-xs text-black">
          <div className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis w-25 lowercase">{itemName.toLocaleLowerCase()}</div>
            <span className="text-gray-500">{quantity}</span>
        </div>
      </div>
        <div className="flex flex-col gap-1 justify-between mt-1 text-xs font-medium text-black self-start">
          <span className="font-medium self-end">{totalDiscountPrice}</span>
          <span className="line-through text-gray-500 self-end">{totalPrice}</span>
        </div>
    </section>
  );
}
function ProductItemSkeleton({title, bgBody}:{title:string, bgBody:string}) {
  
  
  // console.log(bgBody)
  bgBody = String(bgBody)

  let createOne = title.toLocaleLowerCase() == "create one"

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
    <Link href={title.toLocaleLowerCase() == "create one"?"/dashboard/preorder-list/create":"/dashboard/preorder-list/"+title.replace(/\s/g,"_")+"/add-to-list"} className={"w-full h-full absolute top-0 rounded-lg backdrop-blur-[2px] flex justify-center items-center "+`${createOne? " bg-gray-600/20 ":bgBody}`}> 
        { title.toLowerCase() == "create one" ? <Image placeholder="blur" blurDataURL="/blur.jpg" src="/plus.svg" alt="create one" height={50} width={50} className=""/>
        : <div className="text-logo border p-2 rounded-sm bg-white/60">
        Add items to list
        </div>}
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
      <Image
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL="/blur.jpg"
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
