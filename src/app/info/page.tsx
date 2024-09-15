'use client';

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

export default function MagicMirror() {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [shopifyLink, setShopifyLink] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
      const response = await fetch('/api/upload', {
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
      } else {
        alert('Failed to upload data.');
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error uploading data.');
    } finally {
      setIsUploading(false);
    }
  };

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
