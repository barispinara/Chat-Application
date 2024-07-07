import { useRoutes } from 'react-router'
import routes from './router'
import ThemeProviderWrapper from './theme/ThemeProvider'
import { Box, CssBaseline, styled } from '@mui/material'


const StyledBox = styled(Box)(
    ({theme}) => `
        width: 80vw;
        height: 90vh;
        backdrop-filter: blur(19px) saturate(180%);
        // background-color: rgba(17,25,40,0.75);
        background-color: ${theme.colors.secondary.light};
        border-radius: 12px;
        border: 1px solid ${theme.colors.primary.lighter};
        display: flex;
    `
)


function App() {
	const content = useRoutes(routes)
	return (
		<ThemeProviderWrapper>
			<StyledBox>
				<CssBaseline />
				{content}
			</StyledBox>
		</ThemeProviderWrapper>
	)
}

export default App
