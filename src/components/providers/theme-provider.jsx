"use client"

import {ThemeProvider as StyledThemeProvider} from "styled-components";
import ThemeSCSSVariables from "@/app/styles/sass/theme-export.module.scss";

export const ThemeProvider = ({children}) => {
    "use client";

    return (
        <StyledThemeProvider theme={ThemeSCSSVariables}>
            {children}
        </StyledThemeProvider>
    );
};
