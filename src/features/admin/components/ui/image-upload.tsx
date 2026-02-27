"use client";

import { useState, useRef } from "react";
import { ImagePlus, X, CloudUpload, Loader2, CheckCircle2 } from "lucide-react"; // Import thêm icon
import Image from "next/image";
import { toast } from "sonner";
import { uploadService } from "@/features/upload/services/upload-service";
import { Progress } from "@/core/components/ui/progress";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

export const ImageUpload = ({ value, onChange, label = "Upload Image", className }: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>(value);

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        e.target.value = "";

        try {
            setIsLoading(true);
            setProgress(0);

            const response = await uploadService.uploadImage(file, (percent) => {
                setProgress(percent);
            });

            setPreview(response.url);
            onChange(response.url);
            toast.success("Image uploaded successfully");

        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload image.");
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
    };

    const handleRemove = () => {
        setPreview(undefined);
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* KHUNG CHỨA ẢNH / LOADING */}
            <div
                className={`
                    relative aspect-video w-full overflow-hidden rounded-lg border-2 
                    ${!preview && !isLoading ? 'border-dashed border-gray-300 hover:border-terracotta/50 cursor-pointer bg-gray-50 hover:bg-gray-100' : 'border-gray-200 bg-gray-50'}
                    transition-all group
                `}
                onClick={() => !isLoading && !preview && fileInputRef.current?.click()}
            >
                {/* 1. HIỂN THỊ ẢNH ĐÃ CÓ */}
                {preview && (
                    <>
                        <Image
                            src={preview}
                            alt="Upload preview"
                            fill
                            className={`object-cover transition-all ${isLoading ? 'opacity-20 blur-sm' : 'opacity-100'}`}
                        />
                        {/* Nút xóa ảnh (Chỉ hiện khi KHÔNG loading) */}
                        {!isLoading && (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                                className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 p-1.5 rounded-full transition-all shadow-sm opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </>
                )}

                {/* 2. TRẠNG THÁI LOADING (XỬ LÝ UX THÔNG MINH Ở ĐÂY) */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 text-center">

                        {/* Giai đoạn 1: Đang Upload (< 100%) */}
                        {progress < 100 ? (
                            <>
                                <CloudUpload className="text-terracotta w-10 h-10 mb-3 animate-bounce" />
                                <div className="w-full max-w-[200px] space-y-2">
                                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                                        <span>Uploading...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <Progress
                                        value={progress}
                                        className="h-2 bg-gray-200 [&>div]:bg-terracotta"
                                    />
                                </div>
                            </>
                        ) : (
                            // Giai đoạn 2: Đã gửi xong, đợi Server (100%)
                            <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                                <Loader2 className="text-terracotta w-10 h-10 mb-3 animate-spin" />
                                <p className="text-sm font-bold text-gray-700">Processing Image...</p>
                                <p className="text-xs text-gray-500 mt-1">Optimizing & Saving to cloud</p>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. TRẠNG THÁI TRỐNG (NÚT UPLOAD) */}
                {!preview && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 mb-3 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                            <ImagePlus className="w-6 h-6 text-gray-400 group-hover:text-terracotta" />
                        </div>
                        <p className="mb-1 text-sm text-gray-500 font-medium group-hover:text-terracotta transition-colors">{label}</p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG (Max 5MB)</p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
            />
        </div>
    );
};