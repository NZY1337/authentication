import React, { useState } from "react";

// components
import { Grid2 as Grid, Typography, } from "@mui/material"; 
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DynamicSelect, { DynamicSelectProps } from "../../../UtilityComponents/DynamicSelect";
import CustomButton from "../../../UtilityComponents/CustomButtom";

// icons
import { Warning } from "@mui/icons-material";

// types
type OnchangeType = DynamicSelectProps['onChange'];
import { type EmptySpaceProps } from "../../Dashboard"

const EmptySpace = ({  spaceTypeOptions}: EmptySpaceProps) => {
  const { spaceTypeKeys, spaceTypeValues } = spaceTypeOptions?.interior || { spaceTypeKeys: [], spaceTypeValues: [] };
 
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

  if (!spaceTypeOptions) {
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
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
                <img
                    src={'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt="AI"
                    style={{ width: "100%", height: "100%", maxHeight: "400px", objectFit: 'cover' }}
                /> 
                
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Warning color="warning" />
                    <Typography color="textPrimary">
                        Go back to <Link to="/dashboard">overview</Link> and upload an image.
                    </Typography>
                </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmptySpace;
