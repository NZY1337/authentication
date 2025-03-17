import React, { useState, useEffect } from "react";

// components
import PhotoGuideModalBuilder from "../../../Modals/PhotoGuideModal";
import Button from "@mui/material/Button";
import SolutionSelector from "../../../UtilityComponents/SolutionSelector"; 
import FileUpload from "../../../UtilityComponents/FileUpload";
import PhotoGuidelines from "../../../UtilityComponents/PhotoGuide";
import WaitingModal from "../../../Modals/WaitingModal";
import { Grid2 as Grid } from "@mui/material"

// hooks
import { useNotifications } from "@toolpad/core/useNotifications";
import useSocket from "../../../../helpers/hooks/useSocket";

// utils
import fetchData from "../../../../utils/fetchData";
import { solutions } from "../../../../helpers/constants";

// types
import { type Router } from '@toolpad/core/AppProvider';
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
    const { maskStatus } = useSocket();
    const [open, setOpen] = useState(false);
   
    const handleCreateMask = async () => {
        setLoading(true);
        setOpen(true)

        if (file) {
          const formData = new FormData();
          formData.append("preview", file);  // Now it's a valid file upload
          formData.append("maskCategory", maskCategory);

          const { error } = await fetchData<FormData, null>({
            data: formData,
            url: "/builder/create-mask",
            method: "POST",
          });
      
          if (error) {
            setLoading(false);
            setOpen(false)
            notifications.show(error, {
                severity: 'error',
                autoHideDuration: 4000,
            });
          }
        }
    };

    // from reimagin webhook -> websocket -> client
    useEffect(() => {
        if (maskStatus) {
            if (maskStatus.error) {
                notifications.show(maskStatus.error, {
                    severity: 'error',
                    autoHideDuration: 4000,
                })
                setLoading(false);
                setOpen(false);
            } else if (maskStatus.jobId) {
                setLoading(false);
                setOpen(false)
                router?.navigate(`/dashboard/${selectedNavItem}?maskId=${maskStatus.jobId}`);
                console.log("Masks are ready!");
            }
        }
    }, [maskStatus, notifications, router, selectedNavItem]);
      
    // useEffect(() => {
    //     return () => setPreview(null);
    // }, [setPreview]);

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

            <WaitingModal open={open} />
        </>
    );
}

export default BuilderOverview