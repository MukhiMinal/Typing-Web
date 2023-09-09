import { Box, Button, TextField } from '@mui/material'
import { EmailAuthCredential } from 'firebase/auth'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const LoginForm = ({handleClose}) => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
     const{theme}=useTheme();


     const handleSubmit=()=>{
        if(!email|| !password){
            toast.warning('🦄 Fill all details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        auth.signInWithEmailAndPassword(email,password).then((res)=>{
            toast.success('Logged in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                handleClose();
        })  //to handle the error
    .catch((err)=>{
        toast.error('Invalid Credential', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    })
    }

  return (
   <Box
   p={3}//padding
   style={{
    display:'flex',
    flexDirection:'column',
    gap:'20px'
   }}>
    <TextField
    variant='outlined'
    type='email'
    label='Enter Email'
    onChange={(e)=>setEmail(e.target.value)}
    //givimg theme to the enter mail box
    InputLabelProps={{
        style:{
            color:theme.textColor
        }
    }}
    InputProps={{
        style:{
            color:theme.textColor
        }
    }}/>
    <TextField
     variant='outlined'
     type='password'
     label='Enter Password'
     onChange={(e)=>setPassword(e.target.value)}
     //givimg theme to the enter password box
     InputLabelProps={{
        style:{
            color:theme.textColor
        }
    }}
    InputProps={{
        style:{
            color:theme.textColor
        }
    }}/>
    <Button variant='contained' size='large'
    style={{backgroundColor:theme.textColor,color:theme.backgroundColor}}
    onClick={handleSubmit}>Login</Button>
   </Box>
  )
}

export default LoginForm