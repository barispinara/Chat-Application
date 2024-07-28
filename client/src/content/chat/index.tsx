import { Box, Divider, styled } from '@mui/material'
import React from 'react'
import { TopBarContent } from './TopBarContent'
import Scrollbar from 'src/components/Scrollbar'
import ChatContent from './ChatContent'
import BottomBarContent from './BottomBarContent'

const StyledBox = styled(Box)(
	({ theme }) => `
      overflow: auto;
      width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  flex: 1;
  `
)

const ChatTopBar = styled(Box)(
	({ theme }) => `
		border-bittom: ${theme.colors.alpha.black[10]} solid 1px;
		padding: ${theme.spacing(2)};
		align-items: center;	
  `
)

export const Chat = () => {
	return (
	<StyledBox>
		<ChatTopBar>
			<TopBarContent/>
		</ChatTopBar>
		<Box flex={1}>
			<Scrollbar>
				<ChatContent/>
			</Scrollbar>
		</Box>
		<Divider/>
		<BottomBarContent/>
	</StyledBox>
	)
}
