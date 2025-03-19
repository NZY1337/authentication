import React, { useState, useEffect, useCallback } from "react";

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
import useBuilder from "../../../../services/builder/useBuilder";

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
    const notifications = useNotifications()
    const selectedNavItem = solutions.find(sol => sol.label == maskCategory)?.segment;
 
    const [openPhotoGuide, setOpenPhotoGuide] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);
   
    const { maskStatus } = useSocket();
    const { open, loadingCreateMask, setLoadingCreateMask, setOpen, createMask } = useBuilder(router)

    const handleCreateMask = () => {
        createMask(file!, maskCategory)
    }
   
    const handleCloseModal = React.useCallback(() => setOpen(false), [setOpen]);

    // from reimagin webhook -> websocket -> client
    useEffect(() => {
        if (maskStatus) {
            if (maskStatus.error) {
                notifications.show(maskStatus.error, {
                    severity: 'error',
                    autoHideDuration: 4000,
                })
                setLoadingCreateMask(false);
                handleCloseModal();
            } else if (maskStatus.jobId) {
                setLoadingCreateMask(false);
                handleCloseModal()
                router?.navigate(`/dashboard/${selectedNavItem}?maskId=${maskStatus.jobId}`);
                console.log("Masks are ready!");
            }
        }
    }, [handleCloseModal, maskStatus, notifications, router, selectedNavItem, setLoadingCreateMask]);
      
    // useEffect(() => {
    //     return () => setPreview(null);
    // }, [setPreview]);

    const disabled = !preview || loadingCreateMask;
    return (
        <>
            <FileUpload preview={preview} setPreview={setPreview} setFile={setFile} />
            <SolutionSelector maskCategory={maskCategory} setMaskCategory={setMaskCategory}/>
            
            <Grid container justifyContent={"space-between"} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button fullWidth variant="contained" onClick={() => setOpenPhotoGuide(true)}>Photo Guide</Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} >
                    <LoadingButton variant={"contained"} color="inherit" loading={loadingCreateMask} text="Upload Image" onClick={handleCreateMask} disabled={disabled} />
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