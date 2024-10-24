"use client";
import { Separator } from '@radix-ui/react-separator';
import axios from 'axios'
import { MapPinned, PersonStanding } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Location = ({ mapsrc, lat, long, Destination }: { mapsrc: string, lat: any, long: any , Destination: any}) => {

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(true);
  const [distance, setDistance] = useState<string>("waiting...");
  const [timestep, setTimestep] = useState<string>("")

  const Distance = async () => {
    if (latitude !== null && longitude !== null) {
      const originCoordinates = `${latitude},${longitude}`;
      const destinationCoordinates = `${lat},${long}`;
      try {
        await axios.get(`/api/getdistance/?origin=${originCoordinates}&destination=${destinationCoordinates}`)
          .then((res) => {
            setDistance(res.data.rows[0].elements[0].distance.text);
            setTimestep(res.data.rows[0].elements[0].duration.text);
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log("catch", error)
      }
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationEnabled(true);
        },
        () => {
          setLocationEnabled(false);
        }
      );
    } else {
      setLocationEnabled(false);
    }
    console.log(latitude, longitude)
    if (latitude !== null && longitude !== null) {
      Distance();
    }
  };

  useEffect(() => {
    getCurrentLocation()
  }, [latitude, longitude, locationEnabled]);



  return (
    <>
      <section className="text-headingchild rounded-md flex items-center justify-center flex-col gap-8">
         <iframe src={mapsrc} height={450} className='w-full col-span-2' loading="lazy" />
      </section>
          <h1 id='distance' className='text-black pt-16 pb-4 text-4xl font-bold tracking-tighter'>Distance Calculation</h1>
     <hr/>
        <div className="flex overflow-hidden flex-col">
      <div className="flex flex-col py-6 w-full  shadow-2xl max-md:max-w-full">
        <div className="flex flex-col px-11 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
            <div className="flex gap-1.5">
              <div className="flex flex-col justify-center items-center px-1.5 my-auto w-7 h-7 rounded-full bg-black bg-opacity-10">
                <div className="flex shrink-0 w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
              </div>
              <div className="flex-auto gap-2.5 self-stretch px-5 py-2.5 text-xs font-semibold text-black border border-solid border-black border-opacity-20 rounded-[50px]">
                Your Location
              </div>
            </div>
            <img
              loading="lazy"
              src="/dotted.svg"
              className="object-contain shrink-0 my-auto aspect-[24.39] stroke-[2px] stroke-black w-[49px]"
            />
            <div className="flex gap-1.5 text-xs font-semibold text-black">
              <img
                loading="lazy"
                src="/location.svg"
                className="object-contain shrink-0 my-auto w-7 aspect-square "
              />
              <div className="flex-auto gap-2.5 self-stretch px-5 py-2.5 border border-solid border-black border-opacity-20 rounded-[50px]">
            {Destination}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 items-start self-start mt-9 text-xs font-semibold text-white whitespace-nowrap">
            <div className="flex gap-2.5 justify-center items-center px-5 py-2.5 bg-black rounded-[50px] w-[98px]">
              <img
                loading="lazy"
                src="/gis_car.svg"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[17px]"
              />
              <div className="self-stretch my-auto">Car</div>
            </div>
          </div>
          <hr className='mt-6'/>
          <div className="flex flex-wrap gap-10 items-start mt-8 w-full max-w-[679px] max-md:max-w-full">
            <div className="flex flex-col self-start text-2xl text-black">
              <div className="flex gap-2.5 items-center">
                <div className="self-stretch my-auto font-semibold">{distance}</div>
                <div className="self-stretch my-auto font-medium">{timestep}</div>
              </div>
              <img
                loading="lazy"
                src="/bottom-line.svg"
                className="object-contain mt-5 max-w-full aspect-[23.81] stroke-[6px] stroke-black w-[143px]"
              />
            </div>
            <div className="flex gap-2.5 justify-center items-center self-end py-2.5 pr-4 pl-1.5 mt-6 rounded-[48px]">
              <img
                loading="lazy"
                src="/arrow-right.svg"
                className="object-contain self-stretch my-auto aspect-square fill-black stroke-[4.227px] stroke-white w-[42px]"
              />
            </div>
            <div className="grow shrink my-auto text-xs text-black opacity-50 w-[243px]">
              Fastest Route now due to traffic conditions
            </div>
          </div>
        </div>
      </div>
    </div>
        <button
          onClick={getCurrentLocation}
          className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-neutral-700"
        >
          Get Distance
        </button>
        {!locationEnabled && (
          <p className="text-red-500 mt-4">Location is off. Please enable it in your browser settings.</p>
        )}
      </>
  )
}

export default Location
