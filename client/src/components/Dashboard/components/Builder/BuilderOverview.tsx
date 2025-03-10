import { useState } from "react";
import { Button, Grid2 as Grid } from "@mui/material"
import { type Router } from '@toolpad/core/AppProvider';
import PhotoGuideModalBuilder from "../../../Modals/PhotoGuideModal";
import FileUpload from "../../../UtilityComponents/FileUpload";
import SolutionSelector from "../../../UtilityComponents/SolutionSelector"; 
import PhotoGuidelines from "../../../UtilityComponents/PhotoGuide";
import { DASHBOARD_NAVIGATION } from "../../../../helpers/constants";
import { NavigationItem } from "@toolpad/core/AppProvider";

export interface BuilderOverviewProps {
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
    router: Router;
    setSelectedSolution: React.Dispatch<React.SetStateAction<string>>;
    selectedSolution: string;
  }

const BuilderOverview = ({ preview, setPreview, router, selectedSolution, setSelectedSolution }: BuilderOverviewProps) => {
    const [openPhotoGuid, setOpenPhotoGuide] = useState<boolean>(false);
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
            router.navigate(`/builder/${selectedNavItem.segment}`);
        }
    }
    
    return (
        <>
            <FileUpload preview={preview} setPreview={setPreview} />
          
            <SolutionSelector selectedSolution={selectedSolution} setSelectedSolution={setSelectedSolution}/>
            
            <Grid container justifyContent={"space-between"} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button fullWidth variant="contained" onClick={() => setOpenPhotoGuide(true)}>Photo Guide</Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} >
                    <Button onClick={onHandleNavigate} fullWidth variant="contained" color="warning">Generate</Button>
                </Grid>
            </Grid>

            <PhotoGuideModalBuilder open={openPhotoGuid} handleClose={() => setOpenPhotoGuide(false)}>
                <PhotoGuidelines /> 
            </PhotoGuideModalBuilder>
        </>
    );
}

export default BuilderOverview