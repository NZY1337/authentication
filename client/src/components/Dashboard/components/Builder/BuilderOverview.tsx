import React, { useState, useEffect } from "react";

// components
import PhotoGuideModalBuilder from "../../../Modals/PhotoGuideModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SolutionSelector from "../../../UtilityComponents/SolutionSelector"; 
import FileUpload from "../../../UtilityComponents/FileUpload";
import PhotoGuidelines from "../../../UtilityComponents/PhotoGuide";
import LinearProgress from '@mui/material/LinearProgress';

import { Grid2 as Grid } from "@mui/material"

// hooks
import { useNotifications } from "@toolpad/core/useNotifications";


// utils
import fetchData from "../../../../utils/fetchData";
import { solutions } from "../../../../helpers/constants";

// types
import { type Router } from '@toolpad/core/AppProvider';
import { type MaskState } from "../../Dashboard";
import LoadingButton from "../../../UtilityComponents/LoadingButton";

export interface BuilderOverviewProps {
    router: Router;
    maskCategory: string;
    file: File | null,
    setMaskCategory: React.Dispatch<React.SetStateAction<string>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const BuilderOverview = ({ router, file, maskCategory, setMaskCategory, setFile }: BuilderOverviewProps) => {
    const [openPhotoGuide, setOpenPhotoGuide] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);
    const notifications = useNotifications()
    const selectedNavItem = solutions.find(sol => sol.label == maskCategory)?.segment;
    const [loading, setLoading] = useState(false);
    
    const handleCreateMask = async () => {
        setLoading(true);

        if (file) {
          const formData = new FormData();
          formData.append("preview", file);  // Now it's a valid file upload
          formData.append("maskCategory", maskCategory);

          const { resData, error } = await fetchData<FormData, { data: MaskState }>({
            data: formData,
            url: "/builder/create-mask",
            method: "POST",
          });
      
          if (error) {
            notifications.show(error, {
                severity: 'error',
                autoHideDuration: 4000,
            });
          }
      
          if (resData) {
            const { data } = resData;
            router?.navigate(`/dashboard/${selectedNavItem}?maskId=${data.mask?.data.job_id}`);
          }
        }

        setLoading(false);
    };
      
    useEffect(() => {
        return () => setPreview(null);
    }, [setPreview]);

    const disabled = !preview || loading;
    return (
        <>
            <FileUpload preview={preview} setPreview={setPreview} setFile={setFile} />
            <SolutionSelector maskCategory={maskCategory} setMaskCategory={setMaskCategory}/>
            
            <Grid container justifyContent={"space-between"} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button fullWidth variant="contained" onClick={() => setOpenPhotoGuide(true)}>Photo Guide</Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} >
                    <LoadingButton variant={"contained"} color="inherit" loading={loading} text="Upload Image" onClick={handleCreateMask} disabled={disabled} />
                </Grid>
            </Grid>

            <PhotoGuideModalBuilder open={openPhotoGuide} handleClose={() => setOpenPhotoGuide(false)}>
                <PhotoGuidelines /> 
            </PhotoGuideModalBuilder>
        </>
    );
}

export default BuilderOverview