import { AttachFileTwoTone, SendTwoTone } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, InputBase, styled, Tooltip, useTheme } from "@mui/material";



const MessageInputWrapper = styled(InputBase)(
    ({ theme }) => `
        font-size: ${theme.typography.pxToRem(18)};
        padding: ${theme.spacing(1)}
        width: 100%
    `
);

const Input = styled('input')({
    display: 'none'
});

function BottomBarContent() {
    const theme = useTheme();

    return(
        <Box
            sx={{
                background: theme.colors.alpha.white[50],
                display: 'flex',
                alignItems: 'center',
                p: 2
            }}
        >
            <Box flexGrow={1} display="flex" alignItems={"center"}>
                <Avatar
                    sx={{ display: {xs: 'none', sm: 'flex'}, mr:1 }}
                    alt="TEST USERNAME"
                />
                <MessageInputWrapper
                    autoFocus
                    placeholder="Write your message here..."
                    fullWidth
                />
            </Box>
            <Box>
                <Input accept="image/*" id="messenger-upload-file"  type="file"/>
                <Tooltip arrow placement="top" title="Attach a file">
                    <label htmlFor="messenger-upload-file">
                        <IconButton sx={{ mx: 1}} color="primary" component="span">
                            <AttachFileTwoTone fontSize="small"/>
                        </IconButton>
                    </label>
                </Tooltip>
                <Button startIcon={<SendTwoTone/>} variant="contained">
                    Send
                </Button>
            </Box>
        </Box>
    )

}

export default BottomBarContent