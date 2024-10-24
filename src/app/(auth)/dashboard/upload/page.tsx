'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/dashboard/Navbar'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { Textarea } from "@/components/ui/textarea"
import { TiDelete } from "react-icons/ti";
import './imageUpload.scss'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';
import { toast } from 'sonner';
import { uploadImages } from './upload';
import { cn } from "@/lib/utils"

const Multioptions = [
  { label: "Private Garden", value: "Private Garden" },
  { label: "Piped Gas", value: "Piped Gas" },
  { label: "Banquet Hall", value: "Banquet Hall" },
  { label: "Swimming Pool", value: "Swimming Pool" },
  { label: "InteCom Facility", value: "InteCom Facility" },
  { label: "Club House", value: "Club House" },
  { label: "Gym", value: "Gym" },
  { label: "CCTV", value: "CCTV" },
  { label: "Elevator", value: "Elevator" },
  { label: "Kids Play Area", value: "Kids Play Area" },
  { label: "Reserved Parking", value: "Reserved Parking" },
  { label: "Waste Disposal", value: "Waste Disposal" },
  { label: "Vastu Compliant", value: "Vastu Compliant" },
  { label: "Power Backup", value: "Power Backup" },
  { label: "Visitor Parking", value: "Visitor Parking" }
];


interface formData {
  name: string,
  price: string,
  description: string,
  sortlocation: string,
  fulllocation: string,
  mapsrc: string,
  parking: number,
  bhk: number,
  floor: string,
  bath: number,
  type: string,
  size: number,
}
const Page = () => {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [requirement, setRequirement] = useState<string>("Sell");
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [error, setError] = useState('');
  const [floorimages, setFloorImages] = useState<any>([]);
  const [floorerror, setFloorError] = useState('');
  const [loader, setloader] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [toggle, setToggle] = useState<boolean>(false);

  const [formData, setFormData] = useState<formData>({
    name: "",
    price: '',
    description: "",
    sortlocation: "",
    fulllocation: "",
    mapsrc: "",
    parking: 0,
    bhk: 0,
    floor: '',
    bath: 0,
    type: "",
    size: 0
  });

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };


  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    const validFiles: any = [];
    let validationError = '';

    if (files.length + selectedImages.length > 20) {
      validationError = 'You can select up to 20 images in total.';
    } else {
      files.forEach((file: any) => {
        if (file.size > 2 * 1024 * 1024) {
          validationError = 'Each image must be under 2MB.';
        } else {
          validFiles.push(file);
        }
      });
    }

    if (validationError) {
      setError(validationError);
    } else {
      setSelectedImages((prevImages: any) => [...prevImages, ...validFiles]);
      setError('');
    }
  };

  const handleFloorImage = (e: any) => {
    const files = Array.from(e.target.files);
    const validFiles: any = [];
    let validationError = '';

    files.forEach((file: any) => {
      if (file.size > 2 * 1024 * 1024) {
        validationError = 'Each image must be under 2MB.';
      } else {
        validFiles.push(file);
      }
    });

    if (validationError) {
      setFloorError(validationError);
    } else {
      setFloorImages(validFiles);
      setFloorError('');
    }
  };

  // function formatNumber(value: number): string {
  //   if (value >= 1e7) {
  //     return (value / 1e7).toFixed(2).replace(/\.00$/, '') + 'Cr';
  //   } else if (value >= 1e5) {
  //     return (value / 1e5).toFixed(2).replace(/\.00$/, '') + 'L';
  //   } else if (value >= 1e3) {
  //     return (value / 1e3).toFixed(2).replace(/\.00$/, '') + 'K';
  //   } else {
  //     return value.toString();
  //   }
  // }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const data = new FormData();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedImages.length === 0 || selected.length === 0) {
      toast.error("Please select images and amenities");
      return;
    }
    setloader(true);
    const amenities: [] = [];
    selected.forEach(({ value }) => amenities.push(value));
    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('description', formData.description);
    data.append('requirement', requirement);
    data.append('sortlocation', formData.sortlocation);
    data.append('fulllocation', formData.fulllocation);
    data.append('mapsrc', formData.mapsrc);
    data.append('carpetsize', formData.size.toString());
    data.append('parking', formData.parking.toString());
    data.append('bhk', formData.bhk.toString());
    data.append('floor', formData.floor);
    data.append('bath', formData.bath.toString());
    data.append('type', formData.type);
    data.append('date', date!.toString());
    data.append('toggle', toggle.toString());
    data.append('amenities', JSON.stringify(amenities));

    try {
      let arr: any = [];
      let floorimage: any = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const data = await uploadImages(selectedImages[i]);
        arr.push(data.url);
        toast.success(`${arr.length} Image Uploaded successfully`);
      }
      if (floorimages.length > 0) {
        const floor = await uploadImages(floorimages[0]);
        floorimage.push(floor.url);
      }
      if (arr.length === selectedImages.length) {
        data.append('images', JSON.stringify(arr))
        data.append('floorimage', JSON.stringify(floorimage))

        await axios.post('/api/upload', data,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((res) => {
            arr = [];
            toast.success(res?.data?.message);
          })
          .catch((err) => {
            toast.error(err.res.data.message);
          })
      }

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=' px-[4vw] py-4'>
        <span onClick={() => router.push('/dashboard/properties')} className='flex cursor-pointer w-fit'>
          <IoMdArrowRoundBack className='text-2xl text-lightgray' />
          <p className='text-lightgray'>Back</p>
        </span>
        {/* start input */}
        <form method="POST" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-10'>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <section className='flex items-center'>
              <h1>Bought <span className={`${toggle ? "font-bold text-safe" : "font-bold text-danger"}`}>({toggle ? "ON" : "OFF"}) </span>:</h1>
              <div className="toggle-switch">
                <input checked={toggle} onChange={(e) => setToggle(e.target.checked)} className="toggle-input" id="toggle" type="checkbox" />
                <label className="toggle-label" htmlFor="toggle"></label>
              </div>
            </section>
            {toggle && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Name <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='name' type='text' placeholder='Enter property name' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Price <span className='text-red-500'>*</span></h1>
            <div className="flex items-center gap-4">
              <Input onChange={handleChange} name='price' type='text' placeholder='Enter property price like 2.05 Cr, 55 Lak' required />
            </div>
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Description <span className='text-red-500'>*</span></h1>
            <Textarea onChange={handleChange} name='description' placeholder='Enter property description' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Requirement <span className='text-red-500'>*</span></h1>
            <Select onValueChange={(value) => setRequirement(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Location in sort <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='sortlocation' type='tex' placeholder='Enter property location in sort' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Full Location <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='fulllocation' type='tex' placeholder='Enter property full location' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property map src <span className='text-red-500'>*</span></h1>
            <Input value={formData.mapsrc} onChange={handleChange} name='mapsrc' type='tex' placeholder='Enter property map src' required />
          </div>

          {formData.mapsrc.match(/src="([^"]+)"/)?.[1] ? (
            <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
              <h1>
                Preview map <span className="text-red-500">*</span>
              </h1>
              <iframe
                src={formData.mapsrc.match(/src="([^"]+)"/)?.[1] ?? ''}
                width="fit"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          ) : null}

          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Size  sqft<span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='size' type='number' placeholder='Enter property size just enter the number' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property parking <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='parking' type='number' placeholder='Enter property parking number' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property BHK <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='bhk' type='number' placeholder='Enter property bhk' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Floor <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='floor' type='text' placeholder='Enter property floor link 3rd 6th 2nd' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Bath <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='bath' type='number' placeholder='Enter property bath' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Property Type like : Studio Apartment, Duplex & Penthouse
              <span className='text-red-500'>*</span></h1>
            <Input onChange={handleChange} name='type' type='text' placeholder='Enter property varient' required />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Enter Amenitise<span className='text-red-500'>*</span></h1>
            <MultiSelect
              options={Multioptions}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Select Properties Images maximum 20<span className='text-red-500'>*</span></h1>
            <div className='flex flex-col gap-2 justify-center items-center md:justify-start md:items-start'>
              <span className="file-upload-form">
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path
                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                      ></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button bg-safe">Browse file</span>
                  </div>
                  <input
                    id='file'
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                </label>
              </span>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className=' flex flex-wrap justify-center max-h-[20rem] overflow-auto'>
                {selectedImages.map((image: any, index: number) => (
                  <div className="relative" key={index}>
                    <img
                      src={image ? URL.createObjectURL(image) : ''}
                      alt={`Selected ${index}`}
                      style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '5px' }}
                    />
                    <TiDelete onClick={() => handleDeleteImage(index)} className='text-red-500 text-3xl absolute z-10 right-0 top-0 cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-xl p-5 flex flex-col gap-2">
            <h1>Floor Plan Images</h1>
            <div className='flex flex-col gap-2 justify-center items-center md:justify-start md:items-start'>
              <span className="file-upload-form">
                <label htmlFor="file1" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path
                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                      ></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button bg-safe">Browse file</span>
                  </div>
                  <input
                    id='file1'
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleFloorImage}
                  />
                </label>
              </span>
              {floorerror && <p style={{ color: 'red' }}>{floorerror}</p>}
              <div className=' flex flex-wrap justify-center max-h-[20rem] overflow-auto'>
                {floorimages.map((image: any, index: number) => (
                  <div className="relative" key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '5px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button disabled={loader} className='bg-safe hover:bg-safehover p-6 md:w-fit'>Upload{loader ? <Loader /> : null}</Button>
        </form>
      </div>
    </>
  )
}

export default Page
