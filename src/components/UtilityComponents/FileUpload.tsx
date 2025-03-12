import { useRef, useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Rotate90DegreesCcw } from "@mui/icons-material";

import { ROTATION } from "../../helpers/constants";
import { BuilderOverviewProps } from "../Dashboard/components/Builder/BuilderOverview";

import { useNotifications } from '@toolpad/core/useNotifications';

type FileUploadProps = Pick<BuilderOverviewProps, 'preview' | 'setPreview'>

const FileUpload = ({ preview, setPreview }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rotation, setRotation] = useState(ROTATION);
  const notifications = useNotifications();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        notifications.show('Only PNG, JPEG, and JPG files are allowed!', {
            severity: 'error',
            autoHideDuration: 3000,
          });
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setRotation(ROTATION);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onHandleRotation = () => {
    setRotation((prev) => {
        const [first, ...rest] = prev;
        console.log({first, rest})
        return [...rest, first];
    });
  }

  return (
    <Stack spacing={2} alignItems="center" height={"450px"}  
        sx={{
        border: "1px",
        borderStyle: "dashed",
        borderColor: "grey.800",
        padding: 4,
        borderRadius: 2,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "grey.700" },
      }}>
      {!preview ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          width={"100%"}
          height={'100%'}
          onClick={handleClick}
        >
          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="body2">Upload an image here to get started & unlock all <b>A.I. features</b>.</Typography>
        </Stack>
      ) : (
        <Stack position="relative" width={"100%"} height={"100%"} overflow={"hidden"}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px", objectFit: "contain",  height: '100%', transform: `rotate(${rotation[3]}deg)` }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 50,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
            onClick={onHandleRotation}

          >
            <Rotate90DegreesCcw />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
            onClick={handleRemoveImage}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        name="builderImage"
      />
    </Stack>
  );
};

export default FileUpload;
