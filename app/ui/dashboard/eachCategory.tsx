import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useTransition, Suspense, lazy } from "react"


export function EachCategory({footerRef}:{footerRef:React.RefObject<HTMLElement|null>}) {

    const [offset, setOffset] = useState(2)
    const [isPending, startTransition] = useTransition();
    const [isLoading,SetLoading] = useState(false);
    const [itemList, setItemList] = useState([])

    useEffect(function () {
        let observer = new IntersectionObserver((entry) => {
                entry.forEach(m=> {

                    if(m.isIntersecting) {

                        //calling the async function here and startTransition to be inside that.    
                        startTransition( () =>{
                            SetLoading(true)

                            
                            // setTimeout(function () {
                            // SetLoading(false)
                            // console.log(offset)
                            // },2000)
                        })
                    }

                })
        },{threshold:[0.2]})

        if(footerRef.current) {
            observer.observe(footerRef.current)
        }

        return () =>{
            if(footerRef.current)
            {

            observer.unobserve(footerRef.current);
            }
        };

    },[])

    async function fetchData() {
        let url = window.location.origin;
        let result = await axios(url + "/query/v1/category");

        //getting the data
    }

    return <div>
        <div className="adding_data">

        </div>
        <div>
            {isPending || isLoading && <CategoryLoading/>}
            {/* {true && <CategoryLoading/>} */}
            
        </div>
    </div>
}

//loading loader when reaching the end 
//adding the value after 2 each time. fetching the data backend-- simulation.

function CategoryLoading() {

    return <div className="flex justify-center items-center  w-[100px] h-[80px] m-auto">
        <Image src={"/loading-items.gif"} alt="" width={100} height={100} className="object-cover w-[400px] h-[400px]"/>
    </div>
}