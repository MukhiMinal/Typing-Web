import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs} from '@mui/material'//The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.

import React, { useState } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignUp'
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button'
//methods of login
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {
    //when we click on user icon
    const[open,setOpen]=useState(false);
    //for tabs tabs always give a value
    const[value,setValue]=useState(0);
    const{theme}=useTheme();
    //used because to remove the logout in start
    //when we login we will get the array of user with all information but want only use so destruct
   const [user]=useAuthState(auth);
   const navigate=useNavigate();
    

    const handleModalOpen=()=>{
        //if user is log in navigate to user page
       if(user){
            navigate('/user');
       }else{
        setOpen(true);
       }
    }
    //to close modal by writing function 
    const handleClose=()=>{
        setOpen(false);
    }
    //v is value given by tabs and when we click it switch to other tab
    const handlevalueChange=(e,v)=>{
        setValue(v);
    }
    const logout=()=>{
             auth.signOut().then((res)=>{
                toast.success('Logged Out', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }).catch((err)=>{
                toast.error('not able to Logout', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
            })
             })
    }
   
    const googleProvider=new GoogleAuthProvider();
//to singup with google account
    const handleGoogleSignIn=()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            toast.success('Google Login Successful', {
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
        }).catch((err)=>{
            toast.error(errorMapping[err.code]||'not able to use google auth', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
        })
    })
}


   

  return (
    // //then we click on the user icon a section of modal is open
    //line 76 to give a logout icon after we login
    <div>
       
       <AccountCircleIcon onClick={handleModalOpen} />
       {user && <LogoutIcon onClick={logout}/>}
    
       <Modal open={open}//modal is open
       onClose={handleClose}//to close when we click on screen
       style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'

       }}
       >
       

        <div style={{width:'400px',textAlign:'center'}}>
            <AppBar position='static' style={{background:'transparent'}}>

                <Tabs //tabs are login and signup and tabs stores a value 0 value=login and 1 value=signup
                value={value} 
                onChange={handlevalueChange} variant='fullWidth'>
                    <Tab label='login' style={{color:theme.textColor}}></Tab> 
                    <Tab label='signup'style={{color:theme.textColor}}></Tab>
                </Tabs>
            </AppBar>
            
         {value===0 && <LoginForm handleClose={handleClose}/> }
         {value===1 && <SignupForm handleClose={handleClose}/>}
         <Box>
            <span>OR</span>
            <GoogleButton style={{width:'100%',marginTop:'10px'}} onClick={handleGoogleSignIn}/> 
         </Box>

        </div>
       </Modal>

    </div>
  )
}

export default AccountCircle