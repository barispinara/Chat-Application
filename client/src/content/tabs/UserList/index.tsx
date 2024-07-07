import { SearchTwoTone } from '@mui/icons-material'
import {
	Avatar,
	Box,
	InputAdornment,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	styled,
	TextField,
} from '@mui/material'
import React from 'react'

const ListItemWrapper = styled(ListItemButton)(
	({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
    `
)

export const UserList = () => {
	return (
		<Box>
			<TextField
				size="small"
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchTwoTone />
						</InputAdornment>
					),
				}}
				placeholder="Search..."
			/>
			<Box mt={2}>
				<List disablePadding component="div">
					<ListItemWrapper selected>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							sx={{ mr: 1 }}
							primaryTypographyProps={{
								variant: 'h5',
								noWrap: true,
							}}
							secondaryTypographyProps={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '15vw',
								noWrap: true,
							}}
							primary="Test Surname"
							secondary="Lorem Ipsum Bla bla asdadadadasdadasdasdadadasdadasasdadasdadasdasdsa"
						/>
					</ListItemWrapper>
					<ListItemWrapper selected>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							sx={{ mr: 1 }}
							primaryTypographyProps={{
								variant: 'h5',
								noWrap: true,
							}}
							secondaryTypographyProps={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '15vw',
								noWrap: true,
							}}
							primary="Test Surname"
							secondary="Lorem Ipsum Bla bla asdadadadasdadasdasdadadasdadasasdadasdadasdasdsa"
						/>
					</ListItemWrapper>
					<ListItemWrapper selected>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							sx={{ mr: 1 }}
							primaryTypographyProps={{
								variant: 'h5',
								noWrap: true,
							}}
							secondaryTypographyProps={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '15vw',
								noWrap: true,
							}}
							primary="Test Surname"
							secondary="Lorem Ipsum Bla bla asdadadadasdadasdasdadadasdadasasdadasdadasdasdsa"
						/>
					</ListItemWrapper>
					<ListItemWrapper selected>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							sx={{ mr: 1 }}
							primaryTypographyProps={{
								variant: 'h5',
								noWrap: true,
							}}
							secondaryTypographyProps={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '15vw',
								noWrap: true,
							}}
							primary="Test Surname"
							secondary="Lorem Ipsum Bla bla asdadadadasdadasdasdadadasdadasasdadasdadasdasdsa"
						/>
					</ListItemWrapper>
				</List>
			</Box>
		</Box>
	)
}
