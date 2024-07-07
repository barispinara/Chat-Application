import { Box, styled } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)(
	({ theme }) => `
      overflow: hidden;
      width: 100%;
  `
)

export const Chat = () => {
	return <StyledBox>CHAT</StyledBox>
}
