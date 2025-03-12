import React, { useState } from "react";
import {
  Grid2 as Grid,
  Stack,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import DynamicSelect from "../UtilityComponents/DynamicSelect";
import FileUpload from "../UtilityComponents/FileUpload";
import { DynamicSelectProps } from "../UtilityComponents/DynamicSelect";

type OnchangeType = DynamicSelectProps['onChange'];

interface AIBuilderProps {
  isHomepage?: boolean;
  preview?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  spaceType?: {
    status: string
    data: {
        interior_spaces: { space_type: string }[],
        exterior_spaces: { space_type: string }[],
    }
  } | null
}

const AIBuilder = ({ isHomepage = false, preview, setPreview, spaceType }: AIBuilderProps) => {
  const order = isHomepage ? 0 : 1;
  const keys = spaceType?.data.interior_spaces.map(item => Object.keys(item)[0]);
  const values = spaceType?.data.interior_spaces.map(item => Object.values(item)[0]);

  const [stateBuilder, setStateBuilder] = useState({
    interiorSpace: keys && keys.length ? keys[0] : "ST-INT-001",
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

  if (!spaceType) {
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
                /> :

                <img
                    src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="AI"
                    style={{ width: "100%", height: "100%", objectFit: 'contain' }}
                />
            }
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            {isHomepage && <FileUpload preview={preview} setPreview={setPreview} />}

            <DynamicSelect label="Space Type" id="interior-space" name="interiorSpace" value={stateBuilder.interiorSpace} keys={keys} options={values} onChange={handleChange} />

            <FormControlLabel
              control={<Checkbox checked={stateBuilder.useCustomInstructions} onChange={handleCheckboxChange} color="primary" />}
              label="Custom AI instructions"/>

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
