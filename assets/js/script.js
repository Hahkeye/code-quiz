const QUESTIONS = [["This is the first question",["A","B","C","D"],"B"],["This is the first question 2",["E","F","G","H"],"H"],["This is the first question 3",['true','false'],'false'],["This is the first question 4",[1,10,30,67],30]];
var usedQuestions = [];
var time=10;
var qCount=0;
var score=0;
var timer=null;
var startButton = document.getElementById('start');


//Constants, in a sense they are not chaning pointers per say not neccarly their content.
const QUESTION_TITLE = document.getElementById('question-title');
const SELECTIONS = document.getElementById('selection-section');
const FEEDBACK = document.getElementById('feedback');
const CLOCK = document.getElementById('timer');
const mainTarget = document.getElementById('main');
const OUTRO = document.getElementById('outro');
const INTRO = document.getElementById('intro');


function removeAllChildNodes(parn){
    while(parn.firstChild){
        parn.removeChild(parn.firstChild)
    }
}

function setVisibility(target,force='block'){
    console.log("Toggling ", target);
    console.log("visibility ",window.getComputedStyle(target).getPropertyValue('display'));
    target.style.display = force;


}

function restartClock(){
    time=10;
    refreshClock();
}

function refreshClock(){
    CLOCK.innerText=time;
}

function displayStart(){
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"none");
    setVisibility(INTRO,"block");
}

function displayMain(){
    setVisibility(INTRO,"none");
    setVisibility(OUTRO,"none");
    setVisibility(mainTarget,"block");
}

function displayEnd(){
    setVisibility(INTRO,"none");
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"block");
    //add input box so they can enter their name and add them to the high score list.
}

function toggleButton(){
    
}

function restart(){
    displayMain();
    score=0
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
    }else{
        FEEDBACK.setAttribute("id","feedback-fade-wrong");
        FEEDBACK.innerText="Wrong";
        console.log("wrong");
    }
    nextQuestion();
}

function nextQuestion(){
    clearInterval(timer);
    restartClock();
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
    tempOl.setAttribute("id","selection-section-list");
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
        if(time==0){
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

