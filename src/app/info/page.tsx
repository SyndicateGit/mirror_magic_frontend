'use client';

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from 'next/navigation'
import { set } from "@cloudinary/url-gen/actions/variable";
import Head from "next/head";

export default function MagicMirror() {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [shopifyLink, setShopifyLink] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle the Cloudinary Upload widget result
  const handleUploadSuccess = (result: any) => {
    setUserImageUrl(result.info.secure_url); // Set the Cloudinary image URL
    console.log('Cloudinary upload result:', result);
    setIsUploading(false); // Stop the loading state
  };

  const handleUpload = async () => {
    if (!userImageUrl || !shopifyLink) {
      alert("Please upload an image and provide the Shopify product link.");
      return;
    }

    setIsUploading(true);

    // Send Shopify link and Cloudinary URL to your backend
    const payload = {
      shopifyLink,
      cloudinaryUrl: userImageUrl,
    };

    console.log(payload);

    try {
      setIsLoading(true);
      const response = await fetch('/api/upload', { //TODO: Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Image and link uploaded successfully!');
        console.log('Server response:', result);
        if (typeof window !== "undefined")
        localStorage.setItem('result', JSON.stringify(result)); // Store the result in local storage
        router.push('/result'); // Redirect to the result page
      } else {
        alert('Failed to upload data.');
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error uploading data.');
    } finally {
      setIsUploading(false);
      setIsLoading(false);
    }
  };

  if(isLoading) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <Head>
        <title>Loading - Fairy Godmother Outfit Fitting</title>
        <meta name="description" content="Loading page for fairy godmother outfit fitting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[90vw] h-[50vh] relative bg-gradient-to-b from-[#B4E7F8] to-[#F8D0CB] rounded-lg shadow-lg overflow-hidden">
        {/* Dripping effect */}
        <div className="absolute top-0 left-0 right-0 h-[5vh] bg-[#B4E7F8]">
          <div className="flex justify-between">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className="w-[8vw] h-[3vh] bg-[#B4E7F8] rounded-b-full"
                style={{transform: `translateY(${2 + Math.random() * 2}vh)`}}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Replace this div with your actual loading graphic */}
          <div className="w-[10vw] h-[10vw] rounded-full border-4 border-pink-300 border-t-pink-500 animate-spin" />
        </div>

        {/* Loading text */}
        <div className="absolute bottom-[5vh] left-0 right-0 text-center">
          <p className="text-[2.5vw] text-gray-700 font-serif">
            The Fairy godmothers are fitting your outfit
          </p>
          <p className="text-[2vw] text-gray-600 font-serif mt-2">
            please be patient
          </p>
        </div>
      </main>
    </div>
    )
  }

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-full bg-gray-600 h-[100px] flex items-center justify-center text-white">
        <h1 className="italic text-3xl">MagicMirror</h1>
      </div>
      <main className="flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-serif my-8">What do you wish to see...</h2>
        <div className="flex flex-col items-center space-y-6 w-full">

          {/* Cloudinary Upload Widget */}
          <CldUploadWidget
            uploadPreset="next_preset" // Replace with your Cloudinary upload preset
            onSuccess={handleUploadSuccess}
            options={{ sources: ['local', 'url', 'camera'], cropping: false }}
          >
            {({ open }) => (
              <div
                className={`w-full h-[300px] border-2 ${userImageUrl ? "border-blue-500" : "border-gray-400"} border-dashed rounded-lg flex justify-center items-center cursor-pointer bg-gray-100`}
                onClick={() => open()}
              >
                <div className="text-center">
                  {userImageUrl ? (
                    <Image src={userImageUrl} alt="User Image" width={200} height={200} className="rounded-lg" />
                  ) : (
                    <p className="text-gray-500">Click to upload an image</p>
                  )}
                </div>
              </div>
            )}
          </CldUploadWidget>

          {/* Shopify Link Input */}
          <div className="w-full">
            <label htmlFor="shopifyLink" className="block text-lg text-gray-700">
              Shopify Product Link:
            </label>
            <input
              type="url"
              id="shopifyLink"
              value={shopifyLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setShopifyLink(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="https://your-shopify-product-link.com"
              required
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="mt-8 py-2 px-6 bg-gray-500 text-white font-semibold rounded-md"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Dress up time :)"}
        </button>
      </main>
    </div>
  );
}
