import { useState } from "react";
import { Grid2 as Grid  } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { type Session } from '@toolpad/core/AppProvider';
import fetchData from "../../../../utils/fetchData";

export default function ImageUploadForm({ session }: {session: Session | null}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarcaption] = useState("profile-image");   

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("avatar", file);
      formData.append("caption", avatarcaption)
      setAvatar(URL.createObjectURL(file));

      const { resData, error } = await fetchData<FormData,{ message: string }>({
        data: formData,
        url: "/users/avatar",
        method: "POST",
      });
      if (error) {
        console.error(error);
      }
      if (resData) {
        console.log(resData);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, avatar });
  };

  const profileImage = avatar ? avatar : "https://avatars.githubusercontent.com/u"

  return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card elevation={1} sx={{ borderRadius: 2, maxWidth: 345 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={profileImage} alt="User Avatar" />
                    <Stack>
                        <Typography variant="h5">{session?.user?.name}</Typography>
                        <Typography variant="body2" color="textSecondary">Los Angeles, USA</Typography>
                        <Typography variant="body2" color="textSecondary">GTM-7</Typography>
                    </Stack>
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button fullWidth variant="contained" component="label" startIcon={<UploadFileIcon />}> 
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </Button>
                </CardActions>
            </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth>Save</Button>
          </Stack>
        </Grid>

        
      </Grid>
  );
}
