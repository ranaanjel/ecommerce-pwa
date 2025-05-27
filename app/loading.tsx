import Image from "next/image"
export default function Loading() {

    <div className="flex justify-center h-screen w-screen items-center bg-white ">
    <Image src="/loading-page.gif" className="w-[80%] relative left-[-10px] z-2 " alt='loading..' width={237} height={512} /> 
    <div className="h-[50px] rotate-x-80  absolute w-[100px] bg-gray-400/80 z-[1] top-[60%] rounded-[100%] animate-spin">
    </div>
</div>
}