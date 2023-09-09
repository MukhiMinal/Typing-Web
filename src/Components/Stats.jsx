//results of testing

import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Stats=(
    {wpm,
    accuracy,
    correctChar,
    incorrectChar,
    missedChar,
    extraChar,
    graphData
}
) =>{
// to remove duplicate in the x axis
    let timeSet=new Set();
    //filter all duplicate data
    const newGraph=graphData.filter(i=>{
        //if the timeset doesnt have the time value in 0th index
        if(!timeSet.has(i[0])){
            //add in set
            timeSet.add(i[0]);
            return i;
        }
    })
    //store data in firebase
    const pushDataToDB=()=>{
//if user dont type anything show invalid
        if(isNaN(accuracy)){
            toast.error('invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
            const resultsRef=db.collection('Results');
            //have to get the user id by current user
            const {uid}=auth.currentUser;
            resultsRef.add({
                //this are the results have to save
                wpm:wpm,
                accuracy:accuracy,
                //date give the timestamp iin firebase
                timeStamp:new Date(),
                characters:`${correctChar}/${incorrectChar}/${missedChar}/${extraChar}`,
                userID:uid
            }).then((res)=>{
                toast.success('Data saved Successful', {
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
                toast.error('Not able to save Successful', {
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
//user have to login to save the result
    useEffect(()=>{
            if(auth.currentUser){
                pushDataToDB();
            }
            else{
                toast.warning(' Login to save Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
    },[])
  return (
   <div className='stats-box'>
    <div className='left-stats'>
        <div className='title'>WPM</div>
        <div className='subtitle'>{wpm}</div>
        <div className='title'>Accuracy</div>
        <div className='subtitle'>{accuracy}</div>
        <div className='title'>Characters</div>
        <div className='subtitle'>{correctChar}/{incorrectChar}/{missedChar}/{extraChar}</div>
    </div>
    <div className='right-stats'>
        <Graph graphData={newGraph}/>
        </div>
   </div>
  )
}

export default Stats