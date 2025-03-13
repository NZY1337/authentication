import React, { useState, useEffect } from "react";
import { Button, Grid2 as Grid } from "@mui/material"
import { type Router } from '@toolpad/core/AppProvider';
import PhotoGuideModalBuilder from "../../../Modals/PhotoGuideModal";
import FileUpload from "../../../UtilityComponents/FileUpload";
import SolutionSelector from "../../../UtilityComponents/SolutionSelector"; 
import PhotoGuidelines from "../../../UtilityComponents/PhotoGuide";
import { DASHBOARD_NAVIGATION } from "../../../../helpers/constants";
import { NavigationItem } from "@toolpad/core/AppProvider";
import fetchData from "../../../../utils/fetchData";

import { MaskState } from "../../Dashboard";

export interface BuilderOverviewProps {
    router: Router;
    selectedCategory: string;
    file: File | null,
    mask: MaskState,
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setMask: React.Dispatch<React.SetStateAction<MaskState>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const BuilderOverview = ({ router, file, mask, selectedCategory, setSelectedCategory, setFile, setMask }: BuilderOverviewProps) => {
    const [openPhotoGuide, setOpenPhotoGuide] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);

    let selectedNavItem: NavigationItem | undefined;

    if ('children' in DASHBOARD_NAVIGATION[0]) {
         selectedNavItem = DASHBOARD_NAVIGATION[0].children?.find(
          (child) => {
            if ('title' in child) {
              return child.title === selectedCategory
            }
          }
        );
    }

    const onHandleNavigate = () => {
        if (selectedNavItem && 'segment' in selectedNavItem) {
            router?.navigate(`/dashboard/${selectedNavItem.segment}?maskId=${mask?.mask?.data.job_id}`);
        }
    }
     
    const handleCreateMask = async () => {
        if (file) {
          const formData = new FormData();
          formData.append("preview", file);  // Now it's a valid file upload
      
          const { resData, error } = await fetchData<FormData, { mask: MaskState }>({
            data: formData,
            url: "/builder/create-mask",
            method: "POST",
          });
      
          if (error) {
            return console.error(error);
          }
      
          if (resData) {
            const { mask } = resData;
            setMask(mask);
            onHandleNavigate();
          }
        }
    };
      
    useEffect(() => {
        return () => setPreview(null);
    }, [setPreview]);

    return (
        <>
            <FileUpload preview={preview} setPreview={setPreview} setFile={setFile} />
            <SolutionSelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            
            <Grid container justifyContent={"space-between"} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button fullWidth variant="contained" onClick={() => setOpenPhotoGuide(true)}>Photo Guide</Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button onClick={handleCreateMask} disabled={!preview} fullWidth variant="contained" color="warning">Generate</Button>
                </Grid>
            </Grid>

            <PhotoGuideModalBuilder open={openPhotoGuide} handleClose={() => setOpenPhotoGuide(false)}>
                <PhotoGuidelines /> 
            </PhotoGuideModalBuilder>
        </>
    );
}

export default BuilderOverview