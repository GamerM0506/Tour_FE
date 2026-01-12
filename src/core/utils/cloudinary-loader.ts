"use client";

interface CloudinaryLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderProps) {
  const params = [
    'f_auto',      
    'c_limit',    
    `w_${width}`,  
    `q_${quality || 'auto'}` 
  ];
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'; 
  
  if (src.startsWith('https')) return src;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}