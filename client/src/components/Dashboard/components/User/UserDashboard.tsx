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
import fetchData from "../../../../utils/fetchData";
import {useAppContext} from "../../../../context/AppContext";

export default function ImageUploadForm() {
  const { user, setUser } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("avatar", file);
      setAvatar(URL.createObjectURL(file));

      const { resData, error } = await fetchData<FormData,{ fileUrl: string }>({
        data: formData,
        url: "/users/avatar",
        method: "POST",
      });

      if (error) {
        return console.error(error);
      }

      if (resData) {
        setUser((prevUser) => prevUser ? { ...prevUser, avatar: resData.fileUrl } : null);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();             
    console.log({ name, email, avatar });
  };

  const profileImage = user?.avatar || "https://avatars.githubusercontent.com/u"

  return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card elevation={1} sx={{ borderRadius: 2, maxWidth: 345 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={profileImage} alt="User Avatar" sx={{ width: 100, height: 100 }} />
                    <Stack>
                        <Typography variant="h5">{user?.name}</Typography>
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
