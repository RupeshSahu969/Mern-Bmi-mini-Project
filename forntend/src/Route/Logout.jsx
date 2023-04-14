import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'

const Logout = () => {

    const handleSubmit=()=>{
        localStorage.setItem("token","")
    }

  return (
    <Box>
        <Heading>Logout</Heading>
        <Button onClick={handleSubmit} >Logout</Button>
    </Box>
  )
}

export default Logout