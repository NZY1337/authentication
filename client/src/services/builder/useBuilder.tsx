// create useBuilder hook

import { useState } from "react";
import fetchData from "../../utils/fetchData";

const useBuilder = () => {
    const [selectedSolution, setSelectedSolution] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);

    const onHandleUploadPreviewToS3Bucket = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length > 0) {
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append("avatar", file);
          setAvatar(URL.createObjectURL(file));
    
          const { resData, error } = await fetchData<FormData,{ fileUrl: string }>({
            data: formData,
            url: "/users/avatar",
            method: "POST",
          });
        }
      };

    return { onHandleUploadPreviewToS3Bucket };
}