
import React from 'react'
import { useTheme } from '../Context/ThemeContext'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

//creating table in user
const TableUserData = ({data}) => {
    const {theme}=useTheme();
    const cellStyle={color:theme.textColor,textAlign:'center'}
  return (
    //all are from mui
    <div className='table'>
        <TableContainer>
            <Table>
                   <TableHead>
                           <TableRow>
                                <TableCell style={cellStyle}>
                                    WPM

                                </TableCell>
                                <TableCell  style={cellStyle}>
                                    Accuracy

                                </TableCell>
                                <TableCell  style={cellStyle}>
                                    Characters

                                </TableCell>
                                <TableCell  style={cellStyle}>
                                    Date

                                </TableCell>



                           </TableRow>



                   </TableHead>
                   
                   <TableBody>
                    {
                        //taking value from firestore and firebase dont have direct timestamp tolocaletsring to convert in string 
                        data?.map((i)=>(
                            <TableRow>
                              <TableCell style={cellStyle}>
                                  {i.wpm}
                              </TableCell>
                              <TableCell style={cellStyle}>
                                  {i.accuracy}
                              </TableCell>
                              <TableCell style={cellStyle}>
                                  {i.characters}
                              </TableCell>
                              
                              <TableCell style={cellStyle}>

                                  {i.timeStamp.toDate().toLocaleString()}
                              </TableCell>





                            </TableRow>
                        ))
                    }
                   </TableBody>

            </Table>

        </TableContainer>
    </div>
  )
}

export default TableUserData;