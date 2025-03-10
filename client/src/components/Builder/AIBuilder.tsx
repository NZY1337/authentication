import React, { useState } from "react";
import {
  Grid2 as Grid,
  Stack,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { builderAiIntervention, builderHouseAngle, builderModeStyle, builderModeOptions,  builderNumberOfDesigns } from "../../helpers/constants";
import DynamicSelect from "../UtilityComponents.tsx/DynamicSelect";
import FileUpload from "../UtilityComponents.tsx/FileUpload";
import { DynamicSelectProps } from "../UtilityComponents.tsx/DynamicSelect";

type OnchangeType = DynamicSelectProps['onChange'];

const AIBuilder = () => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const [stateBuilder, setStateBuilder] = useState({
    houseAngle: "side of house",
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

  return (
    <Grid spacing={3} container justifyContent="center" textAlign={"left"} sx={{ margin: "2.5rem 0" }}>
      <Grid size={{ xs: 12, md: 6, lg: 6, xl: 8 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
          <img
            src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="AI"
            style={{ width: "100%", height: "100%" }}
          />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">1. Upload Photo</Typography>

            <FileUpload preview={preview} setPreview={setPreview} />
              
            <Typography variant="h6">2. Design</Typography>

            <DynamicSelect label="House Angle" id="builder-house-angle" name="houseAngle" value={stateBuilder.houseAngle} options={builderHouseAngle} onChange={handleChange} />

            <DynamicSelect label="Mode" id="builder-mode" name="mode" value={stateBuilder.mode} options={builderModeOptions} onChange={handleChange} />
            <DynamicSelect label="Style" id="builder-style" name="style" value={stateBuilder.style} options={builderModeStyle} onChange={handleChange} />
            <DynamicSelect label="Number of Designs" id="builder-design-number" name="numberOfDesigns" value={stateBuilder.numberOfDesigns} options={builderNumberOfDesigns} onChange={handleChange} />
            <DynamicSelect label="Ai Intervention" id="builder-ai-intervention" name="aiIntervention" value={stateBuilder.aiIntervention} options={builderAiIntervention} onChange={handleChange} />

            <FormControlLabel
              control={<Checkbox checked={stateBuilder.useCustomInstructions} onChange={handleCheckboxChange} color="primary" />}
              label="Custom AI instructions" />

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

            <Button type="submit" variant="contained" fullWidth>
              Generate Design
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AIBuilder;
