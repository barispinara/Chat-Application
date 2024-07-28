import { ScheduleTwoTone } from '@mui/icons-material'
import { Avatar, Box, Card, Divider, styled, Typography } from '@mui/material'

const DividerWrapper = styled(Divider)(
	({ theme }) => `
        .MuiDivider-wrapper {
            border-radius: ${theme.general.borderRadiusSm};
            text-transform: none;
            background: ${theme.palette.background.default};
            font-size: ${theme.typography.pxToRem(13)};
            color: ${theme.colors.alpha.black[50]};
        }
    `
)

const CardWrapperPrimary = styled(Card)(
	({ theme }) => `
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.general.borderRadiusXl};
        border-top-right-radius: ${theme.general.borderRadius};
        max-width: 380px;
        display: inline-flex;
    `
)

const CardWrapperSecondary = styled(Card)(
	({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.alpha.black[100]};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.general.borderRadiusXl};
        border-top-left-radius: ${theme.general.borderRadius};
        max-width: 380px;
        display: inline-flex;
    `
)

function ChatContent() {
	return (
		<Box p={3}>
			<DividerWrapper>2 min ago</DividerWrapper>
			<Box
				display="flex"
				alignItems="flex-start"
				justifyContent="flex-start"
				py={3}
			>
				<Avatar
					variant="rounded"
					sx={{
						width: 50,
						height: 50,
					}}
					alt="TEST USERNAME"
				/>
				<Box
					display="flex"
					alignItems="flex-start"
					flexDirection="column"
					justifyContent="flex-start"
					ml={2}
				>
					<CardWrapperSecondary>
						Hi. Test Message lorem ipsum
					</CardWrapperSecondary>
					<Typography
						variant="subtitle1"
						sx={{
							pt: 1,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<ScheduleTwoTone
							sx={{
								mr: 0.5,
							}}
							fontSize="small"
						/>
						2 min ago
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				alignItems="flex-start"
				justifyContent="flex-end"
				py={3}
			>
				<Box
					display="flex"
					alignItems="flex-end"
					flexDirection="column"
					justifyContent="flex-end"
					mr={2}
				>
					<CardWrapperPrimary>
						Yes, I'll email them right now. I'll let you know once
						the remaining invoices are done.
					</CardWrapperPrimary>
					<Typography
						variant="subtitle1"
						sx={{
							pt: 1,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<ScheduleTwoTone
							sx={{
								mr: 0.5,
							}}
							fontSize="small"
						/>
                            2 min ago
					</Typography>
				</Box>
				<Avatar
					variant="rounded"
					sx={{
						width: 50,
						height: 50,
					}}
					alt="TEST USERNAME"
				/>
			</Box>
			<DividerWrapper>
				2 min ago
			</DividerWrapper>
		</Box>
	)
}

export default ChatContent
