import { uploadCludinary } from "@/actions/cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImgProps {
  imageUrl: string;
  file: File;
}
export function ImgComponent(props: ImgProps) {
  const { imageUrl, file } = props;
  const [currentUrl, setCurrentUrl] = useState<string>(imageUrl);
  useEffect(() => {
    updateImageUrl();
  }, []);
  const updateImageUrl = () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      uploadCludinary(formData).then((res) => {
        setCurrentUrl(res);
      });
    } catch (error) {}
  };
  return (
    <div className='py-2'>
      <div className=' relative max-w-full max-h-[45rem] h-[25rem] '>
        <Image
          src={currentUrl}
          alt='image'
          fill
        />
      </div>
      <div className='text-center text-sm max-w-md mx-auto'>
        <p data-p-placeholder='Type caption for your image...'></p>
      </div>
    </div>
  );
}
