import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import lvl1a from '../../assets/levels/level1a.png';
import lvl2a from '../../assets/levels/level2a.pdf';
import lvl3a from '../../assets/levels/level3a.zip';
import lvl4a from '../../assets/levels/level4a.pdf';

import lvl1b from '../../assets/levels/level1b.zip';
import lvl2b from '../../assets/levels/level2b.pdf';
import lvl3b from '../../assets/levels/level3b.pdf';
import lvl4b from '../../assets/levels/level4b.png';

import segment1 from '../../assets/finalLvl/segment1.png';
import segment2 from '../../assets/finalLvl/segment2.png';
import segment3 from '../../assets/finalLvl/segment3.png';
import segment4 from '../../assets/finalLvl/segment4.pdf';

import 'boxicons';
import Timer from '../../components/CountDownTimer/CountDownTimer';
import styles from './Event.module.css';
import $ from 'jquery';
import keywords from '../../config/index.json';
class Event extends Component{
    state = {
        status: "Well Done! Bro you did it keep going you jsut unlocked next level",
        showRules: false,
    }
    render(){
        
            
        
        let userData = localStorage.getItem('userData');
        console.log(keywords);
        if(!userData){
            let data = {
                levelsUnlocked: ['lvl1a', 'lvl1b']
            }
            console.log('storage already there');
            localStorage.setItem('userData', JSON.stringify(data));
        }
 
        let obj = {
            "lvl1a":lvl1a,
            "lvl2a":lvl2a,
            "lvl3a":lvl3a,
            "lvl4a":lvl4a,
            "lvl1b":lvl1b,
            "lvl2b":lvl2b,
            "lvl3b":lvl3b,
            "lvl4b":lvl4b
        }
        let final = {
            "lvl2a": segment1,
            "lvl2b": segment1,
            "lvl3a": segment2,
            "lvl3b": segment2,
            "lvl4a": segment3,
            "lvl4b": segment3,
            "final": segment4
        }
        const timeToLive = () =>{
            let today = new Date();
            let endTime = new Date(2021, 10, 6, 10, 0, 0, 0);
            console.log('endTime', endTime);
            let diffInMilliSecs = Date.parse(endTime) - today.getTime();
    
            let days = Math.floor(diffInMilliSecs/(1000*60*60*24));
            let hours = Math.floor((diffInMilliSecs/(1000*60*60))%24);
            let minutes = Math.floor((diffInMilliSecs/(1000*60))%60);
            let seconds = Math.floor((diffInMilliSecs/(1000))%60);
            
            let timeToLive = {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds:seconds
            }
            console.log(timeToLive);
            return timeToLive;
        }
        const downloadPDF = (e)=>{
            let levelLocked = true;
            let levels = JSON.parse(localStorage.getItem('userData'));
            levels = levels.levelsUnlocked;
            let lvlClicked = e.target.value;

            levels.map((level)=>{
                if(lvlClicked == level){
                    levelLocked= false;
                    window.open(obj[e.target.value]);
                    console.log('level is unlocked already');
                }
            })
            if(levelLocked){
                $('#myModal').css('display', 'block');
            }
        }
        const closeModal = () =>{
            $('#myModal').css('display', 'none');
        }
        const checkKeyword = (e)=>{
            if(e.target.value in keywords){
                console.log('hey there');
                $("#unlockButton").css('display', 'flex');
                $("#keywordStatus").html("Nice this is the keyword");
            }else{
                console.log('try again');
                $("#unlockButton").css('display', 'none');
                $("#keywordStatus").html("Not this try Again!");
            }
        }
        const clearInput = ()=>{
            $("#keyword").val("");
            $("#keywordStatus").html("");
            $("#unlockButton").css('display', 'none');

        }
        const unlockLevel = ()=>{
            showAlert();
            let keyword = $('#keyword').val();
            let levels = JSON.parse(localStorage.getItem('userData'));
            let levelsArray = levels.levelsUnlocked;
            console.log(keywords[keyword], levelsArray);
            if(levelsArray.includes(keywords[keyword])) {
                console.log('level already unlocked');
                this.setState({
                    status: 'Level Already Unlocked Enter Keyword For Next Level'
                });
                window.open(final[keywords[keyword]]);
            }else{
                this.setState({
                    status: 'Well done! You did it next Level is Unlocked go check it out!'
                })
                levelsArray.push(keywords[keyword]);
                window.open(final[keywords[keyword]]);

            }
            let newLevels = {
                levelsUnlocked: levelsArray,
            }
            localStorage.setItem('userData', JSON.stringify(newLevels));
            console.log(keywords[keyword], "Unlocked");

            clearInput();
        }
        const showAlert = ()=>{
            $('#alert').animate({'width':'90%'}, 300, "swing" );
        }
        const dismissAlert = ()=>{
            $('#alert').animate({'width':'0'}, 300, "swing" );
        }
        const showRules = ()=>{
            if(this.state.showRules){
                $('#rules').animate({top: "-85%"}, 300, "swing");
                this.setState({showRules: false});
            }else{
                $('#rules').animate({top: "0"}, 300, "swing");
                this.setState({showRules: true});
            }
        }
        window.onclick = function(event) {
            if (event.target === document.getElementById('myModal')) {
                $('#myModal').css('display', 'none');
            }
          }
          window.addEventListener('resize', () => { 
            document.querySelector(':root').style
              .setProperty('--vh', window.innerHeight/100 + 'px');
              console.log(window.innerHeight/100 + 'px')
          })
          $( document ).ready(function() {
            console.log( "ready!" );
            document.querySelector(':root').style
            .setProperty('--vh', window.innerHeight/100 + 'px');
        });
        return (
            <div id='main' className={styles.main}>
                
                <div id="rules" className={styles.rules}>
                    <h1>Instructions</h1>
                </div>
                <div className={styles.pathA}>
                    <box-icon onClick={showRules} size='md' animation="tada-hover" name='grid-alt' type='solid' color='#FFFFFF' ></box-icon>
                  
                    <div id="myModal" className={styles.modal}>
                        <div className={styles.modalContent}>
                        <span onClick={closeModal} className={styles.close}>&times;</span>
                        <p>Complete Previous Levels to Unlock this level.</p>
                        </div>

                    </div>
                    <h2 className={styles.headingPathA}>Path A</h2>
                    <button className={styles.level} value="lvl1a" onClick={downloadPDF} >LVL 1</button>
                    <button className={styles.level} value="lvl2a" onClick={downloadPDF} >LVL 2</button>
                    <button className={styles.level} value="lvl3a" onClick={downloadPDF} >LVL 3</button>
                    <button className={styles.level} value="lvl4a" onClick={downloadPDF} >LVL 4</button>
                </div>
                <div class={styles.pathB}>
                    <h2 className={styles.headingPathB}>Path B</h2>

               
                        <button className={styles.level} value="lvl1b" onClick={downloadPDF} >LVL 1</button>
                        <button className={styles.level} value="lvl2b" onClick={downloadPDF} >LVL 2</button>
                        <button className={styles.level} value="lvl3b" onClick={downloadPDF} >LVL 3</button>
                        <button className={styles.level} value="lvl4b" onClick={downloadPDF} >LVL 4</button>
                    <div className={styles.float}>

                        <input id='keyword' class={styles.keyword} type="text" onChange={checkKeyword} placeholder="Enter Keywords Here"></input>
                        <div id="keywordStatus" className={styles.keywordStatus}>

                        </div>
                        <div id='unlockButton' className={styles.unlock}>
                            <button className={styles.unlockButton} onClick={unlockLevel} >Unlock Next Level</button>
                        </div>
                    </div>


                </div>
                <div id="alert" className={styles.alert}>
                    {this.state.status}
                    <box-icon className={styles.closeAlert} size="md" onClick={dismissAlert} name='right-arrow' type='solid' animation='fade-left-hover' color='aquamarine' ></box-icon>
                    {/* <box-icon onClick={dismissAlert} name='right-arrow' type='solid' color='#0c0c0c' ></box-icon> */}
                </div>

                
            </div>
        )
    }
}

export default Event;