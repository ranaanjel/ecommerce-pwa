import Image from "next/image";
import Link from "next/link";

export function CrateComponent() {

        return            <Link href={"/dashboard/crate"} className="p-2 bg-logo rounded-full ">
                        <Image placeholder="blur" blurDataURL="/blur.jpg" src={"/crate.svg"} height={25} width={25} className="w-[18px] h-[18px]" alt="cart symbol" />
                    </Link>
}