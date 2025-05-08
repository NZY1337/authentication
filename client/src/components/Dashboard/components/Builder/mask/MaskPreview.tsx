import { Typography, } from "@mui/material"; 
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Warning } from "@mui/icons-material";


const MaskPreview = ({ maskUrl }: {  maskUrl: string | undefined }) => {
    return <>
        <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
            <img
                src={maskUrl ? maskUrl : 'https://images.unsplash.com/photo-1512972972907-6d71529c5e92?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt="AI"
                style={{ width: "100%", height: "100%", maxHeight: "400px", objectFit: maskUrl ? "contain" : "cover" }}
            /> 
            
            {!maskUrl && 
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Warning color="warning" />
                    <Typography color="textPrimary">
                        Go back to <Link to="/dashboard">overview</Link> and upload an image.
                    </Typography>
                </Box>
            }
        </Paper>
    </>
}

export default MaskPreview;