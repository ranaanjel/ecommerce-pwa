"use client";

import Image from "next/image";

export default function NotFound() {

    return <div className="w-full h-[100vh] flex items-center justify-center bg-gray-700 text-white">
      <div className="text-center">
          {/* <div>
          The resource you&apos;re are looking for is not found 
          </div> */}
        <div className="text-2xl">404 NOT FOUND</div>
        {/* < Image src={"https://ik.imagekit.io/auctvhqov/_sorry_ucRtbBbo2N.webp?updatedAt=1755440367332"} width={100} height={100} alt="sorry"></Image> */}
      </div>
    </div>
}