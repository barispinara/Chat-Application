import { Box, styled } from '@mui/material'
import React from 'react'
import Scrollbar from 'src/components/Scrollbar'
import { Chat } from 'src/content/chat'
import { Sidebar } from 'src/layout/Sidebar'

const StyledBox = styled(Box)(
	({ theme }) => `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  `
)

const InnerStyledBox = styled(Box)(
	({ theme }) => `
    display: flex;
    flex: 1;
  `
)

const Home = () => {
	return (
		<StyledBox>
			<InnerStyledBox sx={{ flex: '0 0 30%' }}>
				<Scrollbar>
					<Sidebar />
				</Scrollbar>
			</InnerStyledBox>
			<InnerStyledBox>
				<Chat />
			</InnerStyledBox>
		</StyledBox>
	)
}

export default Home
