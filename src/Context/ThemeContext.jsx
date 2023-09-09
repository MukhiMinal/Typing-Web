import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/themeOptions";

const ThemeContext=createContext();
export const ThemeContextProvider=({children})=>{
    //parse the json in js object it used to store the theme in localstorage
    const defaultValue=JSON.parse(localStorage.getItem('theme'))|| themeOptions[0].value
    const[theme,setTheme]=useState(themeOptions[0].value)
    const values={
        theme,
        setTheme
    }

return(<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}

export const useTheme=()=>useContext(ThemeContext);