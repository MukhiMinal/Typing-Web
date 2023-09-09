import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';


var randomWords=require('random-words');

const TypingBox=()=> {


    const inputRef=useRef(null);
    //used the test time 
    const {testTime}=useTestMode();
    //for countdown
    const[countDown,setCountDown]=useState(testTime);
    //to clear the time to reset then we select mode
    const[intervalID,setIntervalID]=useState(null);
    //then we visit the website the timer should be stop
    const[testStart,setTestStart]=useState(false);
    const[testEnd,setTestEnd]=useState(false);
    //how many letters are correct,incorrect,missed,extra 0 by default
    const[correctChar,setCorrectChar]=useState(0);
    const[incorrectChar,setinCorrectChar]=useState(0);
    const[missedChar,setmissedChar]=useState(0);
    const[extraChar,setExtraChar]=useState(0);
    const[correctWords,setcorrectWords]=useState(0);
    const[wordsArray,setWordsArray]=useState(()=>{
        //output: ['army', 'beautiful', 'became', 'if', 'actually']
       return randomWords.generate(50);
    });

    //to see if the user is writing correct that is shown on screen and 0 because 0th index start
    const[currWordIndex,setCurrwordIndex]=useState(0);
    const[currCharIndex,setCurrcharIndex]=useState(0);
    //updating the graph data
    const[graphData,setgraphData]=useState([]);

    //useMemo used for no looping again and again return and array find the length and fill with 0 and iterate creating ref null
    const wordsSpanRef=useMemo(()=>{
          return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    },[wordsArray]);

     //start the timer descrease by 1
    const startTimer=()=>{
        const intervalID=setInterval(timer,1000);
        setIntervalID(intervalID);
          //loop to timer
        function timer(){
           
            setCountDown((latestCountDown)=>{
                
                setCorrectChar((correctChar)=>{
                    //get the graph data
                    setgraphData((graphData)=>{
                        //return an array destruct all the graph data so that its not loss insert a new array +1 because its start from one
                        return [...graphData,[
                        testTime-latestCountDown+1,
                        //calculate wpm
                        (correctChar/5)/((testTime-latestCountDown+1)/60)
                    ]];
                    }) 
                    return correctChar;
                })
                 if(latestCountDown===1){
                      //to stop the timer in 0
                    setTestEnd(true);
                    clearInterval(intervalID);
                    return 0;
                 }

                   return latestCountDown-1;
            });
        }
    }
    //simply reset the whole screen
    const resetTest=()=>{
        clearInterval(intervalID);
        setCountDown(testTime);
        setCurrcharIndex(0);
        setCurrcharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords.generate(50));
        resetWordSpanRef();
        focusInput();
    }
    //loop over the array clearly so that no color is there
    const resetWordSpanRef=()=>{
           wordsSpanRef.map(i=>{
            //to fetch the words Array .from because childnode is nodelist
              Array.from(i.current.childNodes).map(j=>{
                j.className='';
              });
              //to give the cursor at first
              wordsSpanRef[0].current.childNodes[0].className='current';
           })
    }

    //to show in the console what user is writing
    const handleUserInput=(e)=>{
       //when the user start typing then only the timer start
        if(!testStart){
            startTimer();
            setTestStart(true);
        }
        //child nodes contains the char that user writing
        //in give a array of span of individual char of current word
        const allCurrChars=wordsSpanRef[currWordIndex].current.childNodes;

        //key code of space is 32 used after one word jump to go to other word
        if(e.keyCode===32){
               //give the correct words queryselector select all the currect class the if the correct word
            let correctCharsInWord=wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if(correctCharsInWord.length===allCurrChars.length){
                setcorrectWords(correctWords+1);
            }

            //removing past place cursor
            if(allCurrChars.length<=currCharIndex){
               allCurrChars[currCharIndex-1].classList.remove('current-right');  

            }else{
                setmissedChar(missedChar+allCurrChars.length-currCharIndex);
                //remove a cursor from in between the word
                allCurrChars[currCharIndex].classList.remove('current');

            }
            //to blink the cursor at the first before the next word
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className='current';
 
            setCurrwordIndex(currWordIndex+1);
            setCurrcharIndex(0);
            return;
        }
        //if user want to clear the word means backspace key code of backspace 8
        if(e.keyCode===8){
            //stopthe user to ease any char in the 0th index of any word
                   if(currCharIndex!==0){
                      //this used to ease the char from end if the cursor is at the end after char
                    if(allCurrChars.length===currCharIndex){
                        //to remove the extra word without giving the space
                        if(allCurrChars[currCharIndex-1].className.includes('extra')){
                            allCurrChars[currCharIndex-1].remove();
                            //for the cursor 
                            allCurrChars[currCharIndex-2].className+='current-right';

                        }
                        else{
                            allCurrChars[currCharIndex-1].className='current';
                        }
                        //setting the current index to the previous value
                        setCurrcharIndex(currCharIndex-1);
                        return;
                    }

                    //moving the cursor for the previous and easing
                            allCurrChars[currCharIndex].className='';
                            allCurrChars[currCharIndex-1].className='current';
                            //setting the current index to the previous value
                            setCurrcharIndex(currCharIndex-1);
                   }
                   return;

        }

        if(currCharIndex === allCurrChars.length){
            //return a span tag
            let newSpan=document.createElement('span');
            //add the word after the written word
            newSpan.innerHTML=e.key;
            //colour of incorrect
            newSpan.className='incorrect extra current-right';
            //the cursor should be on the right side only
            allCurrChars[currCharIndex-1].classList.remove('current-right');
            //add the user word
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrcharIndex(currCharIndex+1);
            setExtraChar(extraChar+1);
            return;
        }
      // it condition check if the user is writing correct
       if(e.key==allCurrChars[currCharIndex].innerText){
        //if the letter is correct thenagain classname with color green or red
            allCurrChars[currCharIndex].className='correct';
            setCorrectChar(correctChar+1);//if correct increemnt 1
       }
       else{
           allCurrChars[currCharIndex].className='incorrect';
           setinCorrectChar(incorrectChar+1);
       }

        
       //to present the cursor in right side at the end of the word char
       //if condn check thet the cursor is at the end of word
       if(currCharIndex+1 === allCurrChars.length){
        //add and move to right                 //give a space when ever u are adding a classname
        allCurrChars[currCharIndex].className +=' current-right'
       }
       else{
          //to move the cursor also forward
       allCurrChars[currCharIndex+1].className='current';
       }
      
       //update the current index to move forward
       setCurrcharIndex(currCharIndex+1);
    }
  //calculate the word per min. /60
    const calculateWPM=()=>{
        return Math.round((correctChar/5)/(testTime/60));
    }
    const calculateAcc=()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }

    //to focus the input box after reloading
    const focusInput=()=>{
        inputRef.current.focus();
    }
    useEffect(()=>{
        //thenever the modes changes reset test
        resetTest();
        setCountDown(testTime);
    },[testTime])

    useEffect(()=>{
             focusInput();
            
             //fetching the 0th words of its current first childnodes access the childnode which is a node list and giving classname current 
             wordsSpanRef[0].current.childNodes[0].className='current';
    },[]);
return(
    //to split individual char singlely,line 163 is the ternary condn is timer end do test over
    <div>
        <UpperMenu countDown={countDown}/>
      
         {(testEnd)?(
         <Stats
          wpm={calculateWPM()}
         //initialise all the states
          accuracy={calculateAcc()} 
         correctChar={correctChar}
          incorrectChar={incorrectChar}
          missedChar={missedChar}
          extraChar={extraChar}
          graphData={graphData}
          />
          ):
        (          <div className='type-box' onClick={focusInput}>

              <div className='words'>
                {
                     wordsArray?.map((word,index)=>(
                        //ref because every word giving a ref from 0 to 49 to fetch the every char and check
                       <span className='word' ref={wordsSpanRef[index]}>
                           {word.split('').map((char)=>(
                             <span>{char}</span>
                          ))}
                       </span>
                     ))
                }
              </div>

          
    </div>)}
   
           <input
           //input box of user
           type='text'
           className='hidden-input'
           ref={inputRef}
           onKeyDown={handleUserInput}></input>
        
    </div>
    
  
)
            }

export default TypingBox;