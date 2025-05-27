"use client"

import { banner } from "@/app/lib/placeholder-data"
import Banner from "./Banner";
import { useRef, useState } from "react";

export default function CaraouselBanner() {

    let bannerRefs = useRef<Array<HTMLDivElement>>([]);

    let [currentIndex, setCurrentIndex] = useState(0)


    return <div className="relative">
        <div className="relative flex overflow-scroll w-full h-60 p-4  gap-4 snap-x snap-mandatory caraousel" onScroll={function (eventObject) {
            console.log("scrolling", bannerRefs)
            if(bannerRefs.current) {
                let valueCheck = Infinity;
                let indexNearest = 0;
                bannerRefs.current.forEach((m, index) => {
                   let data =  m.getBoundingClientRect();
                   if(data.x < 0) {
                    return;
                   } else {
                        if(valueCheck > data.x) {
                            valueCheck = data.x;
                            indexNearest = index;
                        }
                   }

                })
                setCurrentIndex(indexNearest)

            }
        }}>
        {banner.map((m, index)=> {
            let title = m.title;
            let text = m.text;
            let buttonURL = m.buttonURL;
            let imageURL = m.imageURL;
            let gradientColor = m.gradientColor;

            return <Banner bannerRefs={bannerRefs} key={index} index={String(index)} title={title} text={text} buttonURL={buttonURL} imageURL={imageURL} gradientColor={gradientColor}  />
        })}
       
    </div>
     <div className="absolute z-2 bottom-[15%] left-1/2 translate-x-[-50%] flex gap-2">

            {

            banner.map((m,index) => {
                
                let defaultClass = "w-[6px] h-[6px] bg-gray-300 rounded-full";
                if(currentIndex == index) {
                    defaultClass = "w-[20px] h-[6px] bg-white rounded-lg";
                }

                return <div key={index} className={defaultClass}>
                    
                </div>
            })
        }
        </div>
    </div>
}

