import Image from "next/image";

export  function CategoryLoading() {

        return <div className="flex justify-center items-center  w-[100px] h-[80px] m-auto">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]" />
        </div>
}
