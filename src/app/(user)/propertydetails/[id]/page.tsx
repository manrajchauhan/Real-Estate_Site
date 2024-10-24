"use client";
import React, { FC, useRef, useState, useEffect } from 'react'
import { RxCross1 } from "react-icons/rx";
import {
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import NavBar from '@/components/NavBar';
import HeroBottom from '@/components/HeroBottomproperties';
import Image from 'next/image';
import { Bath, BatteryCharging, Bed, BookImage, Cctv, Club, Dumbbell, Fence, Fuel, House, Images, Rows3, SmartphoneCharging, Trash2, Waves } from 'lucide-react';
import { FaDharmachakra, FaCar, FaWhatsapp } from "react-icons/fa";
import { GiElevator } from "react-icons/gi";
import { Separator } from "@/components/ui/separator"
import { PiPark } from "react-icons/pi";
import { FaCarTunnel } from "react-icons/fa6";
import Loan from '@/components/Loan';
import Message from '@/components/MessagePropertyDetails';
import Footer from '@/components/Footer';
import { GiHomeGarage } from "react-icons/gi";
import Location from '@/components/Location';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { FaHandPointRight } from "react-icons/fa";

interface PageProps {
  params: {
    id: string,
  };
}
const Page: FC<PageProps> = ({ params }) => {
  const Id = params.id;
  const sections = useRef<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showGalleryPhoto, setShowGalleryPhoto] = useState(false);
  const [ galleryImages, setGalleryImages] = useState<[{original:string,thumbnail:string}]>()
  const [ startIndex, setStartIndex ]= useState<number>(0);

  // Find Latitudeand Longitude
  const extractLatLngFromUrl = (url: string): { latitude: number; longitude: number } | null => {
    const latRegex = /!3d([-\d.]+)/;
    const lngRegex = /!2d([-\d.]+)/;
    const latMatch = url.match(latRegex);
    const lngMatch = url.match(lngRegex);

    if (latMatch && lngMatch) {
      const latitude = parseFloat(latMatch[1]);
      const longitude = parseFloat(lngMatch[1]);
      return { latitude, longitude };
    }
    return null;
  };

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getPropertiesdetails', Id,],
    queryFn: async () => {
      const { data } = await axios.get(`/api/getallproductdetails/${Id}`);
      return data?.allPropertiesData[0]
    }
  })


  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Swimming Pool':
        return <Waves className="size-8" />;
      case 'Private Garden':
        return <Fence className="size-8" />;
      case 'Banquet Hall':
        return <Rows3 className="size-8" />;
      case 'Piped Gas':
        return <Fuel className="size-8" />;
      case 'Vastu Compliant':
        return <FaDharmachakra className="size-8" />;
      case 'Club House':
        return <Club className="size-8" />;
      case 'Gym':
        return <Dumbbell className="size-8" />;
      case 'InteCom Facility':
        return <SmartphoneCharging className="size-8" />;
      case 'Elevator':
        return <GiElevator className="size-8" />;
      case 'CCTV':
        return <Cctv className="size-8" />;
      case 'Waste Disposal':
        return <Trash2 className="size-8" />;
      case 'Power Backup':
        return <BatteryCharging className="size-8" />;
      case 'Kids Play Area':
        return <PiPark className="size-8" />;
      case 'Reserved Parking':
        return <FaCar className="size-8" />;
      case 'Visitor Parking':
        return <FaCarTunnel className="size-8" />;
      default:
        return <Images className="size-8" />;
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-10% 0px -60% 0px',
      }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });


    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };

  }, [sections]);

  useEffect(() => {
    if (data?.mapsrc) {
      const extractedCoordinates = extractLatLngFromUrl(data?.mapsrc);
      if (extractedCoordinates) {
        setCoordinates(extractedCoordinates);
      }
    }

    if(data?.images){
      setGalleryImages(data.images.map(({images}:{images:string}) => ({
        original: images,
        thumbnail: images,
      })));
    }

  }, [data?.mapsrc, data?.images]);

  useEffect(() => {

    if (showGalleryPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showGalleryPhoto]);

  return (
    <>
      <div className='relative h-[85vh]  flex flex-col justify-between overflow-hidden'>
        <NavBar />
        <div className="bg-black/60 h-full w-full absolute top-0 left-0 -z-10"></div>
        <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full overflow-hidden rounded-l-md -z-20 absolute top-0 left-0">
        <CarouselContent>
          {data?.images.map(({ images }:{images:string}, index:number) => (
            <CarouselItem key={index}>
              <Image src={images} alt="image" width={0} height={0} sizes="100vw" className="w-full h-auto object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      </div>

      <div className='relative flex flex-col justify-between overflow-hidden'>
      <HeroBottom bhk={data?.bhk} location={data?.sortlocation} parking={data?.parking} name={data?.name} bath={data?.bath} sq={data?.carpetsize} price={data?.price} floor={data?.floor}/>
      </div>

      {/* photoes */}
      <div ref={(el) => { if (el) sections.current.push(el) }} id='pictures' className="px-14 py-20 gap-10 flex">
        <section className="max-w-full">
          <span className="grid grid-cols-2 gap-2">
            <Image onClick={()=>{setStartIndex(0); setShowGalleryPhoto(true)}} priority rel='preload' alt='property image' src={data?.images[0]?.images || '/fallback-image.jpg'} height={0} width={0} sizes='100vw' className='w-full h-[20vw] rounded-3xl object-cover cursor-pointer col-span-2' />
            <Image onClick={()=>{setStartIndex(1);setShowGalleryPhoto(true)}} priority alt='property image' src={data?.images[1]?.images || '/fallback-image.jpg'} height={0} width={0} sizes='100vw' className='w-full h-[20vw]  object-cover cursor-pointer rounded-3xl' />
            <span className="relative flex items-center justify-center  ">
              <div className="bg-black/30 w-full h-full absolute top-0 left-0 rounded-3xl"></div>
              <Image
                priority
                alt="property image"
                src={data?.images[2]?.images || '/fallback-image.jpg'}
                height={0}
                width={0}
                sizes="100vw"
                className="w-full h-[20vw] object-cover rounded-3xl"
              />
              <button
                className="flex items-center absolute gap-2 bg-white w-fit text-heading px-3 py-3 rounded-3xl"
                onClick={()=>{setStartIndex(0);setShowGalleryPhoto(true)}}
                style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
              >
                <BookImage className="text-2xl" />
                View all photoes
              </button>
            </span>
          </span>

          <h1 ref={(el) => { if (el) sections.current.push(el) }} id='about' className='text-black pt-16 pb-4 text-4xl font-bold tracking-tighter'>Property Description</h1>
          <p className='text-heading text-xl mt-2 mb-16'>{data?.description}</p>
          <Separator orientation="horizontal" />
          <h1 ref={(el) => { if (el) sections.current.push(el) }} id='amenities' className='text-black pt-16 pb-4 text-4xl font-bold tracking-tighter'>Property Features</h1>
          <div className="grid grid-cols-3 gap-5 mt-4 mb-16 text-heading">
            {data?.amenities.map(({ amenities }: { amenities: string }, index: number) => (
              <li key={index} className='flex items-center gap-5 bg-white p-3 rounded-lg'>
                <div className="p-4 w-fit">
                  {renderAmenityIcon(amenities)}
                </div>
                <p>{amenities}</p>
              </li>
            ))}
          </div>
          {/* floor area */}
          <Separator orientation="horizontal" />
          <h1 ref={(el) => { if (el) sections.current.push(el) }} id='floor' className='text-black pt-8 pb-4 text-4xl font-bold tracking-tighter'>Floor Plan & Area</h1>
          <Image priority={true} alt='floorareaimage' src={data?.floorarea || '/fallback-image.jpg'} height={0} width={0} sizes='100vw' className='w-full aspect-video h-auto object-cover mb-10 ' />
          {/* <p className='mt-8 text-mainprimary font-medium text-lg'>CARPET AREA</p>
          <p className='text-lg text-heading mb-16'>{data?.carpetsize} sq ft</p> */}
   <Separator orientation="horizontal" />
          <h1 ref={(el) => { if (el) sections.current.push(el) }} id='price' className='text-black pt-16 pb-4 text-4xl
            font-bold tracking-tighter'>PRICE</h1>
          <div className="bg-lightgraycolo py-10 flex ">
            <span className='text-start'>
              <p className='text-headingchild'>AGREEMENT VALUE</p>
              <h1 className='text-heading text-3xl'>{data?.price}</h1>
            </span>
          </div>
          <Separator orientation="horizontal" />
          <h1 ref={(el) => { if (el) sections.current.push(el) }} id='location' className='text-black pt-16 pb-4 text-4xl font-bold tracking-tighter'>MAP & LOCATION</h1>
          <Location mapsrc={data?.mapsrc} lat={coordinates?.latitude} long={coordinates?.longitude}
          Destination={`${data?.name}, ${data?.sortlocation}`}/>
          <Loan />
        </section>

        <section className="text-headingchild text-md w-[30%] sticky top-16 h-[75vh] flex flex-col justify-between mx-auto">
          {/* <div className="flex flex-col gap-3">
            {Navlink.map(({ link, name }, index) => (
              <a key={index} href={`#${link}`} className={`px-2 ${activeSection == link ? 'bg-mainprimary text-white rounded-full px-4' : ''} flex items-center gap-2`}>{activeSection === link?<FaHandPointRight />:null}{name}</a>
            ))}
          </div> */}
          <div className="border p-6 bg-white rounded-[14px]">
          <h2 className='text-black mt-8 text-3xl mb-2 font-bold'>₹ {data?.price}</h2>
            <section className='grid grid-4 gap-4 mt-5 tracking-tighter'>
            <div className='flex items-center gap-2 justify-between'>
            <h1 className='flex gap-2 font-semibold text-black items-center'><Bed />Bedrooms</h1>
            <h1 className='text-black font-normal'>{data?.bhk}</h1>
            </div>
              <hr/>
              <div className='flex items-center gap-2 justify-between'>
            <h1 className='flex gap-2 font-semibold text-black items-center'><Bath />Bathrooms</h1>
            <h1 className='text-black font-normal'>{data?.bath}</h1>
            </div>
              <hr/>
              <div className='flex items-center gap-2 justify-between'>
            <h1 className='flex gap-2 font-semibold text-black items-center'><Bed />Area</h1>
            <h1 className='text-black font-normal'>{data?.carpetsize} sqft</h1>
            </div>
              <hr/>

              <div className='flex items-center gap-2 justify-between'>
            <h1 className='flex gap-2 font-semibold text-black items-center'><GiHomeGarage />Parking</h1>
            <h1 className='text-black font-normal'>{data?.parking}</h1>
            </div>
            </section>
            <div className='flex text-center border bg-[#d83a4e] justify-center mt-8 gap-2  rounded-xl text-white px-3 py-3'>
            <FaWhatsapp className='text-2xl' color='white' />
            <a className='text-center text-white' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat.">
            Schedule a visit</a>
            </div>
          </div>
        </section>
      </div>

      {/* <Message details={data?.images}/> */}
      <Footer />
      {/* show gallery */}
      {showGalleryPhoto && (
        <div className="bg-black/95 fixed top-0 left-0 w-[100dvw] h-[100dvh] ">
          <RxCross1 onClick={()=>{setShowGalleryPhoto(false)}} className='cursor-pointer text-2xl text-white duration-200 absolute top-10 right-10 hover:opacity-80 z-20' />
          <ImageGallery
          items={galleryImages!}
          lazyLoad
          thumbnailPosition='left'
          useTranslate3D
          startIndex={startIndex}
          />
        </div>
      )}

    </>
  )
}

export default Page

const Navlink = [
  {
    link: "pictures",
    name: "PICTURES"
  },
  {
    link: "about",
    name: "ABOUT THE HOME"
  },
  {
    link: "amenities",
    name: "AMENITIES"
  },
  {
    link: "floor",
    name: "FLOOR PLAN AND AREA"
  },
  {
    link: "price",
    name: "PRICE BREAKDOWN"
  },
  {
    link: "location",
    name: "MAP AND LOCATION"
  }
]

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
