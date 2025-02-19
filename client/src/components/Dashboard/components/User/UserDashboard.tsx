import { useState } from "react";
import { Grid2 as Grid , Stack, TextField, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ImageUploadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, image });
  };

  return (
      <Grid container>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            {image && <img src={image} alt="Preview" width={100} height={100} style={{ objectFit: "cover" }} />}
            <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="contained" component="label" startIcon={<UploadFileIcon />}> 
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            <Button type="submit" variant="contained" fullWidth>Submit</Button>
          </Stack>
        </Grid>
      </Grid>
  );
}
