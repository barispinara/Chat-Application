import { SettingsTwoTone } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, IconButton, styled, Tab, Typography } from '@mui/material'
import React from 'react'
import { ChatList } from 'src/content/tabs/ChatList'
import { UserList } from 'src/content/tabs/UserList'

const MainWrapper = styled(Box)(
	({ theme }) => `
        margin-right: ${theme.spacing(2)};
        border: 2px solid ${theme.colors.primary.lighter};
        padding: ${theme.spacing(2.5)};
        overflow: auto;
        width: 100%;
    `
)

const StyledTabPanel = styled(TabPanel)(
	({ theme }) => `
		padding: ${theme.spacing(1)} 0 0 0;
	`
)

const TabsContainerWrapper = styled(Box)(
	({ theme }) => `
		.MuiTabs-indicator {
			min-height: 4px;
			height: 4px;
			box-shadow: none;
			border: 0;
		}

		.MuiTab-root {
			&.MuiButtonBase-root {
				padding: 0;
				margin-right: ${theme.spacing(3)};
			}
		}
	`
)

export const Sidebar = () => {
	const [selectedTabValue, setSelectedTabValue] = React.useState('1')

	const handleTabChange = (
		event: React.SyntheticEvent,
		newTabSelection: string
	) => {
		setSelectedTabValue(newTabSelection)
	}

	return (
		<MainWrapper>
			<Box display="flex" alignItems="flex-start">
				<Avatar alt={'Test'} />
				<Box
					sx={{
						ml: 1.5,
						flex: 1,
					}}
				>
					<Box
						display="flex"
						alignItems="flex-start"
						justifyContent="space-between"
					>
						<Box>
							<Typography variant="h5" noWrap>
								TEST
							</Typography>
							<Typography variant="subtitle1" noWrap>
								TEST
							</Typography>
						</Box>
						<IconButton
							sx={{
								p: 1,
							}}
							size="small"
							color="primary"
						>
							<SettingsTwoTone fontSize="small" />
						</IconButton>
					</Box>
				</Box>
			</Box>
			<TabContext value={selectedTabValue}>
				<TabsContainerWrapper
					sx={{ borderBottom: 1, borderColor: 'divider' }}
				>
					<TabList
						onChange={handleTabChange}
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="Chats" value="1" />
						<Tab label="People" value="2" />
					</TabList>
				</TabsContainerWrapper>
				<StyledTabPanel value="1">
					<ChatList />
				</StyledTabPanel>
				<StyledTabPanel value="2">
					<UserList />
				</StyledTabPanel>
			</TabContext>
		</MainWrapper>
	)
}
