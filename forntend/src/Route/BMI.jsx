import { Box, Button, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";

const BMI = () => {
    const [height,setHeight]=useState("")
    const [weight,setWidth]=useState("")


    const hendlesubmit=()=>{
        const payload={
            
            height,
            weight
        }
        fetch("http://localhost:8080/calculateBMI",{
        method:"POST",    
        headers:{
                'Content-Type': "application/json",
                "Authorization":`Bearar ${localStorage.getItem("token")}`
            },
            body:JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
    
      return (
        <Box>
          <Heading>BMI Pages</Heading>
          <Stack w="50%" m="auto">
          <FormLabel>Height</FormLabel>
          <Input type="text" placeholder='height' onChange={(e) =>setHeight(e.target.value)} /><br/>
          <FormLabel>Weight</FormLabel>
          <Input type="text" placeholder='weight' onChange={(e) =>setWidth(e.target.value)} /><br/>
        <Button onClick={hendlesubmit}  bgColor={"blue"}>BMI CAl</Button>
          </Stack>
       
        </Box>
      )
}

export default BMI;
