import React, { useState, PropsWithChildren } from 'react'
import { ThemeProvider } from '@mui/material'
import { themeCreator } from './base'
import { StyledEngineProvider } from '@mui/material'

export const ThemeContext = React.createContext((themeName: string): void => {})

const ThemeProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    const curThemeName =
        localStorage.getItem('appTheme') || 'NebulaFighterTheme'
    const [themeName, _setThemeName] = useState(curThemeName)
    const theme = themeCreator(themeName)
    const setThemeName = (themeName: string): void => {
        localStorage.setItem('appTheme', themeName)
        _setThemeName(themeName)
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    )
}

export default ThemeProviderWrapper
