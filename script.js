const QUESTIONS = [["This is the first question",["A","B","C","D"],"2"],["This is the first question 2",["A","B","C","D"],"3"]];
var usedQuestions = [];
var time=10;

function question(){
    let question = document.getElementById('question-title');
    let answers = document.getElementById('answers');

    question.innerText = QUESTIONS[0][0];
    quiz();

    for(let answer of QUESTIONS[0][1]){
        let tempListItem = document.createElement('li');
        let tempButton = document.createElement('button');

        tempButton.innerText=answer;

        tempListItem.appendChild(tempButton);
        answers.appendChild(tempListItem);
    }
}

function displayClock(){
    let target = document.getElementById('timer');
    time--;
    target.innerText=time;
}

function quiz(){
    // let someInt=setInterval(displayClock,500);
    let someInt=setInterval(function(){
        displayClock();
        if(time==0){
            clearInterval(someInt);
        }

    },500);
    // console.log(someInt);
}

question();