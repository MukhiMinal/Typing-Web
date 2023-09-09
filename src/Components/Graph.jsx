import React from 'react'
//all the grapg components the come there
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend

}from 'chart.js';
import {Line} from 'react-chartjs-2';
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const Graph=({graphData})=> {
 //change graph theme according to theme
    const{theme} =useTheme();
  return (
    <>
    
     <Line
     data={
        {
            //giving value to the individual graph
            labels:graphData?.map(i=>i[0]),
            datasets:[
                {
                        data:graphData?.map(i=>i[1]),
                        label:'wpm',
                        borderColor:theme.textColor
                }
               
            ]
        }
     }/>

         
    </>
  )
}

export default Graph