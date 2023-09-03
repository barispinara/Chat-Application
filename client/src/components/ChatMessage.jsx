import { Box, Paper, Typography } from "@mui/material"


const ChatMessage = ({content, sendedAt, flexDirection}) => {
    return (
        <Box
            display="flex"
            flexDirection={flexDirection}
            marginBottom={2}
            width="100%"
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth:'75%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    overflow: 'hidden',
                    wordWrap: 'break-word'
                }}
            >
                <Typography variant="body1" sx={{fontWeight: '500'}}>
                    {content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {sendedAt}
                </Typography>
            </Paper>
        </Box>
    )
}

export default ChatMessage;