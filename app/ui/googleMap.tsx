"use client"
import { useState, useCallback, useRef, useEffect, SetStateAction, Ref } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, Libraries } from "@react-google-maps/api";
import axios from "axios";
import { CURRENT_URL } from "../lib/utils";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CurrentGPS } from "./svg/currentGPS";
import clsx from "clsx";

const containerStyle = {
    width: "100%",
    height: "600px"
}

const defaultCenter = {
    "lat": 28.6139,
    "lng": 77.2090
}

const libraries: Libraries = ["places"]

//google.maps.Map google.maps.places.AutoComplete

export default function LocationPickerMap({ setCurrentAddress, mapValue, getLocation }: { getLocation: any, mapValue: React.Dispatch<SetStateAction<google.maps.Map | null>>, setCurrentAddress: React.Dispatch<SetStateAction<string>> }) {

    const [center, setCenter] = useState<{ lat: number, lng: number }>(defaultCenter);
    const [_, setAddress] = useState("");
    const mapRef = useRef<google.maps.Map | null>(null);
    const [loadingMap, setLoadingMap] = useState(false);
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
        libraries
    })
    const reverseGeoCode = useCallback(async (lat: string, lng: string) => {
        try {

            let url = CURRENT_URL && window.location.origin;
            console.log(url)

            const res = await axios.get(url + `/query/google-map?lat=${lat}&lng=${lng}`);
            const result = res.data;
            console.log(result, "--------------------------------");

            if (result.status) {
                setAddress(result.formatted_address);
                setCurrentAddress(m => result.formatted_address)
            } else {
                setAddress("no address found");
            }
        } catch (err) {

            console.error("reverse geocode failed", err);
            setAddress("Error fetching address");

        }
    },[setCurrentAddress])
    useEffect(function () {
        const fetchUserLocation = async () => {
            //getting the center for the map here
            try {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCenter({ lat: latitude, lng: longitude })
                    reverseGeoCode((latitude).toFixed(6), (longitude).toFixed(6))
                }, async () => {
                    //in case of failure
                    alert("hello world")
                    const data = await axios.get(window.location.origin + "/query/ipapi");
                    const latitude = data.data.lat
                    const longitude = data.data.lng;
                    
                    console.log(latitude, longitude)

                    setCenter({ lat: (latitude), lng: (longitude) })
                }, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                })

            } catch (err) {
                console.log(err, "could not get location")
            }

        }
        fetchUserLocation();
    }, [reverseGeoCode])

    const onLoad = useCallback((map: any) => {
        mapRef.current = map;
        mapValue(() => mapRef.current as google.maps.Map)

        // let bounds = new window.google.maps.LatLngBounds();
        // bounds.extend(center);  
        // map.fitBounds(bounds, { top: 200, bottom: 200, left: 200, right: 200 });
        map.setZoom(19);
    }, [mapValue])
    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, [])

    const onDragEnd = useCallback(() => {
        const map = mapRef.current as google.maps.Map | null;
        if (map) {
            const newCenter = map.getCenter();
            if (newCenter) {
                const coords = {
                    lat: newCenter.lat(),
                    lng: newCenter.lng()
                }
                setCenter(coords)
                //console.log(coords.lat.toFixed(8), coords.lng.toFixed(8))
                reverseGeoCode(coords.lat.toFixed(8), coords.lng.toFixed(8));
            }

        }
    }, [reverseGeoCode])

    const getCurrentLocation = function () {
        setLoadingMap(true)
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setCenter({ lat: latitude, lng: longitude })
            reverseGeoCode((latitude).toFixed(6), (longitude).toFixed(6))
            setLoadingMap(false)
            mapRef.current?.panTo(center)
        }, () => { }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        })

    }
    getLocation.current = getCurrentLocation;


    if (!isLoaded) {
        return <div>
            <MapSkeleton2 />
        </div>
    }

    return <div>

        {
            !loadingMap ? <GoogleMap mapContainerStyle={containerStyle} onUnmount={onUnmount} onLoad={onLoad}
                onDragEnd={onDragEnd}
                center={center} zoom={15} options={{
                    disableDefaultUI: true, zoomControl: false, fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    keyboardShortcuts: false,
                }}>
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-100%] z-10 text-2xl">
                    📍
                </div>

            </GoogleMap> : <MapSkeleton2 />
        }
    </div>
}


