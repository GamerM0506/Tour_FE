import axiosClient from "@/core/api/axios-client";
import { AxiosProgressEvent } from "axios";

interface UploadResponse {
  url: string;
  public_id: string;
}

export const uploadService = {
  uploadImage: async (
    file: File, 
    onProgress?: (percent: number) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post("/upload/image", formData, {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percent);
          }
        }
      },
    });
    
    return response as unknown as UploadResponse;
  },
};