"use client"

import { usePathname, useRouter } from "next/navigation";
import { AccountIcon, CategoryIcon, CrateIcon, HomeIcon, OrderIcon } from "../svg/bottomBarSvg"
import Link from "next/link";

export function BottomBar() {

        let pathName = usePathname();

        return <div className="h-18 bg-white shadow-sm w-full z-10 fixed bottom-0" >
                <div className="flex h-16 w-full">
                        {
                                bottomLink.map((m, index) => {
                                        let icon = m.svg;
                                        let name = m.name;
                                        let url = m.url

                                        let iconColor = "text-gray-500/50";
                                        let textColor = "text-gray-700/60";

                                        // console.log(pathName.includes(name.toLocaleLowerCase()), name, pathName)

                                        if (pathName.includes(name.toLocaleLowerCase())) {
                                                iconColor = "text-logo"
                                                textColor = "text-logo"
                                        }
                                        if (pathName == "/dashboard" && name.toLowerCase() == "home") {
                                                iconColor = "text-logo"
                                                textColor = "text-logo"

                                        }

                                        return <Link key={index} href={url} className="flex flex-col items-center w-1/5 justify-center mb-1">
                                                <div className={" min-h-10 w-full flex justify-center items-center " + iconColor}>
                                                        {icon}
                                                </div>
                                                <div className={"text-sm font-normal " + textColor}>
                                                        {name}
                                                </div>
                                        </Link>
                                })
                        }
                </div>
                <div className="h-2 w-full bg-gray-200">

                </div>
        </div>
}

let bottomLink = [
        {
                name: "Home",
                svg: <HomeIcon />,
                url: "/dashboard/home"
        },

        {
                name: "Category",
                svg: <CategoryIcon />,
                url: "/dashboard/category"
        },
        {
                name: "Crate",
                svg: <CrateIcon />,
                url: "/dashboard/crate"
        },
        {
                name: "Order",
                svg: <OrderIcon />,
                url: "/dashboard/order"
        },
        {
                name: "Account",
                svg: <AccountIcon />,
                url: "/dashboard/account"
        },

]
