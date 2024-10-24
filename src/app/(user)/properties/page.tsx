"use client";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Message from "@/components/Message";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import PropertiesSection from "@/components/property-cards";

const Page = () => {
  const [requirement, setRequirement] = useState<string>("");
  const [bhk, setBhk] = useState<number>();
  const [inputLocation, setLocation] = useState<string>("");
  const [dbLocation, setDbLocation] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [inputPropertyName, setPropertyName] = useState<string>("");
  const [dbPropertyName, setDbPropertyName] = useState<string[]>([]);
  const [filteredPropertyNames, setFilteredPropertyNames] = useState<string[]>([]); // State to hold filtered property names
  const [searchQuery, setSearchQuery] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["getsearchData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/getbhk");
      return data;
    },
  });

const { data: searchData, isSuccess: searchIsSuccess , refetch} = useQuery({
  queryKey: ["searchData"],
  queryFn: async () => {
    const { data } = await axios.get(`/api/getSearchData?type=${requirement}&bhk=${bhk}&location=${inputLocation}&propertyname=${inputPropertyName}`);
    return data;
  },
});

console.log(searchData);

const handleSearch =()=>{
  refetch();
}

  useEffect(() => {
    if (isSuccess) {
      const locationArray: string[] = [];
      const nameArray: string[] = [];
      data.location.forEach(({ _id }: { _id: string }) => {
        locationArray.push(_id);
      });
      data.propertyname.forEach(({ _id }: { _id: string }) => {
        nameArray.push(_id);
      });
      setDbLocation(locationArray);
      setDbPropertyName(nameArray);
    }
  }, [isSuccess, data]);

  // Filter locations based on inputLocation
  useEffect(() => {
    const filtered = dbLocation.filter((location) =>
      location.toLowerCase().includes(inputLocation.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [inputLocation, dbLocation]);

  // Filter property names based on inputPropertyName
  useEffect(() => {
    const filtered = dbPropertyName.filter((property) =>
      property.toLowerCase().includes(inputPropertyName.toLowerCase())
    );
    setFilteredPropertyNames(filtered);
  }, [inputPropertyName, dbPropertyName]);

  return (
    <>
     <div className='relative h-[75vh] flex flex-col gap-10'>
        <NavBar />
        <h1 className="text-center text-7xl text-white font-bold tracking-tighter mt-10 ">
        Find Your Dream Property with Ease
      </h1>
      <p className="text-neutral-300 tracking-tight text-center mx-auto text-lg mt-5 max-w-[66rem]">
        Welcome to your ultimate property search experience! Whether you’re
        looking to buy or rent, our platform offers a seamless and efficient way
        to discover your next home. Start exploring now and let us guide you to
        the perfect property that suits your lifestyle and preferences.
      </p>
        <div className="bg-black/40 h-full w-full absolute top-0 left-0 -z-10"></div>
        <video
          src="/loop.mp4"
          autoPlay
          muted
          loop
          className='w-full h-full object-cover -z-20 absolute top-0 left-0'></video>
      </div>

      <div className="bg-white mx-20 mt-[-80px] px-16 py-2 rounded-[16px] shadow">
      <section className="flex px-10 my-10 gap-10">

        <Select onValueChange={(value) => setRequirement(value)}>
          <SelectTrigger className="w-[20rem] rounded-3xl p-6 focus:ring-white font-normal text-md">
            <SelectValue placeholder="Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* bhk */}
        <Select onValueChange={(value) => setBhk(+value)}>
          <SelectTrigger className="w-[20rem] rounded-3xl p-6 focus:ring-white font-normal text-md">
            <SelectValue placeholder="BHK" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data?.bhk.map(({ _id }: { _id: number }, index: number) => (
                <SelectItem key={index} value={`${_id}`}>
                  {_id} BHK
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ul className="w-full">
          <Input
            value={inputLocation}
            onChange={(e) => {
              setLocation(e.target.value);
              setSearchQuery(false);
            }}
            placeholder="Location Of Properties"
            type="search"
            className="w-[18rem] rounded-3xl p-6 focus:ring-white font-normal text-md"
          />
          {inputLocation && !searchQuery && (
            <ol className="border p-2 mt-1">
              {filteredLocations.length === 0 ? (
                <li className="text-mainprimary text-md p-2">No data</li>
              ) : (
                filteredLocations.map((item, index) => (
                  <li
                    onClick={() => {
                      setLocation(item);
                      setSearchQuery(true);
                    }}
                    key={index}
                    className="text-headingchild text-md cursor-pointer hover:bg-lightgraycolor p-2"
                  >
                    {item}
                  </li>
                ))
              )}
            </ol>
          )}
        </ul>

        <ul className="w-full">
          <Input
            value={inputPropertyName}
            onChange={(e) => {
              setPropertyName(e.target.value);
              setSearchQuery(false);
            }}
            placeholder="Search For Properties"
            type="search"
            className="w-[18rem] rounded-3xl p-6 focus:ring-white font-normal text-md"
          />
          {inputPropertyName && !searchQuery && (
            <ol className="border p-2 mt-1">
              {filteredPropertyNames.length === 0 ? (
                <li className=" text-md p-2 text-mainprimary">No data</li>
              ) : (
                filteredPropertyNames.map((item, index) => (
                  <li
                    onClick={() => {
                      setPropertyName(item);
                      setSearchQuery(true);
                    }}
                    key={index}
                    className="text-headingchild text-md cursor-pointer hover:bg-lightgraycolor p-2"
                  >
                    {item}
                  </li>
                ))
              )}
            </ol>
          )}
        </ul>
        <Button onClick={handleSearch} className="bg-mainprimary px-10 py-6 hover:bg-mainprimaryhover rounded-[18px] "><Search/></Button>
      </section>
      </div>
      <div className="other prop mt-10">
      <PropertiesSection/>
      </div>
      {/* <Message /> */}
      <Footer />
    </>
  );
};

export default Page;
