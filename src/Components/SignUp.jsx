import { Box, Button, TextField } from '@mui/material'
import { EmailAuthCredential, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const SignupForm = ({handleClose}) => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
     const{theme}=useTheme();

     //check that the user fill all check
     const handleSubmit=()=>{
            if(!email|| !password || !confirmPassword){
                //this is taken from toast which is a alert
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
            //password not match
            if(password!=confirmPassword){
                toast.warning('Incorrect details', {
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
            //to create user account
            auth.createUserWithEmailAndPassword(email,password).then((res)=>{
                toast.success('User created', {
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
                //to handle the error
            }).catch((err)=>{
                toast.error('Not able to created', {
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
     type=' password'
     label='Enter Confirm Password'
     onChange={(e)=>setConfirmPassword(e.target.value)}
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
     onClick={handleSubmit}>SignUp</Button>
   </Box>
  )
}

export default SignupForm