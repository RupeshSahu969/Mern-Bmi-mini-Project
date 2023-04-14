import React from 'react'
import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import AddUser from './AddUser'
import SignIn from './SignIn'
import BMI from './BMI'


const AllRoute = () => {
  return (
    <Box>
      <Routes>
        <Route  path='/'  element={<AddUser/>}  />
        <Route  path='/login'  element={<SignIn/>}  />
        <Route  path='/bmis'  element={<BMI/>}  />
        
      </Routes>
    </Box>
  )
}

export default AllRoute
