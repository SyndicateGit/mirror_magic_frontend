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

const summary_response = {
    description: "The Daring Cheetah Print Sweater is a must-have fashion item for those seeking a bold and unique addition to their wardrobe. With its eye-catching design, this sweater is sure to make a statement wherever you go. The product description highlights its appeal to women who embrace their individuality and want to make a stylish impact.\n\nCrafted with a focus on comfort, this sweater is made from an ultra-soft fabric, ensuring a cozy and pleasant wearing experience. The cheetah print pattern adds a touch of wild elegance, allowing wearers to embrace their fierce and feminine side. Its versatility is a key feature, as it can be effortlessly styled for various occasions, from casual daytime looks with jeans to more dressed-up evening ensembles.\n\nReviews for this sweater are generally positive, with many customers raving about its softness, warmth, and eye-catching design. It has earned a 5-star rating from multiple reviewers, who appreciate its high-quality fabric and the confidence it instills. One reviewer mentions that it has become a staple in their casual wardrobe and consistently receives compliments. Another customer rates it 4 stars, indicating that while they enjoy the print and fit, they would have preferred a slightly thicker material. Despite this minor critique, the overall feedback suggests that this sweater delivers on its promise of style and comfort.\n\nIn summary, the Daring Cheetah Print Sweater is a fashionable choice for women seeking a statement piece that combines comfort and bold aesthetics. Its soft fabric and versatile design make it a popular option, as evidenced by the positive customer reviews. Whether you're looking to upgrade your casual outfits or add a touch of wild elegance to your style, this sweater is a confident choice."
  
}

const tryon_response = {"message":"Success","img_url":"https://res.cloudinary.com/djwt4zrhz/image/upload/v1726378584/mmybdqsuqywzboxsj7rr.png"}

const Page = () => {
  // State to store result from localStorage
  const [summaryresult, setSummaryResult] = useState<{description: string}>({ description: "" });
  const [tryonresult, setTryonResult] = useState<{img_url: string}>({ img_url: "" });

  // Effect to retrieve data from localStorage once the component has mounted
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const storedResult = localStorage.getItem('summary_result');
      const tryOnResult = localStorage.getItem('tryon_result');
      if (storedResult) {
        setSummaryResult(JSON.parse(storedResult));
      }
      if (tryOnResult) {
        setTryonResult(JSON.parse(tryOnResult));
      }
    }
  }, []);

  console.log('summaryresult:', summaryresult);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <Image src={drip} width={2047} height={1200} alt={""} className="absolute top-0" />
        <Image src={mirror} width={75} height={75} alt={"mirror"} className="absolute top-2 left-2" />
      <section className='flex mt-[100px] justify-around items-center w-full h-full'>
        <div className='flex flex-col justify-center items-center shrink-0'>
          <Image src={crown} width={600} height={400} alt=''/>
          <img src={tryon_response.img_url} alt="User Image" width={400} height={700} className="rounded-lg" />
        </div>
        <h2 className='font-semibold overflow-auto'>{summary_response.description}</h2>
      </section>
      <button className='self-center bg-[#7E958F] text-white font-bold px-24 pt-10 rounded-sm flex justify-center items-center'>Confirm</button>        
    </div>
  );
};

export default Page;