export function CustomAutocomplete({ setCenter, inputRef, callBack , centerRef, mapRef, setAddress}: { callBack?: () => void, inputRef?: React.RefObject<HTMLInputElement | null>, centerRef?: React.RefObject<HTMLDivElement | null>, mapRef:any,setAddress:any,setCenter: React.Dispatch<SetStateAction<{ lat: number, lng: number }>> }) {

    const [input, setInput] = useState('')
    const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const [errorConfirm, setErrorConfirm]  = useState(false)

    useEffect(() => {
        if (!window.google) return
        autocompleteService.current = new window.google.maps.places.AutocompleteService()
        inputRef?.current?.focus();
    }, [inputRef])

    const fetchPredictions = (value: string) => {
        if (!value) {
            setPredictions([])
            return
        }
        autocompleteService.current?.getPlacePredictions(
            { input: value },
            (results) => {
                setPredictions(results || [])
            }
        )
    }

    const getPlaceDetails = (placeId: any) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'))
        service.getDetails({ placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry) {
                const lat = place.geometry.location?.lat()!
                const lng = place.geometry.location?.lng()!
                console.log(place, lat, lng)

                mapRef.panTo({lat, lng});
                setAddress(place.formatted_address)
                setCenter({ lat, lng })
                // do something with lat/lng
            }
        })
    }


    const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
        setInput(prediction.description)
        console.log(prediction)
        setPredictions([])
        getPlaceDetails(prediction.place_id) // You can use PlacesService to get full lat/lng
    }



    return (

        <div className="relative flex-1 flex flex-col justify-between">
           <div>
             <div className={errorConfirm ? "border border-red-500 w-full h-[43px] rounded-[5px] bg-[#ebf6ff] flex items-center px-2" :"w-full h-[43px] rounded-[5px] border border-[#B4B4B4] bg-[#ebf6ff] flex items-center px-2"} >
                <div>
                    <MagnifyingGlassIcon className="text-[#B4b4b4] size-6" />
                </div>

                <input ref={inputRef} onClick={function () {
                    if (callBack) {}
                }}
                    value={input}
                    onChange={(e) => {
                        setErrorConfirm(false)
                        setInput(e.target.value)
                        fetchPredictions(e.target.value)
                    }}
                    placeholder="Search a new address" className={clsx(`w-full border-none focus:outline-none p-2 `)}
                />
            </div>

            {predictions.length > 0 ? (
                <div className="  bg-white  text-black w-full    pt-2 mt-3 flex flex-col gap-2">
                    {predictions.map((pred) => {

                        return <div className="flex justify-start gap-4 items-center h-[70px] border-b-1 border-gray-500 hover:bg-gray-100" key={pred.place_id} onClick={() => handleSelect(pred)}>

                            <CurrentGPS />
                            <div className="" >
                                {pred.description}
                            </div>
                        </div>


                    }
                    )}
                  
                </div>
            ) : <div className="my-3 mx-1">
                  {/* {inputRef?.current?.value && predictions.length == 0 && <div className="text-red-500 font-thin my-2 mb-3">
                        No Such Place Exist  */}
                        {/* </div>} */}


                <div className="flex justify-start gap-4 items-center text-red-500 cursor-pointer" onClick={function () {
                    
                    if (centerRef?.current) {
                        centerRef.current.click();
                    }
                    if(callBack) {
                        callBack()
                    }
                }}>


                    <CurrentGPS />
                    <div className="" >
                        <h3>Your Current Location</h3>
                        <p>Using GPS</p>
                    </div>
                </div>

            </div>}
           </div>
            <button
                onClick={function () {

                    console.log(inputRef?.current?.value.trim(), inputRef?.current)

                    if(inputRef?.current?.value.trim() == "") {
                        setErrorConfirm(true)
                        console.log(errorConfirm)
                        return;
                    } else if (callBack) {
                        callBack();
                    }
                }}
                
                className={`mt-4 cursor-pointer w-full h-[58px] bg-[#099FFF] rounded-[5px] text-white text-2xl font-bold shadow-[0px_4px_6.1px_0px_rgba(0,0,0,0.14)]`}
            >
                confirm
            </button>
        </div>
    )
}


const MapSkeleton = () => {
    return (
        <div className="mx-auto w-full bg-gray-200 h-screen rounded-md p-4">
            <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full bg-gray-400">
                </div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-400">
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-2 rounded bg-gray-400">
                            </div>
                            <div className="col-span-1 h-2 rounded bg-gray-400">
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="h-1/2 animate-pulse mt-4 rounded bg-gray-400"></div>
        </div>
    );
};

const MapSkeleton2 = () => {
    return (
        <div className="mx-auto w-full bg-gray-200 h-screen animate-pulse rounded-md p-4">
            <div className="flex animate-pulse space-x-4">
                <Image placeholder="blur" blurDataURL="/blur.jpg" src="/map-image.jpg" alt="fallback-map" height="700" width="400" />
            </div>
        </div>
    );
};


// export default MapSkeleton;
