import { useState, useEffect } from "react";
import { Button, Grid2 as Grid } from "@mui/material"
import { type Router } from '@toolpad/core/AppProvider';
import PhotoGuideModalBuilder from "../../../Modals/PhotoGuideModal";
import FileUpload from "../../../UtilityComponents/FileUpload";
import SolutionSelector from "../../../UtilityComponents/SolutionSelector"; 
import PhotoGuidelines from "../../../UtilityComponents/PhotoGuide";
import { DASHBOARD_NAVIGATION } from "../../../../helpers/constants";
import { NavigationItem } from "@toolpad/core/AppProvider";
import fetchData from "../../../../utils/fetchData";

export interface BuilderOverviewProps {
    preview?: string | null;
    setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
    router?: Router;
    setSelectedSolution?: React.Dispatch<React.SetStateAction<string>>;
    selectedSolution?: string;
}

const BuilderOverview = ({ preview, setPreview, router, selectedSolution, setSelectedSolution }: BuilderOverviewProps) => {
    const [openPhotoGuide, setOpenPhotoGuide] = useState<boolean>(false);
    let selectedNavItem: NavigationItem | undefined;

    if ('children' in DASHBOARD_NAVIGATION[0]) {
         selectedNavItem = DASHBOARD_NAVIGATION[0].children?.find(
          (child) => {
            if ('title' in child) {
              return child.title === selectedSolution
            }
          }
        );
    }

    const onHandleNavigate = () => {
        if (selectedNavItem && 'segment' in selectedNavItem) {
            router.navigate(`/dashboard/${selectedNavItem.segment}?id=3213131`);
        }
    }
     
    const handleCreateMask = async () => {
        if (preview) {
          // Fetch the blob data from the blob URL
          const response = await fetch(preview);
          const blobData = await response.blob();
          // Convert the blob into a File object; the third parameter is the file name.
          const file = new File([blobData], 'preview.png', { type: blobData.type });
          
          const formData = new FormData();
          formData.append("preview", file);  // Now it's a valid file upload
      
          const { resData, error } = await fetchData({
            data: formData,
            url: "/builder/create-mask",
            method: "POST",
          });
      
          if (error) {
            return console.error(error);
          }
      
          if (resData) {
            onHandleNavigate();
            console.log(resData);
          }
        }
    };
      
    useEffect(() => {
        return () => setPreview(null)
    }, [setPreview]);

    return (
        <>
            <FileUpload preview={preview} setPreview={setPreview} />
          
            <SolutionSelector selectedSolution={selectedSolution} setSelectedSolution={setSelectedSolution}/>
            
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