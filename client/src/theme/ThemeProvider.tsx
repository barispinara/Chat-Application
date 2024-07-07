import React, { useState, PropsWithChildren } from 'react'
import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material'
import { DefaultTheme } from './schemes/DefaultTheme';

const ThemeProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <StyledEngineProvider injectFirst>
                <ThemeProvider theme={DefaultTheme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeProviderWrapper
