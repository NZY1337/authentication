import { Card, CardActionArea, CardContent, Typography, Grid2 as Grid, Tooltip, Box } from "@mui/material";
import { styled } from "@mui/system";
import { solutions } from "../../helpers/constants";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from '@mui/material/styles';

import { BuilderOverviewProps } from "../Dashboard/components/Builder/BuilderOverview";

interface StyledCardProps {
  selected: boolean;
}

type SolutionSelectorProps = Pick<BuilderOverviewProps, "selectedSolution" | "setSelectedSolution">;

const StyledCard = styled(Card)<StyledCardProps>(({ theme, selected }) => ({
    textAlign: "center",
    padding: theme.spacing(1),
    backgroundColor: selected ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    boxShadow: selected ? "0 0 5px rgba(255, 255, 255, 0.5), 0 0 30px rgba(0, 150, 255, 0.3)" : "none",
    "&:hover": {
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    },
    height: 156,
    display: "flex",
    border: selected ? `2px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.divider}`, // Soft white border
    borderRadius: "12px", // Smooth rounded corners
    background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
    backdropFilter: "blur(10px)", // Glassmorphic blur effect,
    animation: "glow 2s infinite alternate",
        "@keyframes glow": {
          "0%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" },
          "100%": { boxShadow: "0 0 5px rgba(52, 50, 7, 0.7)" },
        },
}));

const SolutionSelector = ({  selectedSolution, setSelectedSolution}: SolutionSelectorProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{borderRadius: 3 }} mt={3} mb={3}>
      <Grid container spacing={2}>
        {solutions.map((solution) => (
          <Grid  size={{xs: 6, md: 2.4, sm: 6}} key={solution.label}>
            <StyledCard
              selected={selectedSolution === solution.label}
              onClick={() => setSelectedSolution(solution.label)}
            >
              <CardActionArea sx={{ height: '100%', display:'flex', alignItems: 'baseline'}}>
                <Tooltip title="More info" arrow sx={{ position: "absolute", top: 10, right: 10, fontSize: 16, color: "success.main" }}>
                    <InfoIcon  />
                </Tooltip>
                <CardContent>
                  <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                    <Box
                      sx={{
                        backgroundColor: isDarkMode ? "#1A1A1A" : "#D4EED8",
                        borderRadius: "50%",
                        width: 50,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {solution.icon}
                    </Box>
                    
                  </Box>
                  <Typography
                    sx={{
                      mt: 1,
                      color: selectedSolution === solution.label ? 'success.main' : "#A0A0A0",
                    }}
                  >
                    {solution.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SolutionSelector;