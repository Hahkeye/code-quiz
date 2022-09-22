const QUESTIONS = [["Javascript is an ______ language?",["Object-Oriented","Object-Based","Procedural","None of the Above"],"Object-Oriented"],["Which of the following keywords is used to define a variable?",["var","let","A and B"],"A and B"],["Which of the following methods is used to access HTML elments using Javascript",['getElementbyId()','getElementByClassName()','A and B','None of the Above'],'A and B'],["Which of the following methods can be used to display data using Javascript?",["document.write()","console.log()","window.alert()","all of the above"],"all of the above"],["What function is used to serialize an object into a JSOn string in Javascript",["stringify()","parse()","cover()"],"stringify()"],["What keyword is used to declare an asynchronous function in Javascript?",["async","await","setTimeout"],"async"]];
var time=100;
var qCount=0;
var scoreCount=0;
var timer=null;
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
const SCORE_ELEMENT = document.getElementById('scoreb');
const NAMETAKE = document.getElementById('scoring');

//Helper Functions
function removeAllChildNodes(parn){//removes all child nodes from target
    while(parn.firstChild){
        parn.removeChild(parn.firstChild);
    }
}

function setVisibility(target,force='block'){//sets given visiblity to object
    target.style.display = force;
}

function restartClock(){// restarts the clock
    time=100;
    refreshClock();
}

function refreshClock(){// refresh clock and points
    if(time>=0){
        CLOCK.innerText=time;
        SCORE.innerText="Points: "+scoreCount;
    }
}
//display toggling functions
function displayStart(){//dislays first screen
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"none");
    setVisibility(INTRO,"block");
    setVisibility(START_BUTTON,"block");
    setVisibility(CLOCK,"block");
}

function displayMain(){//displays main screen with questions and answers
    setVisibility(INTRO,"none");
    setVisibility(OUTRO,"none");
    setVisibility(mainTarget,"block");
    setVisibility(START_BUTTON,"none");
    removeAllChildNodes(SCORE_ELEMENT);
    
}

function displayEnd(){//displays end screen
    setVisibility(INTRO,"none");
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"block");
    setVisibility(NAMETAKE,'block');
}

function displayBoard(){//displays board also checks storage
    removeAllChildNodes(SCORE_ELEMENT);
    setVisibility(INTRO,"none");
    setVisibility(mainTarget,"none");
    setVisibility(OUTRO,"none");
    setVisibility(SCORE_ELEMENT,"block");
    if(localStorage.getItem('scoreboard')){
        scoreboard=JSON.parse(localStorage.getItem('scoreboard'));
    }
    for(let i of scoreboard){
        let tempElement = document.createElement('li');
        tempElement.innerHTML = "Person: "+i[0]+" Score: "+i[1];
        SCORE_ELEMENT.appendChild(tempElement);
    }
    setVisibility(NAMETAKE,'none');
    setVisibility(START_BUTTON,"block");
}

//main fucntions of the quiz.
function resetScore(){
    localStorage.clear();
    scoreboard=[];
    displayBoard();
}

function addBoard(){//adds score to board and saves to local storage
    if(localStorage.getItem('scoreboard')){
        scoreboard=JSON.parse(localStorage.getItem('scoreboard'));
    }
    scoreboard.push([PAIRINIT.value,scoreCount]);
    let temp = JSON.stringify(scoreboard);
    localStorage.setItem('scoreboard',temp);
    PAIRINIT.value="";
    displayBoard()
}

function restart(){//restarts game and sets somethings back to default
    restartClock();
    displayMain();
    scoreCount=0
    qCount=0;
    timer=null;    
    displayQuestion();
}


function checkAnswer(answer=true,correct=false) {//Checks if button clicked matches correct answeer
    setTimeout(function(){
        SELECTIONS.addEventListener('click', (event)=>{
            event.preventDefault();
        });
    },2000);
    setTimeout(function(){FEEDBACK.setAttribute("id","feedback");}, 2000);

    if(answer==correct){
        FEEDBACK.setAttribute("id","feedback-fade-right");
        FEEDBACK.innerText="Correct";
        scoreCount++;
    }else{
        FEEDBACK.setAttribute("id","feedback-fade-wrong");
        FEEDBACK.innerText="Wrong";
        time-=10;
    }
    refreshClock();
    nextQuestion();
}

function nextQuestion(){//Gets the next question and displays it. If no more questions displays the end
    clearInterval(timer);
    removeAllChildNodes(SELECTIONS);
    qCount++;
    if(qCount<QUESTIONS.length){
        displayQuestion();
    }else{
        displayEnd();
    }
}

function displayQuestion(){//Displays question to screen with all of its answers. Also time keeping
    refreshClock();
    QUESTION_TITLE.innerText = QUESTIONS[qCount][0];
    let tempOl = document.createElement('ol')
    tempOl.setAttribute("id","selection-section-list");
    tempOl.addEventListener('click',(event)=>{
        if(event.target.nodeName == 'BUTTON'){
            checkAnswer(event.target.getAttribute('selection'),QUESTIONS[qCount][2])
        }
    });
    SELECTIONS.appendChild(tempOl);
    for(let answer of QUESTIONS[qCount][1]){
        let tempListItem = document.createElement('li');
        let tempButton = document.createElement('button');
        tempButton.setAttribute("id","selection-section-button");
        tempButton.setAttribute('selection',answer);
        tempButton.innerText=answer;
        tempOl.appendChild(tempListItem.appendChild(tempButton));
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


function quiz(){//Dumb and should be removed
    restart();

}

