import React, { useState } from "react";

// components
import { Grid2 as Grid } from "@mui/material"; 
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import DynamicSelect, { DynamicSelectProps } from "../../../UtilityComponents/DynamicSelect";
import CustomButton from "../../../UtilityComponents/CustomButtom";
import MaskPreview from "./mask/MaskPreview";

// utils
import useBuilder from "../../../../services/builder/useBuilder";
import { mapSpaceOptions } from "../../../../utils/utilities";


// types
type OnchangeType = DynamicSelectProps['onChange'];
import { type Router } from '@toolpad/core';



const EmptySpace = ({ router }: { router: Router }) => {
  const { spaceTypes, loading, maskData } = useBuilder(router);
  const { spaceTypeKeys, spaceTypeValues } = spaceTypes ? mapSpaceOptions(spaceTypes).interior : {};

  const maskUrl = maskData?.data.maskUrl;

  const [stateBuilder, setStateBuilder] = useState({
    interiorSpace: spaceTypeKeys && spaceTypeKeys.length ? spaceTypeKeys[0] : "ST-INT-001",
    mode: "Beautiful Redesign",
    style: "Modern",
    numberOfDesigns: 1,
    aiIntervention: 1,
    customInstructions: "",
    useCustomInstructions: false,
  });

  const handleChange: OnchangeType = (event) => {
    const { name, value } = event.target;
    setStateBuilder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setStateBuilder((prevState) => ({
      ...prevState,
      useCustomInstructions: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid spacing={3} container justifyContent="center" textAlign={"left"} >
      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <DynamicSelect 
                label="Space Type" 
                id="interior-space" 
                name="interiorSpace" 
                value={stateBuilder.interiorSpace} 
                keys={spaceTypeKeys} 
                options={spaceTypeValues} 
                onChange={handleChange} 
            />
            
            <FormControlLabel  
                label="Custom AI instructions"
                control={<Checkbox checked={stateBuilder.useCustomInstructions} onChange={handleCheckboxChange} color="primary" />}
             />

            {stateBuilder.useCustomInstructions && (
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="e.g. A clean room with beautiful lighting and green textures."
                name="customInstructions"
                value={stateBuilder.customInstructions}
                onChange={handleChange}
              />
            )}

            <CustomButton title={"empty your space"} />
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 6, xl: 8 }}>
        <MaskPreview maskUrl={maskUrl} />
      </Grid>
    </Grid>
  );
};

export default EmptySpace;
