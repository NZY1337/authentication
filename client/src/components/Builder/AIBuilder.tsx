import React, { useState } from "react";

// components
import { Grid2 as Grid, Typography, } from "@mui/material"; 
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DynamicSelect from "../UtilityComponents/DynamicSelect";
import FileUpload from "../UtilityComponents/FileUpload";
import { DynamicSelectProps } from "../UtilityComponents/DynamicSelect";
import { Warning } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// types
type OnchangeType = DynamicSelectProps['onChange'];
import { type  AIBuilderProps } from "../../components/Dashboard/Dashboard"

const AIBuilder = ({ isHomepage = false, preview, setPreview, spaceTypeOptions, designThemeOptions }: AIBuilderProps) => {
  const location = useLocation();

  console.log(location.pathname);

  const order = isHomepage ? 0 : 1;
  const { spaceTypeKeys, spaceTypeValues } = spaceTypeOptions?.interior || { spaceTypeKeys: [], spaceTypeValues: [] };
  const { designThemeKeys, designThemeValues } = designThemeOptions?.interior || { designThemeKeys: [], designThemeValues: [] };
 
  const [stateBuilder, setStateBuilder] = useState({
    interiorSpace: spaceTypeKeys && spaceTypeKeys.length ? spaceTypeKeys[0] : "ST-INT-001",
    designThemes: designThemeKeys && designThemeKeys.length ? designThemeKeys[0] : "DT-INT-001",
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

  if (!spaceTypeOptions || !designThemeOptions) {
    return <div>Loading...</div>;
  }

  return (
    <Grid spacing={3} container justifyContent="center" textAlign={"left"} >
      <Grid order={order} size={{ xs: 12, md: 6, lg: 6, xl: 8 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
            {preview ? 
                <img
                    src={preview}
                    alt="AI"
                    style={{ width: "100%", height: "100%", maxHeight: "590px", objectFit: 'contain' }}
                /> 
                :
                <Box display="flex" alignItems="center" gap={1}>
                    <Warning color="warning" />
                    <Typography color="textPrimary">
                        Go back to <Link to="/dashboard">overview</Link> and upload an image.
                    </Typography>
                </Box>
            }
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            {isHomepage && <FileUpload preview={preview} setPreview={setPreview} />}
            
            <DynamicSelect 
                label="Space Type" 
                id="interior-space" 
                name="interiorSpace" 
                value={stateBuilder.interiorSpace} 
                keys={spaceTypeKeys} 
                options={spaceTypeValues} 
                onChange={handleChange} 
            />
            
            <DynamicSelect 
                label="Design Themes" 
                id="design-themes" 
                name="designThemes" 
                value={stateBuilder.designThemes} 
                keys={designThemeKeys} 
                options={designThemeValues} 
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
