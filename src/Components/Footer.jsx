import  Select  from 'react-select'
import React, { useState } from 'react'
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from '../Context/ThemeContext';

function Footer() {
   
    const{setTheme,theme}=useTheme();
      //when we the clicking the theme it display the themeoptions
    const handleChange=(e)=>{
              console.log(e);
            
              setTheme(e.value);
              //it is in key value pair it helps data to storage in local storage 
              localStorage.setItem('theme',JSON.stringify(e.value));

    }
    //use for linkes in bottom select is used from react-select directly
  return (
    <div className='footer'>
        <div className='links'>
            Links
        </div>
        
        <div className='themeButton'>
            <Select
           
            onChange={handleChange}
            options={themeOptions}
            menuPlacement='top'
            defaultValue={{label: theme.label,value:theme}}
            //this is all about the select box making in transparent as background
            styles={{
                control:styles=> ({...styles,backgroundColor:theme.backgroundColor}),
                menu:styles => ({...styles,backgroundColor:theme.background}),
                option:(styles,{isFocused})=>{
                    return{
                        ...styles,
                        background:(!isFocused)? theme.background:theme.textColor,
                        color:(isFocused)? theme.textColor:theme.typeBoxText,
                        cursor:'pointer'
                    }
                },
                singleValue:styles=>({...styles,color:theme.title}),
            } }        
            />

        </div>

    </div>
  )
}

export default Footer