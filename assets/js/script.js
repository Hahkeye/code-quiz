const QUESTIONS = [["This is the first question",["A","B","C","D"],"B"],["This is the first question 2",["E","F","G","H"],"H"],["This is the first question 3",['true','false'],'false'],["This is the first question 4",[1,10,30,67],30]];
var usedQuestions = [];
var time=100;
var qCount=0;
var scoreCount=0;// insert this data in to the webbrowser insert it into the p element wiht localstorage usingjson stringiyf
var timer=null;
var startButton = document.getElementById('start');
var scoreboard=[];


//Constants, in a sense they are not chaning pointers per say not neccarly their content.
const QUESTION_TITLE = document.getElementById('question-title');
const SELECTIONS = document.getElementById('selection-section');
const FEEDBACK = document.getElementById('feedback');
const CLOCK = document.getElementById('timer');
const mainTarget = document.getElementById('main');
const OUTRO = document.getElementById('outro');
const INTRO = document.getElementById('intro');
const SCORE = document.getElementById('score');
const START_BUTTON = document.getElementById('start');
const PAIRINIT = document.getElementById('initials')
const SCOREB = document.getElementById('scoreb');
const INPUTT = document.getElementById('inputTake');

//Helper Functions
function removeAllChildNodes(parn){
    while(parn.firstChild){
        parn.removeChild(parn.firstChild)
    }
}

function setVisibility(target,force='block'){
    target.style.display = force;
}

function restartClock(){
    time=100;
    refreshClock();
}

function refreshClock(){
    if(time>=0){
        CLOCK.innerText=time;
    }
}
//display toggling functions
function displayStart(){
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"none");
    setVisibility(INTRO,"block");
    setVisibility(START_BUTTON,"block");
}

function displayMain(){
    setVisibility(INTRO,"none");
    setVisibility(OUTRO,"none");
    setVisibility(mainTarget,"block");
    setVisibility(START_BUTTON,"none");
}

function displayEnd(){
    setVisibility(INTRO,"none");
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"block");
    SCORE.innerText="your score was "+scoreCount;
    //add input box so they can enter their name and add them to the high score list.
}

function displayBoard(){
    setVisibility(INTRO,"none");
    setVisibility(mainTarget,"none");
    // setVisibility(OUTRO,"none");
    setVisibility(SCOREB,"block")
    console.log(scoreboard);
    for(let i of scoreboard){
        let tempElement = document.createElement('p');
        tempElement.innerHTML = i;
        SCOREB.appendChild(tempElement);
    }
    setVisibility(START_BUTTON,"block");
}

//main fucntions of the quiz.

function getScoreBoard(){
    
}

function toggleButton(){
    localStorage.clear();
}

function addBoard(){
    if(localStorage.getItem('scoreboard')){
        scoreboard=JSON.parse(localStorage.getItem('scoreboard'));
    }
    scoreboard.push([PAIRINIT.value,scoreCount]);
    let temp = JSON.stringify(scoreboard);
    localStorage.setItem('scoreboard',temp);
    console.log(temp);
    PAIRINIT.value="";
    setVisibility(INPUTT,'none');
    console.log(INPUTT);
    displayBoard()
}

function restart(){
    displayMain();
    scoreCount=0
    qCount=0;
    timer=null;    
    displayQuestion();
}


function checkAnswer(answer=true,correct=false) {
    console.log("-----------");
    console.log("Answer submited: ",answer);
    console.log("Correct Answer: ",correct);
    // targetAnswer.setAttribute("id","feedback-fade");
    setTimeout(function(){
        SELECTIONS.addEventListener('click', (event)=>{
            event.preventDefault();
        });
    },2000);
    setTimeout(function(){FEEDBACK.setAttribute("id","feedback");}, 2000);

    if(answer==correct){
        FEEDBACK.setAttribute("id","feedback-fade-right");
        console.log("Corrected");
        FEEDBACK.innerText="Correct";
        scoreCount++;
    }else{
        FEEDBACK.setAttribute("id","feedback-fade-wrong");
        FEEDBACK.innerText="Wrong";
        console.log("wrong");
        time-=2;
    }
    nextQuestion();
}

function nextQuestion(){
    clearInterval(timer);
    // restartClock();
    removeAllChildNodes(SELECTIONS);
    qCount++;
    if(qCount<QUESTIONS.length){
        displayQuestion();
    }else{
        displayEnd();
        CLOCK.style.visibility= "hidden";
    }
}

function displayQuestion(){
    refreshClock();
    QUESTION_TITLE.innerText = QUESTIONS[qCount][0];
    let tempOl = document.createElement('ol')
    tempOl.setAttribute("id","selection-section-list"); // add the event lisner to the the ol and check to see if its a button 
    for(let answer of QUESTIONS[qCount][1]){
        let tempListItem = document.createElement('li');
        let tempButton = document.createElement('button');
        tempButton.setAttribute("id","selection-section-button");

        tempButton.addEventListener('click',function(){checkAnswer(answer,QUESTIONS[qCount][2])});
        tempButton.innerText=answer;
        SELECTIONS.appendChild(tempOl.appendChild(tempListItem.appendChild(tempButton)));
    }

    timer=setInterval(function(){
        time--;
        if(time<=0){
            refreshClock();
            checkAnswer();
            displayEnd();

        }
        refreshClock();

    },1000);
}


function quiz(){
    restart();
    // displayQuestion()


}

