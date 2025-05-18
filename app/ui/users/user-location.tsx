"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, DrawingPinFilledIcon, DrawingPinIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MapIcon } from "../svg/mapicon";
import LocationPickerMap, { CustomAutocomplete } from "../googleMap";
import { CurrentGPS } from "../svg/currentGPS";
import { FetchDataLocation } from "./user-location-fetch";

interface UserLocationProps {
  userId: string;
}

export default function UserLocation({ userId }: UserLocationProps) {
  const router = useRouter();
  const [geoAllowed, setGeoAllowed] = useState(false);
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [address, setAddress] = useState("Address");
  const [coords, setCoords] = useState<{lat:number, lng:number}>({lat:11, lng:72})
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const handleBack = () => {
    router.back();

  };
  const locationRef = useRef< () => void | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const centerRef = useRef<HTMLDivElement | null>(null)


  //checking the userId by the middleware instead of the useEffect here.

  useEffect(function () {
    //prompting for the address for user
    // then creating the map for it -- in case not granted showing the fallback ui.

    // navigator.permissions.query({
    //   name:"geolocation"
    // })

    //in case the 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        // console.log(position.coords.latitude, position.coords.longitude)
        setGeoAllowed(true);

      }, function (error) {
        console.log(error)
      })
    } else {
      notFound();
    }


  })

  const handleConfirm = () => {
    // Navigate to the next page in the flow
    // This could be a dashboard or order page
    let pathValue = `/users/${userId}/address_details?value=`;

    if(address == "Address") {
      return ""
    }
    let searchParams = address ;
    let url = encodeURI(pathValue+searchParams)
   //console.log(url)
    router.push(url);
  };

  return (
    <div className="w-full h-screen bg-gray-500/50 overflow-hidden select-none">
      <div className="w-full py-4 border-b border-[#B4B4B4] bg-white flex items-center px-6 gap-10">
        <div onClick={handleBack} className="cursor-pointer bg-gray-700/5 rounded">
          <ChevronLeftIcon className="size-8" />
        </div>
        <div className="flex items-center">
          <div className="text-red-600">
            <MapIcon />
          </div>
          <div className="text-2xl font-normal ml-2">Delivery location</div>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-90px)] relative">
        {/* Map placeholder - in production this would be integrated with a mapping API */}
        <div className="w-full h-7/10 bg-gray-200">
          {
            geoAllowed ? <LocationPickerMap getLocation={locationRef} mapValue={setMap} setCurrentAddress={setAddress
            } /> : <Image
              src="/map-image.jpg"
              alt="Map"
              width={"626"}
              height={"626"}
              priority
              className="object-contain"
            />
          }

        </div>
        <div className="absolute bottom-0 w-full bg-white rounded-t-[20px] p-8 pb-4">
          <div ref={centerRef} onClick={
            function () {

              console.log(locationRef.current?.())

            }         
          } className="border-2 cursor-pointer p-2 bg-white border-gray-400  absolute z-9 right-[0%] top-[-30%] translate-x-[-50%] rounded-lg">
            <CurrentGPS />
          </div>
          <div className="relative mb-6">
            <div className="w-full h-[43px] rounded-[5px] border border-[#B4B4B4] bg-white flex items-center px-2">
              <div>
                <MagnifyingGlassIcon className="text-[#B4b4b4] size-6" />
              </div>
              <input type="text" placeholder="search for a place" className="border-none focus:outline-none p-2" onFocus={function () {
                setSearchPlaces(true)
              }}/>
            </div>
          </div>
          <div className="mb-6">

            <div className="flex items-start">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mt-1"
                >
                  <g clipPath="url(#clip0_74_279)">
                    <path
                      d="M20.5 8.25053C20.5001 7.24418 20.211 6.25901 19.667 5.41233C19.1231 4.56565 18.3473 3.89314 17.4319 3.4749C16.5166 3.05665 15.5004 2.91029 14.5042 3.05324C13.5081 3.19619 12.574 3.62243 11.8133 4.2812C11.0525 4.93997 10.4971 5.80352 10.2132 6.76899C9.92934 7.73447 9.92892 8.76119 10.212 9.7269C10.4951 10.6926 11.0498 11.5566 11.81 12.216C12.5703 12.8754 13.504 13.3024 14.5 13.4462V23.2505C14.5 23.4494 14.579 23.6402 14.7197 23.7809C14.8603 23.9215 15.0511 24.0005 15.25 24.0005C15.4489 24.0005 15.6397 23.9215 15.7803 23.7809C15.921 23.6402 16 23.4494 16 23.2505V13.4462C17.2487 13.2642 18.3903 12.6392 19.2164 11.6854C20.0425 10.7315 20.4981 9.5124 20.5 8.25053ZM15.25 12.0005C14.5083 12.0005 13.7833 11.7806 13.1666 11.3685C12.5499 10.9565 12.0693 10.3708 11.7855 9.68559C11.5016 9.00037 11.4274 8.24637 11.5721 7.51894C11.7167 6.79151 12.0739 6.12333 12.5983 5.59888C13.1228 5.07443 13.791 4.71728 14.5184 4.57259C15.2458 4.42789 15.9998 4.50215 16.6851 4.78598C17.3703 5.06981 17.956 5.55046 18.368 6.16714C18.7801 6.78383 19 7.50885 19 8.25053C19 8.74299 18.903 9.23062 18.7145 9.68559C18.5261 10.1406 18.2499 10.554 17.9017 10.9022C17.5534 11.2504 17.14 11.5266 16.6851 11.7151C16.2301 11.9035 15.7425 12.0005 15.25 12.0005Z"
                      fill="#FF0000"
                    />
                    <circle cx="15.5" cy="8.5" r="4.5" fill="#FF0000" />
                  </g>
                  <defs>
                    <clipPath id="clip0_74_279">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="ml-2">
                <div className="text-xl font-bold">{address.split(",").slice(1,3).join(",")}</div>
                <div className="text-xs text-[#000000] mt-2">
                  {address}
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleConfirm}
            className="w-full h-[58px] bg-[#099FFF] rounded-[5px] text-white text-2xl font-bold shadow-[0px_4px_6.1px_0px_rgba(0,0,0,0.14)]"
          >
            confirm
          </button>
          {/* <div className="w-full h-6 bg-[#D9D9D9] absolute bottom-0 left-0" /> */}
        </div>
      </div>
      {searchPlaces && <FetchDataLocation setSearch={setSearchPlaces}>
          <CustomAutocomplete mapRef={map} centerRef={centerRef} inputRef={inputRef} setCenter={setCoords} setAddress={setAddress} callBack={function () {
            setSearchPlaces(false)
          }}/>
        </FetchDataLocation>}
    </div>
  );
}
