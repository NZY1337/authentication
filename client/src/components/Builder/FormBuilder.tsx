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

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DynamicSelect from "../UtilityComponents.tsx/DynamicSelect";

const builderHouseAngle = ["side of house", "front of house", "back of house"];
const builderModeOptions = ["Beautiful Redesign", "Minimalist", "Luxury"];
const builderModeStyle = ["Modern", "Traditional", "Contemporary"];
const builderNumberOfDesigns = [1, 2, 3, 4];
const builderAiIntervention = [1, 2, 3, 4];

const DesignForm = () => {
  const [state, setState] = useState({
    houseAngle: "side of house",
    mode: "Beautiful Redesign",
    style: "Modern",
    numberOfDesigns: 1,
    aiIntervention: 1,
    customInstructions: "",
    useCustomInstructions: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      useCustomInstructions: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Submitted:", state);
  };

  return (
    <Grid spacing={3} container justifyContent="center" textAlign={"left"} sx={{ margin: "5rem 0" }}>
      <Grid size={{ xs: 12, md: 6, lg: 6, xl: 8 }}>
        <Paper sx={{ padding: 3, backgroundColor: "#191B19", color: "#fff", borderRadius: 2 }}>
          <img
            src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="AI"
            style={{ width: "100%", height: "100%" }}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper sx={{ padding: 3, backgroundColor: "#191B19", color: "#fff", borderRadius: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">1. Upload Photo</Typography>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                border: "2px dashed gray",
                padding: 4,
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "white" },
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">Upload an image here or CTRL + V</Typography>
            </Stack>

            <Typography variant="h6">2. Design</Typography>

            <DynamicSelect label="House Angle" id="builder-house-angle" name="houseAngle" value={state.houseAngle} options={builderHouseAngle} onChange={handleChange} />

            <DynamicSelect
              label="Mode"
              id="builder-mode"
              name="mode"
              value={state.mode}
              options={builderModeOptions}
              onChange={handleChange}
            />

            <DynamicSelect
              label="Style"
              id="builder-style"
              name="style"
              value={state.style}
              options={builderModeStyle}
              onChange={handleChange}
            />

            <DynamicSelect
              label="Number of Designs"
              id="builder-design-number"
              name="numberOfDesigns"
              value={state.numberOfDesigns}
              options={builderNumberOfDesigns}
              onChange={handleChange}
            />

            <DynamicSelect
              label="Ai Intervention"
              id="builder-ai-intervention"
              name="aiIntervention"
              value={state.aiIntervention}
              options={builderAiIntervention}
              onChange={handleChange}
            />

            <FormControlLabel
              control={<Checkbox checked={state.useCustomInstructions} onChange={handleCheckboxChange} color="primary" />}
              label="Custom AI instructions"
            />

            {state.useCustomInstructions && (
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="e.g. A clean room with beautiful lighting and green textures."
                name="customInstructions"
                value={state.customInstructions}
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

export default DesignForm;
