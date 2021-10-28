import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import lvl1a from '../../assets/level1a.png';
import lvl2a from '../../assets/level2a.pdf';
import lvl3a from '../../assets/level3a.pdf';

import lvl1b from '../../assets/level1b.png';
import lvl2b from '../../assets/level2b.pdf';
import lvl3b from '../../assets/level3b.pdf';

import styles from './Event.module.css';
import $ from 'jquery';
import keywords from '../../config/index.json';
class Event extends Component{
    state = {
        status: "",
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
        let lvl4a = "https://forms.gle/jGYquNCm4h9ftTmE8";
        let lvl4b = "https://forms.gle/fgEtbCMe5D1Pa3eH8"; 
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
                $("#unlockButton").css('display', 'block');
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
                })
            }else{
                this.setState({
                    status: 'Well done! You did it next Level is Unlocked go check it out!'
                })
                levelsArray.push(keywords[keyword]);
            }
            let newLevels = {
                levelsUnlocked: levelsArray,
            }
            localStorage.setItem('userData', JSON.stringify(newLevels));
            console.log(keywords[keyword], "Unlocked");

            clearInput();
        }
        const showAlert = ()=>{
            $('#alert').css('display', 'block');
        }
        const dismissAlert = ()=>{
            $('#alert').css('display', 'none');
        }
        window.onclick = function(event) {
            if (event.target === document.getElementById('myModal')) {
                $('#myModal').css('display', 'none');
            }
          }
        return (
            <div id='main'>
                <div id="alert" className={styles.alert}>
                {this.state.status}
                <button type="button" onClick={dismissAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
             <div id="myModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                    <span onClick={closeModal} className={styles.close}>&times;</span>
                    <p>Complete Previous Levels to Unlock this level.</p>
                    </div>

                    </div>
                <h2>Path 1</h2>
                <button class="lvl" value="lvl1a" onClick={downloadPDF} >LVL 1</button>
                <button class="lvl" value="lvl2a" onClick={downloadPDF} >LVL 2</button>
                <button class="lvl" value="lvl3a" onClick={downloadPDF} >LVL 3</button>
                <button class="lvl" value="lvl4a" onClick={downloadPDF} >LVL 4</button>
                
                <h2>Path 2</h2>
                <button class="lvl" value="lvl1b" onClick={downloadPDF} >LVL 1</button>
                <button class="lvl" value="lvl2b" onClick={downloadPDF} >LVL 2</button>
                <button class="lvl" value="lvl3b" onClick={downloadPDF} >LVL 3</button>
                <button class="lvl" value="lvl4b" onClick={downloadPDF} >LVL 4</button>
                <h2>Enter Keywords Here</h2>
                <input id='keyword' type="text" onChange={checkKeyword} placeholder="Enter Your Keyword to unlock next level"></input>
                <div id="keywordStatus">

                </div>
                <div id='unlockButton' className={styles.unlock}>
                    <button onClick={unlockLevel} >Unlock Next Level</button>
                </div>
            </div>
        )
    }
}

export default Event;