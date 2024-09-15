'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import drip from "../../../public/assets/vector.png";
import wave from "../../../public/assets/Component9.png";
import mirror from "../../../public/assets/m_m.png";
import crown from "../../../public/assets/crown.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';

const Page = () => {
  // State to store result from localStorage
  const [result, setResult] = useState<{shopify: string, image: string}>({});


  // Effect to retrieve data from localStorage once the component has mounted
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const storedResult = localStorage.getItem('result');
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }
      setResult({shopify: "https://www.shopify.com", image: "https://www.cloudinary.com"});
    }
  }, []);

  console.log('Result:', result);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <Image src={drip} width={2047} height={1200} alt={""} className="absolute top-0" />
        <Image src={mirror} width={75} height={75} alt={"mirror"} className="absolute top-2 left-2" />
      <section className='flex mt-[100px] justify-around items-center w-full h-full'>
        <div className='flex flex-col justify-center items-center'>
          <Image src={crown} width={600} height={400} alt=''/>
          <img src={result.image} alt="User Image" width={200} height={200} className="rounded-lg" />
        </div>
        <input className='w-64 h-12' type="text" placeholder={result.shopify} />
      </section>
      <button className='self-center bg-[#7E958F] text-white font-bold px-24 pt-10 rounded-sm flex justify-center items-center'>Confirm</button>        
    </div>
  );
};

export default Page;
