import { createContext, useContext, useState } from "react";

//in context 1.have to create context
const TestModeContext=createContext();

//2.provider
export const TestModeContextProvider=({children})=>{

    //setting in 15
    const[testTime,setTestTime]=useState(15);
    //initialing
    const values={
               testTime,
               setTestTime
    }
    //returning it by calling the children
    return(<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const useTestMode=()=> useContext(TestModeContext);
