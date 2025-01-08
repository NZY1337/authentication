import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { inputsCustomizations } from "../theme/customization/inputs";
import { navigationCustomization } from "./customization/navigation";
import { colorSchemes, typography, shape } from "../theme/themePrimitives";

interface AppThemeProps {
  children: React.ReactNode;
}

export default function AppThemeProvider({
  children,
}: Readonly<AppThemeProps>) {

  const theme = React.useMemo(() => {
    return createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shape,
          components: {
            ...inputsCustomizations,
            ...navigationCustomization
          },
        });
  }, []);
 
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
