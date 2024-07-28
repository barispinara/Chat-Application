import { InfoTwoTone } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	IconButton,
	styled,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'

export const TopBarContent = () => {
	const theme = useTheme()

	const [drawerOpened, setDrawerOpened] = useState<boolean>(false)

	const handleDrawerOpenChange = () => {
		setDrawerOpened(!drawerOpened)
	}

	return (
		<Box display="flex" align-items="center" justifyContent="space-between">
			<Box display="flex" alignItems="center">
				<Avatar
					variant="rounded"
					sx={{
						width: 50,
						height: 50,
					}}
					alt="TEST USERNAME"
				/>
				<Box ml={1}>
					<Typography variant="h5">TEST USERNAME</Typography>
					<Typography variant="subtitle1">2 min ago</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: { xs: 'none', lg: 'flex' },
				}}
			>
				<Tooltip placement="bottom" title="User Profile">
					<IconButton
						color="primary"
						onClick={handleDrawerOpenChange}
						sx={{borderRadius: '25%'}}
					>
						<InfoTwoTone />
					</IconButton>
				</Tooltip>
			</Box>
			<Drawer
				sx={{
					display: { xs: 'none', md: 'flex' },
				}}
				variant="temporary"
				anchor='right'
				open={drawerOpened}
				onClose={handleDrawerOpenChange}
				elevation={9}
			>
				<Box
					sx={{
						minWidth: 360,
					}}
					p={2}
				>
					<Box
						sx={{
							textAlign: 'center'
						}}
					>
						<Avatar
							sx={{
								mx: 'auto',
								my: 2,
								width: theme.spacing(12),
								height: theme.spacing(12)
							}}
							variant="rounded"
							alt= "Test Username"
						/>
						<Typography variant="h4">Test Username</Typography>
						<Typography variant="subtitle2">
							2 min ago
						</Typography>
					</Box>
				</Box>
				<Divider
					sx={{
						my: 3
					}}
				/>
			</Drawer>
		</Box>
	)
}
