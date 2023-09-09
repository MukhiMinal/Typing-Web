import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph'
import UserInfo from '../Components/UserInfo';



const UserPage = () => {
  const[data,setData]=useState([]);
  const[graphData,setGraphData]=useState([]);
  
  const[user,loading]=useAuthState(auth);
  const navigate=useNavigate();

  const fetchUserData=()=>{
    const resultsRef=db.collection('Results');
    const {uid}=auth.currentUser;
    let tempData=[];
    let tempGraphData=[];
    resultsRef.where('userID','==',uid).get().then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        tempData.push({...doc.data()});
        //generate graph data
        tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
        doc.data().wpm])
      })
      setData(tempData)
      setGraphData(tempGraphData.reverse())
    })
  }

  useEffect(()=>{
    if(!loading){
         fetchUserData();
    }
    if(!loading && !user){
             navigate('/'); 
    }
  },[loading])

  if(loading){
    return <div className='center-of-screen'>
      <CircularProgress/></div>
  }
  return (
    <div className='canvas'>
       <UserInfo totalTestTaken={data.length}/>
       <div className='graph-user-page'>
       <Graph graphData={graphData} type='date'/>
       </div>
     
      <TableUserData data={data}/>
    </div>
  )
}

export default UserPage
