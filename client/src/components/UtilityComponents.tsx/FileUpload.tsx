import { useRef } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const FileUpload = ({ preview, setPreview }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Only PNG, JPEG, and JPG files are allowed.");
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      {!preview ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          width={"100%"}
          sx={{
            border: "1px",
            borderStyle: "dashed",
            borderColor: "grey.800",
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { borderColor: "grey.700" },
          }}
          onClick={handleClick}
        >
          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="body2">Upload an image here</Typography>
        </Stack>
      ) : (
        <Stack position="relative" width={"100%"}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px", objectFit: "cover", maxHeight: "300px" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
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
