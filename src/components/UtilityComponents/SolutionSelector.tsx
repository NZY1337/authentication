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
    borderRadius: 12,
    textAlign: "center",
    padding: theme.spacing(1),
    border: selected ? `2px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.divider}`,
    backgroundColor: selected ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    boxShadow: selected ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    "&:hover": {
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    },
    height: 156,
    display: "flex",
}));

const SolutionSelector = ({  selectedSolution, setSelectedSolution}: SolutionSelectorProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{borderRadius: 3 }} mt={3} mb={3}>
      <Grid container spacing={2}>
        {solutions.map((solution) => (
          <Grid  size={{xs: 12, md: 2.4, sm: 6}} key={solution.label}>
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